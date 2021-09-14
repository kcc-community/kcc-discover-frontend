import styled from 'styled-components'
import { Text } from '../../style'
import Col from '../../components/Column'
import Row from '../../components/Row'

export const AccountEye = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 8px;
  cursor: pointer;
`

export const AccountImgCopy = styled.img`
  width: 18px;
  height: 18px;
  margin-left: 12px;
  cursor: pointer;
`

export const AccountCard = styled.div<{ width?: string, height?: string }>`
  width: ${({ width }) => width ?? '596px'};
  height: ${({ height }) => height ?? '224px'};
  background: ${({ theme }) => theme.colors.invertedContrast};;
  border: 1px solid rgba(115, 126, 141, 0.16);
  border-radius: 8px;
  padding: 20px 24px;
  position: relative;
`

export const AccountLine = styled.div`
  background: #737E8D29;
  height: 1px;
  width: 100%;
  margin: 16px 0 20px 0;
`

export const AccountImgEdit = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`

export const AccountImgDApp = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 18px;
  border-radius: 8px;
`

export const AccountStatusShow = styled.div<{ status?: string, color?: string }>`
  height: 24px;
  padding: 0 8px;
  border-radius: 4px;
  background: ${({ status, theme }) => status ?? theme.colors.backgroundTip};
  color: ${({ color, theme }) => color ?? theme.colors.primary};
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;
  text-align: center;
`

export const AccountTransContent = styled.div`
  height: 200px;
`

export const AccountReviewContent = styled.div`
  height: 465px;
`

export const AccountExplore = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 15px;
`





