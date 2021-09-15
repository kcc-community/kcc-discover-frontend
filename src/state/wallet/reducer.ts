import {createReducer} from '@reduxjs/toolkit'
import {updateBalance, updateChainError, updateKCSPrice} from './actions'

export interface WalletState {
    balance: string
    walletId: number
    chainError: string
    price: number
}

const initialState: WalletState = {
    balance: '',
    walletId: 0,
    chainError: '',
    price: 0,
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
)
