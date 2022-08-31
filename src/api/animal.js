import request from 'utils/request'

export const getAnimal = (id) => {
  return request({
    method: 'GET',
    url: 'animal/' + id,
  })
}

export const getAnimals = () => {
  return request({
    method: 'GET',
    url: 'animal/',
  })
}
