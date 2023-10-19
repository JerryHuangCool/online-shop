<template>
  <div class="login">
    <van-nav-bar
  title="会员登录"
  left-arrow
  @click-left="onClickLeft"
/>
<div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input class="inp" maxlength="11" placeholder="请输入手机号码" type="text" v-model="telNumber">
        </div>
        <div class="form-item">
          <input class="inp" maxlength="5" placeholder="请输入图形验证码" type="text" v-model="iptCode">
          <img :src="imgCode.base64" alt="" @click="reloadCode" v-show="imgCode">
        </div>
        <div class="form-item">
          <input class="inp" placeholder="请输入短信验证码" type="text" v-model="smsCode">
          <p v-if="flag">重新发送({{countdown}})秒</p>
          <button @click="getMsgCode" v-else>获取验证码</button>
        </div>
      </div>
      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { getImgCode, sendCode, userLogin } from '@/api/login'
import { mapMutations } from 'vuex'
export default {
  name: 'LoginIndex',
  methods: {
    ...mapMutations('user', ['updataUserInfo']),
    onClickLeft () {
      this.$router.go(-1)
    },
    async reloadCode () {
      const res = await getImgCode()
      this.imgCode = res.data
    },
    async getMsgCode () {
      if (!this.valid()) return
      const res = await sendCode(this.telNumber, this.imgCode.key, this.iptCode)
      console.log(res)
      this.$toast('短信发送成功')
      this.flag = true
      this.timer = setInterval(() => {
        this.countdown--
        if (this.countdown === 0) {
          this.countdown = 60
          this.flag = false
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    },
    valid () {
      if (!/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/.test(this.telNumber)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.iptCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    async login () {
      if (!this.valid()) return
      if (!/^\d{6}$/.test(this.smsCode)) {
        this.$toast('请输入6位短信验证码')
        return
      }
      const res = await userLogin(this.telNumber, this.smsCode)
      console.log(res)
      this.$toast('登录成功')
      this.updataUserInfo(res.data)
      if (this.$route.query.backUrl) {
        this.$router.replace(this.$route.query.backUrl)
      } else {
        this.$router.replace('/')
      }
    }
  },
  async created () {
    this.reloadCode()
  },
  destroyed () {
    clearInterval(this.timer)
    this.timer = null
  },
  data () {
    return {
      imgCode: {},
      iptCode: '',
      flag: false,
      countdown: 60,
      timer: null,
      telNumber: '',
      smsCode: '' // 246810
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
    p {
      font-size: 13px;
      color: #b8b8b8;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
