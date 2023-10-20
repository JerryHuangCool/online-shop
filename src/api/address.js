import request from '@/utils/request'

export function getAddressList () {
  return request({
    url: '/address/list'
  })
}

export function addAddress () {
  return request({
    url: '/address/add',
    method: 'post',
    data: {
      form: {
        name: 'jerry',
        phone: '17396240155',
        region: [
          {
            value: 782,
            label: '上海'
          },
          {
            value: 783,
            label: '上海市'
          },
          {
            value: 785,
            label: '徐汇区'
          }
        ],
        detail: '北京路1号楼8888室'
      }
    }
  })
}
