import styled from 'styled-components'
import Text from '../Text/Text'
import { tags, scales, HeadingProps } from './types'

const style = {
  [scales.MD]: {
    fontSize: '20px',
    fontSizeLg: '20px',
  },
  [scales.LG]: {
    fontSize: '24px',
    fontSizeLg: '24px',
  },
  [scales.XL]: {
    fontSize: '32px',
    fontSizeLg: '40px',
  },
  [scales.XXL]: {
    fontSize: '48px',
    fontSizeLg: '64px',
  },
}

const Heading = styled(Text).attrs({ bold: true })<HeadingProps>`
  width: 100%;
  font-size: ${({ scale }) => style[scale || scales.MD].fontSize};
  font-weight: 500;
  line-height: 1.1;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 18px;
  }
  // color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
`

Heading.defaultProps = {
  as: tags.H2,
}

export default Heading
