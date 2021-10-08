import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core'
import { Button, Row, Descriptions, Input, Divider, message } from 'antd'
import useAuth from '../../hooks/useAuth'
import { ConnectorNames } from '../../constants/wallet'
import { Container, Text } from '../../style'
import { useSubmitFirst, useRole, useRefuse, useCancel, useRefuseFirst, useSubmit } from '../../hooks/useDiscoverChecker'
import { isAddress } from 'ethers/lib/utils'

const CheckerPage: React.FunctionComponent = () => {
  const { account, library, chainId } = useWeb3React()
  const { login } = useAuth();
  const [firstInputVal, setFirst] = useState('');
  const [updateInputVal, setUpdate] = useState('');
  const [cancelInputVal, setCancel] = useState('');
  const [isRole, setRole] = useState(false);

  useEffect(() => {
    getRole();
  }, [account, chainId])

  const getRole = () => {
    if(chainId === Number(process.env.REACT_APP_CHAIN_ID)){
      const result = useRole(account, library);
      result.then(res => setRole(res))
    }
  }

  const onClickSubmitFirst = (type: boolean) => {   // type: true -> pass; false -> refuse
    if(!isAddress(firstInputVal)){
      message.error('Please check the contract address!');
      return;
    }
    if(!isRole){
      message.error('You are not a verifier!');
      return;
    }
    if(type){
      const { firstSubmitCallback } = useSubmitFirst(firstInputVal, library)
      firstSubmitCallback().then(res => {
        message.success('Success to confirm');
        setFirst('');
      }).catch(e => {
        message.error(e.message)
      })
    } else {
      const { refuseFirstCallback } = useRefuseFirst(firstInputVal, library);
      refuseFirstCallback().then(res => {
        message.success('Success to refuse');
        setFirst('');
      }).catch(e => {
        message.error(e.message)
      })
    }
  }

  const onClickSubmit = (type: boolean) => {   // type: true -> pass; false -> refuse
    if(!isAddress(updateInputVal)){
      message.error('Please check the contract address!');
      return;
    }
    if(!isRole){
      message.error('You are not a verifier!');
      return;
    }
    if(type){
      const { submitCallback } = useSubmit(updateInputVal, library)
      submitCallback().then(res => {
        message.success('Success to confirm');
        setUpdate('');
      }).catch(e => {
        message.error(e.message)
      })
    } else {
      const { refuseCallback } = useRefuse(updateInputVal, library);
      refuseCallback().then(res => {
        message.success('Success to refuse');
        setUpdate('');
      }).catch(e => {
        message.error(e.message)
      })
    }
  }

  const onClickCancel = () => {
    if(!isAddress(cancelInputVal)){
      message.error('Please check the contract address!');
      return;
    }
    if(!isRole){
      message.error('You are not a verifier!');
      return;
    }
    const { cancelCallback } = useCancel(cancelInputVal, library)
    cancelCallback().then(res => {
      message.success('Success to cancel');
      setCancel('');
    }).catch(e => {
      message.error(e.message)
    })
  }
  return (
    <Container width={'600px'} style={{marginTop: '50px'}}>
      <Row gutter={16}>
        {
          account ? 
          <Descriptions title="DISCOVER KCC PROJECT CHECKER" bordered column={1}>
            <Descriptions.Item label="Your Account">{account}</Descriptions.Item>
            <Descriptions.Item label="Has Authority">{isRole ? 'True' : 'False'}</Descriptions.Item>
            <Descriptions.Item label="Support Network">{chainId === Number(process.env.REACT_APP_CHAIN_ID) ? 'True' : 'False'}</Descriptions.Item>
          </Descriptions>
          :
          <Button type="primary" onClick={() => login(ConnectorNames['Injected'])}>连接钱包</Button>
        }
      </Row>
      <Divider />
      <Row gutter={16}>
        <Descriptions title="Wait To First Commit Project List" column={1}>
          <Descriptions.Item>0x94ABA9bb383a64C68a37941cDe25184Dc51a62d9</Descriptions.Item>
        </Descriptions>
      </Row>
      <Divider />
      <Row gutter={16}>
        <Descriptions title="Wait To Update Commit Project List" column={1}>
          <Descriptions.Item>0x94ABA9bb383a64C68a37941cDe25184Dc51a62d9</Descriptions.Item>
        </Descriptions>
      </Row>
      <Divider />
      <Row gutter={16}>
        <Descriptions title="Can Off Shelf Project List" column={1}>
          <Descriptions.Item>0x94ABA9bb383a64C68a37941cDe25184Dc51a62d9</Descriptions.Item>
        </Descriptions>
      </Row>
      <Divider />
      <Row gutter={16}>
        <div>First Commit：</div>
        <Input value={firstInputVal} onChange={e => setFirst(e.target.value)} style={{margin: '20px 0'}}/>
        <>
          <Button type="primary" style={{marginRight: '20px'}} onClick={() => onClickSubmitFirst(true)}>Submit</Button> 
          <Button type="ghost" onClick={() => onClickSubmitFirst(false)}>Refuse</Button>
        </>
      </Row>
      <Divider />
      <Row gutter={16}>
        <div>Update Commit：</div>
        <Input value={updateInputVal} onChange={e => setUpdate(e.target.value)} style={{margin: '20px 0'}}/>
        <>
          <Button type="primary" style={{marginRight: '20px'}} onClick={() => onClickSubmit(true)}>Submit</Button> 
          <Button type="ghost" onClick={() => onClickSubmit(false)}>Refuse</Button>
        </>
      </Row>
      <Divider />
      <Row gutter={16}>
        <div>Off Shelf The Project：</div>
        <Input value={cancelInputVal} onChange={e => setCancel(e.target.value)} style={{margin: '20px 0'}}/>
        <>
          <Button type="primary" style={{marginRight: '20px'}} onClick={onClickCancel}>Off Shelf</Button> 
        </>
      </Row>
      <Divider />
    </Container>
  );
}

export default CheckerPage;
