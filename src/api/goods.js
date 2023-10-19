import request from '@/utils/request'

export function getGoodsDetail (id) {
  return request({
    url: '/goods/detail',
    params: {
      goodsId: id
    }
  })
}
export function getGoodsComment (id) {
  return request({
    url: '/comment/listRows',
    params: {
      goodsId: id,
      limit: 3
    }
  })
}
