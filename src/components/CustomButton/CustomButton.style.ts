import { DimensionValue, StyleSheet } from 'react-native'
import { ThemeColors } from '../../styles/theme'
import { ButtonSize, ButtonType } from './CustomButton'

export default (colors: ThemeColors, type: ButtonType, size: ButtonSize) =>
  StyleSheet.create({
    button: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 14,
      height: 48,
      flexDirection: 'row',
      gap: 12,
      justifyContent: 'center',
      alignItems: 'center',
      ...buttonStyles(colors)[type],
      ...buttonSizes[size],
    },
    text: {
      fontSize: 16,
      fontWeight: 600,
      ...buttonTextStyles(colors)[type],
    },
  })

type ButtonStyle = {
  backgroundColor: string;
  borderColor?: string;
  borderWidth?: number;
};

const buttonStyles = (
  colors: ThemeColors,
): Record<ButtonType, ButtonStyle> => ({
  primary: {
    backgroundColor: colors.primary,
  },
  danger: {
    borderColor: colors.red,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  outlined: {
    backgroundColor: 'transparent',
    borderColor: colors.gray[50],
    borderWidth: 1,
  },
})

type ButtonTextStyle = {
  color: string;
};

const buttonTextStyles = (
  colors: ThemeColors,
): Record<ButtonType, ButtonTextStyle> => ({
  primary: {
    color: colors.white,
  },
  danger: {
    color: colors.red,
  },
  outlined: {
    color: colors.secondary,
  },
})

type ButtonSizeStyle = {
  width: DimensionValue;
  alignSelf?: 'flex-start'
};

const buttonSizes: Record<ButtonSize, ButtonSizeStyle> = {
  normal: {
    width: '100%',
  },
  small: {
    alignSelf: 'flex-start',
    width: 'auto',
  },
}
