import request from 'utils/request'

export const getTotals = (startDate, endDate) => {
  return request({
    method: 'POST',
    url: '/animal/total/',
    data: {
      startDate,
      endDate
    }
  })
}

export const getDailyTotals = (startDate, endDate) => {
  return request({
    method: 'POST',
    url: '/animal/totaldaily/',
    data: {
      startDate,
      endDate
    }
  })
}
