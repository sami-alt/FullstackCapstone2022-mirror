import request from 'utils/request'

export const getRoles = () => {
    return request({
      method: 'GET',
      url: '/role/',
    })
  }

export const addRoleToPerson = (personId, roleId) => {
  return request({
    method: 'PUT',
    url: '/people/' + personId + '/role/' + roleId,
  })
}
  