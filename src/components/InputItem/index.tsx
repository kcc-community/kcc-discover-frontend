import React, { FunctionComponent, useEffect } from 'react'
import styled, { useTheme } from 'styled-components'
import { Text } from '../../style'
import { Input, Popover } from 'antd'
import { downGrey, info } from '../../constants/imgs'
import Col from '../Column'
import Row from '../Row'
import { useResponsive } from 'utils/responsive'

const { TextArea } = Input;

interface InputItemProps {
  mb?: string
  title?: string
  required?: boolean
  titleInfo?: boolean
  titleInfoContent?: string
  value?: string | number 
  isTextArea?: boolean
  placeholder?: string 
  suffix?: boolean
  disabled?: boolean
  maxLength?: number
  type?: string
  error?: string
  onChange?: (val: any) => any
} 

const RequiredPoint = styled.div`
  color: #F5455B;
  font-size: 14px;
`

const ImgDown = styled.img`
  width: 20px;
  height: 20px;
`

const ImgInfo = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 5px;
`

const ErrorText = styled.div`
  color: ${({ theme }) => `${ theme.colors.failure }`};
  font-size: 14px;
  margin-top: 6px;
`

const InputItem: React.FunctionComponent<InputItemProps> = (props) => {
  const theme = useTheme()
  const { isMobile } = useResponsive()
  return (
    <Col style={{marginBottom: props.mb ?? (isMobile ? '24px' : '36px')}}>
      {props.title && 
        <Row mb="8px">
          <Text color={theme.colors.text} fontWeight="bold" mr={'5px'}>{props.title}</Text>
          {props.required && <RequiredPoint>*</RequiredPoint>}
          {props.titleInfo && 
            <Popover content={props.titleInfoContent}>
              <ImgInfo src={info}/>
            </Popover>} 
        </Row>
      }
      {
        props.isTextArea ? 
        <TextArea 
          allowClear
          placeholder={props.placeholder ?? ''}
          value={props.value ?? ''}
          onChange={props.onChange}
          disabled={props.disabled ?? false}
          maxLength={props.maxLength ?? 500}
        />
        :
        <Input 
          allowClear
          placeholder={props.placeholder ?? ''}
          value={props.value ?? ''}
          onChange={props.onChange}
          disabled={props.disabled ?? false}
          maxLength={props.maxLength ?? 100}
          type={props.type ?? 'text'}
          suffix={props.suffix ? <ImgDown src={downGrey}/>   : ''}
        />
      }
      {props.error && <ErrorText>{props.error}</ErrorText>}
    </Col>
  )
}

export default InputItem
