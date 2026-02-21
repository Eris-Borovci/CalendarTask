import { StyleSheet } from 'react-native'

export default (topInset: number, bottomInset: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: topInset + 20,
      paddingBottom: bottomInset + 20,
    },
  })
