import { reqCartList, reqDelgood, reqUpdateChecked } from '@/api'
export default {
  namespaced: true,
  state: {
    cartInfoList: []
  },
  actions: {
    async getCartList ({ commit }) {
      const res = await reqCartList()
      if (res.code === 200) {
        if (res.data.length !== 0) {
          commit('GETCARTLIST', res.data[0].cartInfoList)
        } else {
          commit('GETCARTLIST', res.data)
        }
      }
    },
    async updateChecked ({ commit }, { skuId, isChecked }) {
      const res = await reqUpdateChecked(skuId, isChecked)
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('失败'))
      }
    },
    async delCart ({ commit }, skuId) {
      const res = await reqDelgood(skuId)
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('失败'))
      }
    }
  },
  mutations: {
    GETCARTLIST (state, value) {
      state.cartInfoList = value
    }
  },
  getters: {}
}
