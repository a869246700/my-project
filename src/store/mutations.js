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
  [CANCEL_CHECK_ALL](state, payliad) {
    state.cartList.forEach(item => (item.checked = false))
  }
}
