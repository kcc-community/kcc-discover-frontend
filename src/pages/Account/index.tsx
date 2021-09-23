import React, { FunctionComponent, useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { ApiService, useLoading } from '../../api'
import { Container, Text } from '../../style'
import { eyeOpen, eyeClose, edit, copy, logoDef } from '../../constants/imgs'
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
import { useKCSPrice } from '../../state/wallet/hooks'
import { Img } from 'react-image'
import { useProjectLoading, useTransactionLoading, useTransactionInfo, useProjectInfo } from '../../state/application/hooks'

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
  const projectLoading = useProjectLoading();
  const transactionLoading = useTransactionLoading();
  const projectInfo = useProjectInfo();
  const transactionInfo = useTransactionInfo();

  const hasProject = projectInfo.state === 'None' ? false : true
  const totalValueKcs = balance[0]?.toSignificant(4) ? new BN(balance[0]?.toSignificant(4) as string).toFixed(2, 1) : '0.00'
  const totalValueUsdt = balance[0]?.toSignificant(2) ? new BN(balance[0]?.toSignificant(4)).multipliedBy(usdtPrice).toFixed(2,1) : '0.00'
  const totalLockKcs = projectInfo?.info?.margin ? new BN(projectInfo?.info?.margin).toFixed(2, 1) : '0.00'
  const totalLockUsdt = projectInfo?.info?.margin ? new BN(projectInfo?.info?.margin).multipliedBy(usdtPrice).toFixed(2, 1) : '0.00'

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
          <LocalStyle.ProjectText style={{fontSize: '32px', letterSpacing: '1.5px', fontFamily: 'kccfont Number Normal'}}>{content}</LocalStyle.ProjectText>
        </Col>
      )
    }
    return(
      <LocalStyle.AccountCard key={type} style={{width: isBalance ? '584px' : '596px'}}>
        {InfoItem(isBalance ? t('Total KCS Balance') : t('Total Value'), show ? (isBalance ? new BN(totalValueKcs).plus(totalLockKcs).toFixed(2, 1).toString() : `$${new BN(totalValueUsdt).plus(totalLockUsdt).toFixed(2, 1).toString() }`) : '--')}
        <RowBetween>
          {InfoItem(isBalance ? t('Wallet KCS balance') : t('Wallet balance value'), show ? (isBalance ? totalValueKcs : `$${totalValueUsdt}`) : '--', '50%', '35px')}
          {InfoItem(isBalance ? t('Locked KCS balance') : t('Locked balance value'), show ? (isBalance ? totalLockKcs : `$${totalLockUsdt}`) : '--', '50%', '35px')}
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
        <LocalStyle.ProjectTextSub style={{fontSize: '16px', width: '70%'}}>{data?.hash ? data.hash.substr(0, 12) + '...' + data.hash.substr(-6) : '-'}</LocalStyle.ProjectTextSub>
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
          {
            account ? 
            <Row 
              style={{justifyContent: 'flex-end'}}
              onClick={() => {
                Copy(account ?? '');
                message.success(t('Copied'))
              }}>
              <LocalStyle.ProjectTextSub style={{fontSize: '14px'}}>{account}</LocalStyle.ProjectTextSub>
              <LocalStyle.AccountImgCopy src={copy}/>
            </Row>
            : null
          }
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
                  hasProject && (projectInfo.state === 'Displaying' || projectInfo.state === 'Refused') &&
                  <Row style={{width: 'auto', cursor: 'pointer'}} onClick={() => history.push(`/submit?name=${projectInfo?.info?.name}`)}>
                    <LocalStyle.AccountImgEdit src={edit}/>
                    <Text color={theme.colors.primary} fontWeight={'bold'}>{t("Edit")}</Text>
                  </Row>
                }
              </RowBetween>
              <LocalStyle.AccountLine />
              {
                hasProject && !projectLoading ?
                <>
                  <Row>
                    <Img 
                      style={{width: '40px', height: '40px', marginRight: '18px', borderRadius: '8px'}}
                      loader={<LocalStyle.AccountImgDApp src={logoDef} alt="DApp logo"/>}
                      unloader={<LocalStyle.AccountImgDApp src={logoDef} alt="DApp logo"/>}
                      src={[projectInfo?.info?.logo]}/>
                    {/* <LocalStyle.AccountImgDApp src={projectInfo?.info?.logo} alt="DApp logo"/> */}
                    <LocalStyle.ProjectText style={{fontSize: '20px'}}>{projectInfo?.info?.title}</LocalStyle.ProjectText>
                  </Row>
                  <Row mt="15px">
                    <LocalStyle.ProjectTextSub style={{fontSize: '14px', fontWeight: 'bold', width: '40%'}}>{t("KCS Margin")}</LocalStyle.ProjectTextSub>
                    <LocalStyle.ProjectText style={{fontSize: '24px', fontFamily: 'kccfont Number Normal'}}>{show ? new BN(projectInfo?.info?.margin).toFixed(2, 1).toString() : '--'} <span style={{fontSize: '14px'}}>KCS</span></LocalStyle.ProjectText>
                  </Row>
                  <Row mt="15px">
                    <LocalStyle.ProjectTextSub style={{fontSize: '14px', fontWeight: 'bold', width: '40%'}}>{t("State")}</LocalStyle.ProjectTextSub>
                    <LocalStyle.AccountStatusShow status={stateTipsColor[projectInfo.state].bg} color={stateTipsColor[projectInfo.state].color}>{projectInfo.state}</LocalStyle.AccountStatusShow>
                  </Row>
                </>
                :
                (
                  projectLoading ? 
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
                  transactionInfo.length && !transactionLoading ?
                  transactionInfo.map((item: any, index) => {
                    if(transPage === 1 && index <= 4 || (transPage === 2 && index > 4)){
                      return (renderTransItem({hash: item?.txid}))
                    }
                    return null
                  })
                  :
                  (
                    transactionLoading ? 
                    <Skeleton paragraph={{ rows: 3 }} />
                    :
                    <Empty margin="20px auto 0 auto"/>
                  )
                }
              </LocalStyle.AccountTransContent>
              {
                transactionInfo.length > 0 && 
                <Pagination 
                  size="small" 
                  onChange={(page, size) => {setTransPage(page)}}
                  current={transPage}
                  pageSize={5} 
                  total={transactionInfo.length} 
                  className={'kcc-pagination'}
                />
              }
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
