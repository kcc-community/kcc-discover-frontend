import React from 'react'
import LinkExternal from '../../style/components/Link/LinkExternal'
import Flex from '../../style/components/Box/Flex'
import { Text } from '../../style'
import { Modal } from 'antd'
import CopyToClipboard from './CopyToClipboard'
import { connectorLocalStorageKey } from './config'
import { Button } from 'antd'

interface Props {
  account: string
  visible: boolean
  logout: () => void
  onCancel: () => void 
}

const AccountModal: React.FC<Props> = ({ account, logout, visible, onCancel }) => (
  <Modal 
    title="Your wallet"
    footer={null} 
    onCancel={onCancel}
    visible={visible}>
    <Text
      fontSize="16px"
      bold
      mt="-10px"
      style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '8px' }}
    >
      {account}
    </Text>
    <Flex mb="32px">
      <LinkExternal style={{ fontSize: '14px' }} small href={`https://explorer.kcc.io/address/${account}`} mr="16px">
        View on KCC Explorer
      </LinkExternal>
      <CopyToClipboard toCopy={account}>
        <Text style={{ fontSize: '14px' }} color="primary" fontWeight={600}>
          Copy Address
        </Text>
      </CopyToClipboard>
    </Flex>
    <Flex justifyContent="center">
      <Button 
        type="primary"
        onClick={() => {
          logout()
          window.localStorage.removeItem(connectorLocalStorageKey)
          onCancel()
        }}>
        Logout
      </Button>
    </Flex>
  </Modal>
)

export default AccountModal
