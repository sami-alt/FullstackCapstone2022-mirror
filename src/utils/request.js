import axios from 'axios'

export const baseURL = 'http://127.0.0.1:8888/'

const request = axios.create({
  baseURL,
  timeout: 5000,
})

// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
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
      return Promise.reject(error)
    }
    if (error.response.status === 401) {
    }
    return Promise.reject(error)
  }
)

export default request
