import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart({
    state,
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      // 1. 获取 Stroe 里的商品
      const oldProduct = state.cartList.find(item => item.id === payload.id)
      // 2. 判断是否存在
      if (oldProduct) {
        // 数量+1
        commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      } else {
        // 添加新商品
        payload.count = 1
        commit(ADD_TO_CART, payload)
        resolve('添加新商品')
      }
    })
  }
}
