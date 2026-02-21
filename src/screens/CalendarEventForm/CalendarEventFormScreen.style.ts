import { StyleSheet } from 'react-native'
import { ThemeColors } from '~/styles/theme'

export default (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 24,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 24,
      fontWeight: 700,
      color: colors.secondary,
    },
    saveText: {
      fontSize: 16,
      fontWeight: 600,
      color: colors.primary,
    },
    saveTextDisabled: {
      color: colors.gray[100],
    },
    formContainer: {
      marginTop: 24,
      gap: 20,
    },
    dateFieldContainer: {
      gap: 8,
    },
    dateLabel: {
      fontSize: 16,
      fontWeight: 500,
      color: colors.secondary,
    },
    errorText: {
      fontSize: 14,
      color: colors.red,
    },
    deleteButtonContainer: {
      marginTop: 'auto',
    },
  })
