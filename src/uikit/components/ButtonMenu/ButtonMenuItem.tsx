import React from 'react'
import styled, { useTheme } from 'styled-components'
import Button from '../Button/Button'
import { BaseButtonProps, PolymorphicComponent, variants } from '../Button/types'
import { ButtonMenuItemProps } from './types'

interface InactiveButtonProps extends BaseButtonProps {
  forwardedAs: BaseButtonProps['as']
}

const InactiveButton: PolymorphicComponent<InactiveButtonProps, 'button'> = styled(Button)<InactiveButtonProps>`
  color: ${({ theme, variant }) => (variant === variants.PRIMARY ? theme.colors.primary : theme.colors.primary)};
  background-color: transparent;

  &:hover:not(:disabled):not(:active) {
    background-color: transparent;
  }
`

const ActiveButton = styled(Button)<{ color: string }>`
  background: ${({ color }) => color};
`

const ButtonMenuItem: PolymorphicComponent<ButtonMenuItemProps, 'button'> = ({
  isActive = false,
  variant = variants.PRIMARY,
  as,
  ...props
}: ButtonMenuItemProps) => {
  const theme = useTheme()
  if (!isActive) {
    return <InactiveButton forwardedAs={as} variant="tertiary" {...props} />
  }

  return <Button as={as} variant="primary" {...props} />
}

export default ButtonMenuItem
