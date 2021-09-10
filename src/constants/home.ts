export const ChartData = {
  xAxis: {
    data: ['2019-11-21', '2019-11-22', '2019-11-23', '2019-11-24', '2019-11-25', '2019-11-26'],
    axisLine: {
      show: false //是否显示x轴刻度
    },
    axisTick: {
      show: false, //是否显示y坐标轴刻度
    },
  },
  yAxis: {
    data: [20, 50, 80, 70, 45, 85],
    axisTick: {
      show: false, //是否显示y坐标轴刻度
    },
    axisLine: {
      show: false //是否显示x轴刻度
    },
    axisLabel: {
      show: false
    }
  },
  grid: {
    left: '0%',
    right: '0%',
    bottom: '0%',
    top: '0%',
    containLabel: true
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    padding: [4, 12],
    backgroundColor: '#FFFFFF1A',
    borderRadius: 10,
    axisPointer: {
      type: 'cross',
      label: {
        show: false
      }
    },
    formatter: "<span style={{color: 'red'}}>{b}</span><br/> 汇总：{c}",
    extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
  },
  series: [{
    name: '销量',
    type: 'line',
    animation: true,
    data: [1, 2, 3, 4, 2, 1, 0],
    symbolSize: 5,
    showSymbol: false,
    symbol: 'circle',
    color: '#00142A',
    itemStyle: {
      normal: {
        color: "#00142A",
        borderColor: '#18BB97',
        borderWidth: 3,
        lineStyle: {
          color: '#18BB97',
          width:  4,
        },
      } 
    }
  }]
};


export const DiscoverReason = [
  {
    title: 'For Users',
    content: 'People can easily access all kinds of heterogeneous and autonomous information resource through Internet. ',
    logo: require('../assets/images/home/user-1.png').default,
  },
  {
    title: 'For Developer',
    content: 'People can easily access all kinds of heterogeneous and autonomous information resource through Internet. ',
    logo: require('../assets/images/home/user-2.png').default,
  }
]

export const Categories = {
  'Exchange': require('../assets/images/home/exchange.png').default,
  'LaunchPad': require('../assets/images/home/launchpad.png').default,
  'Earn': require('../assets/images/home/earn.png').default,
  'Gaming': require('../assets/images/home/gaming.png').default,
  'Tools': require('../assets/images/home/tools.png').default,
  'More': require('../assets/images/home/more.png').default,
}

export const media = [
  {
    app: 'Twitter',
    icon: require('../assets/images/Icons/twitter-logo@2x.png').default,
    route: 'https://twitter.com/KCCOfficialTW',
  },
  {
    app: 'Telegram',
    icon: require('../assets/images/Icons/telegram-logo@2x.png').default,
    route: 'https://t.me/KCCOfficialEnglishCommunity',
  },
  {
    app: 'Medium',
    icon: require('../assets/images/Icons/medium-logo@2x.png').default,
    route: 'https://github.com/kcc-community',
  },
  {
    app: 'Discord',
    icon: require('../assets/images/Icons/discord-logo@2x.png').default,
    route: 'https://discord.com/invite/H5ucJydSyd',
  },
]

