import { StyleSheet } from 'react-native'
import { ThemeColors } from '../../styles/theme'

export default (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 32,
      gap: 12,
    },
    iconContainer: {
      backgroundColor: colors.primary,
      width: 80,
      height: 80,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
    },
    description: {
      fontSize: 16,
      fontWeight: '400',
      color: colors.gray[100],
      textAlign: 'center',
    },
    buttonsContainer: {
      width: '100%',
      gap: 12,
      marginTop: 48,
    },
    errorText: {
      color: colors.red,
      marginTop: 16,
      textAlign: 'center',
    },
  })
