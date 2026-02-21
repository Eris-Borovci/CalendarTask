import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from '@react-navigation/native'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Pressable, Text, View } from 'react-native'
import CustomButton from '~/components/CustomButton/CustomButton'
import CustomInput, { PasswordInput } from '~/components/CustomInput/CustomInput'
import { NavigationScreens } from '~/enums/navigation'
import useRootNavigation from '~/hooks/useRootNavigation'
import { signInSchema } from '~/schemas/signInSchema'
import ScreenWrapper from '~/components/ScreenWrapper/ScreenWrapper'
import makeStyles from './SignInScreen.style'
import BackIcon from '~/assets/icons/BackIcon'
import { useSignInMutation } from '~/store/api/slices/userApiSlice'

type SignInForm = {
  email: string;
  password: string;
};

const SignInScreen = () => {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  const navigation = useRootNavigation()
  const [signIn] = useSignInMutation()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { control, handleSubmit } = useForm<SignInForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = handleSubmit(async values => {
    try {
      setErrorMessage(null)

      const result = await signIn(values).unwrap()

      if ('message' in result) {
        setErrorMessage(result.message ?? '')
        return
      }
    } catch {
      Alert.alert('Error', 'Unable to sign in. Try again.')
    }
  })

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <CustomButton onPress={() => navigation.goBack()} type='outlined' size='small'>
          <BackIcon />
        </CustomButton>

        <View style={styles.headerContainer}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Sign in to your account to continue
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
            placeholder="Enter your password"
            label="Password"
          />
        </View>

        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        <CustomButton title="Sign In" onPress={onSubmit} />

        <Pressable onPress={() => navigation.replace(NavigationScreens.SignUp)}>
          <Text style={styles.footerText}>
            {"Don't have an account? "}
            <Text style={styles.footerLink}>Sign Up</Text>
          </Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  )
}

export default SignInScreen
