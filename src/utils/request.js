import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000
})

request.interceptors.request.use((config) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
  }
  config.platform = 'H5'
  return config
}, (err) => {
  return Promise.reject(err)
})

// 添加响应拦截器
request.interceptors.response.use((res) => {
  // 对响应数据做点什么
  if (res.data.status !== 200) {
    Toast(res.data.message)
    return Promise.reject(res.data.message)
  }
  Toast.clear()
  return res.data
}, (err) => {
  // 对响应错误做点什么
  return Promise.reject(err)
})

export default request
