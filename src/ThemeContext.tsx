import React from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { light } from './uikit'

const ThemeContext = React.createContext({})

const ThemeContextProvider: React.FC = ({ children }) => {


  return (
    <ThemeContext.Provider value={{ }}>
      <SCThemeProvider theme={light}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
