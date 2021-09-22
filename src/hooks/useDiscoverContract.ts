import { TokenAmount, ChainId, JSBI } from 'mojito-testnet-sdk'
import { TransactionResponse } from '@ethersproject/providers'
import { useEffect, useState } from 'react'
import { useActiveWeb3React } from './index'
import { useSingleCallResult } from '../state/multicall/hooks'
import { calculateGasMargin, isAddress } from '../utils'
import { BigNumber } from '@ethersproject/bignumber'
import BN from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'ethers'
import { JsonRpcProvider } from '@ethersproject/providers'
import discoverAbi from '../constants/abis/discover.json'
import addresses from '../constants/contract'
import { message } from 'antd';
import { useTranslation } from 'react-i18next'

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

export async function getMinMarginAmount(library?: any){
  if(!library) return
  const distributorContract = getDiscoverContract(library)
  const amount = await distributorContract.minMarginAmount();
  return new BN(amount.toString()).div(10 ** 18).toString()
}

export function useComment(data: any , library?: any): {
  commentCallback: () => Promise<string>
} {
  const distributorContract = getDiscoverContract(library)
  const { t } = useTranslation()
  const commentCallback = async () => {
    if ( !library || !distributorContract) return
    const args = [data.projectAddress, JSBI.BigInt(new BN(data.score).multipliedBy(10)), data.title, data.review]
    // eslint-disable-next-line consistent-return
    console.log('contract =', distributorContract, args);
    return distributorContract.estimateGas.submitCommentInfo(...args, {}).then((estimatedGasLimit: BigNumber) => {
      return distributorContract
        .submitCommentInfo(...args, { value: null, gasLimit: calculateGasMargin(estimatedGasLimit) })
        .then((response: TransactionResponse) => {
          console.log('response =', response)
          return response.hash
        })
    }).catch(e => {
      console.log(e)
      let error = e?.toString().split('code":')[1]?.split(',')
      if(error && error[0] === '-32603'){
        message.error(t('You can only comment once per account'))
      } else {
        message.error(t('Contract call error'))
      }
    })
  }
  return { commentCallback }
}

export function useCommentLike(data: any , library?: any): {
  commentLikeCallback: () => Promise<string>
} {
  const distributorContract = getDiscoverContract(library)
  const commentLikeCallback = async () => {
    if ( !library || !distributorContract) return
    const args = [data.projectAddress, data.reviewer, data.isLike]
    // eslint-disable-next-line consistent-return
    console.log('contract =', distributorContract, args);
    return distributorContract.estimateGas.isLikeCommentInfo(...args, {}).then((estimatedGasLimit: BigNumber) => {
      return distributorContract
        .isLikeCommentInfo(...args, { value: null, gasLimit: calculateGasMargin(estimatedGasLimit) })
        .then((response: TransactionResponse) => {
          console.log('response =', response)
          return response.hash
        })
    }).catch(e => {
      console.log(e)
    })
  }
  return { commentLikeCallback }
}

export function useCommentDelete(data: any , library?: any): {
  commentDeleteCallback: () => Promise<string>
} {
  const distributorContract = getDiscoverContract(library)
  const commentDeleteCallback = async () => {
    if ( !library || !distributorContract) return
    const args = [data.projectAddress]
    // eslint-disable-next-line consistent-return
    console.log('contract =', distributorContract, args);
    return distributorContract.estimateGas.deleteComment(...args, {}).then((estimatedGasLimit: BigNumber) => {
      return distributorContract
        .deleteComment(...args, { value: null, gasLimit: calculateGasMargin(estimatedGasLimit) })
        .then((response: TransactionResponse) => {
          console.log('response =', response)
          return response.hash
        })
    }).catch(e => {
      console.log(e)
      throw Error(e)
    })
  }
  return { commentDeleteCallback }
}



