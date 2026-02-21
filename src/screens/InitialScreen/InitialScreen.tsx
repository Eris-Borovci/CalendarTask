import { useTheme } from '@react-navigation/native'
import { Text, View } from 'react-native'
import CalendarIcon from '~/assets/icons/CalendarIcon'
import CustomButton from '~/components/CustomButton/CustomButton'
import { NavigationScreens } from '~/enums/navigation'
import useBiometricLogin from '~/hooks/useBiometricLogin'
import useRootNavigation from '~/hooks/useRootNavigation'
import makeStyles from './InitialScreen.style'
import FaceIdIcon from '~/assets/icons/FaceIdIcon'
import TouchIdIcon from '~/assets/icons/TouchIdIcon'

const InitialScreen = () => {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  const navigation = useRootNavigation()
  const { canUseBiometrics, biometryType, error, handleBiometricSignIn } = useBiometricLogin()

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <CalendarIcon />
      </View>

      <Text style={styles.title}>{'CalendarApp'}</Text>

      <Text style={styles.description}>
        {'Organize your schedule, manage events, and stay on top of your day.'}
      </Text>

      <View style={styles.buttonsContainer}>
        <CustomButton
          title="Get Started"
          onPress={() => navigation.navigate(NavigationScreens.SignUp)}
        />
        <CustomButton
          type="outlined"
          title="Sign In"
          onPress={() => navigation.navigate(NavigationScreens.SignIn)}
        />
        {canUseBiometrics && (
          <CustomButton
            type="outlined"
            title="Sign In with Biometrics"
            onPress={handleBiometricSignIn}
          >
            {
              biometryType === 'FaceID' ? (
                <FaceIdIcon />
              ) : (
                <TouchIdIcon />
              )
            }
          </CustomButton>
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  )
}

export default InitialScreen
