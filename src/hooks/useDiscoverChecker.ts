import { TransactionResponse } from '@ethersproject/providers'
import { calculateGasMargin } from '../utils'
import { BigNumber } from '@ethersproject/bignumber'
import BN from 'bignumber.js'
import { Contract } from 'ethers'
import { JsonRpcProvider } from '@ethersproject/providers'
import discoverAbi from '../constants/abis/discover.json'
import addresses from '../constants/contract'

export const getAddress = (address: any): string => {
  const mainNetChainId = 321
  const chainId = process.env.REACT_APP_CHAIN_ID as any
  return address[chainId] ? address[chainId] : address[mainNetChainId]
}

export const getDiscoverContract = (library: any) => {
  const signer = library?.getSigner()
  const provider = signer ?? new JsonRpcProvider(process.env.REACT_APP_NETWORK_URL).getSigner()

  return new Contract(getAddress(addresses.discover), discoverAbi, provider)
}

export async function useRole(address?: string | null | undefined , library?: any){
  if(!library || !address) return
  const distributorContract = getDiscoverContract(library)
  console.log('address =', address, distributorContract)
  const hasRole = await distributorContract.hasRole('0x0ce23c3e399818cfee81a7ab0880f714e53d7672b08df0fa62f2843416e1ea09', address);
  return hasRole
}

export function useSubmitFirst(address: string , library?: any): {
  firstSubmitCallback: () => Promise<string>
} {
  const distributorContract = getDiscoverContract(library)
  const firstSubmitCallback = async () => {
    if ( !library || !distributorContract) return
    const args = [address]
    // eslint-disable-next-line consistent-return
    console.log('contract =', distributorContract, args);
    return distributorContract.estimateGas.successSubmittedProjectInfo(...args, {}).then((estimatedGasLimit: BigNumber) => {
      return distributorContract
        .successSubmittedProjectInfo(...args, { value: null, gasLimit: calculateGasMargin(estimatedGasLimit) })
        .then((response: TransactionResponse) => {
          console.log('response =', response)
          return response.hash
        })
    }).catch(e => {
      console.log('e =', e)
      throw (e)
    })
  }
  return { firstSubmitCallback }
}

export function useSubmit(address: string , library?: any): {
  submitCallback: () => Promise<string>
} {
  const distributorContract = getDiscoverContract(library)
  const submitCallback = async () => {
    if ( !library || !distributorContract) return
    const args = [address]
    // eslint-disable-next-line consistent-return
    return distributorContract.estimateGas.successUpdatedProjectInfo(...args, {}).then((estimatedGasLimit: BigNumber) => {
      return distributorContract
        .successUpdatedProjectInfo(...args, { value: null, gasLimit: calculateGasMargin(estimatedGasLimit) })
        .then((response: TransactionResponse) => {
          return response.hash
        })
    }).catch(e => {
      throw (e)
    })
  }
  return { submitCallback }
}

export function useRefuseFirst(address: string , library?: any): {
  refuseFirstCallback: () => Promise<string>
} {
  const distributorContract = getDiscoverContract(library)
  const refuseFirstCallback = async () => {
    if ( !library || !distributorContract) return
    const args = [address]
    // eslint-disable-next-line consistent-return
    return distributorContract.estimateGas.defeatSubmittedProjectInfo(...args, {}).then((estimatedGasLimit: BigNumber) => {
      return distributorContract
        .defeatSubmittedProjectInfo(...args, { value: null, gasLimit: calculateGasMargin(estimatedGasLimit) })
        .then((response: TransactionResponse) => {
          return response.hash
        })
    }).catch(e => {
      throw (e)
    })
  }
  return { refuseFirstCallback }
}

export function useRefuse(address: string , library?: any): {
  refuseCallback: () => Promise<string>
} {
  const distributorContract = getDiscoverContract(library)
  const refuseCallback = async () => {
    if ( !library || !distributorContract) return
    const args = [address]
    // eslint-disable-next-line consistent-return
    return distributorContract.estimateGas.defeatUpdatedProjectInfo(...args, {}).then((estimatedGasLimit: BigNumber) => {
      return distributorContract
        .defeatUpdatedProjectInfo(...args, { value: null, gasLimit: calculateGasMargin(estimatedGasLimit) })
        .then((response: TransactionResponse) => {
          return response.hash
        })
    }).catch(e => {
      throw (e)
    })
  }
  return { refuseCallback }
}

export function useCancel(address: string , library?: any): {
  cancelCallback: () => Promise<string>
} {
  const distributorContract = getDiscoverContract(library)
  const cancelCallback = async () => {
    if ( !library || !distributorContract) return
    const args = [address]
    // eslint-disable-next-line consistent-return
    return distributorContract.estimateGas.cancelledProject(...args, {}).then((estimatedGasLimit: BigNumber) => {
      return distributorContract
        .cancelledProject(...args, { value: null, gasLimit: calculateGasMargin(estimatedGasLimit) })
        .then((response: TransactionResponse) => {
          return response.hash
        })
    }).catch(e => {
      throw (e)
    })
  }
  return { cancelCallback }
}

