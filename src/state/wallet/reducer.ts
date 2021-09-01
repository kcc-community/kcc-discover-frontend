import {createReducer} from '@reduxjs/toolkit'
import {updateBalance} from './actions'

export interface WalletState {
    balance: string
    walletId: number
}

const initialState: WalletState = {
    balance: '',
    walletId: 0
}

export default createReducer(initialState, (builder) =>
    builder
      .addCase(updateBalance, (state, action) => {
      const {balance} = action.payload
      state.balance = balance
      })
)
