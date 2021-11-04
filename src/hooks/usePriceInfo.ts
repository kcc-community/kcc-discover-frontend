import { useMemo, useEffect, useState } from 'react'
import { ApiService, useLoading } from '../api'
import { useDispatch } from 'react-redux'
import { updateKCSPrice } from '../state/wallet/actions'

interface PriceProps {
  addressCount: string
  avgGasPrice: string 
  txCount: number | string
  txCount24H: number | string 
  priceUsd: string
}

export function usePriceInfo(account?: string | null | undefined){
  const [priceLoading, getPriceInfo] = useLoading(ApiService.getHomePriceInfo);
  const [priceInfo, setPriceInfo] = useState<PriceProps>({avgGasPrice: '0', addressCount: '0', txCount: 0, priceUsd: '0', txCount24H: 0})
  const dispatch = useDispatch();

  useEffect(() => {
    getPriceInfo().then((res: any) => {
      setPriceInfo(res)
      dispatch(updateKCSPrice({price: Number(res.priceUsd ?? 0)}))
    })
  }, [])

  return useMemo(
    () => (priceInfo),
    [priceInfo, priceLoading]
  ) 
}

export default usePriceInfo