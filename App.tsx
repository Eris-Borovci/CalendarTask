import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthorizationStack from './src/navigations/AuthorizationStack';
import { Theme } from './src/styles/theme';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={Theme}>
        <AuthorizationStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