export function useCommit(data: any , library?: any): {
  commitCallback: () => Promise<string>
} {
  const distributorContract = getDiscoverContract(library)
  const { t } = useTranslation()
  const commitCallback = async () => {
    if ( !library || !distributorContract) return
    const args = [
      {
        title: data.title, primaryCategoryIndex: data.primaryCategoryIndex, secondaryCategoryIndex: data.secondaryCategoryIndex,
        shortIntroduction: data.shortIntroduction, logoLink: data.logoLink, banner: data.banner ?? '',
        websiteLink: data.websiteLink, contractAddresses: data.contractAddresses, email: data.email,
        marginAmount: new BN(data.marginAmount).multipliedBy(10 ** 18).toString(),
      },
      {
        tokenSymbol: data.tokenSymbol ?? '', tokenContractAddress: data.tokenContractAddress ?? '',
        tvlInterface: data.tvlInterface ?? '', detailDescription: data.detailDescription ?? '', twitterLink: data.twitterLink ?? '',
        telegramLink: data.telegramLink ?? '', githubLink: data.githubLink ?? '', coinmarketcapLink: data.coinmarketcapLink ?? '',
        coingeckoLink: data.coingeckoLink ?? '',
      }
    ]

    // eslint-disable-next-line consistent-return
    console.log('contract =', distributorContract, args);
    return distributorContract.estimateGas.submitProjectInfo(...args, {
      value: new BN(data.marginAmount).multipliedBy(10 ** 18).toString()
    }).then((estimatedGasLimit: BigNumber) => {
      return distributorContract
        .submitProjectInfo(...args, { value: new BN(data.marginAmount).multipliedBy(10 ** 18).toString(), gasLimit: calculateGasMargin(estimatedGasLimit) })
        .then((response: TransactionResponse) => {
          console.log('response =', response)
          return response.hash
        })
    }).catch(e => {
      console.log(e)
      let error = e?.toString().split('code":')[1]?.split(',')
      if(error && error[0] === '-32000'){
        message.error(t('Insufficient balance'))
      } else if(error && error[0] === '-32603'){
        message.error(t('Only one submission is allowed for an account'))
      } else {
        message.error(t('Contract call error'))
      }
    })
  }
  return { commitCallback }
}

export function useUpdateCommit(data: any , library?: any): {
  updateCallback: () => Promise<string>
} {
  const distributorContract = getDiscoverContract(library)
  const { t } = useTranslation()
  const updateCallback = async () => {
    if ( !library || !distributorContract) return
    const args = [
      data.projectAddress ,
      { optionalProjectInfo: { 
          email: data.email,
          tokenSymbol: data.tokenSymbol ?? '', tokenContractAddress: data.tokenContractAddress ?? '',
          tvlInterface: data.tvlInterface ?? '', detailDescription: data.detailDescription ?? '', twitterLink: data.twitterLink ?? '',
          telegramLink: data.telegramLink ?? '', githubLink: data.githubLink ?? '', coinmarketcapLink: data.coinmarketcapLink ?? '',
          coingeckoLink: data.coingeckoLink ?? '',
        },
        primaryCategory: data.primaryCategoryIndex,
        secondaryCategory: data.primaryCategoryIndex,
        shortIntroduction: data.shortIntroduction,
        logoLink: data.logoLink,
        banner: data.banner ?? '',
        websiteLink: data.websiteLink,
        addMarginAmount: new BN(data.marginAmount ?? 0).multipliedBy(10 ** 18).toString(),
      }
    ]
    // eslint-disable-next-line consistent-return
    return distributorContract.estimateGas.updateProjectInfo(...args, {
      value: new BN(data.marginAmount ?? 0).multipliedBy(10 ** 18).toString()
    }).then((estimatedGasLimit: BigNumber) => {
      return distributorContract
        .updateProjectInfo(...args, { value: new BN(data.marginAmount ?? 0).multipliedBy(10 ** 18).toString(), gasLimit: calculateGasMargin(estimatedGasLimit) })
        .then((response: TransactionResponse) => {
          console.log('response =', response)
          return response.hash
        })
    }).catch(e => {
      console.log(e)
      let error = e?.toString().split('code":')[1]?.split(',')
      if(error && error[0] === '-32000'){
        message.error(t('Insufficient balance'))
      } else if(error && error[0] === '-32603'){
        message.error(t('Only one submission is allowed for an account'))
      } else {
        message.error(t('Contract call error'))
      }
    })
  }
  return { updateCallback }
}







