import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core'
import { Button, Row, Descriptions, Divider, message, Table, Input, Modal } from 'antd'
import useAuth from '../../hooks/useAuth'
import { ApiService, useLoading } from '../../api'
import { ConnectorNames } from '../../constants/wallet'
import { Container, Text } from '../../style'
import { useSubmitFirst, useRole, useRefuse, useCancel, useRefuseFirst, useSubmit } from '../../hooks/useDiscoverChecker'
import { useHistory } from 'react-router-dom'
import md5 from 'md5'


interface detailData {
  title: string
  intro: string 
  owner: string 
  logo: string 
  banner: string
  margin: string | number
  website: string
  contact: string 
  contract: string
  detail?: string
  github?: string
  twitter?: string 
  graphUrl?: string 
  telegram?: string
  coinGecko?: string 
  tokenSymbol?: string
  coinMarketCap?: string 
  tokenContract?: string
  appStatus?: number | null | string
}

const CheckerPage: React.FunctionComponent = () => {
  const { account, library, chainId } = useWeb3React()
  
  const { login } = useAuth();
  const [isRole, setRole] = useState(false);
  const [dappLoading, getDappList] = useLoading(ApiService.getDappList)
  const [submitListLoading, getSubmitList] = useLoading(ApiService.getAudit)
  const [dappList, setDapp] = useState<{owner: string, title: string, contact: string, contract: string, margin: string | number}[]>([])
  const [submitList, setSubmit] = useState([])
  const history = useHistory()
  const [isLogin, setLogin] = useState(false)
  const [offTotal, setOffTotal] = useState(0)
  const [submitTotal, setSubmitTotal] = useState(0)
  const [user, setUser] = useState('')
  const [password, setPwd] = useState('')
  const [showProject, setShow] = useState(false) 
  const [detail, setDetail] = useState<detailData>({title: '', intro: '', detail: '', margin: '', logo: '', banner: '', website: '', contact: '', contract: '', owner:''})

  useEffect(() => {
    getRole();
    Promise.all([
      getDappList({limit: 100}),
      getSubmitList()
    ]).then((res: any) => {
      setDapp(res[0].list)
      setOffTotal(res[0].total)
      setSubmit(res[1].list)
      setSubmitTotal(res[1].total)
    })
    let key = localStorage.getItem("KCCDISCOVER_LOGIN");
    if(key) setLogin(true);
  }, [account, chainId])

  const getRole = () => {
    if(chainId === Number(process.env.REACT_APP_CHAIN_ID)){
      const result = useRole(account, library);
      result.then(res => setRole(res))
    }
  }

  const onClickSubmitFirst = (address: string, type: boolean) => {   // type: true -> pass; false -> refuse
    if(!isRole){
      message.error('You are not a verifier!');
      return;
    }
    if(type){
      const { firstSubmitCallback } = useSubmitFirst(address, library)
      firstSubmitCallback().then(res => {
        message.success('Success to confirm, check data later');
      }).catch(e => {
        message.error(e.message)
      })
    } else {
      const { refuseFirstCallback } = useRefuseFirst(address, library);
      refuseFirstCallback().then(res => {
        message.success('Success to refuse, check data later');
      }).catch(e => {
        message.error(e.message)
      })
    }
  }

  const onClickSubmit = (address: string, type: boolean) => {   // type: true -> pass; false -> refuse
    if(!isRole){
      message.error('You are not a verifier!');
      return;
    }
    if(type){
      const { submitCallback } = useSubmit(address, library)
      submitCallback().then(res => {
        setShow(false);
        message.success('Success to confirm, check data later');
      }).catch(e => {
        message.error(e.message)
      })
    } else {
      const { refuseCallback } = useRefuse(address, library);
      refuseCallback().then(res => {
        setShow(false);
        message.success('Success to refuse, check data later');
      }).catch(e => {
        message.error(e.message)
      })
    }
  }

  const onClickCancel = (address: string) => {
    if(!isRole){
      message.error('You are not a verifier!');
      return;
    }
    const { cancelCallback } = useCancel(address, library)
    cancelCallback().then(res => {
      setShow(false);
      message.success('Success to cancel, check data later');
    }).catch(e => {
      message.error(e.message)
    })
  }

  const loginUser = () => {
    if(user === 'DiscoverKCC' && md5(password) === '76e39c6b183dc5a65aa00b5416f02788'){
      localStorage.setItem("KCCDISCOVER_LOGIN", 'DiscoverLoginSuccess');
      setLogin(true)
    } else {
      message.error('Login Fail!')
    }
  }

  const openModal = (data) => {
    let row = {...data.data, appStatus: data.appStatus};
    for(let i in dappList){
      if(dappList[i].owner === row.owner){
        if(!row.title) row.title = dappList[i].title;
        if(!row.contact) row.contact = dappList[i].contact;
        if(!row.contract) row.contract = dappList[i].contract;
        if(!row.margin) row.margin = Number(dappList[i].margin) + Number(row.addMargin);
      }
    }
    setDetail(row); 
    setShow(true);
  }

  const columns = (type) => {
    let col = [
      {
        title: 'Address',
        key: '1',
        width: 400,
        dataIndex: 'owner'
      },
      {
        title: 'Action',
        key: '2',
        width: 200,
        render: (row) => (
          type === 'off' ? 
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Button type="primary" onClick={() => {onClickCancel(row.owner)}}>Off Shelf</Button>
            <Divider type="vertical"/>
            <Button onClick={() => history.push(`/project_detail?name=${row.name}`)}>Detail</Button>
          </div>
          :
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Button type="primary" onClick={() => {
              if(row.appStatus !== 0){ onClickSubmitFirst(row.owner, true) }
              else { onClickSubmit(row.owner, true) }
            }}>Submit</Button>
            <Divider type="vertical"/>
            <Button type="ghost" onClick={() => {
              if(row.appStatus !== 0){ onClickSubmitFirst(row.owner, false) }
              else { onClickSubmit(row.owner, false) }
            }}>Refuse</Button>
            <Divider type="vertical"/>
            <Button onClick={() => { openModal(row) }}>Detail</Button>
          </div>
        )
      }
    ]
    return col;
  };

  if(!isLogin) {
    return(
      <Container width={'600px'} style={{marginTop: '50px'}}>
        <Row gutter={16}>
          <Input placeholder="Input Account" onChange={e => setUser(e.target.value)}/>
          <Divider />
          <Input type="password" placeholder="Input Password" onChange={e => setPwd(e.target.value)}/>
          <Divider />
          <Button type="primary" onClick={() => loginUser()}>Login</Button>
        </Row>
      </Container>
    )
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
          <Button type="primary" onClick={() => login(ConnectorNames['Injected'])}>Connect Wallet</Button>
        }
      </Row>
      <Divider />
      <Row gutter={16}>
        <Descriptions title="Wait To Commit Project List" column={1} />
        <Table columns={columns('commit')} dataSource={submitList} pagination={{ pageSize: 10, total: submitTotal }}/>
      </Row>
      <Divider />
      <Row gutter={16}>
        
      </Row>
      <Divider />
      <Row gutter={16}>
        <Descriptions title="Can Off Shelf Project List" column={1} />
        <Table columns={columns('off')} dataSource={dappList} pagination={{ pageSize: 10, total: offTotal }}/>
      </Row>
      <Divider />
      <Modal 
        visible={showProject}
        onCancel={() => setShow(false)}
        footer={[
          <Button type="ghost" onClick={() => {
            if(detail.appStatus === 0){
              onClickSubmit(detail.owner, false);
            } else {
              onClickSubmitFirst(detail.owner, false)
            }
          }}>Refuse</Button>,
          <Button type="primary" onClick={() => {
            console.log('detail =', detail);
            if(detail.appStatus === 0){
              onClickSubmit(detail.owner, true)
            } else {
              onClickSubmitFirst(detail.owner, true)
            }
          }}>Submit</Button>,
        ]}
      >
        <Descriptions title="Project Detail" bordered column={1}>
          <Descriptions.Item label="Title">{detail?.title}</Descriptions.Item>
          <Descriptions.Item label="Intro">{detail?.intro || '-'}</Descriptions.Item>
          {detail.detail && <Descriptions.Item label="Detail">{detail?.detail || '-'}</Descriptions.Item>}
          <Descriptions.Item label="Logo"><img src={detail.logo} style={{width: '40px'}}/></Descriptions.Item>
          {detail.banner && <Descriptions.Item label="Banner"><img src={detail.banner} style={{width: '100px'}}/></Descriptions.Item>}
          <Descriptions.Item label="Margin">{detail?.margin}KCS</Descriptions.Item>
          <Descriptions.Item label="Website">{detail?.website}</Descriptions.Item>
          <Descriptions.Item label="Email">{detail?.contact}</Descriptions.Item>
          <Descriptions.Item label="Contract">{detail?.contract}</Descriptions.Item>
          {detail.github && <Descriptions.Item label="Github">{detail?.github}</Descriptions.Item>}
          {detail.twitter && <Descriptions.Item label="Twitter">{detail?.twitter}</Descriptions.Item>}
          {detail.graphUrl && <Descriptions.Item label="GraphUrl">{detail?.graphUrl}</Descriptions.Item>}
          {detail.telegram && <Descriptions.Item label="Telegram">{detail?.telegram}</Descriptions.Item>}
          {detail.coinGecko && <Descriptions.Item label="CoinGecko">{detail?.coinGecko}</Descriptions.Item>}
          {detail.tokenSymbol && <Descriptions.Item label="TokenSymbol">{detail?.tokenSymbol}</Descriptions.Item>}
          {detail.coinMarketCap && <Descriptions.Item label="CoinMarketCap">{detail?.coinMarketCap}</Descriptions.Item>}
          {detail.tokenContract && <Descriptions.Item label="TokenContract">{detail?.tokenContract}</Descriptions.Item>}
        </Descriptions>
      </Modal>
    </Container>
  );
}

export default CheckerPage;
