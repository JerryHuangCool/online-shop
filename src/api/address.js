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

export function getAddressById (id) {
  return request({
    url: '/address/detail',
    params: {
      addressId: id
    }
  })
}

export function updateAddress (id, obj) {
  return request({
    url: '/address/edit',
    method: 'post',
    data: {
      addressId: id,
      form: obj
    }
  })
}

export function deleteAddress (id) {
  return request({
    url: '/address/remove',
    method: 'post',
    data: {
      addressId: id
    }
  })
}
