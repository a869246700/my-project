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
  // 添加商品
  addCart({
    state,
    commit
  }, payload) {
    // 1. 获取 Stroe 里的商品
    const oldProductIndex = state.cartList.findIndex(item => item.id === payload.id)
    console.log()
    // 2. 判断是否存在
    if (oldProductIndex !== -1) {
      // 添加的信息
      const addInfo = {
        index: oldProductIndex,
        addCount: payload.count
      }
      commit(ADD_COUNTER, addInfo)
    } else {
      // 添加新商品
      commit(ADD_TO_CART, payload)
    }
  },
  // 修改单个商品的 checked
  changeCheck({
    state,
    commit
  }, payload) {
    // 1. 根据 id 查询当前商品在 购物车里的东西
    const oldProduct = state.cartList.find(item => item.id === payload.id)
    commit(CHANGE_PRPDUCT_CHECK_STATUS, oldProduct)
  },
  // 修改全部商品的check
  changeAllCheck({
    state,
    commit
  }, payload) {
    if (payload) {
      // 如果已经被全部选中,则执行取消全部选中
      commit(CANCEL_CHECK_ALL)
    } else {
      // 如果未被全部选中,则执行全部选中
      commit(CHECK_ALL)
    }
  },
  // 移除选中的商品
  removeAllChecked({
    state,
    commit
  }, payload) {
    commit(REMOVE_CHECKED_ALL)
  },
  // 登录
  login({ state, commit }, payload) {
    commit(LOGIN, payload)
  },
  // 注销
  logout({ state, commit }, payload) {
    commit(LOGOUT, payload)
  }
}
