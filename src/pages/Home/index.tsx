import React, { FunctionComponent, useState, useRef } from 'react'
import styled, { useTheme } from 'styled-components'
import { Container, Text } from '../../style'
import * as LocalStyle from '../../style/pages'
import { ChartData } from '../../constants/home'
import { 
  CommunityIcon, DaoIcon, EarnIcon,
  ExchangeIcon, GameIcon, LaunchpadIcon,
  MoreIcon, NftIcon, ToolIcon, WalletIcon
} from '../../style/components/Svg'
import Chart from './Charts'
import Row, { RowBetween, AutoRow } from 'components/Row'
import Col from '../../components/Column'
import Footer from '../../components/Footer'
import CountUp from 'react-countup'
import { FadeInUp } from '../../utils/animation'
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
import { StackedCarousel, ResponsiveContainer, StackedCarouselSlideProps } from 'react-stacked-center-carousel';
import dayjs from 'dayjs'
import BN from 'bignumber.js'

BN.config({FORMAT: {groupSize: 3, groupSeparator: ','}})

interface PriceProps {
  addressCount: string
  avgGasPrice: string 
  txCount: number | string 
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
  const dispatch = useDispatch();
  const history = useHistory();
  let [chart1Data, setChart1Data] = React.useState(null);
  const [chartLoading, getChart] = useLoading(ApiService.getGlobalChart);
  const [dappLoading, getTopDapp] = useLoading(ApiService.getTopDappRank);
  const [sliderLoading, getSliderInfo] = useLoading(ApiService.getHomeDiscover);
  const [topDapps, setTopDapp] = useState([]);
  const [showTop, setShowTop] = useState(false)
  const [sliderDom, setSliderDom] = useState([{cover: '', title: '-'},{cover: '', title: '-'},{cover: '', title: '-'},{cover: '', title: '-'},{cover: '', title: '-'},])
  const [chartData, setChartData] = useState([{ dailyVolumeETH: '0', totalLiquidityETH: '0' }]);
  const [dailyVolumeRate, setDailyRate] = useState('0.00');
  const priceInfo: PriceProps = usePriceInfo();
  const [active, setActive] = useState(0);
  const categorySubtle = useCategorySubtle();
  //@ts-ignore
  const sliderRef = useRef<ResponsiveContainer>();
  const mountedRef = useRef(true);
  const theme = useTheme();
  const { t } = useTranslation();

  let [chart1] = [null];
  
  async function updateChart(){
      let opts: null;
      opts = JSON.parse(JSON.stringify(ChartData));
      getChart().then((res: any) => {
        if(!mountedRef.current) return null;
        let xAxisData = [], seriesData = [], max = 0;
        if(res.length) setChartData(res)
        if(res[res.length - 1] && res[res.length - 2]){
          setDailyRate(new BN(res[res.length - 1].dailyVolumeETH).minus(res[res.length - 2].dailyVolumeETH).div(res[res.length - 2].dailyVolumeETH).multipliedBy(100).toFixed(2).toString())
        }
        for(let i = 0; i < res.length; i++){
          //@ts-ignore
          xAxisData.push(dayjs(res[i].date * 1000).format('YYYY-MM-DD'))
          //@ts-ignore
          seriesData.push(new BN(res[i].dailyVolumeETH).toFixed(2, 1).toString())
          max = Math.max(max, res[i].dailyVolumeETH)
        }
        //@ts-ignore
        opts.xAxis.data = xAxisData;
        //@ts-ignore
        opts.yAxis.max = max + 500000;
        //@ts-ignore
        opts.series[0].data = seriesData;
        setChart1Data(opts);
        return
      })
  }
  

