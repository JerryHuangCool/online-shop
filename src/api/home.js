import request from '@/utils/request'

export function getHomeInfo () {
  return request({
    url: '/page/detail',
    params: {
      pageId: 0
    }
  })
}
