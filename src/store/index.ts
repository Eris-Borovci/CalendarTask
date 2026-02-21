import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import calendarReducer from './calendarSlice'
import { apiSlice } from './api'

export const store = configureStore({
  reducer: {
    userStore: userReducer,
    calendar: calendarReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
