import React, { FunctionComponent, useEffect, useState, useRef } from 'react'
import styled, { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { ApiService, useLoading } from '../../api'
import { Container, Text } from '../../style'
import { sec, search, website, twitter, github, telegram, logoDef } from '../../constants/imgs'
import Row, { RowBetween } from 'components/Row'
import Col from 'components/Column'
import Empty from 'components/Empty'
import BN from 'bignumber.js'
import { Skeleton } from 'antd'
import * as LocalStyle from '../../style/pages'
import { useHistory } from 'react-router-dom'
import { getUrlParam } from '../../utils'
import { useResponsive } from 'utils/responsive'
import { useCategorySubtle, useCategoryPrimary, useCategoryLoading } from '../../state/application/hooks'
import Footer from '../../components/Footer'
import { Img } from 'react-image'

interface DappFilterParams {
  limit?: number
  pri?: number
  sec?: number | string
  title?: string
}

const ProjectPage: React.FunctionComponent = (props) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const [primarySec, setPrimary] = useState<{
    name: string
    nums: number
    index?: number
  }>({ name: 'All', nums: 0 })
  const [subSec, setSub] = useState<{
    name: string
    nums: number
    index?: number
  }>({ name: 'All', nums: 0 })
  const [content, setInput] = useState('')
  const subList = useCategorySubtle();
  const primaryList = useCategoryPrimary();
  const cateLoading = useCategoryLoading();
  const [dappList, setDapp] = useState([])
  const [dappLoading, getDappList] = useLoading(ApiService.getDappList)
  const history = useHistory()
  const urlSec = getUrlParam('sec');
  const filterFirstUpdate = useRef(true)
  const { isTablet } = useResponsive()

  useEffect(() => {
    if(subList.length){
      for(let i = 0; i < subList.length; i++){
        if(urlSec && subList[i].index === Number(urlSec)){
          setSub(subList[i])
        }
      }
    }
  }, [subList])

  useEffect(() => {
    if(!urlSec){
      getDappList({limit: 100}).then((res: any) => {
        setDapp(res.list)
      })
    }
  }, [])

  /*** filter DApp  ***/
  useEffect(() => {
    let params: DappFilterParams = { limit: 100 }
    if (primarySec.name !== 'All') params.pri = primarySec?.index
    if (subSec.name !== 'All') params.sec = subSec?.index
    if (content) params.title = content
    if (filterFirstUpdate.current) { filterFirstUpdate.current = false; return; }
    getDappList(params).then((res: any) => {
      if (content) {
        setPrimary(primaryList[0])
        setSub(subList[0])
      }
      setDapp(res.list)
    })
  }, [primarySec, subSec, content])

  const renderMenuItem = (data: any) => {
    const HiddenPoint = <div style={{ width: '6px' }} />
    return (
      <LocalStyle.ProjectItem
        onClick={() => {
          setSub(data)
        }}
        key={data.name}
        style={{ background: subSec.name === data?.name ? theme.colors.invertedContrast : 'transparent' }}
      >
        <Row>
          {subSec.name === data?.name ? <LocalStyle.ProjectPoint src={sec} /> : HiddenPoint}
          <LocalStyle.ProjectText
            style={{ margin: '0 12px 0 7px', fontWeight: subSec.name === data?.name ? 'bold' : 'normal' }}
          >
            {data?.name}
          </LocalStyle.ProjectText>
          <LocalStyle.ProjectTextSub>{data?.nums}</LocalStyle.ProjectTextSub>
        </Row>
      </LocalStyle.ProjectItem>
    )
  }

  const renderSearch = () => {
    return (
      <LocalStyle.ProjectInputWrapper>
        <LocalStyle.ProjectImgSearch src={search}/>
        <LocalStyle.ProjectInput placeholder={t('Search')} value={content} onChange={(e) => {
          let value = e.target.value.replace(/[\W]/g,'')
          setInput(value as any)
        }}/>
      </LocalStyle.ProjectInputWrapper>
    )
  }

  const renderPriTab = () => {
    return (
      <Row mb="32px">
        {primaryList.map((item) => {
          return (
            <LocalStyle.ProjectTab
              onClick={() => {
                setPrimary(item)
              }}
              key={item?.name}
              sec={item?.name === primarySec?.name}
            >
              {item.name}
            </LocalStyle.ProjectTab>
          )
        })}
      </Row>
    )
  }

  const renderMedia = (type: string, url: string) => {
    const logo = {
      telegram: telegram,
      github: github,
      twitter: twitter,
      website: website,
    }
    return (
      <LocalStyle.ProjectMedia href={url} target="_blank" onClick={(e) => {e.stopPropagation()}}>
        <LocalStyle.ProjectMediaImg src={logo[type]} />
      </LocalStyle.ProjectMedia>
    )
  }

  return (
    <>
      <Container style={{ minHeight: '80vh' }} width={isTablet ? '769px' : '1200px'}>
        <RowBetween style={{ marginTop: '40px', alignItems: 'flex-start' }}>
          <LocalStyle.ProjectMenu>
            <LocalStyle.ProjectText ml="21px" mb="17px">{t("Categories")}</LocalStyle.ProjectText>
            { 
              cateLoading ? 
              <LocalStyle.ProjectItem style={{height: 'auto'}}><Skeleton paragraph={{ rows: 5 }} /></LocalStyle.ProjectItem>
              :
              subList.map(item => renderMenuItem(item)) 
            }
          </LocalStyle.ProjectMenu>
          <Col style={{ flex: 1 }}>
            {renderSearch()}
            {renderPriTab()}
            <RowBetween style={{ flexWrap: 'wrap' }}>
              {dappLoading || cateLoading ? (
                <Skeleton avatar paragraph={{ rows: 4 }} />
              ) : dappList.length ? (
                dappList.map((item: any) => {
                  return (
                    <LocalStyle.ProjectDappWrapper
                      key={item.id}
                      onClick={() => history.push(`/project_detail?name=${item.name}`)}
                    >
                      <Img 
                        style={{width: '80px', height: '80px', marginRight: '20px', borderRadius: '8px'}}
                        loader={<LocalStyle.ProjectDappLogo src={logoDef} alt="DApp logo"/>}
                        unloader={<LocalStyle.ProjectDappLogo src={logoDef} alt="DApp logo"/>}
                        src={[item.logo]}
                      />
                      <Col>
                        <Text fontSize="18px" fontWeight="bold" color={theme.colors.text}>
                          {item.title}
                        </Text>
                        <LocalStyle.ProjectTextSub style={{width: '300px'}}>{item.intro}</LocalStyle.ProjectTextSub>
                        <Row mt="6px">
                          <LocalStyle.ProjectTips grey={false}>
                            {new BN(item.margin).toFixed(2).toString()} KCS
                          </LocalStyle.ProjectTips>
                          {item.priCategory && (
                            <LocalStyle.ProjectTips grey={true}>{item.priCategory.name}</LocalStyle.ProjectTips>
                          )}
                          {item.secCategory && (
                            <LocalStyle.ProjectTips grey={true}>{item.secCategory.name}</LocalStyle.ProjectTips>
                          )}
                        </Row>
                        <Row>
                          {item.telegram && renderMedia('telegram', item.telegram)}
                          {item.github && renderMedia('github', item.github)}
                          {item.twitter && renderMedia('twitter', item.twitter)}
                          {item.website && renderMedia('website', item.website)}
                        </Row>
                      </Col>
                    </LocalStyle.ProjectDappWrapper>
                  )
                })
              ) : (
                <Empty />
              )}
            </RowBetween>
          </Col>
        </RowBetween>
      </Container>
      <Footer />
    </>
  )
}

export default ProjectPage
