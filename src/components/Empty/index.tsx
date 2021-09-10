import React, { FunctionComponent, useEffect } from 'react'
import styled, { useTheme } from 'styled-components'
import { Text } from '../../style'
import Col from '../Column'

const EmptyImg = styled.img`
  height: 100px;
  width: 100px;
  margin: 0 auto;
`

interface EmptyProps {
  margin?: string
  content?: string
} 

const Empty: React.FunctionComponent<EmptyProps> = (props) => {
  const theme = useTheme()
  return (
    <Col style={{margin: props.margin ?? '90px auto 0 auto'}}>
      <EmptyImg src={require('../../assets/images/Icons/empty.png').default}/>
      <Text color={theme.colors.textSubtle} fontSize={'14px'} textAlign="center">{props.content ?? 'No Content'}</Text>
    </Col>
  )
}

export default Empty
