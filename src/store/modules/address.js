import { getAddressList, getRegion, getDefaultAddress } from '@/api/address'
export default {
  namespaced: true,
  state () {
    return {
      addressList: [],
      regionList: [],
      defaultId: ''
    }
  },
  mutations: {
    setAddress (state, list) {
      state.addressList = list
    },
    setRegion (state, list) {
      state.regionList = list
    },
    setDefault (state, id) {
      state.defaultId = id
    }
  },
  actions: {
    async getAddress (context) {
      const res = await getAddressList()
      const list = []
      res.data.list.forEach(item => {
        const obj = {
          id: item.address_id,
          name: item.name,
          tel: item.phone,
          address: item.region.province + item.region.city + item.region.region + item.detail,
          isDefault: context.state.defaultId === item.address_id
        }
        if (obj.isDefault === true) {
          list.unshift(obj)
        } else {
          list.push(obj)
        }
      })
      context.commit('setAddress', list)
    },
    async getRegionList (context) {
      if (context.state.regionList.length !== 0) return
      const res = await getRegion()
      context.commit('setRegion', res.data.list)
    },
    async getDefault (context) {
      const res = await getDefaultAddress()
      context.commit('setDefault', res.data.defaultId)
    }
  },
  getters: {
    PickerColumn (state) {
      const list = []
      Object.keys(state.regionList).forEach(item => {
        const obj1 = {
          text: state.regionList[item].name,
          id: state.regionList[item].id,
          children: []
        }
        const city = state.regionList[item].city
        Object.keys(city).forEach(item => {
          const obj2 = {
            text: city[item].name,
            id: city[item].id,
            children: []
          }
          const region = city[item].region
          Object.keys(region).forEach(item => {
            const obj3 = {
              text: region[item].name,
              id: region[item].id
            }
            obj2.children.push(obj3)
          })
          obj1.children.push(obj2)
        })
        list.push(obj1)
      })
      return list
    }
  }
}
