import { zodResolver } from '@hookform/resolvers/zod'
import {
  RouteProp,
  useRoute,
  useTheme,
} from '@react-navigation/native'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { ActivityIndicator, Alert, Text, View } from 'react-native'
import CustomButton from '~/components/CustomButton/CustomButton'
import CustomInput from '~/components/CustomInput/CustomInput'
import ScreenWrapper from '~/components/ScreenWrapper/ScreenWrapper'
import { NavigationModals } from '~/enums/navigation'
import { CalendarNavigationParamList } from '~/navigations/stacks/CalendarNavigation'
import { calendarEventSchema } from '~/schemas/calendarEventSchema'
import makeStyles from './CalendarEventFormScreen.style'
import DatePicker from '~/components/DatePicker/DatePicker'
import CloseIcon from '~/assets/icons/CloseIcon'
import { useCreateEventMutation, useDeleteEventMutation, useGetEventByIdQuery, useUpdateEventMutation } from '~/store/api/slices/eventsApiSlice'
import useRootNavigation from '~/hooks/useRootNavigation'
import { StoredEvent } from '~/types/storage'

type CalendarEventFormRoute = RouteProp<
  CalendarNavigationParamList,
  NavigationModals.CalendarEventForm
>;

const Screen = ({ event }: { event?: StoredEvent }) => {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  const navigation = useRootNavigation()
  const route = useRoute<CalendarEventFormRoute>()
  const [createEvent] = useCreateEventMutation()
  const [updateEvent] = useUpdateEventMutation()
  const [deleteEvent] = useDeleteEventMutation()

  const { control, handleSubmit, watch } =
    useForm({
      resolver: zodResolver(calendarEventSchema),
      mode: 'onChange',
      defaultValues: {
        title: event?.title ?? '',
        description: event?.description ?? '',
        dateFrom: dayjs(event?.dateFrom).toDate(),
        dateTo: dayjs(event?.dateTo).toDate(),
      },
    })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const paramEventId = route.params?.eventId
      if (paramEventId) {
        await updateEvent({ eventId: paramEventId, event: data })
      } else {
        await createEvent(data)
      }
      navigation.goBack()
    } catch {
      Alert.alert('Error', 'Unable to create event. Try again.')
    }
  })

  const onClose = () => {
    navigation.goBack()
  }

  const handleDeleteEvent = async () => {
    try {
      if (!route.params?.eventId) {
        Alert.alert('Error', 'Event not found.')
        return
      }

      await deleteEvent(route.params?.eventId)
      navigation.goBack()
    } catch {
      Alert.alert('Error', 'Unable to delete event. Try again.')
    }
  }

  const onDelete = () => {
    Alert.alert('Delete Event', 'Are you sure you want to delete this event?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: handleDeleteEvent,
      },
    ])
  }

  const isEditMode = Boolean(route.params?.eventId)
  const dateFromValue = watch('dateFrom')
  const dateToValue = watch('dateTo')

  return (
    <ScreenWrapper customStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {isEditMode ? 'Edit Event' : 'New Event'}
        </Text>
        <CustomButton onPress={onClose} type="outlined" size='small'>
          <CloseIcon />
        </CustomButton>
      </View>

      <View style={styles.formContainer}>
        <CustomInput
          control={control}
          name="title"
          placeholder="Event title"
          label="Title"
        />

        <CustomInput
          control={control}
          name="description"
          placeholder="Description"
          label="Description"
        />

        <DatePicker
          control={control}
          name="dateFrom"
          maximumDate={dateToValue}
          label="Date From"
          placeholder="Select date from"
        />

        <DatePicker
          control={control}
          name="dateTo"
          minimumDate={dateFromValue}
          label="Date To"
          placeholder="Select date to"
        />

        <CustomButton title='Save' onPress={onSubmit} />

        {isEditMode && (
          <View style={styles.deleteButtonContainer}>
            <CustomButton title="Delete Event" onPress={onDelete} type="danger" />
          </View>
        )}
      </View>
    </ScreenWrapper>
  )
}

const CalendarEventFormScreen = () => {
  const route = useRoute<CalendarEventFormRoute>()
  const { data: event, isLoading } = useGetEventByIdQuery(route.params?.eventId!, {
    skip: !route.params?.eventId,
  })

  if (isLoading) {
    return (
      <ScreenWrapper>
        <ActivityIndicator />
      </ScreenWrapper>
    )
  }

  return <Screen event={event} />
}

export default CalendarEventFormScreen
