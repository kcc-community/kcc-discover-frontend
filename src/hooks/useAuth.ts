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
import { connectorLocalStorageKey, ConnectorNames } from '../style'
import { message } from 'antd'
import { connectorsByName } from 'connectors'
import { useTranslation } from 'react-i18next'

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()
  const { t } = useTranslation()
  const login = useCallback((connectorID: ConnectorNames) => {
    const connector = connectorsByName[connectorID]
    if (connector) {
      activate(connector, async (error: Error) => {
        window.localStorage.removeItem(connectorLocalStorageKey)
        if (error instanceof UnsupportedChainIdError) {
          message.error(t('Unsupported Chain Id Unsupported Chain Id Error. Check your chain Id.'))
        } else if (error instanceof NoEthereumProviderError) {
          message.error(t('Provider Error No provider was found'))
        } else if (
          error instanceof UserRejectedRequestErrorInjected ||
          error instanceof UserRejectedRequestErrorWalletConnect
        ) {
          if (connector instanceof WalletConnectConnector) {
            const walletConnector = connector as WalletConnectConnector
            walletConnector.walletConnectProvider = null
          }
          message.error(t('Authorization Error Please authorize to access your account'))
        } else if(error.message === "Request of type 'wallet_requestPermissions' already pending for origin http://localhost:3000. Please wait."){
          message.error('You have another unauthorized operation, please try again later.')
        }
         else {
          message.error((error.name ?? '') + error.message)
        }
      })
    } else {
      message.error(t("Can't find connector The connector config is wrong"))
    }
  }, [])

  return { login, logout: deactivate }
}

export default useAuth
