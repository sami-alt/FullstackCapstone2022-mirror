import request from 'utils/request'

export const getRoles = () => {
    return request({
      method: 'GET',
      url: '/role/',
    })
  }

  export const getRole = (id) => {
    return request({
      method: 'GET',
      url: '/role/' + id,
    })
  }
  
  export const addRole = (role) => {
    return request({
      method: 'POST',
      url: '/role/',
      data: role
    })
  }
  
  export const updateRole = (id, role) => {
    return request({
      method: 'PUT',
      url: '/role/' + id,
      data: role
    })
  }
  
  export const deleteRole = (id) => {
    return request({
      method: 'DELETE',
      url: '/role/' + id,
    })
  }
  

  export const assignRolesToPerson = (personId, roleIds) => {
    return request({
      method: 'PUT',
      url: '/people/' + personId + '/role/',
      data: roleIds
    })
  }
  
