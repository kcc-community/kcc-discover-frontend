import { useSelector } from 'react-redux'
import { AppState } from '../index'
import { ProjectProps } from '../../hooks/useAccount'

export function useProjectLoading(): boolean {
  return useSelector((state: AppState) => {
    return state.application.projectLoading
  }) 
}

export function useTransactionLoading(): boolean {
  return useSelector((state: AppState) => {
    return state.application.transactionLoading
  }) 
}

export function useCategoryLoading(): boolean {
  return useSelector((state: AppState) => {
    return state.application.categoryLoading
  }) 
}

export function useCategoryPrimary(): any[] {
  return useSelector((state: AppState) => {
    return state.application.categoryPrimary
  }) 
}

export function useCategorySubtle(): any[] {
  return useSelector((state: AppState) => {
    return state.application.categorySubtle
  }) 
}

export function useTransactionInfo(): any[] {
  return useSelector((state: AppState) => {
    return state.application.transactionInfo
  }) 
}

export function useProjectInfo(): ProjectProps {
  return useSelector((state: AppState) => {
    return state.application.projectInfo
  }) 
}
