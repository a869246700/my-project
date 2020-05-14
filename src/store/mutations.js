import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  // 添加新商品
  [ADD_TO_CART](state, payload) {
    payload.checked = false
    state.cartList.push(payload)
  },
  // 商品数量+1
  [ADD_COUNTER](state, payload) {
    payload.count++
  }
}
