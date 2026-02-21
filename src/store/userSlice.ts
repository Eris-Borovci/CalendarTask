import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '~/types/user'

type UserState = {
  user?: User
};

const initialState: UserState = {
  user: undefined,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload
    },
    clearUser: (state) => {
      state.user = undefined
    }
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
