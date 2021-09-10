import React, { FunctionComponent, useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { Text } from '../../style'
import Row, { AutoRow } from 'components/Row'
import InputItem from 'components/InputItem'
import { Modal, Rate, Button } from 'antd'

const RequiredPoint = styled.div`
  color: #F5455B;
  font-size: 14px;
`

interface CommentModalProps {
  visible: boolean,
  onClose: () => any,
  onConfirm: (val: any) => any,
}

//todo: sensitive words

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
      title="My Comment"
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
        required={false}
        value={title}
        placeholder={'Enter the title'}
        maxLength={30}
        onChange={e => {setTitle(e.target.value)}}
      />
      <InputItem 
        title={'Content'}
        required={true}
        isTextArea={true}
        value={content}
        placeholder={'Enter the content'}
        onChange={e => {setContent(e.target.value)}}
      />
    </Modal>
  )
}

export default CommentModal
