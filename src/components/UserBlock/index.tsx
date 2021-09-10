import React, { useState } from 'react'
import styled, { ThemeConsumer, useTheme } from 'styled-components'
import { ConnectorNames } from '../../constants/wallet'
import ConnectModal from './ConnectModal'
import AccountModal from './AccountModal'
import { Text } from '../../style'
import { ETHER } from 'mojito-testnet-sdk'
import { useActiveWeb3React } from 'hooks'
import { useCurrencyBalances } from 'state/wallet/hooks'
import { Dropdown, Menu, message } from 'antd'
import Row, { RowBetween } from '../Row'
import Col from '../Column'
import { rightDark, copy } from '../../constants/imgs'
import Copy from 'copy-to-clipboard'
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'

export type Login = (connectorId: ConnectorNames) => void

interface Props {
  account?: string
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
  margin-left: 18px;
  width: 110px;
  outline: none;
  white-space: nowrap;
  border: 1px solid ${({ theme }) => theme.colors.darkGrey};
  :hover{
    border: 1px solid ${({ theme }) => theme.colors.primary};
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
  height: 64px;
  width: 232px;
  border-radius: 4px;
  padding: 0 10px;
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

const UserBlock: React.FC<Props> = ({ account, login, logout }) => {
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null
  const [connectVisible, setCVisible] = useState(false)
  const [accountVisible, setAVisible] = useState(false)
  const balance = useCurrencyBalances(account ?? undefined, [ETHER])
  const history = useHistory()
  const theme = useTheme()
  const { t } = useTranslation()
  const menu = (
    <Menu>
      <Row mb="10px" ml="12px" style={{paddingTop: '12px'}}>
        <Text fontSize={'14px'} fontWeight={'500'} color={theme.colors.text}>{t("My Wallet")}</Text>
      </Row>
      <AccountWrapper onClick={() => {
        Copy(account ?? '');
        message.success('Copied');
      }}>
        <Col>
          <Text fontSize={'14px'} color={theme.colors.text} fontWeight="bold">{t("Connected Metamask")}</Text>
          <Text fontSize={'12px'} color={theme.colors.textSubtle} >{accountEllipsis}</Text>
        </Col>
        <CopyImg src={copy}/>
      </AccountWrapper>
      <Menu.Item>
        <RowBetween onClick={() => history.push('/account')}>
          <Text fontSize={'14px'} fontWeight={'500'} color={theme.colors.text}>{t("My Project")}</Text>
          <Row style={{width: 'auto'}}>
            <Text fontSize={'14px'} color={theme.colors.textSubtle} >2</Text>
            <RightImg src={rightDark}/>
          </Row>
        </RowBetween>
        
      </Menu.Item>
      <Menu.Item style={{width: '100%'}}>
        <RowBetween onClick={() => history.push('/account')}>
          <Text fontSize={'14px'} fontWeight={'500'} color={theme.colors.text}>{t("My Comment")}</Text>
          <Row style={{width: 'auto'}}>
            <Text fontSize={'14px'} color={theme.colors.textSubtle} >3</Text>
            <RightImg src={rightDark}/>
          </Row>
        </RowBetween>
      </Menu.Item>
    </Menu>
  )
  return (
    <>
      {account ? (
        <Dropdown overlay={menu}>
          <ConnectButton
            style={{width: 'auto', padding: '0 12px'}}
            onClick={() => {
              setAVisible(!accountVisible)
            }}
          > 
            <LinkImg src={require('../../assets/images/Icons/logo.png').default}/>
            <Text color={theme.colors.primary} fontSize={'14px'}>{accountEllipsis}</Text>
            <LinkButtonLine />
            <Text color={theme.colors.invertedContrast} fontSize={'14px'}>{balance[0]?.toSignificant(4) ?? 0} KCS</Text>
          </ConnectButton>
        </Dropdown>
      ) : (
        <ConnectButton
          onClick={() => {
            setCVisible(!connectVisible)
          }}
        >
          <ConnectButtonText> Connect </ConnectButtonText>
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
