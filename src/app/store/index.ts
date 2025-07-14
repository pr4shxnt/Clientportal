import { configureStore } from '@reduxjs/toolkit'
import clientReducer from './slices/clientSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: clientReducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']