import request from '@/utils/request'
export function searchGoods (type, name, id) {
  return request({
    url: '/goods/list',
    params: {
      sortType: type,
      sortPrice: 0,
      categoryId: id || 0,
      goodsName: name || '',
      page: 1
    }
  })
}
