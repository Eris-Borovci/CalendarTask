import { useTheme } from '@react-navigation/native'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { setSelectedDate } from '~/store/calendarSlice'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import CalendarCell from './CalendarCell/CalendarCell'
import makeStyles from './CalendarMonth.style'

const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const CalendarMonth = () => {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  const dispatch = useAppDispatch()
  const showingDate = useAppSelector(state => state.calendar.showingDate)

  const calendarDates = useMemo(() => {
    const month = dayjs(showingDate)
    const monthStart = month.startOf('month')
    const startOffset = (monthStart.startOf('month').day() + 6) % 7

    const endOfMonth = month.endOf('month').day()
    const endOffset = endOfMonth === 0 ? 0 : 7 - endOfMonth

    const startingFromDate = monthStart.subtract(startOffset, 'day')
    const totalDays = startOffset + month.daysInMonth() + endOffset

    return Array.from({ length: totalDays }, (_, index) => {
      const date = startingFromDate.add(index, 'day')
      const isAnotherMonth = date.month() !== month.month()

      return {
        date,
        isAnotherMonth,
      }
    })
  }, [showingDate])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.weekdayRow}>
          {WEEKDAY_LABELS.map(label => (
            <Text key={label} style={styles.weekdayLabel}>
              {label}
            </Text>
          ))}
        </View>
        <View style={styles.calendarGrid}>
          {calendarDates.map(({ date, isAnotherMonth }, index) => {
            return (
              <Pressable
                key={index}
                style={styles.calendarCell}
                onPress={() => dispatch(setSelectedDate(date.toString()))}
              >
                <CalendarCell date={date} isAnotherMonth={isAnotherMonth} />
              </Pressable>
            )
          })}
        </View>
      </View>
    </View>
  )
}

export default CalendarMonth
