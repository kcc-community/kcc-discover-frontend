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

export const lightColors: Colors = {
  ...baseColors,
  background: '#10141C',
  backgroundDisabled: '#E9EAEB',
  backgroundAlt: '#FFFFFF1A',
  backgroundCard: '#0B0F15',
  backgroundNav: '#000A1E',
  backgroundTip: '#28CD9629',
  backgroundLight: '#F4F6F7',
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

