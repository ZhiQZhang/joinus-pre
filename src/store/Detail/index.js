import { reqGetdetailInfo, reqAddOrUpdateShopCart } from '@/api'
import { getUUID } from '@/utils/uuid_token'
export default {
  namespaced: true,
  state: {
    detail: {},
    uuid_token: getUUID()
  },
  actions: {
    async getDetailInfo ({ commit }, value) {
      const res = await reqGetdetailInfo(value)
      if (res.code === 200) {
        commit('GETDETAILINFO', res.data)
      }
    },
    async AddOrUpdateShopCart ({ commit }, { skuId, skuNum }) {
      const res = await reqAddOrUpdateShopCart(skuId, skuNum)
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('失败'))
      }
    }
  },
  mutations: {
    GETDETAILINFO (state, value) {
      state.detail = value
    }
  },
  getters: {
    categoryView (state) {
      return state.detail.categoryView || {}
    },
    skuInfo (state) {
      return state.detail.skuInfo || {}
    },
    spuSaleAttrList (state) {
      return state.detail.spuSaleAttrList
    }
  }
}
