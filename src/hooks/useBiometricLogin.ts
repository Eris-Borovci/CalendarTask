import { useCallback, useEffect, useRef, useState } from 'react'
import ReactNativeBiometrics, { BiometryType } from 'react-native-biometrics'
import { StorageKeys } from '~/enums/storageKey'
import { useSignInWithSavedTokenMutation } from '~/store/api/slices/userApiSlice'
import { StoredToken } from '~/types/storage'
import StorageUtility from '~/utils/StorageUtility'

const rnBiometrics = new ReactNativeBiometrics()
const biometricSignInErrorMessage = 'Unable to sign in. Try again.'

const useBiometricLogin = () => {
  const [canUseBiometrics, setCanUseBiometrics] = useState(false)
  const isFirstTime = useRef(true)
  const [biometryType, setBiometryType] = useState<BiometryType>()
  const [error, setError] = useState('')
  const [signInWithSavedToken] = useSignInWithSavedTokenMutation()

  const handleBiometricSignIn = useCallback(async () => {
    try {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Sign in with biometrics',
        cancelButtonText: 'Cancel',
      })

      if (!success) {
        return
      }

      await signInWithSavedToken().unwrap()
    } catch {
      setError(biometricSignInErrorMessage)
    }
  }, [signInWithSavedToken])

  useEffect(() => {
    const checkSavedSession = async () => {
      try {
        if (!isFirstTime.current) {
          return
        }

        isFirstTime.current = false

        const storedToken = await StorageUtility.getItem<StoredToken>(StorageKeys.Token)

        if (!storedToken?.token) {
          return
        }

        const { available, biometryType: availableBiometryType } =
          await rnBiometrics.isSensorAvailable()

        if (!available) {
          return
        }

        setBiometryType(availableBiometryType)
        setCanUseBiometrics(true)

        await handleBiometricSignIn()
      } catch {
        setError(biometricSignInErrorMessage)
      }
    }

    checkSavedSession()
  }, [handleBiometricSignIn])

  return {
    canUseBiometrics,
    biometryType,
    error,
    handleBiometricSignIn,
  }
}

export default useBiometricLogin
