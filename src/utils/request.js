import axios from 'axios'

export const baseURL = 'http://127.0.0.1:8888/'

const request = axios.create({
  baseURL,
  timeout: 5000,
})

export default request
