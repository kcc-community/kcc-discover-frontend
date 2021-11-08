import styled, { keyframes } from 'styled-components'
import { Text } from '../../style'
import Col from '../../components/Column'
import { RowBetween } from '../../components/Row'


const cardTransparent = styled.div`
  background: ${({ theme }) => `${theme.colors.backgroundAlt}`};
  border-radius: 8px;
`

export const RankCard = styled(cardTransparent)`
  height: 419px;
  width: 334px;
  padding: 24px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 324px;
  }
`

export const RankImg = styled.div`
  width: 55px;
  display: flex;
  align-items: center;
`

export const RankLogo = styled.img`
  width: 40px;
  margin-right: 12px;
  border-radius: 4px;
`

export const RankDAppLogo = styled.img`
  width: 40px;
  margin-right: 13px;
`

export const RightImg = styled.img`
  width: 8px;
`

export const RankItem = styled.a`
  cursor: pointer;
  margin-bottom: 26px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const SecondText = styled(Text)`
  color: ${({ theme }) => `${theme.colors.secondary}`};
  font-weight: 700;
  font-size: 32px;
`

export const InfoCard = styled(cardTransparent)`
  width: 343px;
  height: 114px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 360px;
  }
`

export const UserCardContainer = styled.div`
  position: relative
`

export const UserCard = styled(Col)`
  width: 343px;
  height: 460px;
  border-radius: 8px;
  cursor: pointer;
  background: ${({ theme }) => `${theme.colors.backgroundAlt}`};
  color: ${({ theme }) => `${theme.colors.primary}`};
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  top: 0;
  transition: top .3s linear;
  position: relative;
  #discover-line {
    background: ${({ theme }) => `${theme.colors.primary}`};
  }
  :hover {
    top: -10px;
    background: ${({ theme }) => `${theme.colors.backgroundAlt}`};
    color: ${({ theme }) => `${theme.colors.primary}`};
    #discover-line {
      background: ${({ theme }) => `${theme.colors.primary}`};
    }
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 120px;
    width: 360px;
    background: transparent;
    color: ${({ theme }) => `${theme.colors.secondary}`};
    #discover-line {
      background: transparent;
    }
  }
`
export const UserLine = styled.div`
  margin: 19px 0 13px 0;
  width: 32px;
  height: 4px;
  background: transparent;
`

export const UserLogo = styled.img`
  width: 160px;
  margin-bottom: 20px;
`

export const CateItem = styled(cardTransparent)`
  width: 164px;
  height: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  top: 0;
  margin: 0 8px 16px 8px;
  transition: top .2s linear;
  // :hover{
  //   top: -10px;
  // }
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 170px;
    margin: 0 36px 148px 0;
  }
`

export const CateLogo = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 12px;
`

export const SliderWrapper = styled.a`
  width: 880px !important;
  position: relative;
  cursor: pointer;
`

export const SliderCard = styled.img`
  width: 880px !important;
  height: 156px;
  border-radius: 8px;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 400px;
  }
`

export const SliderBottom = styled(RowBetween)`
  position: absolute;
  bottom: 0;
  width: 343px;
  height: 23px;
  background: #00000099;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 0 10px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 880px;
    height: 60px;
    padding: 0 25px;
  }
`

export const SliderBottomBall = styled.img`
  width: 12.5px;
  height: 12.5px;
  border-radius: 15px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 30px;
    height: 30px;
  }
`

export const SliderRight = styled.div`
  width: 40px;
  height: 40px;
  background: #C6C6C666;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  transform: translate(0, -50%);
  position: absolute;
  z-index: 999;
  right: 190px;
  cursor: pointer;
  :active{
    opacity: .7;
  }
`

export const SliderLeft = styled(SliderRight)`
  left: 190px;
`

export const SliderImg = styled.img`
  width: 8.5px;
  height: 14px;
`

export const SliderPointSec = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 24px;
  background: #B8C6D8;
  margin-right: 16px;
  margin-top: 16px;
`

export const SliderPointNormal = styled(SliderPointSec)`
  background: #B8C6D866;
  cursor: pointer;
`

