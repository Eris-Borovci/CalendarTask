import AsyncStorage from '@react-native-async-storage/async-storage'

class StorageUtility {
  static async getItem<T>(key: string): Promise<T | null> {
    const value = await AsyncStorage.getItem(key)

    if (!value) {
      return null
    }

    try {
      return JSON.parse(value) as T
    } catch {
      return null
    }
  };

  static async setItem<T>(key: string, value: T) {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  };

  static async removeItem(key: string) {
    await AsyncStorage.removeItem(key)
  };
}

export default StorageUtility
