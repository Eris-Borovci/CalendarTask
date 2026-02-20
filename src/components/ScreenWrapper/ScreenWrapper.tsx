import { PropsWithChildren } from "react"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const ScreenWrapper = ({ children }: PropsWithChildren) => {
    const { top, bottom } = useSafeAreaInsets()

    return (
        <View style={{ flex: 1, paddingTop: top + 20, paddingBottom: bottom + 20 }} >
            {children}
        </View>
    )
}

export default ScreenWrapper