import { Popover } from 'antd'
import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { DownOutlined } from '@ant-design/icons'
import { allLanguages } from '../../constants/languageCodes'
import { useTranslation } from 'react-i18next'
import { RowBetween } from '../Row'

export interface ChangeLanguageProps {}

const MenuWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  flex: 1;
  text-align: right;

  @media (max-width: 768px) {
    padding-left: 10px;
  }
`

const LanguageItem = styled.div``

const Text = styled.div`
  height: 30px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => `${theme.colors.text}`};
  line-height: 30px;
  margin: 5px 8px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => `${theme.colors.secondary}`};
  }
`

export const LanguageButton = styled.div`
  cursor: pointer;
  width: 113px;
  height: 36px;
  line-height: none;
  padding: 0;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.darkGrey};
  font-size: 16px;
  outline: none;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin-left: 24px;
`

const ChangeLanguage: React.FunctionComponent<ChangeLanguageProps> = () => {
  const { i18n } = useTranslation()


  const selectChange = (code: string) => {
    localStorage.setItem('KCC_DISCOVER_LANG', code)
    i18n.changeLanguage(code)
  }

  const currentLanguage = React.useMemo(() => {
    for (let i = 0; i < allLanguages.length; i++) {
      if (allLanguages[i].code === i18n.language) {
        return allLanguages[i].language
      }
    }
    return 'English'
  }, [i18n.language, allLanguages])

  const theme = useTheme()

  const selectOptions = allLanguages.map((lng, index) => {
    return (
      <LanguageItem key={index} onClick={selectChange.bind(null, lng.code)}>
        <RowBetween>
          <Text> {lng.language}</Text>
        </RowBetween>
      </LanguageItem>
    )
  })

  return (
    <MenuWrap>
      <Popover placement="bottom" content={selectOptions}>
        <LanguageButton
          style={{ color: theme.colors.secondary, fontSize: '16px' }}
        >
          {currentLanguage}
          <DownOutlined style={{ fontSize: '10px', marginLeft: '6px', color: theme.colors.secondary }} />
        </LanguageButton>
      </Popover>
    </MenuWrap>
  )
}

export default React.memo(ChangeLanguage)
