import React, { FunctionComponent, useEffect } from 'react'
import styled, { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { ApiService, useLoading } from '../../api'
import { useCurrencyBalances } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks'
import { ETHER } from 'mojito-testnet-sdk'

const HomePage: React.FunctionComponent = (props) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const balance = useCurrencyBalances(account ?? undefined, [ETHER])
  const [loading, getList] = useLoading(ApiService.getPairList);

  useEffect(() => {
    getList().then(res => {

    })
  }, [])

  return (
    <div style={{color: 'white'}}>
      {t(`HOME`)}
      俺有钱了: {balance[0]?.toSignificant(4) || '--'}
    </div>
  )
}

export default HomePage
