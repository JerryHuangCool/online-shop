import request from '@/utils/request'

export function addToCart (id, num, skuid) {
  return request({
    url: '/cart/add',
    method: 'post',
    data: {
      goodsId: id,
      goodsNum: num,
      goodsSkuId: skuid
    }
  })
}

export function getCartList () {
  return request({
    url: '/cart/list'
  })
}

export function updateCart (id, num, skuid) {
  return request({
    url: '/cart/update',
    method: 'post',
    data: {
      goodsId: id,
      goodsNum: num,
      goodsSkuId: skuid
    }
  })
}

export function deleteCart (cartIds) {
  return request({
    url: '/cart/clear',
    method: 'post',
    data: {
      cartIds
    }
  })
}
