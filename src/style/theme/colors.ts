import { Colors } from './types'

export const baseColors = {
  failure: '#FF4446',
  primary: '#18BB97',
  primaryDark: '#0098A1',
  secondary: '#B8C6D8',
  darkGrey: '#B8C6D899',
  success: '#31D0AA',
  warning: '#FFB547',
}

export const additionalColors = {
  binance: '#F0B90B',
  // Settings Card Mask color
  overlay: 'rgba(1, 1, 1, 0.7)',
}

export const lightColors: Colors = {
  ...baseColors,
  background: '#10141C',
  backgroundDisabled: '#E9EAEB',
  backgroundAlt: '#0B0F15',
  backgroundCard: '#0B0F15',
  contrast: '#191326',
  dropdown: '#F6F6F6',
  invertedContrast: '#FFFFFF',
  input: '#F5F9EE',
  inputSecondary: '#F5FDF9',
  tertiary: '#EFF4F5',
  text: '#00142A',
  textDisabled: '#BDC2C4',
  textSubtle: '#00142A99',
  borderColor: '#fff',
  gradients: {
    hovercard: 'linear-gradient(0deg, rgba(0, 20, 42, 0.04), rgba(0, 20, 42, 0.04)) white',
    disable: 'linear-gradient(0deg, rgba(0, 20, 42, 0.08), rgba(0, 20, 42, 0.08)), #FFFFFF'
  },
}

export const darkColors: Colors = {
  ...baseColors,
  secondary: '#9A6AFF',
  background: '#08060B',
  backgroundDisabled: '#3c3742',
  backgroundAlt: '#27262c',
  backgroundCard: '#F5F5F5',
  borderColor: '#fff',
  contrast: '#FFFFFF',
  dropdown: '#1E1D20',
  invertedContrast: '#191326',
  input: '#F5F9EE',
  inputSecondary: '#262130',
  primaryDark: '#0098A1',
  tertiary: '#5DDA98', 
  text: '#F4EEFF',
  textDisabled: '#ffffff',
  textSubtle: '#64ffb2',
  gradients: {
    hovercard: 'linear-gradient(0deg, rgba(0, 20, 42, 0.04), rgba(0, 20, 42, 0.04)) white',
    disable: 'linear-gradient(0deg, rgba(0, 20, 42, 0.08), rgba(0, 20, 42, 0.08)), #FFFFFF'
  },
}
