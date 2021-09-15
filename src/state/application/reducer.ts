import {createReducer} from '@reduxjs/toolkit'
import {updateCategoryPrimary, updateCategorySubtle, updateCategoryLoading,
  updateProjectLoading, updateTransactionLoading, updateProjectInfo,
  updateTransactionInfo} from './actions'
import { ProjectProps } from '../../hooks/useAccount'

export interface ApplicationState {
    categoryLoading: boolean
    projectLoading: boolean
    transactionLoading: boolean
    categoryPrimary: any[]
    categorySubtle: any[]
    projectInfo: ProjectProps
    transactionInfo: any[]
}

const initialState: ApplicationState = {
    categoryLoading: true,
    projectLoading: true,
    transactionLoading: true,
    categoryPrimary: [],
    categorySubtle: [],
    projectInfo: {state: 'None', info: {margin: '', owner: '', logo: '', title: ''}},
    transactionInfo: [],
}

export default createReducer(initialState, (builder) =>
    builder
      .addCase(updateProjectLoading, (state, action) => {
        const {projectLoading} = action.payload
        state.projectLoading = projectLoading
      })
      .addCase(updateTransactionLoading, (state, action) => {
        const {transactionLoading} = action.payload
        state.transactionLoading = transactionLoading
      })
      .addCase(updateCategoryLoading, (state, action) => {
        const {cateLoading} = action.payload
        state.categoryLoading = cateLoading
      })
      .addCase(updateCategoryPrimary, (state, action) => {
        const {categoryPrimary} = action.payload
        state.categoryPrimary = categoryPrimary
      })
      .addCase(updateCategorySubtle, (state, action) => {
        const {categorySubtle} = action.payload
        state.categorySubtle = categorySubtle
      })
      .addCase(updateProjectInfo, (state, action) => {
        const {projectInfo} = action.payload
        state.projectInfo = projectInfo
      })
      .addCase(updateTransactionInfo, (state, action) => {
        const {transactionInfo} = action.payload
        state.transactionInfo = transactionInfo
      })
)
