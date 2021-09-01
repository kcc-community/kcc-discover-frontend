import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'
import styled from 'styled-components'

const swapIconSource = require('../../../../assets/images/menu/menu_open.svg').default

const SwapIcon = styled.img`
  width: 16px;
  height: 18px;
`

const Icon: React.FC<SvgProps> = (props) => {
  return <SwapIcon src={swapIconSource} />
}

export default Icon
