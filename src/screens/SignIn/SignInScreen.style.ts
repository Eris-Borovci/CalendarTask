
import { StyleSheet } from "react-native";
import { ThemeColors } from "~/styles/theme";

export default (colors: ThemeColors) => StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        gap: 24,
    },
    headerContainer: {
        gap: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 700,
        color: colors.secondary,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.gray[100],
    },
    formContainer: {
        marginTop: 32,
        gap: 20,
    },
    footerText: {
        textAlign: "center",
        fontSize: 14,
        color: colors.gray[100],
    },
    footerLink: {
        color: colors.primary,
        fontWeight: "600",
    },
})
