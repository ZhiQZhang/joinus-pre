import axios from 'axios'
const mockAjax = axios.create({
  baseURL: '/mock',
  timeout: 10000
})
// 请求拦截器
mockAjax.interceptors.request.use((config) => {
  return config
})
// 响应拦截器
mockAjax.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    return Promise.reject(err)
  }
)
export default mockAjax
