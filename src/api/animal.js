import request from 'utils/request'



export const getAnimal = (id) => {
  return request({
    method: 'GET',
    url: '/animals/' + id,
  })
}
