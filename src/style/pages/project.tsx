import styled from 'styled-components'
import { Text } from '../../style'
import Col from '../../components/Column'
import Row from '../../components/Row'


export const ProjectMenu = styled.div`
  width: 240px;
  min-height: 380px;
  background: linear-gradient(0deg, rgba(0, 20, 42, 0.04), rgba(0, 20, 42, 0.04)), #FFFFFF;
  border-radius: 8px;
  padding: 18px 0;
  margin-right: 40px;
`

export const ProjectItem = styled.div`
  height: 48px;
  width: 100%;
  padding: 0 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  :hover{
    background: ${({ theme }) => theme.colors.backgroundAlt};
  }
`

export const ProjectPoint = styled.img`
  height: 6px;
  width: 6px;
`

export const ProjectText = styled(Text)`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`

export const ProjectTextSub = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSubtle};
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
`

export const ProjectTextSubTwo = styled(Text)`
  font-size: 14px;
  line-height: 24px;
  letter-spacing: .5px;
  white-space: normal;
  word-break: break-all;
  color: ${({ theme }) => theme.colors.textSubtle};
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
`

export const ProjectDetailText = styled(Text)`
  font-size: 14px;
  line-height: 24px;
  letter-spacing: .5px;
  white-space: normal;
  word-break: break-all;
  color: ${({ theme }) => theme.colors.textSubtle};
`

export const ProjectInputWrapper = styled(Row)`
  width: 241px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #00142A1F;
  padding: 8px;
  flex-wrap: nowrap;
`

export const ProjectImgSearch = styled.img`
  height: 24px;
  width: 24px;
  margin-right: 8px;
`

export const ProjectInput = styled.input`
  outline: none;
  border: none;
  width: 100%;
  font-size: 14px;
  ::placeholder{
    color: #00142A3D;
  }
`

export const ProjectTab = styled(Text)<{ sec?: boolean }>`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ sec }) => sec ? '700' : '500'};
  border-bottom: 4px solid ${({ theme, sec }) => sec ? theme.colors.primary : 'transparent'};
  line-height: 30px;
  margin: 25px 35px 0 0;
  cursor: pointer;
  :hover{
    opacity: .75;
  }
`

export const ProjectDappWrapper = styled(Row)`
  height: 119px;
  width: 400px;
  margin-bottom: 40px;
  cursor: pointer;
  align-items: flex-start;
`

export const ProjectDappLogo = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 8px;
  margin-right: 20px;
`

export const ProjectDetailLogo = styled.img`
  height: 140px;
  width: 140px;
  border-radius: 8px;
  margin-right: 34px;
`

export const ProjectTips = styled.div<{ grey: boolean }>`
  background: ${({ grey, theme }) => grey ? `linear-gradient(0deg, rgba(0, 20, 42, 0.04), rgba(0, 20, 42, 0.04)), #FFFFFF` : theme.colors.backgroundTip};
  color: ${({ grey, theme }) => grey ? theme.colors.text : theme.colors.primary};
  border-radius: 4px;
  height: 20px;
  padding: 0 8px;
  font-size: 12px;
  line-height: 20px;
  margin-right: 8px;
  word-break: keep-all;
`

export const ProjectMedia = styled.a`
  width: 24px;
  height: 24px;
  background: linear-gradient(0deg, rgba(0, 20, 42, 0.08), rgba(0, 20, 42, 0.08)), #FFFFFF;
  border-radius: 24px;
  margin-right: 8px;
  justify-content: center;
  margin-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    opacity: .75;
  }
`

export const ProjectMediaImg = styled.img`
  width: 50%;
`

export const ProjectLine = styled.div`
  background: #737E8D29;
  height: 1px;
  width: 800px;
  margin: 40px 0;
`

export const ProjectRate = styled(Row)`
  width: 360px;
  height: 140px;
  border: 1px solid rgba(115, 126, 141, 0.16);
  border-radius: 8px;
  justify-content: center;
`

export const ProjectColLine = styled.div`
  height: 43px;
  width: 1px;
  background: rgba(115, 126, 141, 0.16);
`

export const ProjectButton = styled.a`
  display: flex;
  align-items: center;
  width: 160px;
  height: 36px;
  border-radius: 18px;
  margin-right: 24px;
  background: #18BB97;
  cursor: pointer;
  justify-content: center;
  color: ${({ theme }) => theme.colors.invertedContrast};
  font-size: 16px;
  font-weight: bold;
  :hover {
    color: ${({ theme }) => theme.colors.invertedContrast};
  }
`

export const ProjectImgSend = styled.img`
  margin-left: 10px;
  width: 12px;
  height: 12px;
`

export const ProjectImgEdit = styled.img`
  margin-right: 5px;
  width: 24px;
  height: 24px;
`

export const ProjectImgHand = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 7px;
`

export const ProjectImgDown = styled.img`
  margin-left: 5px;
  width: 16px;
  height: 16px;
`

export const ProjectImgCamera = styled.img`
  width: 32px;
  height: 32px;
  margin: 0 auto 5px auto;
`

export const ProjectHiddenDetail = styled.div`
  font-size: 14px;
  line-height: 24px;
  letter-spacing: .5px;
  white-space: normal;
  word-break: break-all;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  display: none;
`







