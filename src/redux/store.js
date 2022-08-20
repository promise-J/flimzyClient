import { configureStore } from '@reduxjs/toolkit'
import appSlice from './appSlice'
import callSlice from './callSlice'
import chatSlice from './chatSlice'
import messageSlice from './messageSlice'
import statusSlice from './statusSlice'
import userSlice from './userSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    app: appSlice,
    chat: chatSlice,
    message: messageSlice,
    status: statusSlice,
    call: callSlice
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})
