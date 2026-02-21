import { Pressable, ScrollView, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import makeStyles from './CalendarDayView.style'
import { useTheme } from '@react-navigation/native'
import { useAppSelector } from '~/store/hooks'
import { useGetEventsQuery } from '~/store/api/slices/eventsApiSlice'
import dayjs from 'dayjs'
import useRootNavigation from '~/hooks/useRootNavigation'
import { NavigationModals } from '~/enums/navigation'

const HOURS = 24
const HOUR_ROW_HEIGHT = 64
const MINUTE_HEIGHT = HOUR_ROW_HEIGHT / 60
const MIN_EVENT_HEIGHT = 28

type CalendarDayViewProps = {
    eventHeight?: number;
};

const CalendarDayView = ({ eventHeight }: CalendarDayViewProps) => {
    const { colors } = useTheme()
    const styles = makeStyles(colors)
    const showingDate = useAppSelector(state => state.calendar.showingDate)
    const navigation = useRootNavigation()

    const { data: events } = useGetEventsQuery({ selectedDate: showingDate })
    const hasCustomEventHeight =
        typeof eventHeight === 'number' && eventHeight > 0

    const hours = useMemo(() => {
        return Array.from({ length: HOURS }, (_, hour) => hour)
    }, [])

    const startOfSelectedDate = useMemo(() => {
        return dayjs(showingDate).startOf('day')
    }, [showingDate])

    const endOfSelectedDate = useMemo(() => {
        return dayjs(showingDate).endOf('day')
    }, [showingDate])

    const sortedEvents = useMemo(() => {
        return [...(events ?? [])].sort((firstEvent, secondEvent) => {
            return (
                dayjs(firstEvent.dateFrom).valueOf() -
                dayjs(secondEvent.dateFrom).valueOf()
            )
        })
    }, [events])

    const selectedDayLabel = useMemo(() => {
        return dayjs(showingDate).format('dddd, DD MMMM')
    }, [showingDate])

    const eventsForTimeline = useMemo(() => {
        return sortedEvents.map(event => {
            const eventStart = dayjs(event.dateFrom)
            const eventEnd = dayjs(event.dateTo)
            const visibleStart = eventStart.isBefore(startOfSelectedDate)
                ? startOfSelectedDate
                : eventStart
            const visibleEnd = eventEnd.isAfter(endOfSelectedDate)
                ? endOfSelectedDate
                : eventEnd

            const offsetInMinutes = Math.max(
                0,
                visibleStart.diff(startOfSelectedDate, 'minute'),
            )
            const durationInMinutes = Math.max(
                1,
                visibleEnd.diff(visibleStart, 'minute'),
            )

            const top = offsetInMinutes * MINUTE_HEIGHT
            const calculatedHeight = Math.max(
                MIN_EVENT_HEIGHT,
                durationInMinutes * MINUTE_HEIGHT,
            )

            return {
                ...event,
                top,
                height: hasCustomEventHeight ? eventHeight : calculatedHeight,
                timeLabel: `${visibleStart.format('HH:mm')} - ${visibleEnd.format(
                    'HH:mm',
                )}`,
            }
        })
    }, [
        sortedEvents,
        startOfSelectedDate,
        endOfSelectedDate,
        hasCustomEventHeight,
        eventHeight,
    ])

    return (
        <View style={styles.container}>
            <Text style={styles.selectedDateLabel}>{selectedDayLabel}</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.timelineContainer}>
                    {hours.map(hour => (
                        <View key={hour} style={styles.hourRow}>
                            <Text style={styles.hourLabel}>
                                {dayjs().hour(hour).format('HH:00')}
                            </Text>
                            <View style={styles.hourDivider} />
                        </View>
                    ))}

                    <View style={styles.eventsLayer}>
                        {eventsForTimeline.map(event => (
                            <Pressable
                                key={event.id}
                                style={[
                                    styles.eventItem,
                                    { top: event.top, height: event.height },
                                ]}
                                onPress={() => navigation.navigate(NavigationModals.CalendarEventForm, { eventId: event.id })}
                            >
                                <Text numberOfLines={1} style={styles.eventTitle}>
                                    {event.title}
                                </Text>
                                <Text style={styles.eventTime}>{event.timeLabel}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default CalendarDayView
