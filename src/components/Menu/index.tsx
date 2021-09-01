import React, { useContext } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled, { useTheme } from 'styled-components'
// import { allLanguages } from 'constants/localisation/languageCodes'
// import { LanguageContext } from 'hooks/LanguageContext'
// import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'
import { Link } from 'react-router-dom'
import { RowFixed } from '../Row'
import { Text } from 'uikit/components/Text'
import Flex from 'uikit/components/Box/Flex'
import UserBlock from '../UserBlock'
import Language from '../ChangeLanguage'

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
  height: 48px;
  background-color: black;
  z-index: 20;
  transform: translate3d(0, 0, 0);
  height: 80px;
  padding: 0 120px;
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

const Menu: React.FC = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const theme = useTheme()
  console.log('login =', account)
  // const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  return ( 
    <Wrapper>
      <StyledNav>
        <RowFixed>
          <Link to="/" aria-label="KCC home page">
            <Text color={theme.colors.primary} fontSize="24px" fontWeight="bold">DISCOVER KCC</Text>
          </Link>
        </RowFixed>
        <RowFixed>
          {!!login && !!logout && (
            <Flex>
              <UserBlock account={account as string} login={login} logout={logout} />
            </Flex>
          )}
          <Language />
        </RowFixed>
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
