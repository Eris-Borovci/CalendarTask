import { StorageKeys } from '~/enums/storageKey'
import { Tags } from '~/enums/tags'
import { CalendarEventSchema } from '~/schemas/calendarEventSchema'
import StorageUtility from '~/utils/StorageUtility'
import { apiSlice } from '~/store/api'
import { StoredEvent } from '~/types/storage'
import uuid from 'react-native-uuid'
import { RootState } from '~/store'
import dayjs from 'dayjs'

const eventsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEvents: builder.query<StoredEvent[], { selectedDate: string }>({
            queryFn: async ({ selectedDate }, api) => {
                const events = await StorageUtility.getItem<StoredEvent[]>(StorageKeys.Events)
                const apiState = api.getState() as RootState
                const userId = apiState.userStore.user?.id

                console.log(events, selectedDate)

                const filteredEvents = events?.filter(event => {
                    const belongsToUser = event.belongsToId === userId

                    if (!belongsToUser) {
                        return false
                    }

                    const dateFrom = dayjs(event.dateFrom)
                    const dateTo = dayjs(event.dateTo)

                    const isSameDay = dateFrom.isSame(selectedDate, 'day') || dateTo.isSame(selectedDate, 'day')

                    return isSameDay
                })

                return { data: filteredEvents ?? [] }
            },
            providesTags: [Tags.Events],
        }),
        getEventById: builder.query<StoredEvent, string>({
            queryFn: async (eventId, api) => {
                const events = await StorageUtility.getItem<StoredEvent[]>(StorageKeys.Events)
                const apiState = api.getState() as RootState
                const userId = apiState.userStore.user?.id

                if (!userId) {
                    return { error: { status: 401, data: 'User not found' } }
                }

                const event = events?.find(event => event.id === eventId && event.belongsToId === userId)

                if (!event) {
                    return { error: { status: 404, data: 'Event not found' } }
                }

                return { data: event }
            },
            providesTags: [Tags.Events],
        }),
        createEvent: builder.mutation<StoredEvent, CalendarEventSchema>({
            queryFn: async (event, api) => {
                const events = await StorageUtility.getItem<StoredEvent[]>(StorageKeys.Events) ?? []
                const apiState = api.getState() as RootState
                const userId = apiState.userStore.user?.id

                if (!userId) {
                    return { error: { status: 401, data: 'User not found' } }
                }

                const storedEvent: StoredEvent = {
                    ...event,
                    dateFrom: event.dateFrom.toISOString(),
                    dateTo: event.dateTo.toISOString(),
                    id: uuid.v4(),
                    belongsToId: userId,
                }

                await StorageUtility.setItem(StorageKeys.Events, [...events, storedEvent])

                return { data: storedEvent }
            },
            invalidatesTags: [Tags.Events],
        }),
        deleteEvent: builder.mutation<string, string>({
            queryFn: async (eventId) => {
                const events = await StorageUtility.getItem<StoredEvent[]>(StorageKeys.Events) ?? []
                const updatedEvents = events.filter(event => event.id !== eventId)
                await StorageUtility.setItem(StorageKeys.Events, updatedEvents)
                return { data: eventId }
            },
            invalidatesTags: [Tags.Events],
        }),
        updateEvent: builder.mutation<StoredEvent, { eventId: string, event: CalendarEventSchema }>(
            {
                queryFn: async ({ eventId, event }, api) => {
                    const events = await StorageUtility.getItem<StoredEvent[]>(StorageKeys.Events) ?? []
                    const apiState = api.getState() as RootState
                    const userId = apiState.userStore.user?.id

                    if (!userId) {
                        return { error: { status: 401, data: 'User not found' } }
                    }

                    const updatedEvent: StoredEvent = {
                        ...event,
                        dateFrom: event.dateFrom.toISOString(),
                        dateTo: event.dateTo.toISOString(),
                        id: eventId,
                        belongsToId: userId,
                    }

                    const filteredEvents = events.filter(event => event.id !== eventId)
                    const updatedEvents = [...filteredEvents, updatedEvent]

                    await StorageUtility.setItem(StorageKeys.Events, updatedEvents)

                    return { data: updatedEvent }
                },
                invalidatesTags: [Tags.Events],
            }
        ),
    }),
})

export const { useGetEventsQuery, useCreateEventMutation, useDeleteEventMutation, useGetEventByIdQuery, useUpdateEventMutation } = eventsApiSlice

export default eventsApiSlice
