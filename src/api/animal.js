import request from 'utils/request'

/**
 * request for login
 * @param {string} email
 * @param {string} password
 * @returns
 */
export const getAnimal = (id) => {
  return request({
    method: 'GET',
    url: '/animals/' + id,
  })
}
