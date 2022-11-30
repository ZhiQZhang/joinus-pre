import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import search from './search'
import Detail from './Detail'
import cart from './cart'
import user from './user'
import trade from './trade'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  // 利用了模块化vuex需要在此处引入
  modules: {
    home,
    search,
    Detail,
    cart,
    user,
    trade
  }
})
