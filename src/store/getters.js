export default {
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  },
  loginInfo(state) {
    if (state.isLogin) {
      return state.userInfo.useName + '已登录'
    } else {
      return '登录'
    }
  }
}
