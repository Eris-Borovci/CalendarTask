import { StyleSheet } from "react-native";
import { ThemeColors } from "../../styles/theme";
import { ButtonType } from "./CustomButton";

export default (colors: ThemeColors, type: ButtonType) => StyleSheet.create({
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 14,
        width: '100%',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        ...buttonStyles(colors)[type]
    },
    text: {
        fontSize: 16,
        fontWeight: 600,
        ...buttonTextStyles(colors)[type]
    }
})

type ButtonStyle = {
    backgroundColor: string
    borderColor?: string
    borderWidth?: number
}

const buttonStyles = (colors: ThemeColors): Record<ButtonType, ButtonStyle> => ({
    primary: {
        backgroundColor: colors.primary
    },
    outlined: {
        backgroundColor: 'transparent',
        borderColor: colors.gray[50],
        borderWidth: 1
    }
})

type ButtonTextStyle = {
    color: string
}

const buttonTextStyles = (colors: ThemeColors): Record<ButtonType, ButtonTextStyle> => ({
    primary: {
        color: colors.white
    },
    outlined: {
        color: colors.secondary
    }
})