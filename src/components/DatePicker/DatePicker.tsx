import { useTheme } from "@react-navigation/native"
import { Control, FieldValues, Path, useController } from "react-hook-form"
import makeStyles from "./DatePicker.style"
import { Pressable, Text, View } from "react-native"
import { useState } from "react"
import RNDatePicker from 'react-native-date-picker'
import dayjs from "dayjs"

type Props<T extends FieldValues> = {
    control: Control<T>
    name: Path<T>
    placeholder: string
    label: string
    minimumDate?: Date | undefined
    maximumDate?: Date | undefined
}

const DatePicker = <T extends FieldValues>({
    control,
    name,
    placeholder,
    label,
    ...rest
}: Props<T>) => {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    const { colors } = useTheme()
    const { field: { onChange, value } } = useController({
        control,
        name
    })

    const styles = makeStyles(colors)

    const formattedValue = value ? dayjs(value).format('ddd, MMM D YYYY, HH:mm') : placeholder

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Pressable style={styles.button} onPress={() => setIsDatePickerOpen(true)}>
                <Text>{formattedValue}</Text>
            </Pressable>

            <RNDatePicker
                modal
                mode="datetime"
                open={isDatePickerOpen}
                date={value}
                onConfirm={onChange}
                onCancel={() => setIsDatePickerOpen(false)}
                {...rest}
            />
        </View>
    )
}

export default DatePicker
