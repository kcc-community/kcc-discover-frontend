import React from 'react'
import Button from '../../components/Button/Button'
import Text from '../../components/Text/Text'
import LinkExternal from '../../components/Link/LinkExternal'
import Flex from '../../components/Box/Flex'
import { Modal } from 'antd'
import CopyToClipboard from './CopyToClipboard'
import { connectorLocalStorageKey } from './config'

interface Props {
  account: string
  logout: () => void
  onDismiss?: () => void
}

const AccountModal: React.FC<Props> = ({ account, logout, onDismiss = () => null }) => (
  // <Modal title="Your wallet" minWidth="460px" onDismiss={onDismiss}>
  <Modal title="Your wallet">
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
          onDismiss()
        }}
      >
        Logout
      </Button>
    </Flex>
  </Modal>
)

export default AccountModal
