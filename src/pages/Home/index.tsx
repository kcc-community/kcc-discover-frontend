import React, { FunctionComponent, useState, useRef } from 'react'
import styled, { useTheme } from 'styled-components'
import { Container, Text } from '../../style'
import * as LocalStyle from '../../style/pages'
import { ChartData } from '../../constants/home'
import Helmet from 'react-helmet'
import {
  CommunityIcon,
  DaoIcon,
  EarnIcon,
  ExchangeIcon,
  GameIcon,
  LaunchpadIcon,
  MoreIcon,
  NftIcon,
  ToolIcon,
  WalletIcon,
} from '../../style/components/Svg'
import Chart from './Charts'
import Row, { RowBetween, AutoRow } from 'components/Row'
import Col from '../../components/Column'
import Footer from '../../components/Footer'
import CountUp from 'react-countup'
import { FadeInUp } from 'utils/animation'
import { useResponsive } from 'utils/responsive'
import { right, iconLeft, iconRight, websiteWhite, bannerDef, logoDef } from '../../constants/imgs'
import { ApiService, useLoading } from '../../api'
import { Img } from 'react-image'
import VisibilitySensor from 'react-visibility-sensor'
import { Skeleton } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { useCategorySubtle } from '../../state/application/hooks'
import usePriceInfo from '../../hooks/usePriceInfo'
import { GoldIcon, SliverIcon, BronzeIcon } from '../../style/components/Svg'
import { StackedCarousel, ResponsiveContainer, StackedCarouselSlideProps } from 'react-stacked-center-carousel'
import dayjs from 'dayjs'
import BN from 'bignumber.js'

BN.config({ FORMAT: { groupSize: 3, groupSeparator: ',' } })

interface PriceProps {
  addressCount: string
  avgGasPrice: string
  txCount: number | string
  txCount24H: number | string
  priceUsd: string
}

const Categories = {
  Exchange: <ExchangeIcon height="60px" width="60px" />,
  Lending: <LaunchpadIcon height="60px" width="60px" />,
  Earn: <EarnIcon height="60px" width="60px" />,
  Game: <GameIcon height="60px" width="60px" />,
  Tools: <ToolIcon height="60px" width="60px" />,
  Others: <MoreIcon height="60px" width="60px" />,
  NFT: <NftIcon height="60px" width="60px" />,
  Community: <CommunityIcon height="60px" width="60px" />,
  DAO: <DaoIcon height="60px" width="60px" />,
  Wallet: <WalletIcon height="60px" width="60px" />,
}

