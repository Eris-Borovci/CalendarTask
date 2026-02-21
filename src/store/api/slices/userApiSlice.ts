import uuid from 'react-native-uuid'
import { StorageKeys } from '~/enums/storageKey'
import { Tags } from '~/enums/tags'
import { SignInSchema } from '~/schemas/signInSchema'
import { SignUpSchema } from '~/schemas/signUpSchema'
import StorageUtility from '~/utils/StorageUtility'
import { apiSlice } from '~/store/api'
import { setUser } from '~/store/userSlice'
import { StoredToken, StoredUser } from '~/types/storage'
import JwtUtility from '~/utils/JwtUtility'
import { User } from '~/types/user'

export type AuthResult = {
  success: boolean;
  message?: string;
};

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation<AuthResult, SignUpSchema>({
      queryFn: async ({ email, password }, api) => {
        try {
          const users =
            (await StorageUtility.getItem<StoredUser[]>(StorageKeys.Users)) ??
            []
          const userAlreadyExists = users.some(user => user.email === email)

          if (userAlreadyExists) {
            return {
              data: {
                success: false,
                message: 'User already exists for this email.',
              },
            }
          }

          const id = uuid.v4()
          const storedUsers = [...users, { email, password, id }]
          await StorageUtility.setItem(StorageKeys.Users, storedUsers)

          const token = await JwtUtility.signJwt({ id, email })

          await StorageUtility.setItem<StoredToken>(StorageKeys.Token, {
            token,
          })

          api.dispatch(setUser({ id, email, token }))

          return { data: { success: true } }
        } catch {
          return {
            data: {
              success: false,
              message: 'Unable to create account. Try again.',
            },
          }
        }
      },
      invalidatesTags: [Tags.Users],
    }),
    signIn: builder.mutation<AuthResult, SignInSchema>({
      queryFn: async ({ email, password }, api) => {
        try {
          const users =
            (await StorageUtility.getItem<StoredUser[]>(StorageKeys.Users)) ??
            []
          const userFound = users.find(
            user => user.email === email && user.password === password,
          )

          if (!userFound) {
            return {
              data: {
                success: false,
                message: 'Invalid email or password.',
              },
            }
          }

          const token = await JwtUtility.signJwt({
            id: userFound.id,
            email: userFound.email,
          })

          await StorageUtility.setItem<StoredToken>(StorageKeys.Token, {
            token,
          })

          api.dispatch(
            setUser({ id: userFound.id, email: userFound.email, token }),
          )

          return { data: { success: true } }
        } catch {
          return {
            data: {
              success: false,
              message: 'Unable to sign in. Try again.',
            },
          }
        }
      },
      invalidatesTags: [Tags.Users],
    }),
    signInWithSavedToken: builder.mutation<AuthResult, void>({
      queryFn: async (_, api) => {
        try {
          const tokenFromStorage = await StorageUtility.getItem<StoredToken>(StorageKeys.Token)

          if (!tokenFromStorage?.token) {
            return {
              data: {
                success: false,
                message: 'No saved session found.',
              },
            }
          }

          const decodedToken = await JwtUtility.decodeJwt(
            tokenFromStorage.token,
          )
          const payload = decodedToken.payload as User

          if (!payload.id || !payload.email) {
            return {
              data: {
                success: false,
                message: 'Unable to sign in with saved session. Try manually.',
              },
            }
          }

          api.dispatch(
            setUser({
              id: payload.id,
              email: payload.email,
              token: tokenFromStorage.token,
            }),
          )

          return { data: { success: true } }
        } catch {
          // In case it expired
          StorageUtility.removeItem(StorageKeys.Token)

          return {
            data: {
              success: false,
              message: 'Unable to sign in with saved session. Try manually.',
            },
          }
        }
      },
      invalidatesTags: [Tags.Users],
    }),
  }),
})

export const {
  useSignInMutation,
  useSignUpMutation,
  useSignInWithSavedTokenMutation,
} = userApiSlice

export default userApiSlice
