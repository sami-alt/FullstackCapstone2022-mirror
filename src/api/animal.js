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

export const editAnimal = (id, patch) => {
  return request({
    method: "PUT",
    url: '/animal/' + id,
    data: patch,
  })
}