import React, { FunctionComponent, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { Container, Text } from '../../style'
import * as LocalStyle from '../../style/pages'
import { ChartData, DiscoverReason, Categories } from '../../constants/home'
import Chart from './Charts'
import Row, { RowBetween, AutoRow } from 'components/Row'
import Col from '../../components/Column'
import Footer from '../../components/Footer'
import CountUp from 'react-countup'
import { FadeInUp } from '../../utils/animation'
import { gold, sliver, bronze, right, iconLeft, iconRight, websiteWhite } from '../../constants/imgs'
import { ApiService, useLoading } from '../../api'
import { Skeleton } from 'antd'
import { uriToHttp } from '../../utils'
import { useTranslation } from 'react-i18next'
import $ from 'jquery'
import dayjs from 'dayjs'
import BN from 'bignumber.js'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface PriceProps {
  addressCount: string
  avgGasPrice: string 
  txCount: number | string 
  priceUsd: string
}

interface SliderProps {
  banner: string
  title: string 
  website: string
}


const HomePage: React.FunctionComponent = (props) => {
  let [chart1Data, setChart1Data] = React.useState(null);
  const [chartLoading, getChart] = useLoading(ApiService.getGlobalChart);
  const [dappLoading, getTopDapp] = useLoading(ApiService.getTopDappRank);
  const [priceLoading, getPriceInfo] = useLoading(ApiService.getHomePriceInfo);
  const [sliderLoading, getSliderInfo] = useLoading(ApiService.getHomeDiscover);
  const [topDapps, setTopDapp] = useState([])
  const [sliderPics, setSlider] = useState<Array<SliderProps>>([])
  const [priceInfo, setPriceInfo] = useState<PriceProps>({avgGasPrice: '0', addressCount: '0', txCount: 0, priceUsd: '0'})
  const [chartData, setChartData] = useState([{ dailyVolumeETH: '0', totalLiquidityETH: '0' }])
  const [dailyVolumeRate, setDailyRate] = useState('0.00')
  const [active, setActive] = useState(2);
  const theme = useTheme();
  const { t } = useTranslation();

  let [chart1] = [null];
  
  async function updateChart(){
      let opts: null;
      opts = JSON.parse(JSON.stringify(ChartData));
      getChart().then((res: any) => {
        let xAxisData = [], seriesData = [], max = 0;
        setChartData(res);
        if(res[res.length - 1] && res[res.length - 2]){
          setDailyRate(new BN(res[res.length - 1].dailyVolumeETH).minus(res[res.length - 2].dailyVolumeETH).div(res[res.length - 1].dailyVolumeETH).multipliedBy(100).toFixed(2).toString())
        }
        for(let i = 0; i < res.length; i++){
          //@ts-ignore
          xAxisData.push(dayjs(res[i].date * 1000).format('YYYY-MM-DD'))
          //@ts-ignore
          seriesData.push(new BN(res[i].dailyVolumeETH).toFixed(2).toString())
          max = Math.max(max, res[i].dailyVolumeETH)
        }
        //@ts-ignore
        opts.xAxis.data = xAxisData;
        //@ts-ignore
        opts.yAxis.max = max + 500000;
        //@ts-ignore
        opts.series[0].data = seriesData;
        setChart1Data(opts);
      })
  }
  
  React.useEffect((): void => {
      console.log("chart1", chart1);
      Promise.all([
        getTopDapp(),
        getPriceInfo(),
        getSliderInfo()
      ]).then((res: any) => {
        setTopDapp(res[0].list)
        setPriceInfo(res[1])
        //deal slider info
        let slider = [res[2].dayComments, res[2].dayTxCount, res[2].txCount ,res[2].totalLiquidityETH, res[2].dayScore];
        setSlider(slider as any)
      })
      updateChart();
  }, [chart1]);
  
  const DappItem = (data: any, index: number) => {
    const rank = [gold, sliver, bronze]
    return (
      <LocalStyle.RankItem style={{cursor: 'pointer'}} href={data?.website} target="_blank" key={index}>
        <LocalStyle.RankImg>
          { 
            rank[index] ? <LocalStyle.RankDAppLogo src={rank[index]}/>
            :
            <LocalStyle.SecondText style={{fontSize: '15px', textAlign: 'center', fontWeight: 'bold', marginRight: '5px'}}>{index + 1}th</LocalStyle.SecondText>
          }
        </LocalStyle.RankImg>
        <RowBetween>
          <Row>
          {/* https://cloudflare-ipfs.com/ipfs/QmapdyKYtgCY1BWuPNzF5qpykUkiCeaD1WhNFq5SWirWJv */}
            <LocalStyle.RankLogo src={'https://cloudflare-ipfs.com/ipfs/QmWoRyyU7N16irq9xL6x9kwj6kMmWZgVE12kcCJZZH6y9e'} alt="DApp Logo"/>
            <Col>
              <LocalStyle.SecondText style={{fontSize: '14px'}}>{data?.title}</LocalStyle.SecondText>
              <Text color="darkGrey" fontSize="12px">{data?.name}</Text>
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
          <LocalStyle.SecondText style={{fontSize: '32px'}}>
            {key ? '' : '$'} 
            <CountUp 
              start={0} 
              end={num} 
              decimals={key ? 0 : 11}
              duration={1.5} 
              separator=","/>
          </LocalStyle.SecondText>
          <LocalStyle.SecondText style={{fontSize: '14px', color: theme.colors.darkGrey, fontWeight: 'normal'}}>{title}</LocalStyle.SecondText>
        </LocalStyle.InfoCard>
      </FadeInUp>
    )
  }

  const userInfo = (item: any, index: number) => {
    const title = {fontSize: '24px', fontWeight: 700}
    const sub = {fontSize: '14px', lineHeight: '30px', color: theme.colors.secondary, textAlign: 'center' as const}
    return (
      <FadeInUp delay={index * 100}>
        <LocalStyle.UserCard key={index} style={{marginRight: index ? '0' : '80px'}}>
          <LocalStyle.UserLogo src={item?.logo}/>
          <div style={title}>{item.title}</div>
          <LocalStyle.UserLine id="discover-line"/>
          <div style={sub}>{item.content}</div>
        </LocalStyle.UserCard>
      </FadeInUp>
    )
  }

  const cateItem = (title: string, index: number) => {
    return(
      <FadeInUp delay={index * 100}>
        <LocalStyle.CateItem>
          <LocalStyle.CateLogo src={Categories[title]}/>
          <LocalStyle.SecondText style={{fontSize: '16px', fontWeight: 'normal'}}>{title}</LocalStyle.SecondText>
        </LocalStyle.CateItem>
      </FadeInUp>
    )
  }

  const SliderCoin = (props) => {
    if(props.type === 'left'){
      return(
        <LocalStyle.SliderLeft onClick={props.onClick}>
          <LocalStyle.SliderImg src={iconLeft}/>
        </LocalStyle.SliderLeft>
      )
    }
    return(
      <LocalStyle.SliderRight onClick={props.onClick}>
        <LocalStyle.SliderImg src={iconRight}/>
      </LocalStyle.SliderRight>
    )
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
    className: 'homeSlider',
    nextArrow: <SliderCoin type="right" />,
    prevArrow: <SliderCoin type="left"/>,
    beforeChange: () => {
      $('.home-slider').css('opacity', '0.75');
    },
    afterChange: (val) => {
      $('.home-slider').css('opacity', '1');
      $('.home-slider').css('transition', 'opacity .5s');
      setActive(val);
    }
  };

  const sliderA = active - 2 >= 0 ?  active - 2 : 3 + active;
  const sliderB = active - 1 >= 0 ?  active - 1 : 4 + active;
  const sliderD = active + 1 > 4 ?  (active + 1) % 5 : active + 1;
  const sliderE = active + 2 > 4 ?  (active + 2) % 5 : active + 2;
  
  return (
      <>
        <Container>
          <RowBetween style={{marginTop: '60px'}}>
            <Col>
              <LocalStyle.SecondText mb="15px" style={{fontSize: '24px'}}>{t("Total Value Locked in KCC")}</LocalStyle.SecondText>
              <Row align="flex-end">
                <LocalStyle.SecondText style={{fontSize: '48px', lineHeight: '48px'}}>{t("$ " + chartData[0].totalLiquidityETH ? new BN(chartData[0].totalLiquidityETH).toFixed(2).toString() : '--')}</LocalStyle.SecondText>
                <Text fontSize="24px" color={dailyVolumeRate.includes('-') ? theme.colors.failure : theme.colors.primary} fontWeight="bold" ml="27px">{dailyVolumeRate.includes('-') ? '' : '+'}{dailyVolumeRate}%</Text>
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
                {dappLoading ? <Skeleton paragraph={{ rows: 5 }} /> : null}
                {topDapps.length ? topDapps.map((item, index) => DappItem(item, index)) : null}
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
              <AutoRow justify="center">
                <LocalStyle.SliderLeftA url={sliderPics[sliderA] ? sliderPics[sliderA].banner : ''} className={'home-slider'}/>
                <LocalStyle.SliderLeftB url={sliderPics[sliderB] ? sliderPics[sliderB].banner : ''} className={'home-slider'}/>
                <Slider {...settings}>
                  {/* @ts-ignore */}
                  {
                    sliderPics.map((item, index) => {
                      return(
                        <LocalStyle.SliderWrapper target="_blank" href={item.website} key={index}>
                          <LocalStyle.SliderCard src={item.banner}/>
                          <LocalStyle.SliderBottom>
                            <AutoRow>
                              <LocalStyle.SliderBottomBall src={websiteWhite}/>
                              <Text ml="10px" fontSize="18px" color={theme.colors.invertedContrast}>{item.title}</Text>
                            </AutoRow>
                            <AutoRow style={{width: '14%'}}>
                              <Text mr="10px" fontSize="14px" color={theme.colors.invertedContrast}>Learn more</Text>
                              <LocalStyle.SliderImg src={iconRight} style={{width: '6px', height: 'auto'}}/>
                            </AutoRow>
                          </LocalStyle.SliderBottom>
                        </LocalStyle.SliderWrapper>
                      )
                    })
                  }
                </Slider>
                <LocalStyle.SliderRightD url={sliderPics[sliderD] ? sliderPics[sliderD].banner : ''} className={'home-slider'}/>
                <LocalStyle.SliderRightE url={sliderPics[sliderE] ? sliderPics[sliderE].banner : ''} className={'home-slider'}/>
              </AutoRow>
            </FadeInUp>
          </>
          <>
            <FadeInUp>
              <LocalStyle.SecondText mb="30px" mt="120px">{t("Why Discover KCC")}</LocalStyle.SecondText>
            </FadeInUp>
            <AutoRow justify="center">
              {DiscoverReason.map((item, key) => userInfo(item, key))}
            </AutoRow>
          </>
          <>
            <FadeInUp>
              <LocalStyle.SecondText mb="30px" mt="120px">{t("Popular Categories")}</LocalStyle.SecondText>
            </FadeInUp>
            <RowBetween>
              { [t('Exchange'), t('LaunchPad'), t('Earn'), t('Gaming'), t('Tools'), t('More')].map((item, index) => cateItem(item, index)) }
            </RowBetween>
          </>
        </Container>
        <Footer transparent={true}/>
      </>
  )
}

export default HomePage
