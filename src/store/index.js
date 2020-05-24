import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
  cartList: [],
  isLogin: false,
  userInfo: {}
}

const modules = {}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules,
  plugins: [
    persistedState({
      storage: window.sessionStorage
    })
  ]
})
