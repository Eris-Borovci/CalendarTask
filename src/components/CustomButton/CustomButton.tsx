import { Text, TouchableOpacity, ViewStyle } from 'react-native'
import { useTheme } from '@react-navigation/native'
import makeStyles from './CustomButton.style'
import { PropsWithChildren } from 'react'

export type ButtonType = 'primary' | 'outlined' | 'danger';
export type ButtonSize = 'normal' | 'small';

type Props = {
  title?: string;
  onPress: () => void;
  type?: ButtonType;
  size?: ButtonSize;
  style?: ViewStyle
} & PropsWithChildren;

const CustomButton = ({
  title,
  onPress,
  type = 'primary',
  size = 'normal',
  children,
  style
}: Props) => {
  const { colors } = useTheme()
  const styles = makeStyles(colors, type, size)

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      activeOpacity={0.8}
    >
      {
        title && <Text style={styles.text}>{title}</Text>
      }
      {
        children
      }
    </TouchableOpacity>
  )
}

export default CustomButton
