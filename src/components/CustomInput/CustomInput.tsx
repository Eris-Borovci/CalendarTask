import { Pressable, Text, TextInput, View } from "react-native"
import { useTheme } from "@react-navigation/native"
import makeStyles from "./CustomInput.style"
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import EyeIcon from "~/assets/icons/EyeIcon"
import { useState } from "react"
import EyeOffIcon from "~/assets/icons/EyeOffIcon"

type Props<T extends FieldValues> = {
    control: Control<T>
    name: Path<T>
    placeholder: string
    label: string
    hide?: boolean
}

const CustomInput = <T extends FieldValues>({ control, name, placeholder, label, hide }: Props<T>) => {
    const { colors } = useTheme()
    const styles = makeStyles(colors)
    const { field: { onChange, ...rest }, fieldState: { error } } = useController({
        control,
        name,
    })

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input} placeholder={placeholder} onChangeText={onChange} {...rest} autoComplete="off" autoCapitalize="none" secureTextEntry={hide} />
            {
                error?.message && <Text style={styles.errorText}>{error?.message}</Text>
            }
        </View>
    )
}

export const PasswordInput = <T extends FieldValues>(props: Props<T>) => {
    const [hide, setHide] = useState<boolean>(true)
    const { colors } = useTheme()
    const styles = makeStyles(colors)

    return (
        <View style={styles.passwordContainer}>
            <CustomInput {...props} hide={hide} />
            <Pressable style={styles.icon} onPress={() => setHide(prev => !prev)}>
                {
                    hide ? <EyeIcon /> : <EyeOffIcon />
                }
            </Pressable>
        </View>
    )
}

export default CustomInput
