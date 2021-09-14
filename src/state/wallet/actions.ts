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

export const updateCategoryPrimary = createAction<{
  categoryPrimary: any[]
}>('app/updateCategoryPrimary')

export const updateCategorySubtle= createAction<{
  categorySubtle: any[]
}>('app/updateCategorySubtle')