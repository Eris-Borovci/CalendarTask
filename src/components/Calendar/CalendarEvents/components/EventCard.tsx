import { useTheme } from '@react-navigation/native'
import { View, Text, TouchableOpacity } from 'react-native'
import { StoredEvent } from '~/types/storage'
import makeStyles from './EventCard.style'
import dayjs from 'dayjs'
import useRootNavigation from '~/hooks/useRootNavigation'
import { NavigationModals } from '~/enums/navigation'

type Props = {
    event: StoredEvent
}

const EventCard = ({ event }: Props) => {
    const { colors } = useTheme()
    const navigation = useRootNavigation()
    const styles = makeStyles(colors)

    const formatTime = (date: string) => {
        return dayjs(date).format('HH:mm')
    }

    const handlePress = () => {
        navigation.navigate(NavigationModals.CalendarEventForm, { eventId: event.id })
    }

    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={handlePress}>
            <View style={styles.leftLine} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{event.title}</Text>
                <Text style={styles.time}>{formatTime(event.dateFrom)} - {formatTime(event.dateTo)}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default EventCard