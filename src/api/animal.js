import request from 'utils/request'

export const getAnimal = (id) => {
  return request({
    method: 'GET',
    url: '/animals/' + id,
  })
}

export const getAnimals = () => {
  return request({
    method: 'GET',
    url: '/animals/',
  })
}

export const editAnimal = (id, patch) => {
  return request({
    method: "PUT",
    url: '/animal/' + id,
    data: patch,
  })
}