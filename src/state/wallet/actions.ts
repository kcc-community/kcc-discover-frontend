import { createAction } from '@reduxjs/toolkit'

export const updateBalance = createAction<{
  balance: string
}>('app/updateBalance')