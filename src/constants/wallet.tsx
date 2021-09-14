export const NetworkContextName = 'NETWORK'
export const connectorLocalStorageKey = 'connectorId'

export enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
}

export const WalletList: any[] = [
  {
    id: 0,
    name: 'MetaMask',
    logo: require('../assets/images/home/logo.png').default,
  },
]

export const supportedChainIds = [4, 321, 322];
