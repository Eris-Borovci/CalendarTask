import { createStackNavigator } from '@react-navigation/stack'
import { NavigationModals } from '~/enums/navigation'
import CalendarEventFormScreen from '~/screens/CalendarEventForm/CalendarEventFormScreen'

export type CalendarNavigationParamList = {
  [NavigationModals.CalendarEventForm]: { eventId?: string } | undefined
};

const Stack = createStackNavigator<CalendarNavigationParamList>()

const CalendarNavigation = () => {
  return (
    <Stack.Group screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={NavigationModals.CalendarEventForm}
        component={CalendarEventFormScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Group>
  )
}

export default CalendarNavigation