const HomePage: React.FunctionComponent = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  let [chart1Data, setChart1Data] = React.useState(null)
  const { isTablet, isMobile } = useResponsive()
  const [chartLoading, getChart] = useLoading(ApiService.getGlobalChart)
  const [dappLoading, getTopDapp] = useLoading(ApiService.getTopDappRank)
  const [sliderLoading, getSliderInfo] = useLoading(ApiService.getHomeDiscover)
  const [topDapps, setTopDapp] = useState([])
  const [showTop, setShowTop] = useState(false)
  const [sliderDom, setSliderDom] = useState([
    { cover: '', title: '-', logo: '' },
    { cover: '', title: '-', logo: '' },
    { cover: '', title: '-', logo: '' },
    { cover: '', title: '-', logo: '' },
    { cover: '', title: '-', logo: '' },
  ])
  const [chartData, setChartData] = useState([{ dailyVolumeETH: '0', totalLiquidityETH: '0', totalLiquidityUSD: '0' }])
  const [dailyVolumeRate, setDailyRate] = useState('0.00')
  const priceInfo: PriceProps = usePriceInfo()
  const [active, setActive] = useState(0)
  const categorySubtle = useCategorySubtle()
  //@ts-ignore
  const sliderRef = useRef<ResponsiveContainer>()
  const mountedRef = useRef(true)
  const theme = useTheme()
  const { t } = useTranslation()
  const containerWidth = isTablet ? '768px' : isMobile ? '100vw' : '1200px'

  let [chart1] = [null]

  async function updateChart() {
    let opts: null
    opts = JSON.parse(JSON.stringify(ChartData))
    getChart().then((res: any) => {
      if (!mountedRef.current) return null
      let xAxisData = [],
        seriesData = [],
        max = 0
      if (res.length) setChartData(res)
      if (res[res.length - 2] && res[res.length - 3]) {
        setDailyRate(
          new BN(res[res.length - 2].totalLiquidityUSD)
            .minus(res[res.length - 3].totalLiquidityUSD)
            .div(res[res.length - 3].totalLiquidityUSD)
            .multipliedBy(100)
            .toFixed(2)
            .toString()
        )
      }
      for (let i = 0; i < res.length; i++) {
        //@ts-ignore
        xAxisData.push(dayjs(res[i].date * 1000).format('YYYY-MM-DD'))
        //@ts-ignore
        seriesData.push(new BN(res[i].totalLiquidityUSD).toFixed(2, 1).toString())
        max = Math.max(max, res[i].totalLiquidityUSD)
      }
      console.log('xAxisData =', xAxisData)
      //@ts-ignore
      opts.xAxis.data = xAxisData
      //@ts-ignore
      opts.yAxis.max = max + parseInt(max / 3)
      //@ts-ignore
      opts.series[0].data = seriesData
      setChart1Data(opts)
      return
    })
  }

  React.useEffect(() => {
    Promise.all([getTopDapp(), getSliderInfo()]).then((res: any) => {
      if (!mountedRef.current) return null
      setTopDapp(res[0].list)
      //deal slider info
      let slider = [res[1].dayComments, res[1].dayTxCount, res[1].txCount, res[1].totalLiquidityETH, res[1].dayScore]
      let dom = [] as any
      for (let i in slider) {
        if (slider[i]) {
          dom.push({
            title: slider[i].title,
            name: slider[i].name,
            cover: slider[i].banner,
            logo: slider[i].logo,
          })
        }
      }
      if (dom.length) {
        setSliderDom(dom)
      }
      return
    })
    updateChart()
    return () => {
      mountedRef.current = false
      sliderRef.current = null
    }
  }, [chart1])

  const DappItem = (data: any, index: number) => {
    const rank = [
      <GoldIcon width="28px" height="35px" />,
      <SliverIcon width="28px" height="35px" />,
      <BronzeIcon width="28px" height="35px" />,
    ]
    return (
      <LocalStyle.RankItem onClick={() => history.push('/project_detail?name=' + data?.name)} key={index}>
        <LocalStyle.RankImg>
          {rank[index] ? (
            rank[index]
          ) : (
            <LocalStyle.SecondText style={{ fontSize: '15px', textAlign: 'left', fontWeight: 'bold', margin: '0 5px' }}>
              {index + 1}th
            </LocalStyle.SecondText>
          )}
        </LocalStyle.RankImg>
        <RowBetween style={{ flexWrap: 'nowrap' }}>
          <Row>
            <VisibilitySensor onChange={() => setShowTop(true)}>
              <Img
                decode={true}
                style={{ width: '40px', height: '40px', marginRight: '12px', borderRadius: '4px' }}
                loader={<LocalStyle.RankLogo src={logoDef} alt="DApp logo" />}
                unloader={<LocalStyle.RankLogo src={logoDef} alt="DApp logo" />}
                src={[data?.logo]}
              />
            </VisibilitySensor>
            <Col style={{ width: '70%' }}>
              <LocalStyle.SecondText style={{ fontSize: '14px' }}>{data?.title}</LocalStyle.SecondText>
              <Text ellipsis color="darkGrey" fontSize="12px">
                {data?.intro}
              </Text>
            </Col>
          </Row>
          <LocalStyle.RightImg src={right} />
        </RowBetween>
      </LocalStyle.RankItem>
    )
  }

  const InfoData = (title: string, num: number, key: number) => {
    return (
      <FadeInUp delay={key * 100}>
        <LocalStyle.InfoCard style={{ marginBottom: isTablet ? '15px' : '0', marginTop: isMobile ? '15px' : '0' }}>
          <LocalStyle.SecondText style={{ fontSize: isMobile ? '24px' : '32px', fontFamily: 'kccfont Number Normal' }}>
            {key ? '' : '$'}
            <CountUp start={0} end={num} decimals={key ? 0 : 11} duration={1.5} separator="," />
          </LocalStyle.SecondText>
          <LocalStyle.SecondText style={{ fontSize: '14px', color: theme.colors.darkGrey, fontWeight: 500 }}>
            {title}
          </LocalStyle.SecondText>
        </LocalStyle.InfoCard>
      </FadeInUp>
    )
  }

  const userInfo = (item: any, index: number) => {
    const title = { fontSize: '24px', fontWeight: 700 }
    const sub = { fontSize: '14px', lineHeight: '30px', color: theme.colors.secondary, textAlign: 'center' as const }
    return (
      <FadeInUp delay={index * 100} key={index}>
        <LocalStyle.UserCard
          key={index}
          style={
            isTablet
              ? { marginRight: 0 }
              : { marginRight: !index && !isMobile ? '80px' : '0', marginTop: isMobile ? '16px' : '0' }
          }
        >
          <LocalStyle.UserLogo src={item?.logo} />
          <div style={title}>{item.title}</div>
          <LocalStyle.UserLine id="discover-line" />
          <div style={sub}>{item.content}</div>
        </LocalStyle.UserCard>
      </FadeInUp>
    )
  }

  const cateItem = (data: any, index: number) => {
    return (
      <FadeInUp delay={index * 100} key={index}>
        <LocalStyle.CateItem onClick={() => history.push('/project?sec=' + data.index)}>
          {Categories[data.name]}
          <LocalStyle.SecondText style={{ fontSize: '16px', fontWeight: 'normal' }} mt="12px">
            {data?.name}
          </LocalStyle.SecondText>
        </LocalStyle.CateItem>
      </FadeInUp>
    )
  }

  const SliderCoin = (props) => {
    if (props.type === 'left') {
      return (
        <LocalStyle.SliderLeft onMouseEnter={props.onClick} onClick={props.onClick}>
          <LocalStyle.SliderImg src={iconLeft} />
        </LocalStyle.SliderLeft>
      )
    }
    return (
      <LocalStyle.SliderRight onMouseEnter={props.onClick} onClick={props.onClick}>
        <LocalStyle.SliderImg src={iconRight} />
      </LocalStyle.SliderRight>
    )
  }

  const Slide = React.memo(
    function (props: StackedCarouselSlideProps) {
      const { data, dataIndex, swipeTo, slideIndex, isCenterSlide } = props
      const { cover, title, name, logo } = data[dataIndex]
      return (
        <LocalStyle.SliderWrapper
          onClick={() => {
            if (isCenterSlide) {
              history.push(`/project_detail?name=${name}`)
            } else {
              swipeTo(slideIndex)
            }
          }}
          className="homeBanner"
        >
          <Img
            decode={true}
            style={{
              width: isMobile ? '343px' : '880px !important',
              height: isMobile ? '156px' : '400px',
              borderRadius: '8px',
            }}
            loader={<LocalStyle.SliderCard src={bannerDef} alt="Home banner" />}
            unloader={<LocalStyle.SliderCard src={bannerDef} alt="Home banner" />}
            src={[cover as string]}
          />
          {active === dataIndex ? (
            <LocalStyle.SliderBottom>
              <AutoRow>
                <Img
                  decode={true}
                  style={{
                    width: isMobile ? '12.5px' : '30px',
                    height: isMobile ? '12.5px' : '30px',
                    borderRadius: '15px',
                  }}
                  loader={<LocalStyle.SliderBottomBall src={logoDef} alt="Home Logo" />}
                  unloader={<LocalStyle.SliderBottomBall src={logoDef} alt="Home Logo" />}
                  src={[logo as string]}
                />
                {/* <LocalStyle.SliderBottomBall src={websiteWhite}/> */}
                <Text ml="10px" fontSize={isMobile ? '12px' : '18px'} color={theme.colors.invertedContrast}>
                  {title}
                </Text>
              </AutoRow>
              <AutoRow style={{ width: isMobile ? '40%' : '14%' }}>
                <Text mr="10px" fontSize={isMobile ? '10px' : '14px'} color={theme.colors.invertedContrast}>
                  {t('Learn more')}
                </Text>
                <LocalStyle.SliderImg src={iconRight} style={{ width: isMobile ? '4px' : '6px', height: 'auto' }} />
              </AutoRow>
            </LocalStyle.SliderBottom>
          ) : null}
        </LocalStyle.SliderWrapper>
      )
    },
    function (prev: StackedCarouselSlideProps, next: StackedCarouselSlideProps) {
      return prev.dataIndex === next.dataIndex
    }
  )

  const sliderMove = (index: number) => {
    let targetArr = [1, 2, -2, -1]
    targetArr = resetSliderArr(targetArr, active)
    targetArr.splice(active, 0, 99)
    sliderRef.current.swipeTo(targetArr[index])
    // setActive(index)
  }

  const resetSliderArr = (arr: any, n) => {
    n = n % arr.length
    var arrLeft = arr.slice(0, -n)
    var arrRight = arr.slice(-n)
    return arrRight.concat(arrLeft)
  }

  const DiscoverReason = [
    {
      title: t('For Users'),
      content: t('User-explain'),
      logo: require('../../assets/images/home/user-1.svg').default,
    },
    {
      title: t('For Developers'),
      content: t('Develop-explain'),
      logo: require('../../assets/images/home/user-2.svg').default,
    },
  ]
  return (
    <>
      <Helmet>
        <title>Discover - Find Projects and Services Built on KCC</title>
        <meta name="description" content="All projects building on KCC. Start exploring a new world from here." />
      </Helmet>
      <Container width={containerWidth}>
        <RowBetween
          style={{ marginTop: isMobile ? '20px' : '60px', justifyContent: isMobile ? 'center' : 'space-between' }}
        >
          <Col>
            <LocalStyle.SecondText mb="15px" style={{ fontSize: isMobile ? '16px' : '24px' }}>
              {t('Total Value Locked in KCC')}
            </LocalStyle.SecondText>
            <Row align="flex-end">
              <LocalStyle.SecondText
                style={{
                  fontSize: isMobile ? '36px' : '48px',
                  lineHeight: '48px',
                  fontFamily: 'kccfont Number Normal',
                }}
              >
                $
                {chartData.length > 1 ? (
                  <CountUp
                    start={0}
                    end={Number(chartData[chartData.length - 1].totalLiquidityUSD)}
                    decimals={2}
                    duration={1.5}
                    separator=","
                  />
                ) : (
                  '--'
                )}
              </LocalStyle.SecondText>
              {!isMobile && (
                <Text
                  fontSize={isMobile ? '16px' : '24px'}
                  color={dailyVolumeRate.includes('-') ? theme.colors.failure : theme.colors.primary}
                  fontWeight="bold"
                  ml={isMobile ? '0px' : '27px'}
                  style={{ fontFamily: 'kccfont Number Normal' }}
                >
                  {dailyVolumeRate.includes('-') ? '' : '+'}
                  {dailyVolumeRate}%
                </Text>
              )}
            </Row>
            {isMobile && (
              <Text
                fontSize={isMobile ? '16px' : '24px'}
                color={dailyVolumeRate.includes('-') ? theme.colors.failure : theme.colors.primary}
                fontWeight="bold"
                ml={isMobile ? '0px' : '27px'}
                style={{ fontFamily: 'kccfont Number Normal' }}
              >
                {dailyVolumeRate.includes('-') ? '' : '+'}
                {dailyVolumeRate}%
              </Text>
            )}
            <Chart
              key="chart1"
              className="chart1"
              option={chart1Data}
              onRender={(e): void => (chart1 = e)}
              style={{
                width: isMobile ? '351px' : '807px',
                height: isMobile ? '200px' : '209px',
                minWidth: isMobile ? '350px' : '500px',
                minHeight: '173px',
              }}
            />
          </Col>
          <FadeInUp>
            <LocalStyle.RankCard style={{ margin: isTablet ? '20px 0 0 0' : isMobile ? '40px auto 0 auto' : '0' }}>
              <LocalStyle.SecondText mb="30px" style={{ fontSize: '18px' }}>
                {t('Top 5 Ranking')}
              </LocalStyle.SecondText>
              {!showTop ? <Skeleton paragraph={{ rows: 5 }} /> : null}
              {topDapps.length
                ? topDapps.map((item, index) => {
                    if (index < 5) {
                      return DappItem(item, index)
                    }
                    return null
                  })
                : null}
            </LocalStyle.RankCard>
          </FadeInUp>
        </RowBetween>
        <RowBetween
          style={{ marginTop: isMobile ? '17px' : '116px', justifyContent: isMobile ? 'center' : 'space-between' }}
        >
          {InfoData(
            'Avg Gas Fee',
            new BN(priceInfo.avgGasPrice)
              .div(10 ** 18)
              .times(priceInfo.priceUsd)
              .toNumber(),
            0
          )}
          {InfoData('Total Address', new BN(priceInfo.addressCount).toNumber(), 1)}
          {InfoData('24H Txn', priceInfo.txCount24H as number, 2)}
        </RowBetween>
        <>
          <FadeInUp>
            <LocalStyle.SecondText
              mb={isMobile ? '24px' : '60px'}
              mt={isMobile ? '60px' : '158px'}
              style={{ textAlign: isMobile ? 'center' : 'left' }}
            >
              {t('Discover')}
            </LocalStyle.SecondText>
          </FadeInUp>
          <FadeInUp>
            <AutoRow justify="center" style={{ position: 'relative' }}>
              {!isMobile && (
                <SliderCoin
                  type="left"
                  onClick={() => {
                    sliderRef.current.goBack()
                  }}
                />
              )}
              <StackedCarousel
                ref={sliderRef}
                data={sliderDom}
                carouselWidth={isMobile ? 343 : 1200}
                slideWidth={isMobile ? 343 : 880}
                slideComponent={Slide}
                maxVisibleSlide={sliderDom.length === 5 ? 5 : 1}
                customTransition={'all 1000ms ease 0s'}
                onActiveSlideChange={(v) => {
                  setActive(v)
                }}
                useGrabCursor={true}
              />
              {!isMobile && (
                <SliderCoin
                  type="right"
                  onClick={() => {
                    sliderRef.current.goNext()
                  }}
                />
              )}
            </AutoRow>
            <Col>
              <Row style={{ justifyContent: 'center' }}>
                {sliderDom.map((item, index) => {
                  if (index === active) {
                    return <LocalStyle.SliderPointSec key={index} />
                  }
                  return <LocalStyle.SliderPointNormal key={index} onClick={() => sliderMove(index)} />
                })}
              </Row>
            </Col>
          </FadeInUp>
        </>
        <LocalStyle.UserCardContainer>
          <FadeInUp>
            <LocalStyle.SecondText
              mb={isMobile ? '18px' : '30px'}
              mt={isMobile ? '72px' : '120px'}
              style={{ textAlign: isMobile ? 'center' : 'left' }}
            >
              {t('Why Discover')}
            </LocalStyle.SecondText>
          </FadeInUp>
          {isMobile ? (
            <Col style={{ alignItems: 'center' }}>{DiscoverReason.map((item, key) => userInfo(item, key))}</Col>
          ) : (
            <AutoRow justify="center">{DiscoverReason.map((item, key) => userInfo(item, key))}</AutoRow>
          )}
        </LocalStyle.UserCardContainer>
        <>
          <FadeInUp>
            <LocalStyle.SecondText
              mb="30px"
              mt={isMobile ? '70px' : '120px'}
              style={{ textAlign: isMobile ? 'center' : 'left' }}
            >
              {t('Popular Categories')}
            </LocalStyle.SecondText>
          </FadeInUp>
          <Row
            style={{
              position: 'relative',
              justifyContent: isMobile ? 'center' : 'flex-start',
              marginBottom: isMobile ? '0' : '100px',
            }}
          >
            {categorySubtle
              .filter((item) => item.name !== 'Others')
              .map((item: any, index) => {
                if (index > 0 && index < 6) {
                  return cateItem(item, index)
                }
                return null
              })}
            <FadeInUp delay={700}>
              <LocalStyle.CateItem style={{ marginRight: 0 }} onClick={() => history.push('/project')}>
                {Categories['Others']}
                <LocalStyle.SecondText style={{ fontSize: '16px', fontWeight: 'normal' }} mt="12px">
                  More
                </LocalStyle.SecondText>
              </LocalStyle.CateItem>
            </FadeInUp>
          </Row>
        </>
      </Container>
      <Footer transparent={true} />
    </>
  )
}

export default HomePage