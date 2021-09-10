import React, { FunctionComponent, useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { ApiService, useLoading } from '../../api'
import { Container, Text } from '../../style'
import { eyeOpen, eyeClose, edit, copy } from '../../constants/imgs'
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


const AccountPage: React.FunctionComponent = (props) => {
  const theme = useTheme()
  const { account } = useWeb3React()
  const balance = useCurrencyBalances(account ?? undefined, [ETHER])
  const { t } = useTranslation()
  const [show, setShow] = useState(true)
  const [reviewLoading, getReviewList] = useLoading(ApiService.getDappReviwer)
  const [reviewPage, setReviewPage] = useState(1)
  const [reviewTotal, setReviewTotal] = useState(1)
  const [reviewList, setReviewList] = useState([])

  const history = useHistory();

  useEffect(() => {
    Promise.all([
      getReviewList({ page: reviewPage, limit: 3, reviewer: account}),
      // getCategoryList()
    ]).then((res: any) => {
      setReviewList(res[0].list)
      setReviewTotal(res[0].total)
    })
  }, [])

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
        {InfoItem(isBalance ? t('Total KCS Balance') : t('Total Value'), show ? (isBalance ? balance[0]?.toSignificant(4) ?? '0.00' : `$103,223.89`) : '-')}
        <RowBetween>
          {InfoItem(isBalance ? t('Wallet KCS balance') : t('Wallet balance'), show ? (isBalance ? `10000.12` : `$103,223.89`) : '-', '50%', '35px')}
          {InfoItem(isBalance ? t('Locked KCS balance') : t('Locked balance'), show ? (isBalance ? `10000.12` : `$103,223.89`) : '-', '50%', '35px')}
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
      <RowBetween mb="15px" style={{cursor: 'pointer'}}>
        <LocalStyle.ProjectTextSub style={{fontSize: '16px', width: '60%'}}>{data?.hash ? data.hash.substr(0, 12) + '...' + data.hash.substr(-6) : '-'}</LocalStyle.ProjectTextSub>
        <Text color={theme.colors.primary} fontWeight={'bold'}>{t('View details')}</Text>
      </RowBetween>
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
                <Row style={{width: 'auto', cursor: 'pointer'}}>
                  <LocalStyle.AccountImgEdit src={edit}/>
                  <Text color={theme.colors.primary} fontWeight={'bold'}>{t("Edit")}</Text>
                </Row>
              </RowBetween>
              <LocalStyle.AccountLine />
              <Row>
                <LocalStyle.AccountImgDApp src={'https://cloudflare-ipfs.com/ipfs/QmWoRyyU7N16irq9xL6x9kwj6kMmWZgVE12kcCJZZH6y9e'} alt="DApp logo"/>
                <LocalStyle.ProjectText style={{fontSize: '20px'}}>Sushi Swap</LocalStyle.ProjectText>
              </Row>
              <Row mt="15px">
                <LocalStyle.ProjectTextSub style={{fontSize: '14px', fontWeight: 'bold', width: '40%'}}>{t("KCS Margin")}</LocalStyle.ProjectTextSub>
                <LocalStyle.ProjectText style={{fontSize: '24px'}}>1,000 <span style={{fontSize: '14px'}}>KCS</span></LocalStyle.ProjectText>
              </Row>
              <Row mt="15px">
                <LocalStyle.ProjectTextSub style={{fontSize: '14px', fontWeight: 'bold', width: '40%'}}>{t("State")}</LocalStyle.ProjectTextSub>
                <LocalStyle.AccountStatusShow>Displaying</LocalStyle.AccountStatusShow>
              </Row>
            </LocalStyle.AccountCard>  
            <LocalStyle.AccountCard width="387px" height="332px">
              {renderTitle('Transaction History')}
              <LocalStyle.AccountTransContent>
                {renderTransItem({hash: '0x1231312321321321312321321321312666666666'})}
                {renderTransItem({hash: '0x1231312321321321312321321321312666666666'})}
                {renderTransItem({hash: '0x1231312321321321312321321321312666666666'})}
                {renderTransItem({hash: '0x1231312321321321312321321321312666666666'})}
                {renderTransItem({hash: '0x1231312321321321312321321321312666666666'})}
              </LocalStyle.AccountTransContent>
              <Pagination size="small" total={10} className={'kcc-pagination'}/>
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
            <Pagination size="small" total={10} className={'kcc-pagination'}/>
          </LocalStyle.AccountCard> 
        </RowBetween>
      </Container>
      <Footer />
    </>
  )
}

export default AccountPage
