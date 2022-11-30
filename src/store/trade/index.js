import { reqTradeInfo } from '@/api'
export default {
  namespaced: true,
  state: {
    address: [],
    tradeInfo: {}
  },
  actions: {
    async getTradeInfo (context) {
      const res = await reqTradeInfo()
      if (res.code === 200) {
        context.commit('GETTRADEINFO', res.data)
      } else {
        return Promise.reject(new Error(res.message))
      }
    }
  },
  mutations: {
    GETTRADEINFO (state, value) {
      state.tradeInfo = value
    }
  },
  getters: {
    address (state) {
      return state.tradeInfo.userAddressList || []
    },
    detailList (state) {
      return state.tradeInfo.detailArrayList || []
    }
  }
}
