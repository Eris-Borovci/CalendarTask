import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CalendarIcon from '~/assets/icons/CalendarIcon'
import ProfileIcon from '~/assets/icons/ProfileIcon'
import { NavigationScreens } from '~/enums/navigation'
import CalendarScreen from '~/screens/Calendar/CalendarScreen'
import ProfileScreen from '~/screens/Profile/ProfileScreen'

export type BottomTabNavigationParamList = {
  [NavigationScreens.Calendar]: undefined;
  [NavigationScreens.Profile]: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabNavigationParamList>()


const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator screenOptions={{ headerShown: false }}>
      <BottomTab.Screen
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <CalendarIcon color={color} width={size} height={size} />
          )
        }}
        name={NavigationScreens.Calendar}
        component={CalendarScreen}
      />
      <BottomTab.Screen
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <ProfileIcon color={color} width={size} height={size} />
          )
        }}
        name={NavigationScreens.Profile}
        component={ProfileScreen}
      />
    </BottomTab.Navigator>
  )
}

export default BottomTabNavigation
