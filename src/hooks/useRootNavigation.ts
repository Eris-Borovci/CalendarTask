import { useNavigation } from "@react-navigation/native";
import { RootNavigationParamList } from "../navigations/RootNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { NavigationScreens } from "../enums/navigation";

export type RootNavigation<S extends keyof RootNavigationParamList> = StackNavigationProp<RootNavigationParamList, S>

const useRootNavigation = useNavigation<RootNavigation<NavigationScreens.Initial>>

export default useRootNavigation