  React.useEffect(() => {
    Promise.all([
      getTopDapp(),
      getSliderInfo()
    ]).then((res: any) => {
      if(!mountedRef.current) return null;
      setTopDapp(res[0].list)
      //deal slider info
      let slider = [res[1].dayComments, res[1].dayTxCount, res[1].txCount ,res[1].totalLiquidityETH, res[1].dayScore];
      let dom = [] as any
      for(let i in slider){
        if(slider[i]){
          dom.push(
            {
              title: slider[i].title,
              name: slider[i].name,
              cover: slider[i].banner
            }
          )
        }
      }
      if(dom.length){
        setSliderDom(dom)
      }
      return
    })
    updateChart();
    return () => {
      mountedRef.current = false;
      sliderRef.current = null;
    }
  }, [chart1]);

  const DappItem = (data: any, index: number) => {
    const rank = [<GoldIcon width="28px" height="35px"/>, <SliverIcon width="28px" height="35px"/>, <BronzeIcon width="28px" height="35px"/>]
    return (
      <LocalStyle.RankItem onClick={() => history.push('/project_detail?name=' + data?.name)} key={index}>
        <LocalStyle.RankImg>
          { 
            rank[index] ? rank[index]
            :
            <LocalStyle.SecondText style={{fontSize: '15px', textAlign: 'center', fontWeight: 'bold', marginRight: '5px'}}>{index + 1}th</LocalStyle.SecondText>
          }
        </LocalStyle.RankImg>
        <RowBetween>
          <Row>
            <VisibilitySensor onChange={() => setShowTop(true)}>
              <Img 
                decode={true}
                style={{width: '40px', height: '40px', marginRight: '12px', borderRadius: '4px'}}
                loader={<LocalStyle.RankLogo src={logoDef} alt="DApp logo"/>}
                unloader={<LocalStyle.RankLogo src={logoDef} alt="DApp logo"/>}
                src={[data?.logo]}/>
            </VisibilitySensor>
            <Col style={{width: '70%'}}>
              <LocalStyle.SecondText style={{fontSize: '14px'}}>{data?.title}</LocalStyle.SecondText>
              <Text ellipsis color="darkGrey" fontSize="12px">{data?.intro}</Text>
            </Col>
          </Row>
          <LocalStyle.RightImg src={right}/>
        </RowBetween>
      </LocalStyle.RankItem >
    )
  }
  
  const InfoData = (title: string, num: number, key: number) => {
    return (
      <FadeInUp delay={key * 100}>
        <LocalStyle.InfoCard>
          <LocalStyle.SecondText style={{fontSize: '32px', fontFamily: 'kccfont Number Normal'}}>
            {key ? '' : '$'} 
            <CountUp 
              start={0} 
              end={num} 
              decimals={key ? 0 : 11}
              duration={1.5} 
              separator=","/>
          </LocalStyle.SecondText>
          <LocalStyle.SecondText style={{fontSize: '14px', color: theme.colors.darkGrey, fontWeight: 500}}>{title}</LocalStyle.SecondText>
        </LocalStyle.InfoCard>
      </FadeInUp>
    )
  }

  const userInfo = (item: any, index: number) => {
    const title = {fontSize: '24px', fontWeight: 700}
    const sub = {fontSize: '14px', lineHeight: '30px', color: theme.colors.secondary, textAlign: 'center' as const}
    return (
      <FadeInUp delay={index * 100} key={index}>
        <LocalStyle.UserCard key={index} style={{marginRight: index ? '0' : '80px'}}>
          <LocalStyle.UserLogo src={item?.logo}/>
          <div style={title}>{item.title}</div>
          <LocalStyle.UserLine id="discover-line"/>
          <div style={sub}>{item.content}</div>
        </LocalStyle.UserCard>
      </FadeInUp>
    )
  }

  const cateItem = (data: any, index: number) => {
    return(
      <FadeInUp delay={index * 100} key={index}>
        <LocalStyle.CateItem onClick={() => history.push('/project?sec=' + data.index)}>
          {Categories[data.name]}
          <LocalStyle.SecondText style={{fontSize: '16px', fontWeight: 'normal'}}>{data?.name}</LocalStyle.SecondText>
        </LocalStyle.CateItem>
      </FadeInUp>
    )
  }

