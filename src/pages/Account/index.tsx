import React, { FunctionComponent, useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { ApiService, useLoading } from '../../api'
import { Container, Text } from '../../style'
import { eyeOpen, eyeClose, edit, copy } from '../../constants/imgs'
import { stateTipsColor } from '../../constants/home'
import Row, { RowBetween } from 'components/Row'
import Col from 'components/Column'
import Empty from 'components/Empty'
import BN from 'bignumber.js'
import { Skeleton, message, Pagination } from 'antd'
import * as LocalStyle from '../../style/pages'
import Copy from 'copy-to-clipboard'
import { ETHER } from 'mojito-testnet-sdk'
import { useHistory } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { useCurrencyBalances } from 'state/wallet/hooks'
import Comment from '../../components/Comment'
import Footer from '../../components/Footer'
import useAccountInfo from '../../hooks/useAccount'
import { useKCSPrice } from '../../state/wallet/hooks'

// todo: 1.api 2.delete refresh 

const AccountPage: React.FunctionComponent = (props) => {
  const theme = useTheme()
  const { account, chainId } = useWeb3React()
  const balance = useCurrencyBalances(account ?? undefined, [ETHER])
  const { t } = useTranslation()
  const [show, setShow] = useState(true)
  const usdtPrice = useKCSPrice();
  const [reviewLoading, getReviewList] = useLoading(ApiService.getDappReviwer)
  const [reviewPage, setReviewPage] = useState(1)
  const [reviewTotal, setReviewTotal] = useState(1)
  const [reviewList, setReviewList] = useState([])

  const [transPage, setTransPage] = useState(1)


  const accountInfo = useAccountInfo(account, chainId);
  const hasProject = accountInfo.project.state === 'None' ? false : true
  const totalValueKcs = balance[0]?.toSignificant(4) ?? '0.00'
  const totalValueUsdt = balance[0]?.toSignificant(4) ? new BN(balance[0]?.toSignificant(4)).multipliedBy(usdtPrice).toFixed(2) : '0.00'
  const totalLockKcs = accountInfo.project?.info?.margin ? new BN(accountInfo.project?.info?.margin).toFixed(2) : '0.00'
  const totalLockUsdt = accountInfo.project?.info?.margin ? new BN(accountInfo.project?.info?.margin).multipliedBy(usdtPrice).toFixed(2) : '0.00'
  console.log('useAccountInfo =', accountInfo)

  const history = useHistory();

  useEffect(() => {
    if(account){
      getReviewList({ page: reviewPage, limit: 3, reviewer: account})
      .then((res: any) => {
        setReviewList(res.list)
        setReviewTotal(res.total)
      })
    }
  }, [reviewPage, account])

  const TopCard = (type: string) => {
    const isBalance = type === 'balance' ? true : false;
    const InfoItem = (title: string, content: string | number, width?: string, mt?: string) => {
      return(
        <Col style={{width: width ?? 'auto', marginTop: mt ?? '0px'}}>
          <LocalStyle.ProjectTextSub style={{fontSize: '14px'}}>{title}</LocalStyle.ProjectTextSub>
          <LocalStyle.ProjectText style={{fontSize: '32px'}}>{content}</LocalStyle.ProjectText>
        </Col>
      )
    }
    return(
      <LocalStyle.AccountCard key={type}>
        {InfoItem(isBalance ? t('Total KCS Balance') : t('Total Value'), show ? (isBalance ? new BN(totalValueKcs).plus(totalLockKcs).toFixed(2).toString() : `$${new BN(totalValueUsdt).plus(totalLockUsdt).toFixed(2).toString() }`) : '-')}
        <RowBetween>
          {InfoItem(isBalance ? t('Wallet KCS balance') : t('Wallet balance value'), show ? (isBalance ? totalValueKcs : `$${totalValueUsdt}`) : '-', '50%', '35px')}
          {InfoItem(isBalance ? t('Locked KCS balance') : t('Locked balance value'), show ? (isBalance ? totalLockKcs : totalLockUsdt) : '-', '50%', '35px')}
        </RowBetween>
      </LocalStyle.AccountCard>
    )
  }

  const renderTitle = (title: string) => {
    return(
      <>
        <RowBetween>
          <LocalStyle.ProjectText style={{fontSize: '20px'}}>{title}</LocalStyle.ProjectText>
        </RowBetween>
        <LocalStyle.AccountLine />
      </>
    )
  }

  const renderTransItem = (data: any) => {
    return(
      <LocalStyle.AccountExplore key={data.txid} href={process.env.REACT_APP_EXPLORE + '/' + data.hash} target="_blank">
        <LocalStyle.ProjectTextSub style={{fontSize: '16px', width: '60%'}}>{data?.hash ? data.hash.substr(0, 12) + '...' + data.hash.substr(-6) : '-'}</LocalStyle.ProjectTextSub>
        <Text color={theme.colors.primary} fontWeight={'bold'}>{t('View details')}</Text>
      </LocalStyle.AccountExplore>
    )
  }


  return (
    <>
      <Container style={{minHeight: '80vh'}}>
        <RowBetween style={{marginTop: '40px', alignItems: 'center', marginBottom: '25px'}}>
          <Row>
            <LocalStyle.ProjectText style={{fontSize: '32px'}}>{t("My Account")}</LocalStyle.ProjectText>
            <LocalStyle.AccountEye src={show ? eyeOpen : eyeClose} onClick={() => setShow(!show)}/>
          </Row>
          <Row 
            style={{width: 'auto'}}
            onClick={() => {
              Copy(account ?? '');
              message.success('Copied')
            }}>
            <LocalStyle.ProjectTextSub style={{fontSize: '14px'}}>{account}</LocalStyle.ProjectTextSub>
            <LocalStyle.AccountImgCopy src={copy}/>
          </Row>
        </RowBetween>
        <RowBetween>
          {TopCard('value')}
          {TopCard('balance')}
        </RowBetween>
        <RowBetween mt="20px" mb="36px">
          <Col>
            <LocalStyle.AccountCard width="387px" height="246px" style={{marginBottom: '20px'}}>
              <RowBetween>
                <LocalStyle.ProjectText style={{fontSize: '20px'}}>{t("My Project")}</LocalStyle.ProjectText>
                {
                  hasProject && accountInfo.project.state === 'Displaying' &&
                  <Row style={{width: 'auto', cursor: 'pointer'}} onClick={() => history.push(`/submit?name=${accountInfo.project?.info?.owner}`)}>
                    <LocalStyle.AccountImgEdit src={edit}/>
                    <Text color={theme.colors.primary} fontWeight={'bold'}>{t("Edit")}</Text>
                  </Row>
                }
              </RowBetween>
              <LocalStyle.AccountLine />
              {
                hasProject && !accountInfo.projectLoading ?
                <>
                  <Row>
                    <LocalStyle.AccountImgDApp src={accountInfo.project?.info?.logo} alt="DApp logo"/>
                    <LocalStyle.ProjectText style={{fontSize: '20px'}}>{accountInfo.project?.info?.title}</LocalStyle.ProjectText>
                  </Row>
                  <Row mt="15px">
                    <LocalStyle.ProjectTextSub style={{fontSize: '14px', fontWeight: 'bold', width: '40%'}}>{t("KCS Margin")}</LocalStyle.ProjectTextSub>
                    <LocalStyle.ProjectText style={{fontSize: '24px'}}>{new BN(accountInfo.project?.info?.margin).toFixed(2).toString()} <span style={{fontSize: '14px'}}>KCS</span></LocalStyle.ProjectText>
                  </Row>
                  <Row mt="15px">
                    <LocalStyle.ProjectTextSub style={{fontSize: '14px', fontWeight: 'bold', width: '40%'}}>{t("State")}</LocalStyle.ProjectTextSub>
                    <LocalStyle.AccountStatusShow status={stateTipsColor[accountInfo.project.state].bg} color={stateTipsColor[accountInfo.project.state].color}>Displaying</LocalStyle.AccountStatusShow>
                  </Row>
                </>
                :
                (
                  accountInfo.projectLoading ? 
                  <Skeleton paragraph={{ rows: 3 }} />
                  :
                  <Empty margin="20px auto 0 auto"/>
                )
              }
            </LocalStyle.AccountCard>  
            <LocalStyle.AccountCard width="387px" height="332px">
              {renderTitle('Transaction History')}
              <LocalStyle.AccountTransContent>
                {
                  accountInfo.transaction.length && !accountInfo.transLoading ?
                  accountInfo.transaction.map((item: any, index) => {
                    if(transPage === 1 && index <= 4 || (transPage === 2 && index > 4)){
                      return (renderTransItem({hash: item?.txid}))
                    }
                    return null
                  })
                  :
                  (
                    accountInfo.transLoading ? 
                    <Skeleton paragraph={{ rows: 3 }} />
                    :
                    <Empty margin="20px auto 0 auto"/>
                  )
                }
              </LocalStyle.AccountTransContent>
              <Pagination 
                size="small" 
                onChange={(page, size) => {setTransPage(page)}}
                current={transPage}
                pageSize={5} 
                total={accountInfo?.transaction.length} 
                className={'kcc-pagination'}/>
            </LocalStyle.AccountCard>   
          </Col>
          <LocalStyle.AccountCard width="793px" height="597px">
            {renderTitle('My Review')}
            <LocalStyle.AccountReviewContent>
              {
                reviewList.length ? 
                reviewList.map((item) => {return (<Comment {...item} type="mine"/>)})
                : 
                (reviewLoading ? <Skeleton avatar paragraph={{ rows: 4 }} /> : <Empty />)
              }
            </LocalStyle.AccountReviewContent>
            {reviewList.length > 0 && 
              <Pagination 
                size="small" 
                pageSize={3} 
                current={reviewPage}
                onChange={(page) => {setReviewPage(page)}}
                total={reviewTotal} 
                className={'kcc-pagination'}/>}
          </LocalStyle.AccountCard> 
        </RowBetween>
      </Container>
      <Footer />
    </>
  )
}

export default AccountPage
