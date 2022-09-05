import request from 'utils/request'

export const getRights = () => {
    return request({
      method: 'GET',
      url: '/right/',
    })
  }

  export const assignRightsToRole = (roleId, rightIds) => {
    return request({
      method: 'PUT',
      url: '/role/' + roleId + '/right/',
      data: rightIds
    })
  }
  
