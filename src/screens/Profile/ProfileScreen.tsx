import { useTheme } from '@react-navigation/native'
import { Text, View } from 'react-native'
import CustomButton from '~/components/CustomButton/CustomButton'
import ScreenWrapper from '~/components/ScreenWrapper/ScreenWrapper'
import { StorageKeys } from '~/enums/storageKey'
import StorageUtility from '~/utils/StorageUtility'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { clearUser } from '~/store/userSlice'
import makeStyles from './ProfileScreen.style'

const ProfileScreen = () => {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  const dispatch = useAppDispatch()
  const email = useAppSelector(state => state.userStore.user?.email)

  const onLogout = async () => {
    await StorageUtility.removeItem(StorageKeys.Token)
    dispatch(clearUser())
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        <View style={styles.logoutButtonContainer}>
          <CustomButton title="Log Out" type="danger" onPress={onLogout} />
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default ProfileScreen
