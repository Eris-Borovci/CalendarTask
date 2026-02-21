import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IconProps } from "./types/icon"
import { useTheme } from "@react-navigation/native"

const BackIcon = (props: IconProps) => {
    const { colors } = useTheme()
    const { width = 24, height = 24, color = colors.secondary } = props

    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 1024 1024"
        >
            <Path fill={color} d="M224 480h640a32 32 0 110 64H224a32 32 0 010-64z" />
            <Path fill={color} d="M237.248 512l265.408 265.344a32 32 0 01-45.312 45.312l-288-288a32 32 0 010-45.312l288-288a32 32 0 1145.312 45.312L237.248 512z" />
        </Svg>
    )
}

export default BackIcon
