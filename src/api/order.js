import request from '@/utils/request'

export function checkOrder (mode, obj) {
  return request({
    url: '/checkout/order',
    params: {
      mode,
      delivery: 10,
      couponId: 0,
      isUsePoints: 0,
      ...obj

    }
  })
}

export function submitOrder (mode, obj) {
  return request({
    url: '/checkout/submit',
    method: 'post',
    data: {
      mode,
      delivery: 10,
      couponId: 0,
      isUsePoints: 0,
      ...obj
    }
  })
}

export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
