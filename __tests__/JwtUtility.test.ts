import { decode, sign } from 'react-native-pure-jwt'
import JwtUtility from '~/utils/JwtUtility'

jest.mock('react-native-pure-jwt', () => ({
  sign: jest.fn(),
  decode: jest.fn(),
}))

const mockedSign = sign as jest.Mock
const mockedDecode = decode as jest.Mock

describe('JwtUtility', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('signs payload and sets expiration', async () => {
    mockedSign.mockResolvedValueOnce('signed-token')

    const result = await JwtUtility.signJwt({
      id: 'user-1',
      email: 'user@test.com',
    })

    expect(result).toBe('signed-token')
    expect(mockedSign).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'user-1',
        email: 'user@test.com',
        exp: expect.any(Number),
      }),
      'secret',
      { alg: 'HS256' },
    )
  })

  it('decodes token using expected secret', async () => {
    mockedDecode.mockResolvedValueOnce({ payload: { id: 'user-1' } })

    const result = await JwtUtility.decodeJwt('token-123')

    expect(result).toEqual({ payload: { id: 'user-1' } })
    expect(mockedDecode).toHaveBeenCalledWith('token-123', 'secret')
  })
})
