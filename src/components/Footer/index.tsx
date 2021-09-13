import React, { FunctionComponent, useEffect } from 'react'
import styled from 'styled-components'
import { Container, Text } from '../../style'
import Row, { RowBetween } from 'components/Row'
import { media } from '../../constants/home'
import $ from 'jquery'

const FooterWrap = styled.div<{ transparent?: boolean }>`
  width: 100%;
  height: 120px;
  background: ${({ theme, transparent }) => `${transparent ? theme.colors.backgroundAlt : theme.colors.backgroundNav}`};
  display: flex;
  align-items: center;
`

const MediaItem = styled.a`
  height: 42px;
  width: 42px;
  border-radius: 20px;
  background: #FFFFFF33;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 24px;
  :hover{
    background: #B8C6D8;
    // opacity: .75;
  }
`

interface FooterProps {
  transparent?: boolean
} 

const Footer: React.FunctionComponent<FooterProps> = (props) => {
  useEffect(() => {
    for(let index in media){
      $('.' + media[index].app).hover(function(){
        $('.' + media[index].app + 'Logo').attr('src', media[index].hover)
      }, function(){
        $('.' + media[index].app + 'Logo').attr('src', media[index].icon)
      })
    }
  }, [])

  const renderMedia = (data, index) => {
    return(
      <MediaItem href={data?.route} target="_blank" key={index} className={data?.app}>
        <img src={data?.icon} style={{width: '20px'}} alt={data?.app} className={data?.app + 'Logo'}/> 
      </MediaItem>
    )
  }

  return (
    <FooterWrap transparent={props?.transparent}>
      <Container>
        <RowBetween>
          <Text color={'#FFFFFFCC'}>© 2021 Discover KCC All rights reserved</Text>
          <Row style={{width: 'auto'}}>
            {media.map((item, index) => renderMedia(item, index))}
          </Row>
        </RowBetween>
      </Container>
    </FooterWrap>
  )
}

export default Footer
