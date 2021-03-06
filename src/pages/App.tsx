import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import Web3ReactManager from '../components/Web3ReactManager'
import { usePriceInfo } from '../hooks/usePriceInfo'
import { useCategory } from '../hooks/useCategory'
import ComingSoon from './ComingSoon'
import { useResponsive } from 'utils/responsive'

import Home from './Home'
import Project from './Project'
import ProjectDetail from './Project/detail'
import Submit from './Submit'
import Account from './Account'
import Checker from './Checker'

import Menu from '../components/Menu'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const BodyWrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  // margin-bottom: 64px;
`

export default function App() {
  // init common data
  const priceInfo = usePriceInfo();
  const categoryInfo = useCategory();
  const { isMobile } = useResponsive();

  // if(isMobile){
  //   return <ComingSoon />
  // }

  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <AppWrapper>
          <Menu>
            <BodyWrapper>
              <Web3ReactManager>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/project" component={Project} />
                  <Route exact path="/project_detail" component={ProjectDetail} />
                  <Route exact path="/submit" component={Submit} />
                  <Route exact path="/account" component={Account} />
                  <Route exact path="/checker" component={Checker} />
                  <Route path="*" component={Home} />
                </Switch>
              </Web3ReactManager>
            </BodyWrapper>
          </Menu>
        </AppWrapper>
      </BrowserRouter>
    </Suspense>
  )
}
