import request from 'utils/request'

export const getTotals = (id) => {
  return request({
    method: 'GET',
    url: '/totals/' + id,
  })
}
