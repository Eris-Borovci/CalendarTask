import AsyncStorage from '@react-native-async-storage/async-storage'
import StorageUtility from '~/utils/StorageUtility'

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}))

const mockedAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>

describe('StorageUtility', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns parsed item from storage', async () => {
    mockedAsyncStorage.getItem.mockResolvedValueOnce('{"id":1}')

    const result = await StorageUtility.getItem<{ id: number }>('key')

    expect(result).toEqual({ id: 1 })
    expect(mockedAsyncStorage.getItem).toHaveBeenCalledWith('key')
  })

  it('returns null when value does not exist', async () => {
    mockedAsyncStorage.getItem.mockResolvedValueOnce(null)

    const result = await StorageUtility.getItem('missing')

    expect(result).toBeNull()
  })

  it('returns null when stored value is not valid JSON', async () => {
    mockedAsyncStorage.getItem.mockResolvedValueOnce('invalid-json')

    const result = await StorageUtility.getItem('broken')

    expect(result).toBeNull()
  })

  it('stores JSON stringified value', async () => {
    const payload = { email: 'user@test.com' }

    await StorageUtility.setItem('user', payload)

    expect(mockedAsyncStorage.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify(payload),
    )
  })

  it('removes item by key', async () => {
    await StorageUtility.removeItem('token')

    expect(mockedAsyncStorage.removeItem).toHaveBeenCalledWith('token')
  })
})
