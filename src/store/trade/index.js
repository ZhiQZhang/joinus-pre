import { reqTradeInfo, reqAddress } from '@/api'
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
    },
    async getAddress (context) {
      const res = await reqAddress()
      if (res.code === 200) {
        context.commit('GETADDRESS', res.data)
      } else {
        return Promise.reject(new Error(res.message))
      }
    }
  },
  mutations: {
    GETTRADEINFO (state, value) {
      state.tradeInfo = value
    },
    GETADDRESS (state, value) {
      state.address = value
    }
  },
  getters: {
    // address (state) {
    //   return state.tradeInfo.userAddressList || []
    // },
    detailList (state) {
      return state.tradeInfo.detailArrayList || []
    }
  }
}
