import { useTheme } from '@react-navigation/native'
import Svg, { Circle, Path } from 'react-native-svg'
import { IconProps } from './types/icon'

const EyeOffIcon = (props: IconProps) => {
  const { colors } = useTheme()
  const { width = 24, height = 24, color = colors.secondary } = props

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={12} r={3} fill={color} />
      <Path
        d="M3 3l18 18"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default EyeOffIcon
