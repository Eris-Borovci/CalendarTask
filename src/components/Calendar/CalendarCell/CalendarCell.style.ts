import { StyleSheet } from 'react-native'
import { ThemeColors } from '~/styles/theme'

export default (colors: ThemeColors) => StyleSheet.create({
  container: {
    justifyContent: 'center',
    borderRadius: 999,
    height: '100%',
  },
  anotherMonth: {
    opacity: 0.6,
  },
  text: {
    textAlign: 'center',
    color: colors.secondary,
  },
})
