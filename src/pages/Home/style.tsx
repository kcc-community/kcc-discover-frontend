import styled from 'styled-components'
import { Text } from '../../style'
import Col from '../../components/Column'

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
  width: 40px;
  margin-right: 3px;
`

export const RankLogo = styled.img`
  width: 40px;
  margin-right: 12px;
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
`

export const CateLogo = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 12px;
`