  const SliderCoin = (props) => {
    if(props.type === 'left'){
      return(
        <LocalStyle.SliderLeft onMouseEnter={props.onClick} onClick={props.onClick}>
          <LocalStyle.SliderImg src={iconLeft}/>
        </LocalStyle.SliderLeft>
      )
    }
    return(
      <LocalStyle.SliderRight  onMouseEnter={props.onClick} onClick={props.onClick}>
        <LocalStyle.SliderImg src={iconRight}/>
      </LocalStyle.SliderRight>
    )
  }

  const Slide = React.memo(
    function (props: StackedCarouselSlideProps) {
        const { data, dataIndex, swipeTo, slideIndex, isCenterSlide } = props;
        const { cover, title, name } = data[dataIndex];
        return (
            <LocalStyle.SliderWrapper 
              onClick={() => {
                if(isCenterSlide){
                  history.push(`/project_detail?name=${name}`)
                } else {
                  swipeTo(slideIndex)
                }
              }} 
              className="homeBanner">
              <Img 
                decode={true}
                style={{width: '880px !important', height: '400px', borderRadius: '8px'}}
                loader={<LocalStyle.SliderCard src={bannerDef} alt="Home banner"/>}
                unloader={<LocalStyle.SliderCard src={bannerDef} alt="Home banner"/>}
                src={[cover as string]}/>
              {
                active === dataIndex ? 
                <LocalStyle.SliderBottom>
                  <AutoRow>
                    <LocalStyle.SliderBottomBall src={websiteWhite}/>
                    <Text ml="10px" fontSize="18px" color={theme.colors.invertedContrast}>{title}</Text>
                  </AutoRow>
                  <AutoRow style={{width: '14%'}}>
                    <Text mr="10px" fontSize="14px" color={theme.colors.invertedContrast}>{t("Learn more")}</Text>
                    <LocalStyle.SliderImg src={iconRight} style={{width: '6px', height: 'auto'}}/>
                  </AutoRow>
                </LocalStyle.SliderBottom>
                : null
              }
            </LocalStyle.SliderWrapper>
        );
    },
    function (prev: StackedCarouselSlideProps, next: StackedCarouselSlideProps) {
      return prev.dataIndex === next.dataIndex;
    }
  );

  const sliderMove = (index: number) => {
    let targetArr = [1, 2, -2, -1];
    targetArr = resetSliderArr(targetArr, active) 
    targetArr.splice(active, 0, 99);
    sliderRef.current.swipeTo(targetArr[index])
    // setActive(index)
  }

  const resetSliderArr = (arr: any, n) => {
		n = n % arr.length;
		var arrLeft = arr.slice(0,-n);
		var arrRight = arr.slice(-n);
		return (arrRight.concat(arrLeft));
	}

