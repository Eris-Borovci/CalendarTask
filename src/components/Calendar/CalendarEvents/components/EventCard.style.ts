import { StyleSheet } from "react-native"
import { ThemeColors } from "~/styles/theme"

export default (colors: ThemeColors) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 12,
        padding: 12,
        borderRadius: 14,
        backgroundColor: colors.cyan
    },
    leftLine: {
        width: 4,
        height: '100%',
        borderRadius: 999,
        backgroundColor: colors.primary
    },
    infoContainer: {
        gap: 4
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.secondary
    },
    time: {
        fontSize: 12,
        color: colors.gray[100]
    }
})