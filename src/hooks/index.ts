import { Web3Provider } from '@ethersproject/providers'
import { ChainId } from 'mojito-sdk'
import { connectorLocalStorageKey } from '../style'
import { useWeb3React as useWeb3ReactCore, UnsupportedChainIdError } from '@web3-react/core'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { useEffect, useState } from 'react'
import { useResponsive }  from 'utils/responsive'
import { injected } from '../connectors'
import { NetworkContextName } from '../constants/wallet'
import { useDispatch } from 'react-redux'
import { updateChainError } from '../state/wallet/actions'

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & { chainId?: ChainId } {
  const context = useWeb3ReactCore<Web3Provider>()
  const contextNetwork = useWeb3ReactCore<Web3Provider>(NetworkContextName)
  return context.active ? context : contextNetwork
} 

export function useEagerConnect() {
  const { activate, active } = useWeb3ReactCore() // specifically using useWeb3ReactCore because of what this hook does
  const [tried, setTried] = useState(false)
  const { isMobile } = useResponsive()
  useEffect(() => {
    const hasSignedIn = window.localStorage.getItem(connectorLocalStorageKey)
    if (hasSignedIn) {
      activate(injected, undefined, true).catch(() => {
        setTried(true)
        window.localStorage.removeItem(connectorLocalStorageKey)
      })
    } else if (isMobile && window.ethereum && hasSignedIn) {
      activate(injected, undefined, true).catch(() => {
        setTried(true)
        window.localStorage.removeItem(connectorLocalStorageKey)
      })
    } else {
      setTried(true)
    }
  }, [activate]) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true)
    }
  }, [active])

  return tried
}

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3ReactCore() // specifically using useWeb3React because of what this hook does
  const dispatch = useDispatch()
  const { isMobile } = useResponsive()

  useEffect(() => {
    const { ethereum } = window
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = () => {
          // eat errors
          activate(injected, undefined, true).then(() => {
            console.log('active success')
            dispatch(updateChainError({chainError: ''}))
          })
          .catch((e) => {
            console.error('Failed to activate after chain changed', e)
            if(e instanceof UnsupportedChainIdError){
              dispatch(updateChainError({chainError: isMobile ? 'Unsupported' : 'Unsupported Network'}))
            }
          })
      }

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          // eat errors
          activate(injected, undefined, true)
          .catch((e) => {
            console.error('Failed to activate after accounts changed', e)
          })
        }
      }

      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', (accounts) => handleAccountsChanged(accounts))

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
        }
      }
    }
    return undefined
  }, [active, error, suppress, activate])
}
