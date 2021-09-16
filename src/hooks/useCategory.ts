import { useMemo, useEffect, useState } from 'react'
import { ApiService, useLoading } from '../api'
import { useDispatch } from 'react-redux'
import { updateCategoryPrimary, updateCategorySubtle, updateCategoryLoading } from '../state/application/actions'

interface CategoryProps {
  id?: number 
  name: string 
  nums: number
  index?: number
}

export function useCategory(){
  const [cateLoading, getCategory] = useLoading(ApiService.getDappCategory);
  const dispatch = useDispatch();
  const [primaryList, setPList] = useState<CategoryProps[]>([{ name: 'All', nums: 0 }])
  const [subList, setSList] = useState<CategoryProps[]>([{ name: 'All', nums: 0 }])

  useEffect(() => {
    getCategory().then((res: any) => {
      let primary: CategoryProps[] = [{ name: 'All', nums: res?.total }],
        sub: CategoryProps[] = [{ name: 'All', nums: res?.total }];
      let primaryTotal: number = 0, subTotal: number = 0;
      for (let item of res) {
        if (item?.level === 1) {
          primary.push(item)
          primaryTotal += item.nums;
        }
        if (item?.level === 2) {
          sub.push(item)
          subTotal += item.nums;
        }
      }
      sub.sort((prev, next) => {return next.nums - prev.nums })
      primary[0].nums = primaryTotal
      sub[0].nums = subTotal
      setPList(primary as any)
      setSList(sub as any)
      dispatch(updateCategoryLoading({ cateLoading }))
      dispatch(updateCategoryPrimary({ categoryPrimary: primary }))
      dispatch(updateCategorySubtle({ categorySubtle: sub }))
    })
  }, [])

  return useMemo(
    () => ({
      primaryList, subList, cateLoading
    }),
    [primaryList, subList]
  ) 
}

export default useCategory