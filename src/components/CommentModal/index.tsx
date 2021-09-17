import React, { FunctionComponent, useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { Text } from '../../style'
import Row, { AutoRow } from 'components/Row'
import InputItem from 'components/InputItem'
import { Modal, Rate, Button } from 'antd'
import Mint from '../../utils/sensitiveWord'

const RequiredPoint = styled.div`
  color: #F5455B;
  font-size: 14px;
`

interface CommentModalProps {
  visible: boolean,
  onClose: () => any,
  onConfirm: (val: any) => any,
}

const CommentModal: React.FunctionComponent<CommentModalProps>= (props) => {
  const theme = useTheme()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [rate, setRate] = useState(0)

  const clearInfo = () => {
    setTitle('');
    setContent('');
    setRate(0);
  }

  return (
    <Modal
      title="My Review"
      className={'comment'}
      visible={props.visible}
      onCancel={() => {clearInfo(); props.onClose()}}
      footer={[
        <Button onClick={() => {clearInfo(); props.onClose()}}>Cancel</Button>,
        <Button 
          type={'primary'} 
          disabled={!title || !rate} 
          onClick={() => {props.onConfirm({ title, content, rate })}}>Confirm</Button>
      ]}
    > 
      <Row>
        <Text color={theme.colors.text} fontWeight="bold" mr={'5px'}>Rate</Text>
        <RequiredPoint>*</RequiredPoint>
      </Row>
      <AutoRow justify="center" mb="15px">
        <Rate allowHalf value={rate} className={'modalRate'} onChange={e => setRate(e)} />
      </AutoRow>
      <InputItem 
        title={'Title'}
        required={true}
        value={title}
        placeholder={'Enter the title'}
        maxLength={30}
        onChange={e => {
          let title = e.target.value === ' ' ? '' : e.target.value
          //@ts-ignore
          setTitle(Mint.filterSync(title).text)
        }}
      />
      <InputItem 
        title={'Content'}
        required={false}
        isTextArea={true}
        value={content}
        maxLength={100}
        placeholder={'Enter the content'}
        onChange={e => {
          let content = e.target.value === ' ' ? '' : e.target.value
          //@ts-ignore
          setContent(Mint.filterSync(content).text)
        }}
      />
    </Modal>
  )
}

export default CommentModal
