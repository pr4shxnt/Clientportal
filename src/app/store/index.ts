import { configureStore } from '@reduxjs/toolkit'
import clientReducer from './slices/clientSlice'
import projectReducer from './slices/clientProjectSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: clientReducer,
      git: projectReducer,
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']