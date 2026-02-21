import { PropsWithChildren } from 'react'
import { View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import makeStyles from './ScreenWrapper.style'

type Props = {
  customStyle?: ViewStyle;
} & PropsWithChildren;

const ScreenWrapper = ({ children, customStyle }: Props) => {
  const { top, bottom } = useSafeAreaInsets()
  const styles = makeStyles(top, bottom)

  return <View style={[styles.container, customStyle]}>{children}</View>
}

export default ScreenWrapper
