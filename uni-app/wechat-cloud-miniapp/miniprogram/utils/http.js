import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'

axios.defaults.adapter = mpAdapter

import { loginRedirect } from './util'
import { store } from '../store/index'
let baseURL = ''
let headers = {}

export const http = axios.create({
  baseURL,
  headers,
})

const requestInterceptor = config => {
  config.headers.token = wx.getStorageSync('token')
  return config
}

const responseInterceptor = response => {
  console.log(response.config.url, response)
  if (response.data.code === 1) {
    return Promise.resolve(response.data)
  } else if (response.data.code === -1) {
    return wx.pro.login().then(({ code }) => {
      return http
        .post('/auth/login', {
          code,
          source: 2,
        })
        .then(({ data }) => {
          store.setUserInfo(data.userInfo)
          store.setMemberInfo(data.memberInfo)
          wx.setStorageSync('token', data.userInfo.token)
          return http(response.config)
        })
        .catch(error => {
          loginRedirect()
          return Promise.reject(error)
        })
    })
  } else {
    if (response.data.msg !== '用户未绑定小程序') {
      wx.pro.showToast({ title: response.data.msg, icon: 'none' })
    }
    return Promise.reject(response.data)
  }
}

const responseError = error => {
  return Promise.reject(error.message)
  if (error.response.status === 401) {
    loginRedirect()
  } else {
    wx.showToast({ title: error.message || error.msg, icon: 'none' })
  }
}
//请求拦截器
http.interceptors.request.use(requestInterceptor)
//响应拦截器
http.interceptors.response.use(responseInterceptor, responseError)
