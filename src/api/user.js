import request from 'utils/request'
import Qs from 'qs'

/**
 * request for login
 * @param {string} email
 * @param {string} password
 * @returns
 */
export const loginRequest = (email, password) => {
  return request({
    method: 'POST',
    url: '/login',
    data: {
      email,
      password,
    },
  })
}
