
import sensitiveDictionary from '../constants/sensitiveWord'
import Mint from 'mint-filter'

const mint = new Mint(sensitiveDictionary.split(','))

export default mint