import { useMemo, useEffect, useState, useRef } from 'react'
import { ApiService, useLoading } from '../api'
import { useDispatch } from 'react-redux';
import { updateProjectLoading, updateTransactionLoading, updateProjectInfo, updateTransactionInfo } from '../state/application/actions';

interface ProjectInfoProps {
  margin: string | number 
  owner: string 
  logo: string 
  title: string
  name?: string
}

interface CommentProps {
  total: number 
  list: Object[]
}

export interface ProjectProps{
  state: string
  info: ProjectInfoProps
}

export function useAccountInfo(account?: string | undefined | null, chainId?: number | undefined){
  const [reviewLoading, getReviewList] = useLoading(ApiService.getDappReviwer)
  const [transLoading, getTransList] = useLoading(ApiService.getAccountTransaction)
  const [projectLoading, getProjectList] = useLoading(ApiService.getAccountProject)

  const [projectInfo, setProject] = useState<{ 
    state: string
    info: ProjectInfoProps }>({state: 'None', info: {margin: '', owner: '', logo: '', title: ''}})
  const [transList, setTrans] = useState([])
  const [reviewList, setReviewList] = useState<CommentProps>({total: 0, list: []})
  const filterFirstUpdate = useRef(true)
  const dispatch = useDispatch()

  useEffect(() => {
    if (filterFirstUpdate.current) { filterFirstUpdate.current = false; return; }
    if(account) getAccountInfo(true);
    // const timer = setInterval(() => {
    //   if(account) getAccountInfo(false);
    // }, 45000)
    return(() => {
      // clearInterval(timer);
    })
  }, [account, chainId])

  const getAccountInfo = (isFirstPost: boolean) => {
    Promise.all([
      getReviewList({ page: 1, limit: 3, reviewer: account}),
      getProjectList(account),
      getTransList(account),
    ]).then((res: any) => {
      setReviewList(res[0])
      setProject(res[1])
      //@ts-ignore
      setTrans(Array.isArray(res[2]) ? res[2] : [])
      dispatch(updateProjectInfo({projectInfo: res[1]}))
      //@ts-ignore
      dispatch(updateTransactionInfo({transactionInfo: Array.isArray(res[2]) ? res[2] : []}))
      if(isFirstPost){
        dispatch(updateProjectLoading({projectLoading: false}))
        dispatch(updateTransactionLoading({transactionLoading: false}))
      }
    })
  }

  return useMemo(
    () => ({
      transaction: transList, 
      review: reviewList, 
      project: projectInfo,
      reviewLoading, transLoading, projectLoading
    }),
    [account, chainId, transList, reviewList, projectInfo]
  ) 

}

export default useAccountInfo