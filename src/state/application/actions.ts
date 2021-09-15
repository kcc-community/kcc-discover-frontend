import { createAction } from '@reduxjs/toolkit'
import { ProjectProps } from '../../hooks/useAccount'

export const updateCategoryLoading = createAction<{
  cateLoading: boolean
}>('app/updateCategoryLoading')

export const updateCategoryPrimary = createAction<{
  categoryPrimary: any[]
}>('app/updateCategoryPrimary')

export const updateCategorySubtle= createAction<{
  categorySubtle: any[]
}>('app/updateCategorySubtle')

export const updateProjectLoading = createAction<{
  projectLoading: boolean
}>('app/updateProjectLoading')

export const updateProjectInfo = createAction<{
  projectInfo: ProjectProps
}>('app/updateProjectInfo')

export const updateTransactionInfo = createAction<{
  transactionInfo: any[]
}>('app/updateTransactionInfo')

export const updateTransactionLoading = createAction<{
  transactionLoading: boolean
}>('app/updateTransactionLoading')