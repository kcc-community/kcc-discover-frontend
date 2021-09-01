import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import wallet from './wallet/reducer'
import multicall from './multicall/reducer'

type ModuleTypes = 'wallet' | 'multicall'

type MergedState = {
  [key in ModuleTypes]: {
    [key: string]: any
  }
}

const store = configureStore({
  reducer: {
    wallet,
    multicall
  },
})

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<any>()
