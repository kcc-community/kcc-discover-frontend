import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.backgroundLight};

    img {
      height: auto;
      max-width: 100%;
    }
  }

  ul {
    list-style: none; 
  }

  li {
    display: flex;
    align-items: center;
  }
`

export default GlobalStyle
