<template>
  <div>
    <van-nav-bar
    :title="title"
    left-arrow
    @click-left="$router.go(-1)"
  />
  <van-form @submit="addAddress">
  <van-field
    v-model="name"
    name="姓名"
    label="姓名"
    placeholder="请输入姓名"
    :rules="[{ required: true, message: '姓名不能为空' }]"
  />
  <van-field
    v-model="phone"
    name="电话"
    label="电话"
    placeholder="请输入电话号码"
    :rules="[{ required: true, message: '请正确输入电话号码', pattern }]"
  />
  <van-field
  readonly
  clickable
  name="picker"
  :value="address"
  label="省市区"
  placeholder="点击选择省市区"
  @click="showPicker = true"
/>
<van-popup v-model="showPicker" position="bottom">
  <van-picker
    show-toolbar
    :columns="columns"
    @confirm="onConfirm"
    @cancel="showPicker = false"
  >
</van-picker>
</van-popup>
<van-field
    v-model="detail"
    name="详细地址"
    label="详细地址"
    placeholder="请输入详细地址"
    :rules="[{ required: true, message: '详细地址不能为空' }]"
  />
  <van-field name="switch" label="设为默认地址">
  <template #input>
    <van-switch v-model="isDefalut" size="20" />
  </template>
</van-field>
  <div style="margin: 16px; margin-top: 30px;">
    <van-button round block type="info" color="#002fa7" native-type="submit">提交</van-button>
  </div>
  <div style="margin: 16px;">
    <van-button round block  type="danger">删除</van-button>
  </div>
</van-form>
  </div>
</template>

<script>
import { addAddress, getAddressList, setDefaultAddress } from '@/api/address'
export default {
  name: 'AddressEdit',
  data () {
    return {
      title: '新增地址',
      name: '',
      phone: '',
      pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/,
      showPicker: false,
      address: '',
      addressArr: [],
      addressId: [],
      columns: [],
      isDefalut: false,
      detail: ''

    }
  },
  methods: {
    onSave () {
    },
    onConfirm (value, index) {
      this.address = value.reduce((pre, next) => {
        return pre + next
      }, '')
      this.addressArr = value
      this.addressId.push(this.columns[index[0]].id)
      this.addressId.push(this.columns[index[0]].children[index[1]].id)
      this.addressId.push(this.columns[index[0]].children[index[1]].children[index[2]].id)
      this.showPicker = false
    },
    async addAddress () {
      const obj = {
        name: this.name,
        phone: this.phone,
        detail: this.detail,
        region: [{
          value: this.addressId[0],
          label: this.addressArr[0]
        }, {
          value: this.addressId[1],
          label: this.addressArr[1]
        }, {
          value: this.addressId[2],
          label: this.addressArr[2]
        }]
      }
      const res = await addAddress(obj)
      if (res.status === 200 && this.isDefalut === true) {
        const res1 = await getAddressList()
        const id = res1.data.list[res1.data.list.length - 1].address_id
        await setDefaultAddress(id)
      }
      this.$toast.success('新增地址成功')
      this.$router.replace('/address')
    }
  },
  async created () {
    await this.$store.dispatch('address/getRegionList')
    this.columns = this.$store.getters['address/PickerColumn']
  }
}
</script>

<style>
</style>
