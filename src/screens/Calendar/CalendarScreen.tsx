import { useTheme } from '@react-navigation/native'
import { Text, View } from 'react-native'
import CalendarMonth from '~/components/Calendar/CalendarMonth'
import CustomButton from '~/components/CustomButton/CustomButton'
import ScreenWrapper from '~/components/ScreenWrapper/ScreenWrapper'
import { NavigationModals } from '~/enums/navigation'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import makeStyles from './CalendarScreen.style'
import useRootNavigation from '~/hooks/useRootNavigation'
import PlusIcon from '~/assets/icons/PlusIcon'
import CalendarEvents from '~/components/Calendar/CalendarEvents/CalendarEvents'
import CalendarDayView from '~/components/Calendar/CalendarDayView/CalendarDayView'
import { previousMonth, nextMonth, goToToday, previousDay, nextDay, toggleCalendarView } from '~/store/calendarSlice'
import dayjs from 'dayjs'
import CalendarIcon from '~/assets/icons/CalendarIcon'

const CalendarScreen = () => {
  const { colors } = useTheme()
  const navigation = useRootNavigation()
  const styles = makeStyles(colors)
  const calendarView = useAppSelector(state => state.calendar.calendarView)
  const showingDate = useAppSelector(state => state.calendar.showingDate)
  const dispatch = useAppDispatch()

  const onAddEvent = () => {
    navigation.navigate(NavigationModals.CalendarEventForm)
  }

  const handlePrevious = () => {
    if (calendarView === 'day') {
      dispatch(previousDay())
    } else {
      dispatch(previousMonth())
    }
  }

  const handleNext = () => {
    if (calendarView === 'day') {
      dispatch(nextDay())
    } else {
      dispatch(nextMonth())
    }
  }

  const handleGoToToday = () => {
    dispatch(goToToday())
  }

  const handleToggleCalendarView = () => {
    dispatch(toggleCalendarView())
  }

  return (
    <ScreenWrapper customStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Calendar</Text>
        <CustomButton type='outlined' size='small' onPress={handleToggleCalendarView}>
          <CalendarIcon color={colors.secondary} />
        </CustomButton>
      </View>

      <View style={styles.header}>
        <Text style={styles.dateInfo}>{dayjs(showingDate).format('MMMM YYYY')}</Text>
        <View style={styles.row}>
          <CustomButton title="<" onPress={handlePrevious} type='outlined' size='small' />
          <CustomButton title="Today" onPress={handleGoToToday} type='outlined' size='small' />
          <CustomButton title=">" onPress={handleNext} type='outlined' size='small' />
        </View>
      </View>

      {calendarView === 'month' ? <CalendarMonthView /> : <CalendarDayView />}

      <View style={styles.addButtonContainer}>
        <CustomButton onPress={onAddEvent} size='small' style={styles.addButton}>
          <PlusIcon />
        </CustomButton>
      </View>
    </ScreenWrapper>
  )
}

const CalendarMonthView = () => {
  const { colors } = useTheme()
  const styles = makeStyles(colors)

  return (
    <View>
      <CalendarMonth />
      <View style={styles.divider} />
      <CalendarEvents />
    </View>
  )
}

export default CalendarScreen
