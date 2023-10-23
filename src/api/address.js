import request from '@/utils/request'

export function getAddressList () {
  return request({
    url: '/address/list'
  })
}

export function addAddress (obj) {
  return request({
    url: '/address/add',
    method: 'post',
    data: {
      form: obj
    }
  })
}

export function getRegion () {
  return request({
    url: '/region/tree'
  })
}

export function setDefaultAddress (id) {
  return request({
    url: '/address/setDefault',
    method: 'post',
    data: {
      addressId: id
    }
  })
}

export function getDefaultAddress () {
  return request({
    url: '/address/defaultId'
  })
}
