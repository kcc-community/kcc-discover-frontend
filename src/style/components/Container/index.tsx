import styled, { DefaultTheme } from 'styled-components'

export const Container = styled.div<{ width?: string }>`
  width: ${({ width }) => width ?? '1200px'};
  margin-top: 80px;
  margin: 0 auto;
`