<template>
  <div>
    <van-nav-bar
    title="收货地址"
    left-arrow
    @click-left="$router.go(-1)"
  />
  <van-address-list
  v-model="chosenAddressId"
  :list="addressList"
  default-tag-text="默认"
  @select="selectAddress"
  @add="onAdd"
  @edit="goToEdit"
/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AddressIndex',
  data () {
    return {
      chosenAddressId: ''
    }
  },
  async created () {
    await this.$store.dispatch('address/getDefault')
    await this.$store.dispatch('address/getAddress')
    this.chosenAddressId = this.addressList[0].id
  },
  computed: {
    ...mapState('address', ['addressList'])
  },
  methods: {
    selectAddress (item) {
      this.chosenAddressId = item.id
    },
    onAdd () {
      this.$router.push('/addressedit')
    },
    goToEdit (item) {
      this.$router.push({
        path: `/addressedit/${item.id}`
      })
    }
  }
}
</script>

<style>

</style>
