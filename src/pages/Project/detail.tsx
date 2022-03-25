import React, { FunctionComponent, useEffect, useState, useCallback, useMemo } from 'react'
import styled, { useTheme } from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'react-i18next'
import { ApiService, useLoading } from '../../api'
import { Container, Text } from '../../style'
import { edit, send, website, twitter, github, telegram, down, logoDef } from '../../constants/imgs'
import Row, { RowBetween, AutoRow } from 'components/Row'
import Col from 'components/Column'
import Empty from 'components/Empty'
import Comment from 'components/Comment'
import BN from 'bignumber.js'
import { Skeleton, Rate, message, Button } from 'antd'
import { getUrlParam } from '../../utils'
import * as LocalStyle from '../../style/pages'
import { useHistory } from 'react-router-dom'
import Footer from '../../components/Footer'
import InputItem from 'components/InputItem'
import { useResponsive } from 'utils/responsive'
import CommentModal from '../../components/CommentModal'
import { useComment } from '../../hooks/useDiscoverContract'
import { Img } from 'react-image'
import { useChainError } from 'state/wallet/hooks'
import $ from 'jquery'
import Mint from 'utils/sensitiveWord'
import Helmet from 'react-helmet'

const ProjectDetailPage: React.FunctionComponent = (props) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { account, library, chainId } = useWeb3React()
  const { isTablet, isMobile } = useResponsive()
  const [detail, setDetail] = useState<{
    title: string
    intro: string
    margin: string | number
    contract: string
    owner: string
    detail?: string
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
    title: '',
    intro: '',
    margin: '0.00',
    owner: '',
    contract: '',
    score: 0,
    rankPrimary: 999,
    rankSecond: 999,
  })
  const [detailLoading, getInfo] = useLoading(ApiService.getDappInfo)
  const [commentLoading, getComment] = useLoading(ApiService.getDappComment)
  const chainError = useChainError()
  const [loaded, setLoad] = useState(false)
  const [page, setPage] = useState(1)
  const [showTips, setShow] = useState(false)
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])
  const [showMore, setMore] = useState(false)
  const [showModal, setModal] = useState(false)
  const [showComment, setComment] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [rate, setRate] = useState(0)
  const history = useHistory()
  const name = getUrlParam('name')
  const showRank = detail.rankPrimary <= 5 || detail.rankSecond <= 10
  const containerWidth = isTablet ? '768px' : isMobile ? '100vw' : '1200px'

  useEffect(() => {
    Promise.all([getComment({ app: name, page: page, user: account ?? '' }), getInfo(name)]).then((res: any) => {
      console.log(res)
      //@ts-ignore
      setList([...list, ...res[0].list])
      setTotal(res[0].total)
      if (page < res[0].total / 5) {
        setMore(true)
      } else {
        setMore(false)
      }
      setDetail(res[1])
      setLoad(true)
    })
    //@ts-ignore
    const timer = setInterval(() => {
      getComment({ app: name, page: page, user: account ?? '' }).then((res: any) => {
        if (res.total < total) {
          //@ts-ignore
          let listToObject = {},
            resArr = [...list, ...res.list]
          resArr.reduce((item: any, next: any) => {
            listToObject[next.id] ? '' : (listToObject[next.id] = true && item.push(next))
            return item
          }, [])
          console.log('resArr =', resArr)
          setList(resArr as [])
          if (page < res.total / 5) {
            setMore(true)
          } else {
            setMore(false)
          }
        }
      })
    }, 30000)
    return () => {
      clearInterval(timer)
    }
  }, [name, page])

  useEffect(() => {
    getComment({ app: name, page: page, user: account ?? '' }).then((res: any) => {
      console.log(res)
      //@ts-ignore
      setList(res.list)
      setTotal(res.total)
      if (page < res.total / 5) {
        setMore(true)
      } else {
        setMore(false)
      }
      setLoad(true)
    })
  }, [account])

  // useEffect(() => {
  //   if(detail.detail){
  //     const height = $('#projectDetail').height() ?? 0
  //     console.log('height =', height)
  //     if(height >= 48){
  //       setShow(true)
  //     }
  //   }
  // }, [detail.detail])

  const confirmComment = (data) => {
    let params = {
      title: data.title,
      review: data.content ?? '',
      score: data.rate,
      projectAddress: detail.owner,
    }
    if (!account || !chainId) {
      message.error(t('Wallet not connected'))
      return
    }
    const { commentCallback } = useComment(params, library)
    commentCallback()
      .then((res) => {
        if (res) {
          setModal(false)
          setComment(false)
          message.success(t('Success'))
        }
      })
      .catch((e) => {
        if (e && e.code === -32603) {
          message.error(t('You can only comment once per account'))
        } else {
          message.error(t('Contract call error'))
        }
      })
  }

  const renderMedia = (type: string, url: string) => {
    const logo = {
      telegram: telegram,
      github: github,
      twitter: twitter,
      website: website,
    }
    return (
      <LocalStyle.ProjectMedia
        href={url}
        target="_blank"
        style={{ height: '36px', width: '36px', marginTop: '0', marginRight: '12px' }}
      >
        <LocalStyle.ProjectMediaImg src={logo[type]} />
      </LocalStyle.ProjectMedia>
    )
  }

  const renderDown = () => {
    return (
      <AutoRow
        onClick={() => {
          setPage(page + 1)
        }}
        justify="center"
        mt="21px"
        mb="24px"
        style={{ cursor: 'pointer' }}
      >
        <Text color={theme.colors.primary} fontSize="14px">
          {t('Learn more')}
        </Text>
        <LocalStyle.ProjectImgDown src={down} />
      </AutoRow>
    )
  }

  const MobileTop = () => {
    if (!loaded) {
      return (
        <Col style={{ margin: '30px 0' }}>
          <Skeleton avatar paragraph={{ rows: 4 }} />
        </Col>
      )
    }
    return (
      <>
        <Row style={{ height: '53px' }}>
          <LocalStyle.ProjectImgSearch
            src={require('../../assets/images/Icons/h5/left.png').default}
            onClick={() => {
              history.goBack()
            }}
          />
          <Text color={theme.colors.text} fontWeight="bold" mr="20px" style={{ flex: '1', textAlign: 'center' }}>
            {detail.title ?? ''}
          </Text>
        </Row>
        <LocalStyle.CommentLine />
        <RowBetween style={{ marginTop: '24px', alignItems: 'center' }}>
          <Img
            style={{ width: '80px', height: '80px', borderRadius: '8px' }}
            loader={<LocalStyle.ProjectDetailLogo src={logoDef} alt="DApp logo" />}
            unloader={<LocalStyle.ProjectDetailLogo src={logoDef} alt="DApp logo" />}
            src={[detail.logo as string]}
          />
          <LocalStyle.ProjectButton
            href={detail.website}
            target="_blank"
            style={{ height: '48px', width: '170px', borderRadius: '24px', marginRight: '0' }}
          >
            {t('Visit Website')}
            <LocalStyle.ProjectImgSend src={send} />
          </LocalStyle.ProjectButton>
        </RowBetween>
        <Text
          fontSize="32px"
          fontWeight="bold"
          mb="5px"
          mt="15px"
          color={theme.colors.text}
          style={{ wordBreak: 'break-all' }}
        >
          {detail.title}
        </Text>
        <Row style={{ position: 'relative' }}>
          {showTips ? (
            <LocalStyle.ProjectDetailText>{detail.detail}</LocalStyle.ProjectDetailText>
          ) : (
            <LocalStyle.ProjectTextSubTwo>
              {detail.detail?.substring(0, 100)}
              {detail.detail && detail.detail.length > 100 ? '...' : ''}
            </LocalStyle.ProjectTextSubTwo>
          )}
        </Row>
        <Row>
          {detail.detail && detail.detail.length > 100 && (
            <Text
              onClick={() => setShow(!showTips)}
              color={theme.colors.primary}
              fontWeight="bold"
              style={{ cursor: 'pointer', lineHeight: '20px', textAlign: 'right' }}
            >
              {showTips ? 'Fold' : 'Unfold'}
            </Text>
          )}
        </Row>
        <LocalStyle.ProjectHiddenDetail id="projectDetail">{detail.detail}</LocalStyle.ProjectHiddenDetail>
        <Row mt="10px">
          <LocalStyle.ProjectTips grey={false}>
            {new BN(detail.margin).toFixed(2).toString()} KCS
          </LocalStyle.ProjectTips>
          {detail.priCategory ? (
            <LocalStyle.ProjectTips grey={true}>{detail.priCategory.name}</LocalStyle.ProjectTips>
          ) : (
            '-'
          )}
          {detail.secCategory ? (
            <LocalStyle.ProjectTips grey={true}>{detail.secCategory.name}</LocalStyle.ProjectTips>
          ) : (
            '-'
          )}
        </Row>
        <Row mt="16px">
          {detail.telegram && renderMedia('telegram', detail.telegram)}
          {detail.github && renderMedia('github', detail.github)}
          {detail.twitter && renderMedia('twitter', detail.twitter)}
          {detail.website && renderMedia('website', detail.website)}
        </Row>
        <LocalStyle.ProjectRate style={{ marginTop: '30px', width: '100%' }}>
          <Col style={{ width: '49%', alignItems: 'center' }}>
            <LocalStyle.ProjectText style={{ fontSize: '40px' }}>{Number(detail.score)}</LocalStyle.ProjectText>
            <Rate allowHalf disabled value={Number(detail.score)} />
            <LocalStyle.ProjectTextSub mt="5px">
              {detail.comments} {t('RATINGS')}
            </LocalStyle.ProjectTextSub>
          </Col>
          {showRank ? (
            <>
              <LocalStyle.ProjectColLine />
              <Col style={{ width: '49%', alignItems: 'center' }}>
                <LocalStyle.ProjectText style={{ fontSize: '40px' }}>
                  No.{detail.rankPrimary <= 5 ? detail.rankPrimary : detail.rankSecond}
                </LocalStyle.ProjectText>
                {detail.priCategory && (
                  <LocalStyle.ProjectTextSub style={{ fontWeight: detail.rankPrimary <= 5 ? 'bold' : 'normal' }}>
                    {detail.priCategory.name.toUpperCase()}
                  </LocalStyle.ProjectTextSub>
                )}
                {detail.secCategory && (
                  <LocalStyle.ProjectTextSub
                    style={{ fontWeight: detail.rankPrimary > 5 && detail.rankSecond <= 10 ? 'bold' : 'normal' }}
                  >
                    {detail.secCategory.name.toUpperCase()}
                  </LocalStyle.ProjectTextSub>
                )}
              </Col>
            </>
          ) : null}
        </LocalStyle.ProjectRate>
      </>
    )
  }

  const CommentH5 = () => {
    return (
      <Container style={{ minHeight: '80vh', padding: '0 15px' }} width={containerWidth}>
        <Row style={{ height: '53px' }}>
          <LocalStyle.ProjectImgSearch
            src={require('../../assets/images/Icons/h5/left.png').default}
            onClick={() => {
              setComment(false)
            }}
          />
          <Text color={theme.colors.text} fontWeight="bold" mr="20px" style={{ flex: '1', textAlign: 'center' }}>
            Comment
          </Text>
        </Row>
        <LocalStyle.CommentLine />
        <Row>
          <Text color={theme.colors.text} fontWeight="bold" mr={'5px'}>
            Rate
          </Text>
          <LocalStyle.RequiredPoint>*</LocalStyle.RequiredPoint>
        </Row>
        <AutoRow justify="center" mb="15px">
          <Rate allowHalf value={rate} className={'modalRate'} onChange={(e) => setRate(e)} />
        </AutoRow>
        <InputItem
          title={'Title'}
          required={true}
          value={title}
          placeholder={'Enter the title'}
          maxLength={30}
          onChange={(e) => {
            let title = e.target.value === ' ' ? '' : e.target.value
            //@ts-ignore
            setTitle(Mint.filterSync(title).text)
          }}
        />
        <InputItem
          title={'Content'}
          required={false}
          isTextArea={true}
          value={content}
          maxLength={100}
          placeholder={'Enter the content'}
          onChange={(e) => {
            let content = e.target.value === ' ' ? '' : e.target.value
            //@ts-ignore
            setContent(Mint.filterSync(content).text)
          }}
        />
        <Button
          style={{
            width: '100%',
            height: '48px',
            borderRadius: '24px !important',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
          type="primary"
          disabled={!title || !rate}
          onClick={() => {
            confirmComment({ title, content, rate })
          }}
        >
          {t('Submit')}
        </Button>
      </Container>
    )
  }

  return (
    <>
      <Helmet>
        <title>
          {`${detail.title} `}
          {detail.title ? '-' : ''} KCC Project
        </title>
        <meta name="description" content={`Find all detail about ${detail.title}.`} />
      </Helmet>
      {!showComment && (
        <Container style={{ minHeight: '80vh', padding: isMobile ? '0 15px' : '0' }} width={containerWidth}>
          {isMobile ? (
            MobileTop()
          ) : (
            <RowBetween style={{ marginTop: '40px', alignItems: 'flex-start' }}>
              <Col style={{ width: '800px' }}>
                <LocalStyle.ProjectDappWrapper
                  style={{ width: '800px', cursor: 'auto', height: 'auto', marginBottom: '0' }}
                >
                  <Img
                    style={{ width: '140px', height: '140px', marginRight: '34px', borderRadius: '8px' }}
                    loader={<LocalStyle.ProjectDetailLogo src={logoDef} alt="DApp logo" />}
                    unloader={<LocalStyle.ProjectDetailLogo src={logoDef} alt="DApp logo" />}
                    src={[detail.logo as string]}
                  />
                  <Col style={{ width: '70%' }}>
                    <Text fontSize="32px" fontWeight="bold" mb="5px" color={theme.colors.text}>
                      {detail.title}
                    </Text>
                    {/* {
                      showTips ?
                      <Popover overlayClassName={'projectDetailPopover'} content={<p style={{wordBreak: 'break-all'}}>{detail.detail}</p>} trigger="hover">
                        <LocalStyle.ProjectTextSubTwo style={{cursor: 'pointer'}}>{detail.detail}</LocalStyle.ProjectTextSubTwo>
                      </Popover>
                      :
                      <LocalStyle.ProjectTextSubTwo>{detail.detail}</LocalStyle.ProjectTextSubTwo>
                    } */}
                    <Row style={{ position: 'relative' }}>
                      {showTips ? (
                        <LocalStyle.ProjectDetailText>{detail.detail}</LocalStyle.ProjectDetailText>
                      ) : (
                        <LocalStyle.ProjectTextSubTwo>
                          {detail.detail?.substring(0, 155)}
                          {detail.detail && detail.detail.length > 155 ? '...' : ''}
                        </LocalStyle.ProjectTextSubTwo>
                      )}
                      {detail.detail && detail.detail.length > 155 && (
                        <Text
                          onClick={() => setShow(!showTips)}
                          color={theme.colors.primary}
                          fontWeight="bold"
                          style={{
                            cursor: 'pointer',
                            lineHeight: '20px',
                            textAlign: 'right',
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                          }}
                        >
                          {showTips ? 'Fold' : 'Unfold'}
                        </Text>
                      )}
                    </Row>
                    <LocalStyle.ProjectHiddenDetail id="projectDetail">{detail.detail}</LocalStyle.ProjectHiddenDetail>
                    <Row mt="10px">
                      <LocalStyle.ProjectTips grey={false}>
                        {new BN(detail.margin).toFixed(2).toString()} KCS
                      </LocalStyle.ProjectTips>
                      {detail.priCategory ? (
                        <LocalStyle.ProjectTips grey={true}>{detail.priCategory.name}</LocalStyle.ProjectTips>
                      ) : (
                        '-'
                      )}
                      {detail.secCategory ? (
                        <LocalStyle.ProjectTips grey={true}>{detail.secCategory.name}</LocalStyle.ProjectTips>
                      ) : (
                        '-'
                      )}
                    </Row>
                    <Row mt="24px">
                      <LocalStyle.ProjectButton href={detail.website} target="_blank">
                        {t('Visit Website')}
                        <LocalStyle.ProjectImgSend src={send} />
                      </LocalStyle.ProjectButton>
                      {detail.telegram && renderMedia('telegram', detail.telegram)}
                      {detail.github && renderMedia('github', detail.github)}
                      {detail.twitter && renderMedia('twitter', detail.twitter)}
                      {detail.website && renderMedia('website', detail.website)}
                    </Row>
                  </Col>
                </LocalStyle.ProjectDappWrapper>
              </Col>
              <LocalStyle.ProjectRate style={{ marginTop: isTablet ? '40px' : '0' }}>
                <Col style={{ width: '49%', alignItems: 'center' }}>
                  <LocalStyle.ProjectText style={{ fontSize: '40px' }}>{Number(detail.score)}</LocalStyle.ProjectText>
                  <Rate allowHalf disabled value={Number(detail.score)} />
                  <LocalStyle.ProjectTextSub mt="5px">
                    {detail.comments} {t('RATINGS')}
                  </LocalStyle.ProjectTextSub>
                </Col>
                {showRank ? (
                  <>
                    <LocalStyle.ProjectColLine />
                    <Col style={{ width: '49%', alignItems: 'center' }}>
                      <LocalStyle.ProjectText style={{ fontSize: '40px' }}>
                        No.{detail.rankPrimary <= 5 ? detail.rankPrimary : detail.rankSecond}
                      </LocalStyle.ProjectText>
                      {detail.priCategory && (
                        <LocalStyle.ProjectTextSub style={{ fontWeight: detail.rankPrimary <= 5 ? 'bold' : 'normal' }}>
                          {detail.priCategory.name.toUpperCase()}
                        </LocalStyle.ProjectTextSub>
                      )}
                      {detail.secCategory && (
                        <LocalStyle.ProjectTextSub
                          style={{ fontWeight: detail.rankPrimary > 5 && detail.rankSecond <= 10 ? 'bold' : 'normal' }}
                        >
                          {detail.secCategory.name.toUpperCase()}
                        </LocalStyle.ProjectTextSub>
                      )}
                    </Col>
                  </>
                ) : null}
              </LocalStyle.ProjectRate>
            </RowBetween>
          )}
          {!isMobile && <LocalStyle.ProjectLine />}
          <div style={{ maxWidth: isMobile ? '100%' : '800px', margin: isMobile ? '30px auto 0 auto' : '0' }}>
            <RowBetween mb={isMobile ? '16px' : '40px'}>
              <LocalStyle.ProjectText style={{ fontSize: '20px' }}>{t('Comments')}</LocalStyle.ProjectText>
              <Row
                style={{ width: 'auto', cursor: 'pointer' }}
                onClick={() => {
                  if (!account) {
                    message.error(t('Wallet not connected'))
                    return
                  }
                  if (chainError) {
                    message.error(chainError)
                    return
                  }
                  if (isMobile) {
                    window.scrollTo(0, 0)
                    setComment(true)
                  } else {
                    setModal(true)
                  }
                }}
              >
                <LocalStyle.ProjectImgEdit src={edit} />
                <Text color={theme.colors.primary}>{t('Write a Comment')}</Text>
              </Row>
            </RowBetween>
            {list.length ? (
              list.map((item) => {
                return <Comment {...item} />
              })
            ) : !loaded ? (
              <Skeleton avatar paragraph={{ rows: 4 }} />
            ) : (
              <Empty />
            )}
            {showMore && renderDown()}
          </div>
        </Container>
      )}
      {isMobile && showComment && CommentH5()}
      <Footer />
      <CommentModal
        visible={showModal}
        onClose={() => {
          setModal(false)
        }}
        onConfirm={(data) => confirmComment(data)}
      />
    </>
  )
}

export default ProjectDetailPage
