
import { DefaultTheme } from "@react-navigation/native";

export const Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#FFFFFF',
        white: '#FFFFFF',
        primary: '#0062FB',
        secondary: '#141414',
        red: '#FB2B37',
        gray: {
            100: '#767676',
            50: '#E5E5E5',
            20: '#FAFAFA'
        }
    },
};

export type ThemeColors = typeof Theme.colors