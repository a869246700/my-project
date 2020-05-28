<template>
  <van-tabbar
    v-model="active"
    route
    inactive-color="#999999"
    active-color="#ec4d4d"
    :z-index="99"
    class="tab-bar"
  >
    <van-tabbar-item class="tab-bar-item" icon="home-o" replace to="/home">首页</van-tabbar-item>
    <van-tabbar-item class="tab-bar-item" icon="apps-o" replace to="/category">分类</van-tabbar-item>
    <van-tabbar-item
      class="tab-bar-item"
      icon="shopping-cart-o"
      replace
      to="/cart"
      :badge="cartLength ? cartLength : null"
    >购物车</van-tabbar-item>
    <van-tabbar-item class="tab-bar-item" icon="smile-o" replace to="/profile">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TabBar',
  data() {
    return {
      active: 0
    }
  },
  computed: {
    ...mapGetters(['cartLength'])
  }
}
</script>

<style lang="less" scoped>
.tab-bar,
.tab-bar-item {
  height: 49px;
}
</style>
