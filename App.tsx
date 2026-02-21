import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import RootNavigation from '~/navigations/RootNavigation'
import { store } from '~/store'

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootNavigation />
      </SafeAreaProvider>
    </Provider>
  )
}

export default App
