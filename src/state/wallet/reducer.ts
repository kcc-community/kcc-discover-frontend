import {createReducer} from '@reduxjs/toolkit'
import {updateBalance, updateChainError, updateKCSPrice, updateCategoryPrimary, updateCategorySubtle} from './actions'

export interface WalletState {
    balance: string
    walletId: number
    chainError: string
    price: number
    categoryPrimary: any[]
    categorySubtle: any[]
}

const initialState: WalletState = {
    balance: '',
    walletId: 0,
    chainError: '',
    price: 0,
    categoryPrimary: [],
    categorySubtle: [],
}

export default createReducer(initialState, (builder) =>
    builder
      .addCase(updateBalance, (state, action) => {
        const {balance} = action.payload
        state.balance = balance
      })
      .addCase(updateChainError, (state, action) => {
        const {chainError} = action.payload
        state.chainError = chainError
      })
      .addCase(updateKCSPrice, (state, action) => {
        const {price} = action.payload
        state.price = price
      })
      .addCase(updateCategoryPrimary, (state, action) => {
        const {categoryPrimary} = action.payload
        state.categoryPrimary = categoryPrimary
      })
      .addCase(updateCategorySubtle, (state, action) => {
        const {categorySubtle} = action.payload
        state.categorySubtle = categorySubtle
      })
)
