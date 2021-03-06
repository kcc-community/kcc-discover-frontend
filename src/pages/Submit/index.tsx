import React, { FunctionComponent, useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'react-i18next'
import { ApiService, useLoading } from '../../api'
import { ETHER } from 'mojito-sdk'
import { Container, Text } from '../../style'
import { camera, Ipfs } from '../../constants/imgs'
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
import StringCrypto from 'string-crypto'
import { useCategoryPrimary, useCategorySubtle } from '../../state/application/hooks'
import { useChainError, useCurrencyBalances } from 'state/wallet/hooks'
import { updateChainError } from '../../state/wallet/actions'
import { useDispatch } from 'react-redux'
import { NFTStorage, File } from 'nft.storage'
import { isAddress } from 'ethers/lib/utils'
import { useResponsive } from 'utils/responsive'
import Helmet from 'react-helmet'

const { decryptString } = new StringCrypto()
const client = new NFTStorage({ token: decryptString(Ipfs, 'KCC_DISCOVER') })
const { Option } = Select

const { create } = require('ipfs-http-client')

interface SubmitProps {
  title: string
  shortIntroduction: string
  logoLink: string
  websiteLink: string
  contractAddresses: string
  email: string
  primaryCategoryIndex: string | number | undefined
  secondaryCategoryIndex: string | number | undefined
  marginAmount: string | number | undefined
  banner?: string
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
  color: #f5455b;
  font-size: 14px;
`

const SubmitPage: React.FunctionComponent = (props) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { account, library, chainId } = useWeb3React()
  const balance = useCurrencyBalances(account ?? undefined, [ETHER])
  const dispatch = useDispatch()
  const [detailLoading, getInfo] = useLoading(ApiService.getAccountProject)
  const primaryList = useCategoryPrimary()
  const subList = useCategorySubtle()
  const [showModal, setModal] = useState(false)
  const history = useHistory()
  const name = getUrlParam('name')
  const [fileList, setFile] = useState([])
  const [minMargin, setMinMargin] = useState(10)
  const [editSymbol, setEditSymbol] = useState(true)
  const chainError = useChainError()
  const [state, setState] = useState('')

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
  const { isMobile } = useResponsive()

  const checkEmail =
    email && !/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,6})+|\.([a-zA-Z]{2,6})$/.test(email) ? false : true
  //@ts-ignore
  const checkMargin = marginAmount && marginAmount < minMargin && (!name || state === 'Refused') ? false : true
  const checkContractAddress = ['Wallet', 'Community', 'Others'].includes(secondaryCategoryIndex ?? '') ? false : true
  const checkLink = (url: string) => {
    if (url.includes('/ipfs')) {
      return url.split('ipfs/')[1]
    } else if (url.includes('.ipfs.dweb.link')) {
      return url.split('.ipfs.dweb.link')[0].split('https://')[1]
    }
    return url
  }
  useEffect(() => {
    if (chainId && chainId !== Number(process.env.REACT_APP_CHAIN_ID)) {
      dispatch(updateChainError({ chainError: isMobile ? 'Unsupported' : 'Unsupported Network' }))
      return
      // todo: check the network type
      // switchNetwork(Number(process.env.REACT_APP_CHAIN_ID))
    }
    if (!chainId && !name) return
    if (name) {
      message.info('loading', 0)
    }
    Promise.all([getInfo(name), getMinMarginAmount(library)]).then((res: any) => {
      message.destroy()
      if (name) {
        //when project is edited, data can not be changed
        setState(res[0].state)
        setTitle(res[0].info.title)
        setContract(res[0].info.contract)
        res[0].info.tokenSymbol && setTokenSymbol(res[0].info.tokenSymbol) && setEditSymbol(false)
        //can be change
        setPrimary(res[0].info.priCategory.name)
        setSecondary(res[0].info.secCategory.name)
        setIntro(res[0].info.intro)
        setLogo(checkLink(res[0].info.logo))
        setWebsite(res[0].info.website)
        setEmail(res[0].info.contact)
        res[0].info.banner && setBanner(checkLink(res[0].info.banner))
        res[0].info.detail && setDes(res[0].info.detail)
        res[0].info.tokenContract && setTokenContract(res[0].info.tokenContract)
        res[0].info.graphUrl && setTvl(res[0].info.graphUrl)
        res[0].info.twitter && setTwitter(res[0].info.twitter)
        res[0].info.telegram && setTelegram(res[0].info.telegram)
        res[0].info.github && setGithub(res[0].info.github)
        res[0].info.coinMarketCap && setCoinMarket(res[0].info.coinMarketCap)
        res[0].info.coinGecko && setCoinGecko(res[0].info.coinGecko)
        if (res[0].state !== 'Refused') {
          setMargin('0')
        } else {
          setMargin(res[1])
        }
      } else {
        setMargin(res[1])
      }
      setMinMargin(Number(res[1]))
    })
  }, [name, chainId])

  const onConfirm = () => {
    if (!account || !chainId) {
      message.error(t('Please connect your wallet'))
      return
    }
    if (balance[0] && new BN(marginAmount).isGreaterThan(new BN(balance[0]?.toSignificant(18)))) {
      message.error(t('Your KCS balance is insufficient'))
      return
    }
    if (state && state !== 'None' && state !== 'Refused' && !name) {
      message.error(t('One address only can submit one project'))
      return
    }
    if (tokenContractAddress && !isAddress(tokenContractAddress)) {
      message.error(t('Please check your token contract '))
      return
    }

    let params: SubmitProps = {
      title,
      shortIntroduction,
      logoLink,
      email,
      marginAmount,
      contractAddresses,
      secondaryCategoryIndex,
      primaryCategoryIndex,
      websiteLink: checkHttps(websiteLink),
    }
    if (logoLink && !logoLink.includes('https') && !logoLink.includes('ipfs')) {
      // params.logoLink = 'https://' + logoLink + process.env.REACT_APP_IPFS_IMG_URL
      params.logoLink = process.env.REACT_APP_IPFS_IMG_URL + logoLink
    }
    if (banner && !banner.includes('https') && !banner.includes('ipfs')) {
      // params.banner = 'https://' + banner + process.env.REACT_APP_IPFS_IMG_URL
      params.banner = process.env.REACT_APP_IPFS_IMG_URL + banner
    } else if (banner) {
      params.banner = banner
    }
    for (let item of primaryList) {
      if (item.name === primaryCategoryIndex) {
        params.primaryCategoryIndex = item.index
      }
    }
    for (let item of subList) {
      if (item.name === secondaryCategoryIndex) {
        params.secondaryCategoryIndex = item.index
      }
    }
    if (tokenSymbol) {
      params.tokenSymbol = tokenSymbol
    }
    if (detailDescription) {
      params.detailDescription = detailDescription
    }
    if (tokenContractAddress) {
      params.tokenContractAddress = tokenContractAddress
    }
    if (tvlInterface) {
      params.tvlInterface = tvlInterface
    }
    if (twitterLink) {
      params.twitterLink = checkHttps(twitterLink)
    }
    if (telegramLink) {
      params.telegramLink = checkHttps(telegramLink)
    }
    if (githubLink) {
      params.githubLink = checkHttps(githubLink)
    }
    if (coinmarketcapLink) {
      params.coinmarketcapLink = coinmarketcapLink
    }
    if (coingeckoLink) {
      params.coingeckoLink = coingeckoLink
    }
    if (name && state === 'Displaying') {
      // edit project
      params.projectAddress = account
      const { updateCallback } = useUpdateCommit(params, library)
      updateCallback()
        .then((res: any) => {
          if (res) {
            console.log(res)
            setModal(true)
          }
        })
        .catch((e) => {
          message.error(t('Contract call error'))
        })
    } else {
      const { commitCallback } = useCommit(params, library)
      commitCallback()
        .then((res: any) => {
          if (res) {
            console.log(res)
            setModal(true)
          }
        })
        .catch((e) => {
          if (e && e.code === -32000) {
            message.error(t('Your KCS balance is insufficient'))
          } else if (e && e.code === -32603) {
            message.error(t('One address only can submit one project'))
          } else {
            message.error(t('Contract call error'))
          }
        })
    }
  }

  const checkHttps = (url: string) => {
    if (!url.includes('https') && !url.includes('http')) {
      return 'https://' + url
    }
    return url
  }

  const splitSpace = (value?: string | undefined) => {
    if (value === ' ') {
      return ''
    } else return value ?? ''
  }

  const upLoadProps = {
    onRemove: (file: any) => {
      //@ts-ignore
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFile(newFileList)
    },
    beforeUpload: (file: any) => {
      console.log('file =', file)
      //@ts-ignore
      setFile([...fileList, file])
      return false
    },
    accept: 'image/*',
    fileList,
  }

  const uploadImg = async (type: string, file: any, limit: { width: number; height: number }) => {
    let sizeResult = await limitUploadSize(file, limit.width, limit.height)
    let volumeResult = limitUploadVolume(type, file.size)
    if (!sizeResult || !volumeResult) {
      message.error(t('Unacceptable img size'), 3)
      return
    }
    message.info(t('Uploading'), 0)
    // const metadata = await client.storeBlob(new Blob([file] as any))
    // console.log('metadata.json contents with IPFS gateway URLs:\n', metadata)
    // message.destroy()
    // message.success(t('Upload success'))
    // switch (type) {
    //   case 'logo':
    //     setLogo(metadata)
    //     break
    //   case 'banner':
    //     setBanner(metadata)
    //     break
    // }
    const client = create(process.env.REACT_APP_IPFS_URL)
    client
      .add(file)
      .then((res: any) => {
        message.destroy()
        message.success(t('Upload success'))
        switch (type) {
          case 'logo':
            setLogo(res.path)
            break
          case 'banner':
            setBanner(res.path)
            break
        }
      })
      .catch((e) => {
        message.destroy()
        message.error(t('Upload fail, please try again.'))
        console.log('upload e = ', e)
      })
  }

  const limitUploadVolume = (type: string, size: number) => {
    const limit = { logo: 512, banner: 2048 }
    return Number(size) / 1024 <= limit[type]
  }

  const limitUploadSize = (file: any, standardWidth: number, standardHeight: number) => {
    return new Promise(function (resolve, reject) {
      let reader = new FileReader()
      reader.onload = function (e: any) {
        //@ts-ignore
        let data = e.target.result
        let image = new Image()
        image.onload = function () {
          let width = image.width
          let height = image.height
          if (width !== standardWidth || height !== standardHeight) {
            resolve(false)
          } else {
            resolve(true)
          }
        }
        //@ts-ignore
        image.src = data
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <>
      <Helmet>
        <title>Submit Your Own Projects to KCC</title>
        <meta name="description" content="Submit your own projects to KCC." />
      </Helmet>
      <Container style={{ minHeight: '80vh', width: isMobile ? '100%' : '536px', padding: isMobile ? '0 15px' : '0' }}>
        <Col style={{ marginTop: isMobile ? '24px' : '40px', marginBottom: '50px' }}>
          <LocalStyle.ProjectText
            style={{ fontSize: isMobile ? '20px' : '32px', marginBottom: isMobile ? '15px' : '30px' }}
          >
            {name ? t('Modify a project') : t('Submit a project')}
          </LocalStyle.ProjectText>
          <InputItem
            title={t('Title')}
            required={true}
            value={title}
            maxLength={30}
            placeholder={t('Enter the title')}
            disabled={name ? true : false}
            onChange={(e) => {
              setTitle(splitSpace(e.target.value))
            }}
          />
          <Row mb="8px">
            <Text color={theme.colors.text} fontWeight="bold" mr={'5px'}>
              {t('Primary Category')}
            </Text>
            <RequiredPoint>*</RequiredPoint>
          </Row>
          <Select
            showSearch
            placeholder={t('Choose')}
            optionFilterProp="children"
            style={{ marginBottom: isMobile ? '24px' : '36px' }}
            value={primaryCategoryIndex}
            onChange={(e) => {
              setPrimary(e)
            }}
            filterOption={(input, option) =>
              //@ts-ignore
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {primaryList.map((item: any, index: number) => {
              if (index === 0) return
              return (
                <Option value={item.name} key={item.id}>
                  {item.name}
                </Option>
              )
            })}
          </Select>
          <Row mb="8px">
            <Text color={theme.colors.text} fontWeight="bold" mr={'5px'}>
              {t('Secondary Category')}
            </Text>
            <RequiredPoint>*</RequiredPoint>
          </Row>
          <Select
            showSearch
            placeholder={t('Choose')}
            optionFilterProp="children"
            value={secondaryCategoryIndex}
            style={{ marginBottom: isMobile ? '24px' : '36px' }}
            onChange={(e) => {
              setSecondary(e)
            }}
            filterOption={(input, option) =>
              //@ts-ignore
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {subList.map((item: any, index: number) => {
              if (index === 0) return
              return (
                <Option value={item.name} key={item.id}>
                  {item.name}
                </Option>
              )
            })}
          </Select>
          <InputItem
            title={t('Short Introduction')}
            required={true}
            isTextArea={true}
            maxLength={50}
            value={shortIntroduction}
            placeholder={t('Enter some words')}
            onChange={(e) => {
              setIntro(splitSpace(e.target.value))
            }}
          />
          <InputItem
            title={t('Detail Description')}
            required={false}
            isTextArea={true}
            value={detailDescription}
            placeholder={t('Enter some words')}
            onChange={(e) => {
              setDes(splitSpace(e.target.value))
            }}
          />
          <Row mb="8px">
            <Text color={theme.colors.text} fontWeight="bold" mr={'5px'}>
              {t('Logo')}
            </Text>
            <RequiredPoint>*</RequiredPoint>
            <Text color={'#737E8D'} fontSize="14px" ml={'5px'}>
              {t('Image Size')}: 288*288 px
            </Text>
          </Row>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            {...upLoadProps}
            onChange={async (e) => {
              uploadImg('logo', e.file, { width: 288, height: 288 })
            }}
          >
            <Col>
              <LocalStyle.ProjectImgCamera src={camera} />
              <Text fontSize="14px" color="#737E8D">
                {t('Upload')}
              </Text>
            </Col>
          </Upload>
          <Input
            value={logoLink}
            disabled
            onChange={(e) => {
              setLogo(splitSpace(e.target.value))
            }}
            style={{ marginTop: '15px' }}
          />
          <div style={{ height: isMobile ? '24px' : '36px' }} />
          <Row mb="8px">
            <Text color={theme.colors.text} fontWeight="bold" mr={'5px'}>
              {t('Banner')}
            </Text>
            {/* <RequiredPoint>*</RequiredPoint> */}
            <Text color={'#737E8D'} fontSize="14px" ml={'5px'}>
              {t('Image Size')}: 880*400 px
            </Text>
          </Row>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            {...upLoadProps}
            onChange={async (e) => {
              uploadImg('banner', e.file, { width: 880, height: 400 })
            }}
          >
            <Col>
              <LocalStyle.ProjectImgCamera src={camera} />
              <Text fontSize="14px" color="#737E8D">
                {t('Upload')}
              </Text>
            </Col>
          </Upload>
          <Input
            value={banner}
            disabled
            onChange={(e) => {
              setBanner(e.target.value)
            }}
            style={{ marginTop: '15px' }}
          />
          <img src="" id="test" />
          <div style={{ height: isMobile ? '24px' : '36px' }} />
          <InputItem
            title={t('Smart Contract Address')}
            required={checkContractAddress}
            disabled={name && contractAddresses ? true : false}
            value={contractAddresses}
            placeholder={t('Enter your Smart Contract Address')}
            onChange={(e) => {
              setContract(splitSpace(e.target.value))
            }}
            error={contractAddresses && !isAddress(contractAddresses) ? 'Error contract address' : ''}
          />
          <InputItem
            title={name && state !== 'Refused' ? t('The amount of KCS margin call') : t('Amount of KCS margin')}
            required={name && state !== 'Refused' ? false : true}
            value={marginAmount}
            placeholder={t('Submit your KCS margin')}
            titleInfo={true}
            titleInfoContent={t('Submit-1', { minMargin: minMargin })}
            error={!checkMargin && (!name || state === 'Refused') ? t('Submit-2', { minMargin: minMargin }) : ''}
            onChange={(e) => {
              setMargin(e.target.value)
              // if(/^\d*$/.test(e.target.value)) { setMargin(e.target.value) }
            }}
          />
          <InputItem
            title={t('Your Mailbox (For information update)')}
            required={true}
            value={email}
            disabled={name ? true : false}
            placeholder={t('Enter your Mailbox')}
            error={!checkEmail ? t('Please input correct email') : ''}
            onChange={(e) => {
              setEmail(e.target.value.trim())
            }}
          />
          <InputItem
            title={t('Token Symbol')}
            required={false}
            value={tokenSymbol}
            disabled={!editSymbol ? true : false}
            placeholder={t('Enter your Token Symbol')}
            onChange={(e) => {
              setTokenSymbol(splitSpace(e.target.value))
            }}
          />
          <InputItem
            title={t('Token Contract Address')}
            required={false}
            value={tokenContractAddress}
            placeholder={t('Enter your Token Contract Address')}
            onChange={(e) => {
              setTokenContract(e.target.value.trim())
            }}
            error={tokenContractAddress && !isAddress(tokenContractAddress) ? 'Error contract address' : ''}
          />
          <InputItem
            title={t('Tvl Interface (graphql)')}
            required={false}
            value={tvlInterface}
            placeholder={t('Enter your Tvl Interface???graphql???')}
            titleInfo={true}
            titleInfoContent={t('If your project involves asset related, please submit your Tvl interface???graphql???')}
            onChange={(e) => {
              setTvl(e.target.value.trim())
            }}
          />
          <InputItem
            title={t('Github')}
            required={false}
            value={githubLink}
            placeholder={t('Enter your Github')}
            onChange={(e) => {
              setGithub(e.target.value.trim())
            }}
          />
          <InputItem
            title={t('Website')}
            required={true}
            value={websiteLink}
            placeholder={t('Enter your Website')}
            onChange={(e) => {
              setWebsite(e.target.value.trim())
            }}
          />
          <InputItem
            title={t('Twitter')}
            required={false}
            value={twitterLink}
            placeholder={t('Enter your Twitter')}
            onChange={(e) => {
              setTwitter(e.target.value.trim())
            }}
          />
          <InputItem
            title={'Telegram'}
            required={false}
            value={telegramLink}
            placeholder={t('Enter your Telegram')}
            onChange={(e) => {
              setTelegram(e.target.value.trim())
            }}
          />
          <InputItem
            title={t('Coin Market Cap')}
            required={false}
            value={coinmarketcapLink}
            placeholder={t('Enter your Coin Market Cap')}
            onChange={(e) => {
              setCoinMarket(splitSpace(e.target.value))
            }}
          />
          <InputItem
            title={t('Coin Gecko')}
            required={false}
            value={coingeckoLink}
            placeholder={t('Enter your Coin Gecko')}
            onChange={(e) => {
              setCoinGecko(splitSpace(e.target.value))
            }}
          />
          <Button
            style={{
              width: isMobile ? '100%' : '100px',
              height: isMobile ? '48px' : '32px',
              borderRadius: isMobile ? '24px !important' : '12px',
            }}
            disabled={
              !title ||
              !primaryCategoryIndex ||
              !secondaryCategoryIndex ||
              !shortIntroduction ||
              !logoLink ||
              !websiteLink ||
              (!marginAmount && (!name || state === 'Refused')) ||
              !email ||
              ((!contractAddresses || !isAddress(contractAddresses)) && checkContractAddress) ||
              !checkEmail ||
              (!checkMargin && (!name || state === 'Refused')) ||
              chainError ||
              (tokenContractAddress && !isAddress(tokenContractAddress))
            }
            type="primary"
            onClick={() => onConfirm()}
          >
            {t('Submit')}
          </Button>
        </Col>
      </Container>
      <Footer />
      <SuccessModal
        visible={showModal}
        onClose={() => {
          setModal(false)
          history.push('/account')
        }}
      />
    </>
  )
}

export default SubmitPage
