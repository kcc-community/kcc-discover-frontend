import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const UnicornWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-end;
  cursor: pointer;
  margin-top: 1px;
  margin-left: 30px;
`

const Link = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  /* identical to box height, or 200% */
  color: #fff;
  margin-right: 8px;
  font-family: 'kccfont';
`

const Image = styled.img`
  margin-top: 0px;
  width: 37px;
  height: 16px;
`

const UnicornLink = () => {
  const history = useHistory()
  const { t } = useTranslation()
  return (
    <UnicornWrap>
      <Link
        onClick={() => {
          window.open('https://kcc.io/unicorn')
        }}
      >
        {t('Unicorn Contest')}
      </Link>
      <Image src={require('../assets/images/home/hot.png').default} />
    </UnicornWrap>
  )
}

export default UnicornLink
