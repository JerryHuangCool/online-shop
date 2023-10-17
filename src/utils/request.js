import axios from 'axios'

const request = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000
})

request.interceptors.request.use((config) => {
  return config
}, (err) => {
  return Promise.reject(err)
})

// 添加响应拦截器
request.interceptors.response.use((res) => {
  // 对响应数据做点什么
  return res.data
}, (err) => {
  // 对响应错误做点什么
  return Promise.reject(err)
})

export default request
