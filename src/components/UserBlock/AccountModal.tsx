import React from 'react'
import Button from 'uikit/components/Button/Button'
import Text from 'uikit/components/Text/Text'
import LinkExternal from 'uikit/components/Link/LinkExternal'
import Flex from 'uikit/components/Box/Flex'
import { Modal } from 'antd'
import CopyToClipboard from './CopyToClipboard'
import { connectorLocalStorageKey } from './config'

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
        scale="sm"
        variant="secondary"
        onClick={() => {
          logout()
          window.localStorage.removeItem(connectorLocalStorageKey)
          onCancel()
        }}
      >
        Logout
      </Button>
    </Flex>
  </Modal>
)

export default AccountModal
