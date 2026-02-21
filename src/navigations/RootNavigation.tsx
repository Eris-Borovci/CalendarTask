import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigation, {
  BottomTabNavigationParamList,
} from './bottomTab/BottomTabNavigation'
import CalendarNavigation, { CalendarNavigationParamList } from './stacks/CalendarNavigation'
import AuthNavigation, {
  AuthNavigationParamList,
} from './stacks/AuthNavigation'
import { useAppSelector } from '~/store/hooks'
import { Theme } from '~/styles/theme'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationStacks } from '~/enums/navigation'

export type RootNavigationParamList = AuthNavigationParamList &
  BottomTabNavigationParamList &
  CalendarNavigationParamList;

const RootNavigation = () => {
  const isAuthenticated = useAppSelector(
    state => state.userStore.user !== undefined,
  )

  return (
    <NavigationContainer theme={Theme}>
      {isAuthenticated ? <ProtectedRoutes /> : <AuthNavigation />}
    </NavigationContainer>
  )
}

const ProtectedStack = createStackNavigator()

const ProtectedRoutes = () => {
  return (
    <ProtectedStack.Navigator screenOptions={{ headerShown: false }}>
      <ProtectedStack.Screen name={NavigationStacks.BottomTab} component={BottomTabNavigation} />
      {CalendarNavigation()}
    </ProtectedStack.Navigator>
  )
}

export default RootNavigation
