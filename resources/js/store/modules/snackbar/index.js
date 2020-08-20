import getters from './getters'
import mutations from './mutations'

const state = {
  show: false,
  color: 'error',
  text: 'An error occurred',
  subtext: '',
  timeout: 6000
}

export default {
  state,
  getters,
  mutations
}
