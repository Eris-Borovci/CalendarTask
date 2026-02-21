import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from '@react-navigation/native'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Text, View } from 'react-native'
import CustomButton from '~/components/CustomButton/CustomButton'
import CustomInput, { PasswordInput } from '~/components/CustomInput/CustomInput'
import ScreenWrapper from '~/components/ScreenWrapper/ScreenWrapper'
import { NavigationScreens } from '~/enums/navigation'
import useRootNavigation from '~/hooks/useRootNavigation'
import { signUpSchema } from '~/schemas/signUpSchema'
import makeStyles from './SignUpScreen.style'
import BackIcon from '~/assets/icons/BackIcon'
import { useSignUpMutation } from '~/store/api/slices/userApiSlice'

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpScreen = () => {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  const navigation = useRootNavigation()
  const [signUp] = useSignUpMutation()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { control, handleSubmit } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = handleSubmit(async values => {
    try {
      setErrorMessage(null)

      const result = await signUp(values).unwrap()

      if (!result.success) {
        setErrorMessage(result.message ?? 'Unable to create account.')
        return
      }
    } catch {
      Alert.alert('Error', 'Unable to create account. Try again.')
    }
  })

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <CustomButton onPress={() => navigation.goBack()} type='outlined' size='small'>
          <BackIcon />
        </CustomButton>

        <View style={styles.headerContainer}>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>
            Sign up to start managing your calendar
          </Text>
        </View>

        <View style={styles.formContainer}>
          <CustomInput
            control={control}
            name="email"
            placeholder="you@example.com"
            label="Email"
          />
          <PasswordInput
            control={control}
            name="password"
            placeholder="Min 8 characters"
            label="Password"
          />
          <PasswordInput
            control={control}
            name="confirmPassword"
            placeholder="Re-enter your password"
            label="Confirm Password"
          />
        </View>

        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        <CustomButton title="Create Account" onPress={onSubmit} />

        <Text style={styles.footerText}>
          {'Already have an account? '}
          <Text
            style={styles.footerLink}
            onPress={() => navigation.replace(NavigationScreens.SignIn)}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </ScreenWrapper>
  )
}

export default SignUpScreen
