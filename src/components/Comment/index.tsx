import React, { FunctionComponent, useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { Container, Text } from '../../style'
import Row, { RowBetween } from 'components/Row'
import Col from 'components/Column'
import { good, goodSec, bad, badSec, del, logoDef } from '../../constants/imgs'
import { hashSpilt } from '../../utils'
import * as LocalStyle from '../../style/pages'
import { Rate, message } from 'antd'
import dayjs from 'dayjs'
import { useWeb3React } from '@web3-react/core'
import { useCommentLike, useCommentDelete } from '../../hooks/useDiscoverContract'
import { Img } from 'react-image'


const CommentWrapper = styled.div`
  width: 800px;
  margin-bottom: 40px;
`

const ImgDel = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`

interface CommentProps {
  id: number
  app: string
  address?: string 
  attitude?: number | null 
  createTime: string
  title: string
  content: string
  likeCount: number
  dislikeCount: number
  score: number
  type?: string
  logo?: string
  application?: any
}

const Comment: React.FunctionComponent<CommentProps> = (props) => {
  const theme = useTheme()
  const { account, library, chainId } = useWeb3React()
  const [show, setShow] = useState(false)
  const splitComment = (content) => {
    if(content.length > 160 && !show){
      return content.substr(0, 160) + '...'
    }
    return content
  }
  const dealStatus = (type: boolean) => {
    if(!account || !chainId) return;
    let params = {
      projectAddress: props.app,
      reviewer: props.address,
      isLike: type ? (props.attitude === 1 ? 0 : 1) : (props.attitude === 2 ? 0 : 2)
    }
    console.log('params =', params);
    const { commentLikeCallback } = useCommentLike(params, library);
    commentLikeCallback().then(res => {
      console.log('comment action: ', res);
    }).catch(e => {
      message.error('Contract call error')
    })
  }

  const deleteComment = () => {
    if(!account || !chainId) return;
    let params = {
      projectAddress: props.app,
    }
    const { commentDeleteCallback } = useCommentDelete(params, library);
    commentDeleteCallback().then(res => {
      console.log('delete action: ', res);
      if(res){
        message.success('Success Delete, please check later')
      }
    }).catch(e => {
      message.error('Contract call error')
    })
  }

  const renderHand = (type: string) => {
    if(type === 'good'){
      return(
        <Row mr="30px" style={{width: 'auto', cursor: 'pointer'}} onClick={() => {dealStatus(true)}}>
          <LocalStyle.ProjectImgHand src={(props.attitude === 1) ? goodSec : good}/>
          <Text fontSize="14px" color={theme.colors.text}>{props.likeCount}</Text>
        </Row>
      )
    }
    return(
      <Row style={{width: 'auto', cursor: 'pointer'}} onClick={() => {dealStatus(false)}}>
        <LocalStyle.ProjectImgHand src={(props.attitude === 2) ? badSec : bad}/>
        <Text fontSize="14px" color={theme.colors.text}>{props.dislikeCount}</Text>
      </Row>
    )
  }

  if(props.type === 'mine'){
    return(
      <CommentWrapper key={props.id} style={{width: '720px'}}>
        <RowBetween align="flex-start" style={{flexWrap: 'nowrap'}}>
          <Row align="flex-start" style={{flexWrap: 'nowrap'}}>
            <Img 
              style={{width: '40px', height: '40px', marginRight: '18px', borderRadius: '8px', marginTop: '5px'}}
              loader={<LocalStyle.AccountImgDApp src={logoDef} alt="DApp logo"/>}
              unloader={<LocalStyle.AccountImgDApp src={logoDef} alt="DApp logo"/>}
              src={[props.application.logo as string]}/>
            <Col>
              <RowBetween>
                <Row mb="5px">
                  <Text fontWeight="bold" color={theme.colors.text} mr="20px">{props.title}</Text>
                  <Rate allowHalf disabled value={props.score / 10}/>
                  <LocalStyle.ProjectTextSub ml="20px">{dayjs(props.createTime).format('YYYY-MM-DD') }</LocalStyle.ProjectTextSub>
                </Row>
              </RowBetween>
              <Row style={{position: 'relative'}}>
                <Text fontSize={'14px'} color={theme.colors.textSubtle} style={{letterSpacing: '.2px', wordBreak: 'break-all'}}>
                  {splitComment(props.content)}
                </Text>
                {props.content.length > 160 && <Text onClick={() => setShow(!show)} color={theme.colors.primary} fontWeight="bold" style={{position: 'absolute', bottom: 0, right: 0, cursor: 'pointer', lineHeight: '16px'}}>{show ? 'Fold' : 'Unfold'}</Text>}
              </Row>
              <Row mt="15px">
                {renderHand('good')}
                {renderHand('bad')}
              </Row>
            </Col>
          </Row>
          <ImgDel src={del} onClick={() => deleteComment()}/>
        </RowBetween>
      </CommentWrapper>
    )
  }

  return (
    <CommentWrapper key={props.id}>
      <RowBetween>
        <LocalStyle.ProjectTextSub>{hashSpilt(props.address as string, 8)}</LocalStyle.ProjectTextSub>
        <LocalStyle.ProjectTextSub>{dayjs(props.createTime).format('YYYY-MM-DD') }</LocalStyle.ProjectTextSub>
      </RowBetween>
      <Row mt="5px" mb="5px">
        <Text fontWeight="bold" color={theme.colors.text} mr="20px">{props.title}</Text>
        <Rate allowHalf disabled value={props.score / 10} />
      </Row>
      <Row style={{position: 'relative', flexWrap: 'nowrap'}}>
        <Text fontSize={'14px'} color={theme.colors.textSubtle} style={{letterSpacing: '.2px', wordBreak: 'break-all'}}>
          {splitComment(props.content)}
        </Text>
        {props.content.length > 210 && <Text onClick={() => setShow(!show)} color={theme.colors.primary} fontWeight="bold" style={{position: 'absolute', bottom: 0, right: 0, cursor: 'pointer', lineHeight: '16px'}}>{show ? 'Fold' : 'Unfold'}</Text>}
      </Row>
      <Row mt="15px">
        {renderHand('good')}
        {renderHand('bad')}
      </Row>
    </CommentWrapper>
  )
}

export default Comment
