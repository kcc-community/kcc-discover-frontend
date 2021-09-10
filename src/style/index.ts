import { FC } from 'react'
import { SvgProps } from './components/Svg/types'

export enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
}

export type Login = (connectorId: ConnectorNames) => void

export interface Config {
  title: string
  connectorId: ConnectorNames
}

export const connectorLocalStorageKey = 'connectorId'

export * from "./components/Text";
export * from "./components/Button";
export * from "./components/Svg";
export * from "./components/Link";
export * from "./components/Box";
export * from "./components/Container";

