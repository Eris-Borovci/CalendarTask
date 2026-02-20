import { StyleSheet } from "react-native";
import { ThemeColors } from "~/styles/theme";

export default (colors: ThemeColors) => StyleSheet.create({
    container: {
        gap: 6,
    },
    label: {
        fontSize: 16,
        fontWeight: 500,
        color: colors.secondary,
    },
    input: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.gray[20],
        borderWidth: 1,
        borderColor: colors.gray[50],
        width: '100%',
        height: 48,
        borderRadius: 14
    },
    errorText: {
        color: colors.red,
        fontSize: 14,
        marginTop: 4,
        fontWeight: 500
    }
})
