import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'
import styled from 'styled-components'

const swapIconSource = require('../../../../assets/images/menu/lishi.svg').default

const SwapIcon = styled.img`
  width: 24px;
  height: 24px;
`

const Icon: React.FC<SvgProps> = (props) => {
  return <SwapIcon src={swapIconSource} />
}

export default Icon
