import { ActivityIndicator, FlatList, View } from 'react-native'
import { useGetEventsQuery } from '~/store/api/slices/eventsApiSlice'
import { useAppSelector } from '~/store/hooks'
import styles from './CalendarEvents.style'
import EventCard from './components/EventCard'

const CalendarEvents = () => {
  const { selectedDate } = useAppSelector(state => state.calendar)
  const { data: events, isLoading } = useGetEventsQuery({ selectedDate })

  if (isLoading) {
    return <ActivityIndicator />
  }

  return (
    <View>
      <FlatList
        data={events ?? []}
        renderItem={({ item }) => <EventCard event={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  )
}

export default CalendarEvents
