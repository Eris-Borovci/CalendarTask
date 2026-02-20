import { Text, TextInput, View } from "react-native"
import { useTheme } from "@react-navigation/native"
import makeStyles from "./CustomInput.style"
import { Control, FieldValues, Path, useController } from 'react-hook-form'

type Props<T extends FieldValues> = {
    control: Control<T>
    name: Path<T>
    placeholder: string
    label: string
}

const CustomInput = <T extends FieldValues>({ control, name, placeholder, label }: Props<T>) => {
    const { colors } = useTheme()
    const styles = makeStyles(colors)
    const { field: { onChange, ...rest }, fieldState: { error } } = useController({
        control,
        name,
    })

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input} placeholder={placeholder} onChangeText={onChange} {...rest} autoComplete="off" />
            {
                error?.message && <Text style={styles.errorText}>{error?.message}</Text>
            }
        </View>
    )
}

export default CustomInput
