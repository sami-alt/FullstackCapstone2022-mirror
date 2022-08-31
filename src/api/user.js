import request from 'utils/request'

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
    data: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
