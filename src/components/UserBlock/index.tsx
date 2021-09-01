import React, { useState } from 'react'
import styled from 'styled-components'
import { ConnectorNames } from '../../constants/wallet'
import ConnectModal from './ConnectModal'
import AccountModal from './AccountModal'

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
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.darkGrey};
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

const UserBlock: React.FC<Props> = ({ account, login, logout }) => {
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null
  const [connectVisible, setCVisible] = useState(false)
  const [accountVisible, setAVisible] = useState(false)
  return (
    <>
      {account ? (
        <ConnectButton
          onClick={() => {
            setAVisible(!accountVisible)
          }}
        >
          <ConnectButtonText>{accountEllipsis}</ConnectButtonText>
        </ConnectButton>
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
