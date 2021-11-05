import React, { FunctionComponent, useEffect } from 'react'
import styled, { useTheme } from 'styled-components'
import { Text } from '../../style'
import Row from '../Row'
import Col from '../Column'

const EmptyImg = styled.img`
  height: 100px;
  width: 100px;
  margin: 0 auto;
`

const Line = styled.div`
  background: rgba(115, 126, 141, 0.16);
  width: 100%;
  height: 1px;
  margin: 17px 0;
`

const Button = styled(Row)`
  width: 129px;
  height: 32px;
  border: 1px solid #18BB97;
  box-sizing: border-box;
  border-radius: 20px;
  justify-content: center;
`

const ButtonText = styled.div`
  color: #18BB97;
  line-height: 32px;
  text-align: center;
`

const ButtonImg = styled.img`
  height: 16px;
  width: 16px;
  margin-left: 4px;
`

interface EmptyProps {
  onClick: () => void
} 

const MoreButton: React.FunctionComponent<EmptyProps> = (props) => {
  const theme = useTheme()
  return (
    <Col style={{alignItems: 'center'}}>
      <Line />
      <Button onClick={() => props.onClick()}>
        <ButtonText>Learn More</ButtonText>
        <ButtonImg src={require('../../assets/images/Icons/h5/down.png').default}/>
      </Button>
    </Col>
  )
}

export default MoreButton
