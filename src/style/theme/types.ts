export type Breakpoints = string[]

export type MediaQueries = {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  nav: string
}

export type Spacing = number[]

export type Radii = {
  small: string
  default: string
  card: string
  circle: string
}

export type Shadows = {
  level1: string
  active: string
  success: string
  warning: string
  focus: string
  inset: string
}

export type Gradients = {
  hovercard: string
  disable: string
}

export type Colors = {
  primary: string
  primaryDark: string
  secondary: string
  tertiary: string
  success: string
  failure: string
  warning: string
  darkGrey: string
  contrast: string
  dropdown: string
  invertedContrast: string
  input: string
  inputSecondary: string
  background: string
  backgroundTip: string
  backgroundDisabled: string
  backgroundAlt: string
  backgroundCard: string
  backgroundNav: string
  backgroundLight: string
  text: string
  textDisabled: string
  textSubtle: string
  borderColor: string
  // Gradients
  gradients: Gradients
}

export type ZIndices = {
  dropdown: number
  modal: number
}
