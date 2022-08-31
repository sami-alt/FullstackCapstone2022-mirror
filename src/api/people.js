import request from 'utils/request'

export const getPerson = (id) => {
  return request({
    method: 'GET',
    url: '/people/' + id,
  })
}

export const addPerson = (person) => {
  return request({
    method: 'POST',
    url: '/people/',
    data: person
  })
}

export const updatePerson = (id, person) => {
  return request({
    method: 'PUT',
    url: '/people/' + id,
    data: person
  })
}

export const deletePerson = (id) => {
  return request({
    method: 'DELETE',
    url: '/people/' + id,
  })
}

export const getPeople = () => {
  return request({
    method: 'GET',
    url: '/people/',
  })
}

