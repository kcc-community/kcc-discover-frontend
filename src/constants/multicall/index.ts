import { ChainId } from 'mojito-testnet-sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x6367360366E4c898488091ac315834B779d8f561',
  [ChainId.TESTNET]: '0x6367360366E4c898488091ac315834B779d8f561',
}

export { MULTICALL_ABI, MULTICALL_ADDRESS }
