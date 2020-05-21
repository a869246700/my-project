import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  cartList: [],
  isLogin: false,
  userInfo: {
    username: '',
    password: '',
    avatar: '',
    money: 999,
    discountCouponNum: 5,
    shoppingPoints: 300,
    token: ''
  }
}

const modules = {}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules
})
