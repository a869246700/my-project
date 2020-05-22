export default {
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  },
  // 是否存在被选中的
  isExistChecked(state) {
    // 当全部没被选中，返回 true
    return state.cartList.every(item => item.checked === false)
  },
  isLogin(state) {
    if (state.isLogin) return true
    return false
  }
}
