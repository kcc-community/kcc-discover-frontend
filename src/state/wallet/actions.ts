import { createAction } from '@reduxjs/toolkit'

export const updateBalance = createAction<{
  balance: string
}>('app/updateBalance')

export const updateKCSPrice = createAction<{
  price: number
}>('app/updateKCSPrice')

export const updateChainError = createAction<{
  chainError: string
}>('app/updateChainError')