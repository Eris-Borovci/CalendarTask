import Svg, { Path } from "react-native-svg"
import { IconProps } from "./types/icon"
import { useTheme } from "@react-navigation/native"

const PlusIcon = (props: IconProps) => {
    const { colors } = useTheme()
    const { width = 24, height = 24, color = colors.white } = props

    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            {...props}
        >
            <Path
                d="M4 12h16m-8-8v16"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default PlusIcon
