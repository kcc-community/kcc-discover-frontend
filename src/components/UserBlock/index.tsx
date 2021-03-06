import React, { useState } from 'react'
import styled, { ThemeConsumer, useTheme } from 'styled-components'
import { ConnectorNames } from '../../constants/wallet'
import ConnectModal from './ConnectModal'
import AccountModal from './AccountModal'
import { Text } from '../../style'
import { ETHER } from 'mojito-sdk'
import { useActiveWeb3React } from 'hooks'
import { useCurrencyBalances } from 'state/wallet/hooks'
import { Dropdown, Menu, message } from 'antd'
import Row, { RowBetween } from '../Row'
import Col from '../Column'
import { supportedChainIds } from '../../constants/wallet'
import { rightDark, copy } from '../../constants/imgs'
import Copy from 'copy-to-clipboard'
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useChainError } from '../../state/wallet/hooks'
import { switchNetwork } from '../../utils/wallet'
import { useResponsive } from 'utils/responsive'
import LinkExternal from '../../style/components/Link/LinkExternal'

import useAccountInfo from '../../hooks/useAccount'
import BN from 'bignumber.js'

export type Login = (connectorId: ConnectorNames) => void

interface Props {
  account?: string
  chainId?: number
  login: Login
  logout: () => void
}

const ConnectButton = styled.div`
  align-items: center;
  border-radius: 18px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  height: 36px;
  justify-content: center;
  margin: 0px;
  min-width: 90px;
  padding: 0 12px;
  outline: none;
  white-space: nowrap;
  position: relative;
  z-index: 1;
  border: 1px solid ${({ theme }) => theme.colors.darkGrey};
  :hover{
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 120px;
    padding: 0 24px;
    margin-left: 18px;
  }
`

const ConnectButtonText = styled.div`
  height: 36px;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 16px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const LinkButtonLine = styled.div`
  background: #9298A0;
  width: 1px;
  height: 12px;
  margin: 0 12px;
`

const LinkImg = styled.img`
  width: 16px;
  height: 15px;
  margin-right: 8px;
`

const AccountWrapper = styled(RowBetween)`
  background: ${({ theme }) => theme.colors.gradients.hovercard};
  width: 232px;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
`

const CopyImg = styled.img`
  width: 16px;
  height: 16px;
`

const RightImg = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 3px;
  cursor: pointer;
`

const VisitExplorer = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`

const VisitImg = styled.img`
  width: 16px;
  height: 16px;
`

const UserBlock: React.FC<Props> = ({ account, chainId, login, logout }) => {
  const { isMobile } = useResponsive()
  const accountEllipsis = account ? `${account.substring(0, 4)}...${!isMobile ? account.substring(account.length - 4) : ''}` : null
  const accountDropDownEllipsis = account ? `${account.substring(0, 8)}...${account.substring(account.length - 8)}` : null
  const [connectVisible, setCVisible] = useState(false)
  const [accountVisible, setAVisible] = useState(false)
  const balance = useCurrencyBalances(account ?? undefined, [ETHER])
  const accountInfo = useAccountInfo(account, chainId)
  const projectCount = accountInfo.project.state === 'None' ? 0 : 1
  const commentCount = accountInfo.review.total
  const history = useHistory()
  const theme = useTheme()
  const { t } = useTranslation()
  const chainError = useChainError()
  const walletStatus = () => {
    if(chainError) { return chainError }
    return 'Connect'
  }
  const menu = (
    <Menu>
      <Row mb="10px" ml="12px" style={{paddingTop: '12px'}}>
        <Text fontSize={'14px'} fontWeight={'500'} color={theme.colors.text}>{t("My Wallet")}</Text>
      </Row>
      <Row style={{padding: '0 12px'}}>
        <AccountWrapper onClick={() => {
          Copy(account ?? '');
          message.success('Copied');
        }}>
          <Col>
            <Text fontSize={'14px'} color={theme.colors.text} fontWeight="bold">{t("Connected")}</Text>
            <Text fontSize={'12px'} color={theme.colors.textSubtle}>{accountDropDownEllipsis}</Text>
          </Col>
          <CopyImg src={copy}/>
          {
            isMobile ? 
            <VisitExplorer target="_blank" href={`https://explorer.kcc.io/address/${account}`}>
              <LinkExternal style={{ fontSize: '12px' }} small href={`https://explorer.kcc.io/address/${account}`} mt="2px" mr="8px">
                View on KCC Explorer
              </LinkExternal>
              <VisitImg src={require('../../assets/images/Icons/h5/send.png').default}/>
            </VisitExplorer>
            : null
          }
        </AccountWrapper>
      </Row>
      <Menu.Item key="account">
        <RowBetween onClick={() => history.push('/account')}>
          <Text fontSize={'14px'} fontWeight={'500'} color={theme.colors.text}>{t("My Project")}</Text>
          <Row style={{width: 'auto'}}>
            <Text fontSize={'14px'} color={theme.colors.textSubtle}>{projectCount}</Text>
            <RightImg src={rightDark}/>
          </Row>
        </RowBetween>
      </Menu.Item>
      <Menu.Item style={{width: '100%'}} key="comment">
        <RowBetween onClick={() => history.push('/account')}>
          <Text fontSize={'14px'} fontWeight={'500'} color={theme.colors.text}>{t("My Comment")}</Text>
          <Row style={{width: 'auto'}}>
            <Text fontSize={'14px'} color={theme.colors.textSubtle}>{commentCount}</Text>
            <RightImg src={rightDark}/>
          </Row>
        </RowBetween>
      </Menu.Item>
      {
        isMobile &&
        <Menu.Item style={{width: '100%'}} key="out">
          <RowBetween onClick={logout}>
            <Text fontSize={'14px'} fontWeight={'500'} color={'#EB6666'}>{t("Login Out")}</Text>
            <VisitImg src={require('../../assets/images/Icons/h5/out.png').default}/>
          </RowBetween>
        </Menu.Item>
      }
    </Menu>
  )
  return (
    <>
      {account && walletStatus() === 'Connect' ? (
        <Dropdown overlay={menu}>
          <ConnectButton
            style={{width: 'auto', padding: '0 12px'}}
            onClick={() => {
              if(!isMobile){
                setAVisible(!accountVisible)
              }
            }}
          > 
            <LinkImg src={require('../../assets/images/Icons/logo.png').default}/>
            <Text color={theme.colors.primary} fontSize={'14px'}>{accountEllipsis}</Text>
            { !isMobile && 
              <>
                <LinkButtonLine />
                <Text color={theme.colors.invertedContrast} fontSize={'14px'}>{balance[0] ? new BN(balance[0]?.toSignificant(18)).toFixed(2, 1) : 0} KCS</Text>
              </>
            }
            
          </ConnectButton>
        </Dropdown>
      ) : (
        <ConnectButton
          onClick={() => {
            if(chainError && window.ethereum){
              switchNetwork(Number(process.env.REACT_APP_CHAIN_ID))
              return;
            } 
            setCVisible(!connectVisible)
          }}
        >
          <ConnectButtonText> {walletStatus()} </ConnectButtonText>
        </ConnectButton>
      )}
      <ConnectModal 
        login={login}
        onCancel={() => setCVisible(!connectVisible)} 
        visible={connectVisible}/>
      <AccountModal 
        account={account as string}
        logout={logout}
        onCancel={() => setAVisible(!accountVisible)} 
        visible={accountVisible}/>
    </>
  )
}

export default React.memo(
  UserBlock,
  (prevProps, nextProps) =>
    prevProps.account === nextProps.account &&
    prevProps.login === nextProps.login &&
    prevProps.logout === nextProps.logout
)
