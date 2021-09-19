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
  width: 324px;
  padding: 24px;
`

export const RankImg = styled.div`
  width: 55px;
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
  width: 360px;
  height: 114px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const UserCard = styled(Col)`
  width: 360px;
  height: 460px;
  border-radius: 8px;
  cursor: pointer;
  color: ${({ theme }) => `${theme.colors.secondary}`};
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  :hover {
    background: ${({ theme }) => `${theme.colors.backgroundAlt}`};
    color: ${({ theme }) => `${theme.colors.primary}`};
    #discover-line {
      background: ${({ theme }) => `${theme.colors.primary}`};
    }
  }
`
export const UserLine = styled.div`
  margin: 19px 0 13px 0;
  width: 32px;
  height: 4px;
  background: ${({ theme }) => `${theme.colors.secondary}`};
`

export const UserLogo = styled.img`
  width: 160px;
  margin-bottom: 20px;
`

export const CateItem = styled(cardTransparent)`
  width: 170px;
  height: 170px;
  margin-bottom: 148px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
  height: 400px;
`

export const SliderBottom = styled(RowBetween)`
  position: absolute;
  bottom: 0;
  width: 880px;
  height: 60px;
  background: #00000099;
  display: flex;
  align-items: center;
  padding: 0 25px;
`

export const SliderBottomBall = styled.img`
  width: 30px;
  height: 30px;
`

export const SliderRight = styled.div`
  width: 40px;
  height: 40px;
  background: #FFFFFF66;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  transform: translate(0, -50%);
  position: absolute;
  z-index: 999;
  right: 190px;
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
  width: 12px;
  height: 12px;
  border-radius: 24px;
  background: #B8C6D8;
  margin-right: 12px;
  margin-top: 16px;
`

export const SliderPointNormal = styled(SliderPointSec)`
  background: #B8C6D866;
`

