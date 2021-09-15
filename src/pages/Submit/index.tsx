import React, { FunctionComponent, useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'react-i18next'
import { ApiService, useLoading } from '../../api'
import { Container, Text } from '../../style'
import { camera } from '../../constants/imgs'
import Row from 'components/Row'
import Col from 'components/Column'
import BN from 'bignumber.js'
import { Button, Select, Upload, Input, message } from 'antd'
import { getUrlParam } from '../../utils'
import * as LocalStyle from '../../style/pages'
import { useHistory } from 'react-router-dom'
import Footer from '../../components/Footer'
import SuccessModal from '../../components/SuccessModal'
import { useCommit, getMinMarginAmount, useUpdateCommit } from '../../hooks/useDiscoverContract'
import InputItem from 'components/InputItem'
const { create } = require('ipfs-http-client')
const { Option } = Select;

interface SubmitProps {
  title: string
  shortIntroduction: string
  logoLink: string
  banner: string
  websiteLink: string
  contractAddresses: string
  email: string
  primaryCategoryIndex: string | number | undefined
  secondaryCategoryIndex: string | number | undefined
  marginAmount: string | number | undefined
  tokenSymbol?: string
  detailDescription?: string
  tokenContractAddress?: string
  tvlInterface?: string
  twitterLink?: string
  telegramLink?: string
  githubLink?: string
  coinmarketcapLink?: string
  coingeckoLink?: string
  projectAddress?: string
}

const RequiredPoint = styled.div`
  color: #F5455B;
  font-size: 14px;
`

const ImgDown = styled.img`
  width: 20px;
  height: 20px;
`

//todo: score plus 10, margin < 100
const SubmitPage: React.FunctionComponent = (props) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { account, library, chainId } = useWeb3React()
  const [detailLoading, getInfo] = useLoading(ApiService.getDappInfo)
  const [cateLoading, getCategoryList] = useLoading(ApiService.getDappCategory)
  const [primaryList, setPList] = useState<[{
    name?: string 
    index?: number
    id?: number
    level?: number
  }]>([{}])
  const [subList, setSList] = useState<[{
    name?: string 
    index?: number
    id?: number
    level?: number
  }]>([{}])
  const [showModal, setModal] = useState(false)
  const history = useHistory();
  const name = getUrlParam('name')
  const [fileList, setFile] = useState([])
  const [minMargin, setMinMargin] = useState(100)
  const [editSymbol, setEditSymbol] = useState(true)

  const [title, setTitle] = useState('')
  const [shortIntroduction, setIntro] = useState('')
  const [primaryCategoryIndex, setPrimary] = useState(undefined)
  const [secondaryCategoryIndex, setSecondary] = useState(undefined)
  const [logoLink, setLogo] = useState('')
  const [websiteLink, setWebsite] = useState('')
  const [contractAddresses, setContract] = useState('')
  const [email, setEmail] = useState('')
  const [marginAmount, setMargin] = useState('')
  const [banner, setBanner] = useState('')


  const [tokenSymbol, setTokenSymbol] = useState('')
  const [detailDescription, setDes] = useState('')
  const [tokenContractAddress, setTokenContract] = useState('')
  const [tvlInterface, setTvl] = useState('')
  const [twitterLink, setTwitter] = useState('')
  const [telegramLink, setTelegram] = useState('')
  const [githubLink, setGithub] = useState('')
  const [coinmarketcapLink, setCoinMarket] = useState('')
  const [coingeckoLink, setCoinGecko] = useState('')

  const checkEmail = email && !/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(email) ? false : true
  //@ts-ignore
  const checkMargin = (marginAmount && marginAmount < minMargin && !name) ? false : true
  useEffect(() => {
    Promise.all([
      getCategoryList(),
      getInfo(name),
      getMinMarginAmount(library)
    ]).then((res: any) => {
      let primary: object[] = [], sub: object[] = [];
      for(let item of res[0]){
        if(item?.level === 1){ primary.push(item) }
        if(item?.level === 2){ sub.push(item) }
      }
      if(name){
        //when project is edited, data can not be changed
        setTitle(res[1].title)
        setContract(res[1].contract)
        res[1].tokenSymbol && setTokenSymbol(res[1].tokenSymbol) && setEditSymbol(false)
        //can be change
        setPrimary(res[1].priCategory.name)
        setSecondary(res[1].secCategory.name)
        setIntro(res[1].intro)
        setLogo(res[1].logo.includes('ipfs/') ? res[1].logo.split('ipfs/')[1] : res[1].logo)
        setBanner(res[1].banner.includes('ipfs/') ? res[1].banner.split('ipfs/')[1] : res[1].banner)
        setWebsite(res[1].website)
        setEmail(res[1].contact)
        res[1].detail && setDes(res[1].detail)
        res[1].tokenContract && setTokenContract(res[1].tokenContract)
        res[1].graphUrl && setTvl(res[1].graphUrl)
        res[1].twitter && setTwitter(res[1].twitter)
        res[1].telegram && setTelegram(res[1].telegram)
        res[1].github && setGithub(res[1].github)
        res[1].coinMarketCap && setCoinMarket(res[1].coinMarketCap)
        res[1].coinGecko && setCoinGecko(res[1].coinGecko)
      }
      setPList(primary as any);
      setSList(sub as any);
      setMinMargin(Number(res[2]))
    })
  }, [name])

  const onConfirm = () => {
    if(!account || !chainId) { message.error('Please connect your wallet'); return; };
    let params:SubmitProps = {
      title, shortIntroduction, logoLink, 
      websiteLink, email, marginAmount,
      contractAddresses, secondaryCategoryIndex, primaryCategoryIndex, banner
    }
    if(!logoLink.includes('https') && !logoLink.includes('ipfs')){
      params.logoLink = process.env.REACT_APP_IPFS_IMG_URL + logoLink
    }
    if(!banner.includes('https') && !logoLink.includes('ipfs')){
      params.banner = process.env.REACT_APP_IPFS_IMG_URL + banner
    }
    for(let item of primaryList){
      if(item.name === primaryCategoryIndex){
        params.primaryCategoryIndex = item.index
      }
    }
    for(let item of subList){
      if(item.name === secondaryCategoryIndex){
        params.secondaryCategoryIndex = item.index
      }
    }
    if(tokenSymbol) {params.tokenSymbol = tokenSymbol};
    if(detailDescription) {params.detailDescription = detailDescription};
    if(tokenContractAddress) {params.tokenContractAddress = tokenContractAddress};
    if(tvlInterface) {params.tvlInterface = tvlInterface};
    if(twitterLink) {params.twitterLink = twitterLink};
    if(telegramLink) {params.telegramLink = telegramLink};
    if(githubLink) {params.githubLink = githubLink};
    if(coinmarketcapLink) {params.coinmarketcapLink = coinmarketcapLink};
    if(coingeckoLink) {params.coingeckoLink = coingeckoLink};
    console.log('params =', params);
    if(name) {
      // edit project 
      params.projectAddress = account;
      const { updateCallback } = useUpdateCommit(params, library);
      updateCallback().then((res: any) => {
        console.log('result =', res);
        if(res){
          console.log(res)
          setModal(true);
        }
      })  
    } else{
      const { commitCallback } = useCommit(params, library);
      commitCallback().then((res: any) => {
        if(res){
          console.log(res)
          setModal(true);
        }
      })
    }
  }

  const upLoadProps = {
    onRemove: (file: any) => {
        //@ts-ignore
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFile(newFileList)
    },
    beforeUpload: (file: any) => {
        console.log('file =', file)
        //@ts-ignore
        setFile([...fileList, file])
        return false;
    },
    fileList,
  };

  const limitUploadImg = (file: any, standardWidth: number, standardHeight: number): boolean => {
    let reader = new FileReader();
    let result = false;
    reader.onload = function (e: any) {
        //@ts-ignore
        let data = e.target.result;
        let image = new Image();
        image.onload=function(){
          let width = image.width;
          let height = image.height;
          if(width !== standardWidth || height !== standardHeight){
            message.error('unacceptable img size', 3);
            result = false;
          } else {
            result = true
          }
        };
        //@ts-ignore
        image.src= data;
    };
    reader.readAsDataURL(file);
    return result
  }

  return (
    <>
      <Container style={{minHeight: '80vh', width: '536px'}}>
        <Col style={{marginTop: '40px', marginBottom: '50px'}}>
          <LocalStyle.ProjectText style={{fontSize: '32px', marginBottom: '30px'}}>Submit a Project</LocalStyle.ProjectText>
          <InputItem 
            title={'Title'}
            required={true}
            value={title}
            maxLength={30}
            placeholder={'Enter the title'}
            disabled={name ? true : false}
            onChange={e => {setTitle(e.target.value)}}
          />
          <Row mb="8px">
            <Text color={theme.colors.text} fontWeight="bold" mr={'5px'}>Primary Category</Text>
            <RequiredPoint>*</RequiredPoint>
          </Row>
          <Select
            showSearch
            placeholder="Choose"
            optionFilterProp="children"
            style={{marginBottom: '36px'}}
            value={primaryCategoryIndex}
            onChange={(e) => {setPrimary(e)}}
            filterOption={(input, option) =>
              //@ts-ignore
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          > 
            {
              primaryList.map((item: any) => {
                return (<Option value={item.name} key={item.id}>{item.name}</Option>)
              })
            }
          </Select>
          <Row mb="8px">
            <Text color={theme.colors.text} fontWeight="bold" mr={'5px'}>Secondary Category</Text>
            <RequiredPoint>*</RequiredPoint>
          </Row>
          <Select
            showSearch
            placeholder="Choose"
            optionFilterProp="children"
            value={secondaryCategoryIndex}
            style={{marginBottom: '36px'}}
            onChange={(e) => {setSecondary(e)}}
            filterOption={(input, option) =>
              //@ts-ignore
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          > 
            {
              subList.map((item: any) => {
                return (<Option value={item.name} key={item.id}>{item.name}</Option>)
              })
            }
          </Select>
          <InputItem 
            title={'Short Introduction'}
            required={true}
            isTextArea={true}
            maxLength={50}
            value={shortIntroduction}
            placeholder={'Enter some words'}
            onChange={e => {setIntro(e.target.value)}}
          />
          <InputItem 
            title={'Detail Description'}
            required={false}
            isTextArea={true}
            value={detailDescription}
            placeholder={'Enter some words'}
            onChange={e => {setDes(e.target.value)}}
          />
          <Row mb="8px">
            <Text color={theme.colors.text} fontWeight="bold" mr={'5px'}>Logo</Text>
            <RequiredPoint>*</RequiredPoint>
            <Text color={'#737E8D'} fontSize="14px" ml={'5px'}>Image Size: 288*288 px</Text>
          </Row>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            {...upLoadProps}
            onChange={(e) => {
              let result = limitUploadImg(e.file, 288, 288);
              if(!result) return;
              const client = create(process.env.REACT_APP_IPFS_URL);
              client.add(e.file).then((res: any) => {
                setLogo(res.path)
              })
            }}
          > 
            <Col>
              <LocalStyle.ProjectImgCamera src={camera}/>
              <Text fontSize="14px" color="#737E8D">Upload</Text>
            </Col>
          </Upload>
          <Input value={logoLink} disabled onChange={(e) => {setLogo(e.target.value)}} style={{marginTop: '15px'}}/>
          <div style={{height: '36px'}}/>
          <Row mb="8px">
            <Text color={theme.colors.text} fontWeight="bold" mr={'5px'}>Banner</Text>
            <RequiredPoint>*</RequiredPoint>
            <Text color={'#737E8D'} fontSize="14px" ml={'5px'}>Image Size: 880*400 px</Text>
          </Row>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            {...upLoadProps}
            onChange={(e) => {
              let result = limitUploadImg(e.file, 880, 400);
              if(!result) return;
              const client = create(process.env.REACT_APP_IPFS_URL);
              client.add(e.file).then((res: any) => {
                setBanner(res.path)
              })
            }}
          > 
            <Col>
              <LocalStyle.ProjectImgCamera src={camera}/>
              <Text fontSize="14px" color="#737E8D">Upload</Text>
            </Col>
          </Upload>
          <Input value={banner} disabled onChange={(e) => {setBanner(e.target.value)}} style={{marginTop: '15px'}}/>
          <div style={{height: '36px'}}/>
          <InputItem 
            title={'Smart Contract Addresses'}
            required={true}
            disabled={name ? true : false}
            value={contractAddresses}
            placeholder={'Enter your Smart Contract Address'}
            onChange={e => {setContract(e.target.value)}}
          />
          <InputItem 
            title={'Token Contract Address'}
            required={false}
            value={tokenContractAddress}
            placeholder={'Enter your Token Contract Address'}
            onChange={e => {setTokenContract(e.target.value)}}
          />
          <InputItem 
            title={'Token Symbol'}
            required={false}
            value={tokenSymbol}
            disabled={!editSymbol ? true : false}
            placeholder={'Enter your Token Symbol'}
            onChange={e => {setTokenSymbol(e.target.value)}}
          />
          <InputItem 
            title={'Tvl Interface (graphql)'}
            required={false}
            value={tvlInterface}
            placeholder={'Enter your Tvl Interface（graphql）'}
            titleInfo={true}
            titleInfoContent={'If your project involves asset related, please submit your Tvl interface（graphql）'}
            onChange={e => {setTvl(e.target.value)}}
          />
          <InputItem 
            title={'Website'}
            required={true}
            value={websiteLink}
            placeholder={'Enter your Website'}
            onChange={e => {setWebsite(e.target.value)}}
          />
          <InputItem 
            title={'Twitter'}
            required={false}
            value={twitterLink}
            placeholder={'Enter your Twitter'}
            onChange={e => {setTwitter(e.target.value)}}
          />
          <InputItem 
            title={'Telegram'}
            required={false}
            value={telegramLink}
            placeholder={'Enter your Telegram'}
            onChange={e => {setTelegram(e.target.value)}}
          />
          <InputItem 
            title={'Github'}
            required={false}
            value={githubLink}
            placeholder={'Enter your Github'}
            onChange={e => {setGithub(e.target.value)}}
          />
          <InputItem 
            title={'Coin Market Cap'}
            required={false}
            value={coinmarketcapLink}
            placeholder={'Enter your Coin Market Cap'}
            onChange={e => {setCoinMarket(e.target.value)}}
          />
          <InputItem 
            title={'Coin Gecko'}
            required={false}
            value={coingeckoLink}
            placeholder={'Enter your Coin Gecko'}
            onChange={e => {setCoinGecko(e.target.value)}}
          />
          <InputItem 
            title={name ? 'The amount of KCS margin call' : 'Amount of KCS margin'}
            required={name ? false : true}
            value={marginAmount}
            placeholder={'Submit your KCS margin'}
            titleInfo={true}
            titleInfoContent={`The minimum margin is ${minMargin} KCS and will also be shown in the project details.  it will be refunded if the subsequent application is taken off the shelf.`}
            error={(!checkMargin && !name)? `The minimum margin is ${minMargin} KCS` : ''}
            onChange={e => {
              setMargin(e.target.value)
              // if(/^\d*$/.test(e.target.value)) { setMargin(e.target.value) }
            }}
          />
          <InputItem 
            title={'Your Mailbox (For information update)'}
            required={true}
            value={email}
            placeholder={'Enter your Mailbox'}
            error={!checkEmail ? 'Please input correct email' : ''}
            onChange={e => {setEmail(e.target.value)}}
          />
          <Button 
            style={{width: '100px'}} 
            disabled={!title || !primaryCategoryIndex || !secondaryCategoryIndex || !shortIntroduction
            || !logoLink || !websiteLink || (!marginAmount && !name)|| !email || !contractAddresses 
            || !checkEmail || (!checkMargin && !name)}
            type="primary"
            onClick={() => onConfirm()}>Submit</Button>
        </Col>
      </Container>
      <Footer /> 
      <SuccessModal visible={showModal} onClose={() => { setModal(false); history.push('/account') }}/>
    </>
  )
}

export default SubmitPage
