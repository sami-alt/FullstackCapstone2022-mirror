import request from 'utils/request'
import Qs from 'qs'

/**
 * request for login
 * @param {string} username
 * @param {string} password
 * @returns
 */
export const loginRequest = (username, password) => {
  return request({
    method: 'POST',
    url: '/auth/login',
    data: {
      username,
      password,
    },
  })
}
