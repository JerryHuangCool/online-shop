import { getCartList, updateCart, deleteCart } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: [],
      cartTotal: 0,
      cartGoodsNum: 0
    }
  },
  mutations: {
    getCart (state, value) {
      state.cartList = value.list
      state.cartTotal = value.cartTotal
    },
    toggleCheck (state, id) {
      const goods = state.cartList.find(item => {
        return item.goods_id === id
      })
      goods.isCheck = !goods.isCheck
    },
    toggleCheckAll (state, checkAll) {
      state.cartList.forEach(item => {
        item.isCheck = checkAll
      })
    },
    setCartGoodsNum (state, num) {
      state.cartGoodsNum = num
    }
  },
  actions: {
    async getList (context) {
      const res = await getCartList()
      res.data.list.forEach(element => {
        element.isCheck = true
      })
      context.commit('getCart', res.data)
    },
    async updateCart (context, obj) {
      await updateCart(obj.id, obj.num, obj.skuid)
      context.dispatch('getList')
    },
    async deleteGoods (context, cartIds) {
      await deleteCart(cartIds)
      Toast('删除成功')
      context.dispatch('getList')
    }
  },
  getters: {
    totalGoods (state) {
      return state.cartList.length
    },
    checkAll (state) {
      return state.cartList.every(item => item.isCheck === true)
    }
  }
}
