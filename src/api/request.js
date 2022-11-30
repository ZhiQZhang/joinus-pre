import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
const requests = axios.create({
  baseURL: '/api',
  timeout: 5000
})
// 请求拦截器
requests.interceptors.request.use((config) => {
  if (store.state.user.token) {
    config.headers.userId = store.state.user.token
  }
  if (sessionStorage.getItem('TOKEN')) {
    config.headers.token = sessionStorage.getItem('TOKEN')
  }
  nprogress.start()
  return config
})
// 响应拦截器
requests.interceptors.response.use((res) => {
  nprogress.done()
  return res.data
}, (err) => {
  return Promise.reject(new Error(err.message + '失败'))
})
export default requests
