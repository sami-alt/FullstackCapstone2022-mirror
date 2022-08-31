import { message } from 'antd'
import axios from 'axios'
import { removeToken, hasToken, getToken } from './token'
import { history } from 'utils/history'

export const baseURL = 'https://tesy-backend.herokuapp.com/api'

const request = axios.create({
  baseURL,
  timeout: 5000,
})

// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (hasToken()) {
      config.headers.Authorization = `${getToken()}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
request.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response.data
  },
  function (error) {
    // Do something with response error
    if (!error.response) {
      message.error(`It's busy, try later.`)
      return Promise.reject(error)
    }
    if (error.response.status === 401) {
      removeToken()
      message.warn('Login expired', 1)
      history.push('/login')
    }
    return Promise.reject(error)
  }
)

export default request
