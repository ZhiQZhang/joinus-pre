import Vue from 'vue'
import App from './App.vue'
import TypenavView from '@/components/TypeNav/TypenavView'
import Pagination from '@/components/Pagination'
import router from './router'
import store from './store'
import './mock/mockServe'
import '@/plugins/element'
import * as API from '@/api'
// import $ from 'jquery'
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.js'
Vue.component(TypenavView.name, TypenavView)
Vue.component(Pagination.name, Pagination)
Vue.prototype.$API = API
// Vue.prototype.$ = $
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate () {
    Vue.prototype.$bus = this // 安装全局事件总线，$bus就是当前应用的Vm
  }
}).$mount('#app')
