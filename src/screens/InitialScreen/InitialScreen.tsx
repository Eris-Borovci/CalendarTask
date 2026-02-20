import { useTheme } from "@react-navigation/native";
import { Text, View } from "react-native";
import makeStyles from "./InitialScreen.style";
import CustomButton from "../../components/CustomButton/CustomButton";
import CalendarIcon from "../../assets/icons/CalendarIcon";
import { NavigationScreens } from "../../enums/navigation";
import useRootNavigation from "../../hooks/useRootNavigation";

const InitialScreen = () => {
    const { colors } = useTheme()
    const styles = makeStyles(colors)
    const navigation = useRootNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <CalendarIcon />
            </View>

            <Text style={styles.title}>
                {'CalendarApp'}
            </Text>

            <Text style={styles.description}>
                {'Organize your schedule, manage events, and stay on top of your day.'}
            </Text>

            <View style={styles.buttonsContainer}>
                <CustomButton title="Get Started" onPress={() => navigation.navigate(NavigationScreens.SignIn)} />
                <CustomButton type="outlined" title="Sign In" onPress={() => navigation.navigate(NavigationScreens.SignUp)} />
            </View>
        </View>
    );
};

export default InitialScreen;
