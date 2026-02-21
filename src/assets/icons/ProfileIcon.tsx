import { useTheme } from '@react-navigation/native'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './types/icon'

const ProfileIcon = (props: IconProps) => {
  const { colors } = useTheme()
  const { width = 24, height = 24, color = colors.white } = props

  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 21a8 8 0 00-16 0M12 13a5 5 0 100-10 5 5 0 000 10z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default ProfileIcon
