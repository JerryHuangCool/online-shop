import request from '@/utils/request'

export function getImgCode () {
  return request({
    url: '/captcha/image',
    method: 'get'
  })
}

export function sendCode (tel, key, imgCode) {
  return request({
    url: '/captcha/sendSmsCaptcha',
    method: 'post',
    data: {
      form: {
        captchaCode: imgCode,
        captchaKey: key,
        mobile: tel
      }

    },
    headers: {
      platform: 'H5'
    }
  })
}