  const DiscoverReason = [
    {
      title: t('For Users'),
      content: 'People can easily access all kinds of heterogeneous and autonomous information resource through Internet. ',
      logo: require('../../assets/images/home/user-1.png').default,
    },
    {
      title: 'For Developer',
      content: 'People can easily access all kinds of heterogeneous and autonomous information resource through Internet. ',
      logo: require('../../assets/images/home/user-2.png').default,
    }
  ]
  return (
      <>
        <Container>
          <RowBetween style={{marginTop: '60px'}}>
            <Col>
              <LocalStyle.SecondText mb="15px" style={{fontSize: '24px'}}>{t("Total Value Locked in KCC")}</LocalStyle.SecondText>
              <Row align="flex-end">
                <LocalStyle.SecondText style={{fontSize: '48px', lineHeight: '48px', fontFamily: 'kccfont Number Normal'}}>$
                {
                  chartData[0].totalLiquidityETH ?
                  <CountUp 
                    start={0} 
                    end={Number(chartData[0].totalLiquidityETH)} 
                    decimals={2}
                    duration={1.5} 
                    separator=","/>
                  : '--'
                }
                </LocalStyle.SecondText>
                <Text fontSize="24px" color={dailyVolumeRate.includes('-') ? theme.colors.failure : theme.colors.primary} fontWeight="bold" ml="27px" style={{fontFamily: 'kccfont Number Normal'}}>{dailyVolumeRate.includes('-') ? '' : '+'}{dailyVolumeRate}%</Text>
              </Row>
              <Chart
                key="chart1"
                className="chart1"
                option={chart1Data}
                onRender={(e): void => chart1 = e}
                style={{width: "807px", height: "279px"}}/>
            </Col>
            <FadeInUp>
              <LocalStyle.RankCard>
                <LocalStyle.SecondText mb="30px" style={{fontSize: '18px'}}>{t("Top 5 Ranking")}</LocalStyle.SecondText>
                {!showTop ? <Skeleton paragraph={{ rows: 5 }} /> : null}
                {topDapps.length ? topDapps.map((item, index) => {if(index < 5) {return DappItem(item, index)} return null }) : null}
              </LocalStyle.RankCard>
            </FadeInUp>
          </RowBetween>
          <RowBetween style={{marginTop: '116px'}}>
              {InfoData('Avg Gas Fee', new BN(priceInfo.avgGasPrice).div(10 ** 18).times(priceInfo.priceUsd).toNumber(), 0)}
              {InfoData('Total Address', new BN(priceInfo.addressCount).toNumber(), 1)}
              {InfoData('24H Txn', priceInfo.txCount as number, 2)}
          </RowBetween>
          <>
            <FadeInUp>
              <LocalStyle.SecondText mb="60px" mt="158px">{t("Discover")}</LocalStyle.SecondText>
            </FadeInUp>
            <FadeInUp>
              <AutoRow justify="center" style={{position: 'relative'}}>
                <SliderCoin type="left" onClick={() => {sliderRef.current.goBack()}}/>
                <StackedCarousel
                  ref={sliderRef}
                  data={sliderDom}
                  carouselWidth={1200}
                  slideWidth={880}
                  slideComponent={Slide}
                  maxVisibleSlide={sliderDom.length === 5 ? 5 : 1}
                  customTransition={'all 1000ms ease 0s'}
                  onActiveSlideChange={v => { setActive(v) }}
                  useGrabCursor={true}
                />
                <SliderCoin type="right" onClick={() => {sliderRef.current.goNext()}}/>
              </AutoRow>
              <Col>
                <Row style={{justifyContent: 'center'}}>
                  {
                    sliderDom.map((item, index) => {
                      if(index === active){
                        return <LocalStyle.SliderPointSec key={index}/>
                      }
                      return <LocalStyle.SliderPointNormal key={index} onClick={() => sliderMove(index)}/>
                    })
                  }
                </Row>
              </Col>
            </FadeInUp>
          </>
          <LocalStyle.UserCardContainer>
            <FadeInUp>
              <LocalStyle.SecondText mb="30px" mt="120px">{t("Why Discover KCC")}</LocalStyle.SecondText>
            </FadeInUp>
            <AutoRow justify="center">
              {DiscoverReason.map((item, key) => userInfo(item, key))}
            </AutoRow>
          </LocalStyle.UserCardContainer>
          <>
            <FadeInUp>
              <LocalStyle.SecondText mb="30px" mt="120px">{t("Popular Categories")}</LocalStyle.SecondText>
            </FadeInUp>
            <RowBetween style={{position: 'relative'}}>
              { categorySubtle.filter(item => item.name !== 'Others').map((item: any, index) => { if(index > 0 && index < 6){ return cateItem(item, index) } return null}) }
              <FadeInUp delay={700} >
                <LocalStyle.CateItem onClick={() => history.push('/project')}>
                  {Categories['Others']}
                  <LocalStyle.SecondText style={{fontSize: '16px', fontWeight: 'normal'}}>More</LocalStyle.SecondText>
                </LocalStyle.CateItem>
              </FadeInUp>
            </RowBetween>
          </>
        </Container>
        <Footer transparent={true}/>
      </>
  )
}

export default HomePage
