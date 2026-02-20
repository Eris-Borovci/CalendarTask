import { Theme } from "./styles/theme";

declare module '@react-navigation/native' {
    export function useTheme(): typeof Theme
}