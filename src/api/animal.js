import request from 'utils/request'

export const getAnimal = (id) => {
  return request({
    method: 'GET',
    url: 'api/animal/' + id,
  })
}

export const getAnimals = () => {
  return request({
    method: 'GET',
    url: 'api/animal/',
  })
}
