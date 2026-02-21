
import { createStackNavigator } from "@react-navigation/stack"
import InitialScreen from "../../screens/InitialScreen/InitialScreen"
import { NavigationScreens } from "../../enums/navigation"
import SignInScreen from "../../screens/SignIn/SignInScreen"
import SignUpScreen from "../../screens/SignUp/SignUpScreen"

export type AuthNavigationParamList = {
    [NavigationScreens.Initial]: undefined
    [NavigationScreens.SignIn]: undefined
    [NavigationScreens.SignUp]: undefined
}

const Stack = createStackNavigator<AuthNavigationParamList>()

const AuthNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NavigationScreens.Initial} component={InitialScreen} />
            <Stack.Screen name={NavigationScreens.SignIn} component={SignInScreen} />
            <Stack.Screen name={NavigationScreens.SignUp} component={SignUpScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigation
