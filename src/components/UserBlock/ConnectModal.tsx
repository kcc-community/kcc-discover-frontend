import React, { useState } from 'react'
import styled from 'styled-components'
import { Modal } from 'antd'
import WalletCard from './WalletCard'
import config from './config'
import { Login } from './types'

interface Props {
  login: Login
  onCancel: () => void
  visible: boolean
}

const ConnectModal: React.FC<Props> = ({ login, visible, onCancel }) => {
  return(
    <Modal 
      title="Connect to a wallet"
      footer={null} 
      onCancel={onCancel}
      visible={visible}>
      {config.map((entry, index) => (
        <WalletCard
          key={entry.title}
          login={login}
          walletConfig={entry}
          onDismiss={onCancel}
          mb={index < config.length - 1 ? '8px' : '0'}
        />
      ))}
    </Modal>)
}

export default ConnectModal
