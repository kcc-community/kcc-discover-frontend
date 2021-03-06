import React, { FunctionComponent, useEffect, useState } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { useActiveWeb3React } from 'hooks'
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
import { useResponsive } from 'utils/responsive'
import { Drawer } from 'antd'
import { truncateSync } from 'fs'
import Column from 'components/Column'
import UnicornLink from '../UnicornLink'

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
  height: 16px;
  cursor: pointer;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 22px;
  }
`
const ImgKccLogo = styled.img`
  height: 26px;
  cursor: pointer;
  margin-top: 2px;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 33px;
  }
`

const ImgLines = styled.div`
  background: #596171;
  width: 1.5px;
  height: 15px;
  margin: 0 12px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 2px;
    height: 19px;
  }
`

const ImgMenu = styled.img`
  height: 16px;
  width: 16px;
  margin: 0 15px 0 10px;
`

interface MenuList {
  title: string
  route: string
}

const Menu: React.FunctionComponent = (props) => {
  const { t } = useTranslation()
  const { account, chainId } = useActiveWeb3React()
  const { login, logout } = useAuth()
  const history = useHistory()
  const matchHome = useRouteMatch({ path: '/', strict: true, sensitive: true })
  const matchAccount = useRouteMatch({ path: '/account', strict: true, sensitive: true })
  const theme = useTheme()
  const dispatch = useDispatch()
  const { isMobile } = useResponsive()
  const [showMenu, setShow] = useState(false)
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
    if (chainId || ethereum) {
      let netID = ethereum?.networkVersion || ''
      console.log('chainId =', chainId, 'ethereum =', netID)
      if (
        chainId === Number(process.env.REACT_APP_CHAIN_ID) ||
        Number(netID) === Number(process.env.REACT_APP_CHAIN_ID) ||
        Number(netID) === 1
      ) {
        dispatch(updateChainError({ chainError: '' }))
      } else {
        dispatch(
          updateChainError({ chainError: isMobile || window.innerWidth < 768 ? 'Unsupported' : 'Unsupported Network' })
        )
      }
    }
  }, [chainId])

  useEffect(() => {
    const isHome = matchHome && matchHome.isExact
    const isAccount = matchAccount && matchAccount.isExact
    let body = document.getElementsByTagName('body')[0]
    let lastLocation: any
    history.listen((location) => {
      if (lastLocation !== location) {
        window.scrollTo(0, 0)
      }
      lastLocation = location
    })
    if (isHome) {
      body.setAttribute('style', `background: ${theme.colors.background}`)
    } else if (isAccount) {
      body.setAttribute('style', `background: ${theme.colors.backgroundLight}`)
    } else {
      body.setAttribute('style', `background: ${theme.colors.invertedContrast}`)
    }
  }, [history, href])

  const renderMenu = (data, index) => {
    return (
      <a
        onClick={() => {
          setShow(false)
          history.push(data?.route)
        }}
        key={index}
        style={{ marginTop: isMobile ? '36px' : '0' }}
      >
        <Text
          color={theme.colors.invertedContrast}
          fontSize="18px"
          fontWeight="500"
          ml={!isMobile ? '40px' : '0'}
          style={{ textAlign: isMobile ? 'center' : 'left' }}
        >
          {data?.title}
        </Text>
      </a>
    )
  }

  return (
    <Wrapper>
      <StyledNav>
        <RowBetween style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <RowFixed>
            {isMobile && (
              <ImgMenu
                src={require('../../assets/images/Icons/h5/menu.png').default}
                onClick={() => setShow(!showMenu)}
              />
            )}
            <a href="https://www.kcc.io" target="_blank">
              <ImgKccLogo src={require('../../assets/images/home/kcc.png').default} />
            </a>
            <ImgLines />
            <ImgLogo src={require('../../assets/images/home/logo.png').default} onClick={() => history.push('/')} />
            {!isMobile && menuList.map((item, index) => renderMenu(item, index))}
            {!isMobile && <UnicornLink />}
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
        <Inner>{props.children}</Inner>
      </BodyWrapper>
      <Drawer
        placement={'left'}
        closable={false}
        onClose={() => {
          setShow(false)
        }}
        visible={showMenu}
        key={'left'}
      >
        <Column>
          {menuList.map((item, index) => renderMenu(item, index))}
          <UnicornLink />
        </Column>
      </Drawer>
    </Wrapper>
  )
}

export default Menu
