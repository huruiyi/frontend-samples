// 添加请求拦截器
import axios from 'axios'

// 创建实例后修改默认值
axios.defaults.baseURL = 'http://localhost:14654/'
axios.defaults.headers.common['Authorization'] = 'fuck'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 创建实例时配置默认值
const requests = axios.create({
  baseURL: 'http://localhost:14654/',
  headers: {
    x: 1, y: 2
  }
})

requests.defaults.headers.common['Authorization'] = 'nima'

requests.interceptors.request.use(function (config) {
  config.headers.z = 3
  // 在发送请求之前做些什么
  return config
}, function (error) {
  debugger
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
requests.interceptors.response.use(function (response) {
  console.log('---------------------------------response---------------------------------')
  console.log(response)
  console.log('---------------------------------response---------------------------------')
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, function (error) {
  debugger
  console.log('---------------------------------error---------------------------------')
  console.log(error.response)
  console.log('---------------------------------error---------------------------------')
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default requests
