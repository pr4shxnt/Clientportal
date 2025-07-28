import { configureStore } from '@reduxjs/toolkit'
import clientReducer from './slices/clientSlice'
import projectReducer from './slices/clientProjectSlice'
import chatReducer from './slices/chatSlice'


export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: clientReducer,
      projects: projectReducer,
      chat: chatReducer,
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']