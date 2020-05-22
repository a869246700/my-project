import {
  ADD_COUNTER,
  ADD_TO_CART,
  CHANGE_PRPDUCT_CHECK_STATUS,
  CHECK_ALL,
  CANCEL_CHECK_ALL,
  REMOVE_CHECKED_ALL,
  LOGIN,
  LOGOUT
} from './mutation-types'

export default {
  // 添加新商品
  [ADD_TO_CART](state, payload) {
    payload.checked = false
    state.cartList.push(payload)
  },
  // 添加商品数量
  [ADD_COUNTER](state, payload) {
    state.cartList[payload.index].count += payload.addCount
  },
  // 修改购物车中商品的选中状态
  [CHANGE_PRPDUCT_CHECK_STATUS](state, payload) {
    payload.checked = !payload.checked
  },
  // 购物车中商品全选
  [CHECK_ALL](state, payload) {
    state.cartList.forEach(item => (item.checked = true))
  },
  // 购物车中取消商品全选
  [CANCEL_CHECK_ALL](state, payload) {
    state.cartList.forEach(item => (item.checked = false))
  },
  // 登录
  [LOGIN](state, payload) {
    // 记录登录信息
    state.userInfo = payload
    state.isLogin = true
  },
  // 注销
  [LOGOUT](state, payload) {
    // 清除信息
    state.userInfo = {}
    state.cartList = []
    state.isLogin = false
  },
  // 移除购车中选中的商品
  [REMOVE_CHECKED_ALL](state, payload) {
    state.cartList = state.cartList.filter(item => item.checked === false)
  }
}
