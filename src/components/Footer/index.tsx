import React, { FunctionComponent, useEffect } from 'react'
import styled from 'styled-components'
import { Container, Text } from '../../style'
import Row, { RowBetween } from 'components/Row'
import Column from 'components/Column'
import { media } from '../../constants/home'
import { useResponsive } from 'utils/responsive'
import $ from 'jquery'

const FooterWrap = styled.div<{ transparent?: boolean }>`
  width: 100%;
  background: #262C3A;
  height: 220px;
  display: flex;
  align-items: center;
  margin-top: 40px;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 120px;
    margin-top: 0px;
    background: ${({ theme, transparent }) => `${transparent ? theme.colors.backgroundAlt : theme.colors.backgroundNav}`};
  }
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
  const { isMobile } = useResponsive()

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
        {
          isMobile ? 
          <Column style={{alignItems: 'center'}}>
            <Text color={'#FFFFFFCC'}>© 2022 Discover All rights reserved</Text>
            <Text color={'#B8C6D899'} fontSize="12px" maxWidth="330px" mt="5px" textAlign="center">{`<Risk Statement>`} All info in this site is purely educational and should only be used to inform your own research. We're not offering investment advice, endorsement of any project or approach, or promise of any outcome.</Text>
            <Row style={{width: 'auto', marginTop: '32px', marginLeft: '-24px'}}>
              {media.map((item, index) => renderMedia(item, index))}
            </Row>
          </Column>
          :
          <RowBetween>
            <Column>
              <Text color={'#FFFFFFCC'}>© 2022 Discover All rights reserved</Text>
              <Text color={'#B8C6D899'} fontSize="12px" maxWidth="800px" mt="5px">{`<Risk Statement>`} All info in this site is purely educational and should only be used to inform your own research. We're not offering investment advice, endorsement of any project or approach, or promise of any outcome.</Text>
            </Column>
            <Row style={{width: 'auto'}}>
              {media.map((item, index) => renderMedia(item, index))}
            </Row>
          </RowBetween>
        }
        
      </Container>
    </FooterWrap>
  )
}

export default Footer
