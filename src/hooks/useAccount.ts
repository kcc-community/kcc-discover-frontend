import { useMemo, useEffect, useState } from 'react'
import { ApiService, useLoading } from '../api'

interface ProjectProps {
  margin: string | number 
  owner: string 
  logo: string 
  title: string
}

export function useAccountInfo(account?: string | undefined | null, chainId?: number | undefined){
  const [reviewLoading, getReviewList] = useLoading(ApiService.getDappReviwer)
  const [transLoading, getTransList] = useLoading(ApiService.getAccountTransaction)
  const [projectLoading, getProjectList] = useLoading(ApiService.getAccountProject)

  const [projectInfo, setProject] = useState<{ 
    state: string
    info: ProjectProps }>({state: 'None', info: {margin: '', owner: '', logo: '', title: ''}})
  const [transList, setTrans] = useState([])
  const [reviewList, setReviewList] = useState({})

  useEffect(() => {
    Promise.all([
      getReviewList({ page: 1, limit: 3, reviewer: account}),
      getProjectList(account),
      getTransList(account),
    ]).then((res: any) => {
      setReviewList(res[0])
      setProject(res[1])
      //@ts-ignore
      setTrans(Array.isArray(res[2]) ? res[2] : [])
    })
  }, [account, chainId])

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