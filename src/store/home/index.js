import { reqBanner, reqCategory, reqFloor } from '@/api'
export default {
  namespaced: true,
  state: {
    categoryList: [],
    bannerList: [],
    floorList: []
  },
  actions: {
    async categoryList ({ commit }) {
      const res = await reqCategory()
      if (res.code === 200) {
        commit('CATEGORYLIST', res.data)
      }
    },
    async getBannerList ({ commit }) {
      const res = await reqBanner()
      if (res.code === 200) {
        commit('GETBANNERLIST', res.data)
      }
    },
    async getFloorList ({ commit }) {
      const res = await reqFloor()
      if (res.code === 200) {
        commit('GETFLOORLIST', res.data)
      }
    }
  },
  mutations: {
    CATEGORYLIST (state, value) {
      state.categoryList = value
    },
    GETBANNERLIST (state, value) {
      state.bannerList = value
    },
    GETFLOORLIST (state, value) {
      state.floorList = value
    }
  },
  getters: {}
}
