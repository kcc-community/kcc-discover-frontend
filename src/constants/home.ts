export const ChartData = {
  xAxis: {
    axisLine: {
      show: false 
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: '#B8C6D899'
    }
  },
  yAxis: {
    type: 'value',
    min: 0,
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      show: false
    },
    splitLine: {
      show: false
    }
  },
  grid: {
    left: '5%',
    right: '5%',
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
    formatter: "<span style='color: red'>{b}</span><br/> $：{c}",
    extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
  },
  series: [{
    name: '销量',
    type: 'line',
    animation: true,
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
  }],
  dataZoom: [{
    type: 'inside',
    start: 0,
    xAxisIndex: [0]
  }]
};


export const Categories = {
  Exchange: require('../assets/images/home/exchange.png').default,
  Lending: require('../assets/images/home/launchpad.png').default,
  Earn: require('../assets/images/home/earn.png').default,
  Game: require('../assets/images/home/gaming.png').default,
  Tools: require('../assets/images/home/tools.png').default,
  Others: require('../assets/images/home/more.png').default,
  NFT: require('../assets/images/home/nft.png').default,
  Community: require('../assets/images/home/community.png').default,
  DAO: require('../assets/images/home/dao.png').default,
}

export const media = [
  {
    app: 'Twitter',
    icon: require('../assets/images/Icons/twitter-logo@2x.png').default,
    hover: require('../assets/images/Icons/twitter-logo-hover@2x.png').default,
    route: 'https://twitter.com/KCCOfficialTW',
  },
  {
    app: 'Telegram',
    icon: require('../assets/images/Icons/telegram-logo@2x.png').default,
    hover: require('../assets/images/Icons/telegram-logo-hover@2x.png').default,
    route: 'https://t.me/KCCOfficialEnglishCommunity',
  },
  {
    app: 'Medium',
    icon: require('../assets/images/Icons/medium-logo@2x.png').default,
    hover: require('../assets/images/Icons/medium-logo-hover@2x.png').default,
    route: 'https://kccofficial.medium.com/',
  },
  {
    app: 'Discord',
    icon: require('../assets/images/Icons/discord-logo@2x.png').default,
    hover: require('../assets/images/Icons/discord-logo-hover@2x.png').default,
    route: 'https://discord.com/invite/H5ucJydSyd',
  },
]


export const stateTipsColor = {
  "First Reviewing": {bg: '#5C95E829', color: '#5C95E8'},
  "Reviewing": {bg: '#5C95E829', color: '#5C95E8'},
  "Displaying": {bg: '#28CD9629', color: '#18BB97'},
  "Ban": {bg: 'linear-gradient(0deg, rgba(0, 20, 42, 0.08), rgba(0, 20, 42, 0.08)), #FFFFFF;', color: '#00142A99'},
  "None": {bg: 'linear-gradient(0deg, rgba(0, 20, 42, 0.08), rgba(0, 20, 42, 0.08)), #FFFFFF;', color: '#00142A99'},
  "Refused": {bg: 'linear-gradient(0deg, rgba(0, 20, 42, 0.08), rgba(0, 20, 42, 0.08)), #FFFFFF;', color: '#00142A99'},
}

export const subCategoryRank = {
  'Exchange': 1,
  'NFT': 2,
  'Game': 3,
  'Earn': 4,
  'Lending': 5,
  'DAO': 6,
  'Wallet': 7,
  'Community': 8,
  'Others': 9,
}

