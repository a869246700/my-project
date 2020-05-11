<template>
  <van-tabbar v-model="active" @change="onChange" route inactive-color="#999999" active-color="#ff8198" :z-index="9999">
    <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="search" to="/category">分类</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to="/cart">购物车</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to="/profile">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
      active: 0
    }
  },
  methods: {
    // 监听 TabBarItem 点击事件
    onChange() {
      console.log()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
