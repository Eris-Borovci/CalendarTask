import { StyleSheet } from 'react-native'
import { ThemeColors } from '~/styles/theme'

export default (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 24,
      justifyContent: 'space-between',
    },
    content: {
      gap: 8,
    },
    title: {
      fontSize: 24,
      fontWeight: 700,
      color: colors.secondary,
    },
    label: {
      marginTop: 24,
      fontSize: 14,
      fontWeight: '500',
      color: colors.gray[100],
    },
    email: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.secondary,
    },
    logoutButtonContainer: {
      paddingBottom: 12,
    },
  })
