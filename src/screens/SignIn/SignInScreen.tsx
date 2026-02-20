import { zodResolver } from "@hookform/resolvers/zod"
import { useTheme } from "@react-navigation/native"
import { useForm } from "react-hook-form"
import { Pressable, Text, View } from "react-native"
import CustomInput from "~/components/CustomInput/CustomInput"
import { signInSchema } from "~/schemas/signInSchema"
import ScreenWrapper from "~/components/ScreenWrapper/ScreenWrapper"
import CustomButton from "~/components/CustomButton/CustomButton"
import makeStyles from "./SignInScreen.style"
import useRootNavigation from "~/hooks/useRootNavigation"
import { NavigationScreens } from "~/enums/navigation"

type SignInForm = {
    email: string
    password: string
}

const SignInScreen = () => {
    const { colors } = useTheme()
    const styles = makeStyles(colors)
    const navigation = useRootNavigation()

    const { control, handleSubmit } = useForm<SignInForm>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(signInSchema)
    })

    const onSubmit = handleSubmit(() => { })

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Welcome back</Text>
                    <Text style={styles.subtitle}>Sign in to your account to continue</Text>
                </View>

                <View style={styles.formContainer}>
                    <CustomInput control={control} name="email" placeholder="you@example.com" label="Email" />
                    <CustomInput control={control} name="password" placeholder="Enter your password" label="Password" />
                </View>

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
