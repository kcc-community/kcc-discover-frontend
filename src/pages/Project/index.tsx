import React, { FunctionComponent, useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { ApiService, useLoading } from '../../api'
import { Container, Text } from '../../style'
import { sec, search, website, twitter, github, telegram } from '../../constants/imgs';
import Row, { RowBetween } from 'components/Row'
import Col from 'components/Column'
import Empty from 'components/Empty'
import BN from 'bignumber.js'
import { Skeleton } from 'antd';
import * as LocalStyle from '../../style/pages'
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer'

interface DappFilterParams {
  limit: number
  pri?: number
  sec?: number
  title?: string
}

const ProjectPage: React.FunctionComponent = (props) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const [primarySec, setPrimary] = useState<{
    name: string
    nums: number
    index?: number
  }>({name: 'All', nums: 0})
  const [subSec, setSub] = useState<{
    name: string
    nums: number
    index?: number
  }>({name: 'All', nums: 0})
  const [content, setInput] = useState(null)
  const [primaryList, setPList] = useState([{name: 'All', nums: 0}])
  const [subList, setSList] = useState([{name: 'All', nums: 0}])
  const [dappList, setDapp] = useState([])
  const [cateLoading, getCategoryList] = useLoading(ApiService.getDappCategory)
  const [dappLoading, getDappList] = useLoading(ApiService.getDappList)
  const history = useHistory();

  useEffect(() => {
    Promise.all([
      getDappList({limit: 100}),
      getCategoryList()
    ]).then((res: any) => {
      let primary: object[] = [{name: 'All', nums: res[0]?.total}], sub: object[] = [{name: 'All', nums: res[0]?.total}];
      for(let item of res[1]){
        if(item?.level === 1){ primary.push(item) }
        if(item?.level === 2){ sub.push(item) }
      }
      setDapp(res[0].list);
      setPList(primary as any);
      setSList(sub as any);
    })
  }, [])

  /*** filter DApp  ***/
  useEffect(() => {
    let params: DappFilterParams = {limit: 100};
    if(primarySec.name !== 'All') params.pri = primarySec?.index;
    if(subSec.name !== 'All') params.sec = subSec?.index;
    if(content) params.title = content;
    getDappList(params).then((res: any) => {
      if(content){ setPrimary(primaryList[0]); setSub(subList[0]); }
      setDapp(res.list);
    })
  }, [primarySec, subSec, content])
  
  const renderMenuItem = (data: any) => {
    const HiddenPoint = <div style={{width: '6px'}}/>
    return(
      <LocalStyle.ProjectItem 
        onClick={() => {setSub(data)}}
        style={{background: subSec.name === data?.name ? theme.colors.invertedContrast : 'transparent'}}>
        <Row>
          {subSec.name === data?.name ? <LocalStyle.ProjectPoint src={sec}/> : HiddenPoint}
          <LocalStyle.ProjectText style={{margin: '0 12px 0 7px', fontWeight: subSec.name === data?.name ? 'bold' : 'normal'}}>{data?.name}</LocalStyle.ProjectText>
          <LocalStyle.ProjectTextSub>{data?.nums}</LocalStyle.ProjectTextSub>
        </Row>
      </LocalStyle.ProjectItem>
    )
  }

  const renderSearch = () => {
    return(
      <LocalStyle.ProjectInputWrapper>
        <LocalStyle.ProjectImgSearch src={search}/>
        <LocalStyle.ProjectInput placeholder={t('Search')} onChange={(e) => setInput(e.target.value as any)}/>
      </LocalStyle.ProjectInputWrapper>
    )
  }

  const renderPriTab = () => {
    return(
      <Row mb="32px">
        {
          primaryList.map(item => { 
            return(
              <LocalStyle.ProjectTab 
                onClick={() => {setPrimary(item)}}
                sec={item?.name === primarySec?.name}>{item.name}
              </LocalStyle.ProjectTab> 
            )
          })
        }
      </Row>
    )
  }

  const renderMedia = (type: string, url: string) => {
    const logo = {
      'telegram': telegram,
      'github': github,
      'twitter': twitter,
      'website': website,
    };
    return(
      <LocalStyle.ProjectMedia href={url} target="_blank">
        <LocalStyle.ProjectMediaImg src={logo[type]}/>
      </LocalStyle.ProjectMedia>
    )
  }

  return (
    <>
      <Container style={{minHeight: '80vh'}}>
        <RowBetween style={{marginTop: '40px', alignItems: 'flex-start'}}>
          <LocalStyle.ProjectMenu>
            <LocalStyle.ProjectText ml="21px" mb="17px">{t("Categories")}</LocalStyle.ProjectText>
            { 
              cateLoading ? 
              <LocalStyle.ProjectItem style={{height: 'auto'}}><Skeleton paragraph={{ rows: 5 }} /></LocalStyle.ProjectItem>
              :
              subList.map(item => renderMenuItem(item)) 
            }
          </LocalStyle.ProjectMenu>
          <Col style={{flex: 1}}>
            {renderSearch()}
            {renderPriTab()}
            <RowBetween style={{flexWrap: 'wrap'}}>
              { 
                dappLoading || cateLoading ?
                <Skeleton avatar paragraph={{ rows: 4 }} />
                :
                (dappList.length ?
                  dappList.map((item: any) => {
                    return(
                      <LocalStyle.ProjectDappWrapper key={item.id} onClick={() => history.push(`/project_detail?name=${item.name}`)}>
                        <LocalStyle.ProjectDappLogo src={require('../../assets/images/home/banner.png').default}/>
                        <Col>
                          <Text fontSize="18px" fontWeight="bold" color={theme.colors.text}>{item.title}</Text>
                          <LocalStyle.ProjectTextSub>{item.intro}</LocalStyle.ProjectTextSub >
                          <Row mt="6px">
                            <LocalStyle.ProjectTips grey={false}>{new BN(item.margin).toFixed(2).toString()} KCS</LocalStyle.ProjectTips>
                            {item.priCategory && <LocalStyle.ProjectTips grey={true}>{item.priCategory.name}</LocalStyle.ProjectTips>}
                            {item.secCategory && <LocalStyle.ProjectTips grey={true}>{item.secCategory.name}</LocalStyle.ProjectTips>}
                          </Row>
                          <Row>
                            {item.telegram && renderMedia('telegram', item.telegram)}
                            {item.github && renderMedia('github', item.github)}
                            {item.twitter && renderMedia('twitter', item.twitter)}
                            {item.website &&  renderMedia('website', item.website)}
                          </Row>
                        </Col>
                      </LocalStyle.ProjectDappWrapper>
                    )
                  })
                  : 
                  <Empty />
                )
              }
            </RowBetween>
          </Col>
        </RowBetween>
      </Container>
      <Footer />
    </>
  )
}

export default ProjectPage
