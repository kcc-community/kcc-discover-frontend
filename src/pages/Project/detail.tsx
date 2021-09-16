import React, { FunctionComponent, useEffect, useState, useCallback, useMemo } from 'react'
import styled, { useTheme } from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'react-i18next'
import { ApiService, useLoading } from '../../api'
import { Container, Text } from '../../style'
import { edit, send, website, twitter, github, telegram, down } from '../../constants/imgs'
import Row, { RowBetween, AutoRow } from 'components/Row'
import Col from 'components/Column'
import Empty from 'components/Empty'
import Comment from 'components/Comment'
import BN from 'bignumber.js'
import { Skeleton, Rate, message } from 'antd'
import { getUrlParam } from '../../utils'
import * as LocalStyle from '../../style/pages'
import { useHistory } from 'react-router-dom'
import Footer from '../../components/Footer'
import CommentModal from '../../components/CommentModal'
import { useComment } from '../../hooks/useDiscoverContract'

const ProjectDetailPage: React.FunctionComponent = (props) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { account, library, chainId } = useWeb3React()
  const [detail, setDetail] = useState<{
    title: string
    intro: string
    margin: string | number
    contract: string
    rank?: string | number
    score?: string | number
    comments?: number
    priCategory?: any 
    secCategory?: any
    telegram?: string
    github?: string
    twitter?: string
    website?: string
    rankPrimary: number
    rankSecond: number
    logo?: string
  }>({
    title: '-',
    intro: '-',
    margin: '0.00',
    contract: '',
    score: 0,
    rankPrimary: 999,
    rankSecond: 999,
  })
  const [detailLoading, getInfo] = useLoading(ApiService.getDappInfo)
  const [commentLoading, getComment] = useLoading(ApiService.getDappComment)
  const [loaded, setLoad] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])
  const [showMore, setMore] = useState(false)
  const [showModal, setModal] = useState(false)
  const history = useHistory();
  const name = getUrlParam('name');
  const showRank = detail.rankPrimary <= 5 || detail.rankSecond <= 10

  useEffect(() => {
    Promise.all([
      getComment({app: name, page: page, user: account ?? ''}),
      getInfo(name)
    ]).then((res: any) => {
      console.log(res)
      //@ts-ignore
      setList([ ...list, ...res[0].list]);
      setTotal(res[0].total)
      if(page < (res[0].total / 5)) { setMore(true) } else { setMore(false) }
      setDetail(res[1]);
      setLoad(true);
    })
    //@ts-ignore
    const timer = setInterval(() => {
      getComment({app: name, page: page, user: account ?? ''}).then((res: any) => {
        if(res.total < total){
          //@ts-ignore
          let listToObject = {}, resArr = [...list, ...res.list];
          resArr.reduce((item: any, next: any) => {
            listToObject[next.id] ? '' : listToObject[next.id] = true && item.push(next);
            return item;
          }, [])
          console.log('resArr =', resArr)
          setList(resArr as []);
          if(page < (res.total / 5)) { setMore(true) } else { setMore(false) }
        }
      })
    }, 30000)
    return () => {
      clearInterval(timer);
    }
  }, [name, page])

  useEffect(() => {
    getComment({app: name, page: page, user: account ?? ''})
    .then((res: any) => {
      console.log(res)
      //@ts-ignore
      setList(res.list);
      setTotal(res.total)
      if(page < (res.total / 5)) { setMore(true) } else { setMore(false) }
      setLoad(true);
    })
  }, [account])

  const confirmComment = (data) => {
    let params = {
      title: data.title,
      review: data.content ?? '',
      score: data.rate,
      projectAddress: detail.contract
    }
    if(!account || !chainId) return;
    const { commentCallback } = useComment(params, library);
    commentCallback().then(res => {
      if(res){
        setModal(false)
        message.success('Success');
      }
    })
  }

  const renderMedia = (type: string, url: string) => {
    const logo = {
      'telegram': telegram,
      'github': github,
      'twitter': twitter,
      'website': website,
    };
    return(
      <LocalStyle.ProjectMedia href={url} target="_blank" style={{height: '36px', width: '36px', marginTop: '0', marginRight: '12px'}}>
        <LocalStyle.ProjectMediaImg src={logo[type]}/>
      </LocalStyle.ProjectMedia>
    )
  }

  const renderDown = () => {
    return(
      <AutoRow onClick={() => {setPage(page + 1)}} justify="center" mt="21px" mb="24px" style={{cursor: 'pointer'}}>
        <Text color={theme.colors.primary} fontSize="14px">{t("Learn more")}</Text>
        <LocalStyle.ProjectImgDown src={down}/>
      </AutoRow>
    )
  }
  return (
    <>
      <Container style={{minHeight: '80vh'}}>
        <RowBetween style={{marginTop: '40px', alignItems: 'flex-start'}}>
          <Col style={{width: '800px'}}>
            <LocalStyle.ProjectDappWrapper style={{width: '800px'}}>
              <LocalStyle.ProjectDappLogo src={detail.logo} alt="DApp Logo" style={{width: '140px', height: '140px', marginRight: '34px'}}/>
              <Col>
                <Text fontSize="32px" fontWeight="bold" mb="5px" color={theme.colors.text}>{detail.title}</Text>
                <LocalStyle.ProjectTextSubTwo>{detail.intro}</LocalStyle.ProjectTextSubTwo>
                <Row mt="10px">
                  <LocalStyle.ProjectTips grey={false}>{new BN(detail.margin).toFixed(2).toString()} KCS</LocalStyle.ProjectTips>
                  {detail.priCategory ? <LocalStyle.ProjectTips grey={true}>{detail.priCategory.name}</LocalStyle.ProjectTips> : '-'}
                  {detail.secCategory ? <LocalStyle.ProjectTips grey={true}>{detail.secCategory.name}</LocalStyle.ProjectTips> : '-'}
                </Row>
                <Row mt="24px">
                  <LocalStyle.ProjectButton >
                    {t("Visit Website")}
                    <LocalStyle.ProjectImgSend src={send}/>
                  </LocalStyle.ProjectButton>
                  {detail.telegram && renderMedia('telegram', detail.telegram)}
                  {detail.github && renderMedia('github', detail.github)}
                  {detail.twitter && renderMedia('twitter', detail.twitter)}
                  {detail.website &&  renderMedia('website', detail.website)}
                </Row>
              </Col>
            </LocalStyle.ProjectDappWrapper>
          </Col>
          <LocalStyle.ProjectRate>
            <Col style={{width: '49%', alignItems: 'center'}}>
              <LocalStyle.ProjectText style={{fontSize: '40px'}}>{Number(detail.score)}</LocalStyle.ProjectText>
              <Rate allowHalf disabled value={Number(detail.score)} />
              <LocalStyle.ProjectTextSub mt="5px">{detail.comments} {t("RATINGS")}</LocalStyle.ProjectTextSub>
            </Col>
            {
              showRank ?
              <>
                <LocalStyle.ProjectColLine />
                <Col style={{width: '49%', alignItems: 'center'}}>
                  <LocalStyle.ProjectText style={{fontSize: '40px'}}>No.{detail.rankPrimary <= 5 ? detail.rankPrimary : detail.rankSecond}</LocalStyle.ProjectText>
                  { detail.priCategory && <LocalStyle.ProjectTextSub style={{fontWeight: detail.rankPrimary <= 5 ? 'bold' : 'normal'}}>{detail.priCategory.name.toUpperCase()}</LocalStyle.ProjectTextSub> }
                  { detail.secCategory && <LocalStyle.ProjectTextSub style={{fontWeight: (detail.rankPrimary > 5 && detail.rankSecond <= 10) ? 'bold' : 'normal'}}>{detail.secCategory.name.toUpperCase()}</LocalStyle.ProjectTextSub> }
                </Col>
              </>
              : null
            }
          </LocalStyle.ProjectRate>
        </RowBetween>
        <LocalStyle.ProjectLine />
        <div style={{maxWidth: '800px'}}>
          <RowBetween mb="40px">
            <LocalStyle.ProjectText style={{fontSize: '20px'}}>{t("Comments")}</LocalStyle.ProjectText>
            <Row style={{width: 'auto', cursor: 'pointer'}} onClick={() => setModal(true)}>
              <LocalStyle.ProjectImgEdit src={edit}/>
              <Text color={theme.colors.primary}>{t("Write a Comment")}</Text>
            </Row>
          </RowBetween>
          {
            list.length ? 
            list.map((item) => {return (<Comment {...item}/>)})
            : 
            (!loaded ? <Skeleton avatar paragraph={{ rows: 4 }} /> : <Empty />)
          }
          {showMore && renderDown()}
        </div>
      </Container>
      <Footer />
      <CommentModal visible={showModal} onClose={() => {setModal(false)}} onConfirm={(data) => confirmComment(data)} />
    </>
  )
}

export default ProjectDetailPage
