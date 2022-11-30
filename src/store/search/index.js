import { reqGetSearchInfo } from '@/api'
export default {
  namespaced: true,
  state: {
    searchList: {}
  },
  actions: {
    async getSearchList ({ commit }, value = {}) {
      const res = await reqGetSearchInfo(value)
      if (res.code === 200) {
        commit('GETSEARCHLIST', res.data)
      }
    }
  },
  mutations: {
    GETSEARCHLIST (state, value) {
      state.searchList = value
    }
  },
  getters: {
    goodsList (state) {
      return state.searchList.goodsList || []
    },
    attrsList (state) {
      return state.searchList.attrsList || []
    },
    trademarkList (state) {
      return state.searchList.trademarkList || []
    }
  }
}
