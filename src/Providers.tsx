import React from 'react'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { Provider } from 'react-redux'
import { NetworkContextName } from './constants/wallet'
import store from './state'
import getLibrary from './utils/getLibrary'
import { ThemeContextProvider } from './ThemeContext'
import { ConfigProvider } from 'antd'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <ConfigProvider>
          <Provider store={store}>
            <ThemeContextProvider>
              {children}
            </ThemeContextProvider>
          </Provider>
        </ConfigProvider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}

export default Providers
