import { StyleSheet } from "react-native"
import { ThemeColors } from "../../styles/theme"

export default (colors: ThemeColors) => StyleSheet.create({
    container: {
        gap: 16,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.secondary,
        marginBottom: 8
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20
    },
    addButton: {
        borderRadius: 999,
        aspectRatio: 1 / 1
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: 16
    },
    dateInfo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.secondary
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        gap: 8
    }
})