import axios from 'axios'

export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: 'http://106.54.54.237:8000/api/v1',
    timeout: 5000
  })

  // axios拦截器的使用
  // 请求拦截器的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {

  })

  // 响应拦截器
  instance.interceptors.response.use(res => {
    return res
  }, err => {
    console.log(err);
    
  })

  // 发送真正的网络请求
  return instance(config)
}