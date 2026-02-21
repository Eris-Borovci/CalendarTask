import Svg, { Path } from "react-native-svg"
import { IconProps } from "./types/icon"
import { useTheme } from "@react-navigation/native"

const CloseIcon = (props: IconProps) => {
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.207 6.207a1 1 0 00-1.414-1.414L12 10.586 6.207 4.793a1 1 0 00-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 101.414 1.414L12 13.414l5.793 5.793a1 1 0 001.414-1.414L13.414 12l5.793-5.793z"
                fill={color}
            />
        </Svg>
    )
}

export default CloseIcon
