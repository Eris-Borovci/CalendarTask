import { Text, TouchableOpacity } from "react-native"
import { useTheme } from "@react-navigation/native"
import makeStyles from "./CustomButton.style"

export type ButtonType = 'primary' | 'outlined'

type Props = {
    title: string
    onPress: () => void
    type?: ButtonType
}

const CustomButton = ({ title, onPress, type = 'primary' }: Props) => {
    const { colors } = useTheme()
    const styles = makeStyles(colors, type)

    return (
        <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton