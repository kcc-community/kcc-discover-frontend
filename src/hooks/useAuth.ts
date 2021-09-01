import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { connectorLocalStorageKey, ConnectorNames } from '../uikit'
import { message } from 'antd'
import { connectorsByName } from 'connectors'

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()

  const login = useCallback((connectorID: ConnectorNames) => {
    const connector = connectorsByName[connectorID]
    if (connector) {
      activate(connector, async (error: Error) => {
        window.localStorage.removeItem(connectorLocalStorageKey)
        if (error instanceof UnsupportedChainIdError) {
          message.error('Unsupported Chain Id Unsupported Chain Id Error. Check your chain Id.')
        } else if (error instanceof NoEthereumProviderError) {
          message.error('Provider Error No provider was found')
        } else if (
          error instanceof UserRejectedRequestErrorInjected ||
          error instanceof UserRejectedRequestErrorWalletConnect
        ) {
          if (connector instanceof WalletConnectConnector) {
            const walletConnector = connector as WalletConnectConnector
            walletConnector.walletConnectProvider = null
          }
          message.error('Authorization Error Please authorize to access your account')
        } else {
          message.error(error.name + error.message)
        }
      })
    } else {
      message.error("Can't find connector The connector config is wrong")
    }
  }, [])

  return { login, logout: deactivate }
}

export default useAuth
