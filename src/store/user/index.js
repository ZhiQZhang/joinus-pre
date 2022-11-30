import { reqCode, reqUserRegister, reqUserLogin, reqGetUserInfo, reqLogout } from '@/api'
export default {
  namespaced: true,
  state: {
    code: '',
    token: sessionStorage.getItem('TOKEN') || '',
    userInfo: {}
  },
  actions: {
    async getCode ({ commit }, phone) {
      const res = await reqCode(phone)
      if (res.code === 200) {
        commit('GETCODE', res.data)
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async userRegister (context, data) {
      const res = await reqUserRegister(data)
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async userLogin (context, userInfo) {
      const res = await reqUserLogin(userInfo)
      if (res.code === 200) {
        // context.commit('USERLOGIN', res.data.token)
        sessionStorage.setItem('TOKEN', res.data.token)
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async getUserInfo (context) {
      const res = await reqGetUserInfo()
      if (res.code === 200) {
        context.commit('USERINFO', res.data)
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async quit (context) {
      const res = await reqLogout()
      if (res.code === 200) {
        context.commit('QUIT')
      } else {
        return Promise.reject(new Error(res.message))
      }
    }
  },
  mutations: {
    GETCODE (state, value) {
      state.code = value
    },
    USERINFO (state, value) {
      state.userInfo = value
    },
    QUIT (state, value) {
      state.userInfo = {}
      state.token = ''
      sessionStorage.removeItem('TOKEN')
    }
    // USERLOGIN (state, value) {
    //   state.token = value
    // }
  },
  getters: {}
}
