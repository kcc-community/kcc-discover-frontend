import { getAddress } from '@ethersproject/address'
import { Contract } from '@ethersproject/contracts'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { AddressZero } from '@ethersproject/constants'
import { BigNumber } from '@ethersproject/bignumber'
import web3 from 'web3'
import {networks, NetworkType} from '../constants/network'

// returns the check summed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

export function uriToHttp(uri: string): string[] {
  const protocol = uri.split(':')[0].toLowerCase()
  switch (protocol) {
    case 'https':
      return [uri]
    case 'http':
      return [`https${  uri.substr(4)}`, uri]
    case 'ipfs':
      const hash = uri.match(/^ipfs:(\/\/)?(.*)$/i)?.[2]
      return [`https://cloudflare-ipfs.com/ipfs/${hash}/`, `https://ipfs.io/ipfs/${hash}/`]
    case 'ipns':
      const name = uri.match(/^ipns:(\/\/)?(.*)$/i)?.[2]
      return [`https://cloudflare-ipfs.com/ipns/${name}/`, `https://ipfs.io/ipns/${name}/`]
    default:
      return []
  }
}

export function getUrlParam(key) {
  const href = window.location.href.replace(/(?=#)(.*)(?=\?)/, '');
  const url = new URL(href);
  return url.searchParams.get(key);
}

export function hashSpilt(str: string ,nums?: number){
  let strNum = nums ?? 4;
  let res = ''
  if(str.length > (strNum * 2)){
    res = str.substr(0, strNum) + '...' + str.substr(-strNum);
  } 
  return res
}

// add 10%
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000))
}


const {utils} = new web3()
export const web3Utils = utils

export function getNetworkInfo(networkId): NetworkType {
    return networks[networkId]
}