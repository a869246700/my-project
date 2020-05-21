import {
  ADD_COUNTER,
  ADD_TO_CART,
  CHANGE_PRPDUCT_CHECK_STATUS,
  CHECK_ALL,
  CANCEL_CHECK_ALL
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
  Login(state, payload) {
    // 已经已登录，则返回
    if (state.isLogin) return

    // 记录登录信息
    state.userInfo.username = payload.username
    state.userInfo.password = payload.password
    state.userInfo.avatar = payload.avatar
    state.isLogin = true
  },
  Logout(state, payload) {
    // 如果为登录，则返回
    if (!state.isLogin) return

    // 清除信息
    state.userInfo.username = ''
    state.userInfo.password = ''
    state.userInfo.avatar = ''
    state.isLogin = false
  }
}
