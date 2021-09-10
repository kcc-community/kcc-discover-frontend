import React, { FunctionComponent } from 'react'
import styled, { useTheme } from 'styled-components'
import { Text } from '../../style'
import Col from 'components/Column'
import { Modal, } from 'antd'

interface SuccessModalProps {
  visible: boolean,
  onClose: () => any,
}

const ImgSuccess = styled.img`
  width: 72px;
  height: 72px;
  margin-bottom: 8px;
  margin-top: 26px;
`

const BackButton = styled.div`
  height: 36px;
  padding: 0 20px;
  margin-top: 24px;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => `${theme.colors.primary}`};
  box-sizing: border-box;
  border-radius: 18px;
  color: ${({ theme }) => `${theme.colors.primary}`};
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  line-height: 35px;
  cursor: pointer;
`

const SuccessModal: React.FunctionComponent<SuccessModalProps>= (props) => {
  const theme = useTheme()
 
  return (
    <Modal
      className={'success'}
      visible={props.visible}
      footer={null}
      closable={false}
    > 
      <Col style={{alignItems: 'center'}}>
        <ImgSuccess src={require('../../assets/images/Icons/success.png').default}/>
        <Text color={theme.colors.text} fontWeight="bold" >Submit Successful</Text>
        <BackButton onClick={() => props.onClose()}>Back to my account</BackButton>
      </Col>
    </Modal>
  )
}

export default SuccessModal
