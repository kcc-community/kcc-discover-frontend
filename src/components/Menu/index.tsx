import React, { FunctionComponent, useEffect } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import styled, { useTheme } from 'styled-components'
import useAuth from 'hooks/useAuth'
import { RowFixed, RowBetween } from '../Row'
import { Text } from '../../style'
import Flex from '../../style/components/Box/Flex'
import UserBlock from '../UserBlock'
import Language from '../ChangeLanguage'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { injected } from '../../connectors'
import { updateChainError } from '../../state/wallet/actions'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 16px;
  width: 100%;
  height: 80px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.backgroundNav};
  z-index: 20;
  transform: translate3d(0, 0, 0);
`

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
`


const Inner = styled.div`
  flex-grow: 1;
  margin-top: 80px;
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;
`

const ImgLogo = styled.img`
  height: 22px;
  cursor: pointer
`

interface MenuList {
  title: string
  route: string
}

const Menu: React.FunctionComponent = (props) => {
  const { t } = useTranslation();
  const { account, chainId } = useWeb3React()
  const { login, logout } = useAuth()
  const history = useHistory();
  const matchHome = useRouteMatch({ path: '/', strict: true, sensitive: true });
  const matchAccount = useRouteMatch({ path: '/account', strict: true, sensitive: true });
  const theme = useTheme()
  const dispatch = useDispatch()
  const href = window.location.href
  const menuList: MenuList[] = [
    {
      title: t('Home'),
      route: '/',
    },
    {
      title: t('Project'),
      route: '/project',
    },
    {
      title: t('Submit'),
      route: '/submit',
    },
  ]

  useEffect(() => {
    const { ethereum } = window
    if(chainId || ethereum){
      let netID = ethereum?.networkVersion || ''
      if(chainId === Number(process.env.REACT_APP_CHAIN_ID) || (Number(netID) === Number(process.env.REACT_APP_CHAIN_ID))){
        dispatch(updateChainError({chainError: ''}))
      } else {
        dispatch(updateChainError({chainError: 'Unsupported Network'}))
      }
    } 

  }, [chainId])

  useEffect(() => {
    const isHome = matchHome && matchHome.isExact;
    const isAccount = matchAccount && matchAccount.isExact;
    let body = document.getElementsByTagName('body')[0];
    let lastLocation: any;
    history.listen((location) => {
      if (lastLocation !== location) {
        window.scrollTo(0, 0);
      }
      lastLocation = location;
    });
    if(isHome){
      body.setAttribute('style',`background: ${theme.colors.background}`)
    } else if(isAccount){
      body.setAttribute('style',`background: ${theme.colors.backgroundLight}`)
    } else {
      body.setAttribute('style',`background: ${theme.colors.invertedContrast}`)
    }
  }, [history, href])
  
  const renderMenu = (data, index) => {
    return(
      <a onClick={() => history.push(data?.route)} key={index}>
        <Text color={theme.colors.invertedContrast} fontSize="18px" fontWeight="500" ml="40px">{data?.title}</Text>
      </a>
    )
  }

  return ( 
    <Wrapper>
      <StyledNav>
        <RowBetween style={{maxWidth: '1200px', margin: '0 auto'}}>
          <RowFixed>
            <ImgLogo src={require('../../assets/images/home/logo.png').default} onClick={() => history.push('/')}/>
            { menuList.map((item, index) => renderMenu(item, index)) }
          </RowFixed>
          <RowFixed>
            {!!login && !!logout && (
              <Flex>
                <UserBlock account={account as string} chainId={chainId} login={login} logout={logout} />
              </Flex>
            )}
            {/* <Language /> */}
          </RowFixed>
        </RowBetween>
      </StyledNav>
      <BodyWrapper>
        <Inner>
          {props.children}
        </Inner>
      </BodyWrapper>
    </Wrapper>
  )
}

export default Menu
