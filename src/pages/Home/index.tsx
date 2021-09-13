import React, { FunctionComponent, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { Container, Text } from '../../style'
import { ChartData, DiscoverReason, Categories } from '../../constants/home'
import Chart from './Charts'
import Row, { RowBetween, AutoRow } from 'components/Row'
import Col from '../../components/Column'
import * as LocalStyle from '../../style/pages'
import CountUp from 'react-countup'
import { FadeInUp } from '../../utils/animation'
import { gold, sliver, bronze, right, iconLeft, iconRight, website } from '../../constants/imgs'
import { ApiService, useLoading } from '../../api'
import { Skeleton } from 'antd'
import { useTranslation } from 'react-i18next'
import Footer from '../../components/Footer'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const HomePage: React.FunctionComponent = (props) => {
  let [chart1Data, setChart1Data] = React.useState(null)
  const [loading, getList] = useLoading(ApiService.getDappList)
  const [dapps, setDapp] = useState([])
  const [active, setActive] = useState(2)
  const theme = useTheme()
  const { t } = useTranslation()

  // 防护监控数据 实例
  let [chart1] = [null]

  // 模拟异步更新图表数据
  function updateChart(): void {
    let opts: null
    opts = JSON.parse(JSON.stringify(ChartData))
    setChart1Data(opts)
  }

  // 获取图表实例，添加自定义图表事件
  React.useEffect((): void => {
    console.log('chart1', chart1)
    getList().then((res: any) => {
      setDapp(res.list)
    })
    updateChart()
  }, [chart1])

  const DappItem = (data: any, index: number) => {
    const rank = [gold, sliver, bronze]
    return (
      <LocalStyle.RankItem style={{ cursor: 'pointer' }} href={data?.website} target="_blank" key={index}>
        <LocalStyle.RankImg>
          {rank[index] ? (
            <img src={rank[index]} width="100%" />
          ) : (
            <LocalStyle.SecondText style={{ fontSize: '14px' }}>{index + 1}th</LocalStyle.SecondText>
          )}
        </LocalStyle.RankImg>
        <RowBetween>
          <Row>
            {/* https://cloudflare-ipfs.com/ipfs/QmapdyKYtgCY1BWuPNzF5qpykUkiCeaD1WhNFq5SWirWJv */}
            <LocalStyle.RankLogo
              src={'https://cloudflare-ipfs.com/ipfs/QmWoRyyU7N16irq9xL6x9kwj6kMmWZgVE12kcCJZZH6y9e'}
              alt="DApp Logo"
            />
            <Col>
              <LocalStyle.SecondText style={{ fontSize: '14px' }}>{data?.title}</LocalStyle.SecondText>
              <Text color="darkGrey" fontSize="12px">
                {data?.name}
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
        <LocalStyle.InfoCard>
          <LocalStyle.SecondText style={{ fontSize: '32px' }}>
            {key ? '' : '$'}
            <CountUp start={0} end={num} decimals={key ? 0 : 3} duration={1.5} separator="," />
          </LocalStyle.SecondText>
          <LocalStyle.SecondText style={{ fontSize: '14px', color: theme.colors.darkGrey, fontWeight: 'normal' }}>
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
      <FadeInUp delay={index * 100}>
        <LocalStyle.UserCard key={index} style={{ marginRight: index ? '0' : '80px' }}>
          <LocalStyle.UserLogo src={item?.logo} />
          <div style={title}>{item.title}</div>
          <LocalStyle.UserLine id="discover-line" />
          <div style={sub}>{item.content}</div>
        </LocalStyle.UserCard>
      </FadeInUp>
    )
  }

  const cateItem = (title: string, index: number) => {
    return (
      <FadeInUp delay={index * 100}>
        <LocalStyle.CateItem>
          <LocalStyle.CateLogo src={Categories[title]} />
          <LocalStyle.SecondText style={{ fontSize: '16px', fontWeight: 'normal' }}>{title}</LocalStyle.SecondText>
        </LocalStyle.CateItem>
      </FadeInUp>
    )
  }

  const SliderCoin = (props) => {
    if (props.type === 'left') {
      return (
        <LocalStyle.SliderLeft onClick={props.onClick}>
          <LocalStyle.SliderImg src={iconLeft} />
        </LocalStyle.SliderLeft>
      )
    }
    return (
      <LocalStyle.SliderRight onClick={props.onClick}>
        <LocalStyle.SliderImg src={iconRight} />
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
    prevArrow: <SliderCoin type="left" />,
    afterChange: (val) => {
      console.log(val)
      setActive(val)
    },
  }

  const sliderA = active - 2 >= 0 ? active - 2 : 3 + active
  const sliderB = active - 1 >= 0 ? active - 1 : 4 + active
  const sliderD = active + 1 > 4 ? (active + 1) % 5 : active + 1
  const sliderE = active + 2 > 4 ? (active + 2) % 5 : active + 2

  const tempSilder = [
    require('../../assets/images/home/banner.png').default,
    require('../../assets/images/home/user-1.png').default,
    require('../../assets/images/home/user-2.png').default,
    require('../../assets/images/home/gold.png').default,
    require('../../assets/images/home/sliver.png').default,
  ]

  return (
    <>
      <Container>
        <RowBetween style={{ marginTop: '60px' }}>
          <>
            <Chart
              key="chart1"
              className="chart1"
              option={chart1Data}
              onRender={(e): void => (chart1 = e)}
              style={{ width: '807px', height: '279px' }}
            />
          </>
          <FadeInUp>
            <LocalStyle.RankCard>
              <LocalStyle.SecondText mb="30px" style={{ fontSize: '18px' }}>
                {t('Top 5 Ranking')}
              </LocalStyle.SecondText>
              {loading ? <Skeleton paragraph={{ rows: 5 }} /> : null}
              {dapps.length ? dapps.map((item, index) => DappItem(item, index)) : null}
            </LocalStyle.RankCard>
          </FadeInUp>
        </RowBetween>
        <RowBetween style={{ marginTop: '116px' }}>
          {InfoData('Avg Gas Fee', 1.231, 0)}
          {InfoData('Total Address', 10000, 1)}
          {InfoData('24H Txn', 10000, 2)}
        </RowBetween>
        <>
          <FadeInUp>
            <LocalStyle.SecondText mb="60px" mt="158px">
              {t('Discover')}
            </LocalStyle.SecondText>
          </FadeInUp>
          <FadeInUp>
            <AutoRow justify="center">
              <LocalStyle.SliderLeftA url={tempSilder[sliderA]} />
              <LocalStyle.SliderLeftB url={tempSilder[sliderB]} />
              <Slider {...settings}>
                {/* @ts-ignore */}
                {tempSilder.map((item, index) => {
                  return (
                    <LocalStyle.SliderWrapper target="_blank" href="https://baidu.com" key={index}>
                      <LocalStyle.SliderCard src={item} />
                      <LocalStyle.SliderBottom>
                        <AutoRow>
                          <LocalStyle.SliderBottomBall src={website} />
                          <Text ml="10px" fontSize="18px" color={theme.colors.invertedContrast}>
                            Technology Creation
                          </Text>
                        </AutoRow>
                        <AutoRow style={{ width: '12%' }}>
                          <Text mr="10px" fontSize="14px" color={theme.colors.invertedContrast}>
                            Learn more
                          </Text>
                          <LocalStyle.SliderImg src={iconRight} style={{ width: '6px', height: 'auto' }} />
                        </AutoRow>
                      </LocalStyle.SliderBottom>
                    </LocalStyle.SliderWrapper>
                  )
                })}
              </Slider>
              <LocalStyle.SliderRightD url={tempSilder[sliderD]} />
              <LocalStyle.SliderRightE url={tempSilder[sliderE]} />
            </AutoRow>
          </FadeInUp>
        </>
        <>
          <FadeInUp>
            <LocalStyle.SecondText mb="30px" mt="120px">
              {t('Why Discover KCC')}
            </LocalStyle.SecondText>
          </FadeInUp>
          <AutoRow justify="center">{DiscoverReason.map((item, key) => userInfo(item, key))}</AutoRow>
        </>
        <>
          <FadeInUp>
            <LocalStyle.SecondText mb="30px" mt="120px">
              {t('Popular Categories')}
            </LocalStyle.SecondText>
          </FadeInUp>
          <RowBetween>
            {[t('Exchange'), t('LaunchPad'), t('Earn'), t('Gaming'), t('Tools'), t('More')].map((item, index) =>
              cateItem(item, index)
            )}
          </RowBetween>
        </>
      </Container>
      <Footer transparent={true} />
    </>
  )
}

export default HomePage
