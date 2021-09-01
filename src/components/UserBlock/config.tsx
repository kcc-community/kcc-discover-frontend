import Metamask from './icons/Metamask'
import WalletConnect from './icons/WalletConnect'
import { Config, ConnectorNames } from './types'

const connectors: Config[] = [
  {
    title: 'Metamask',
    icon: Metamask,
    connectorId: ConnectorNames.Injected,
  },
  {
    title: 'WalletConnect',
    icon: WalletConnect,
    connectorId: ConnectorNames.WalletConnect,
  },
]

export default connectors
export const connectorLocalStorageKey = 'connectorId'
