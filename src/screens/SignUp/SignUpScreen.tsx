import { zodResolver } from "@hookform/resolvers/zod"
import { useTheme } from "@react-navigation/native"
import { useForm } from "react-hook-form"
import { Text, View } from "react-native"
import CustomButton from "~/components/CustomButton/CustomButton"
import CustomInput from "~/components/CustomInput/CustomInput"
import ScreenWrapper from "~/components/ScreenWrapper/ScreenWrapper"
import { NavigationScreens } from "~/enums/navigation"
import useRootNavigation from "~/hooks/useRootNavigation"
import { signUpSchema } from "~/schemas/signUpSchema"
import makeStyles from "./SignUpScreen.style"

const SignUpScreen = () => {
    const { colors } = useTheme()
    const styles = makeStyles(colors)
    const navigation = useRootNavigation()

    const { control, handleSubmit } = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        }
    })

    const onSubmit = handleSubmit(() => { })

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Create account</Text>
                    <Text style={styles.subtitle}>Sign up to start managing your calendar</Text>
                </View>

                <View style={styles.formContainer}>
                    <CustomInput control={control} name="email" placeholder="you@example.com" label="Email" />
                    <CustomInput control={control} name="password" placeholder="Min 8 characters" label="Password" />
                    <CustomInput control={control} name="confirmPassword" placeholder="Re-enter your password" label="Confirm Password" />
                </View>

                <CustomButton title="Create Account" onPress={onSubmit} />

                <Text style={styles.footerText}>
                    {"Already have an account? "}
                    <Text style={styles.footerLink} onPress={() => navigation.navigate(NavigationScreens.SignIn)}>
                        Sign In
                    </Text>
                </Text>
            </View>
        </ScreenWrapper>
    )
}

export default SignUpScreen
