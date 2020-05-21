<template>
  <van-tabbar
    v-model="active"
    route
    inactive-color="#999999"
    active-color="#1e90ff"
    :z-index="99"
  >
    <van-tabbar-item
      v-for="(item, index) in tabbars"
      :key="index"
      :icon="item.icon"
      replace
      :to="item.url"
      @click="onClick(index)"
    >{{item.name}}</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
      active: 0,
      // 判断是否回到顶部的标志
      beforeIndex: 0,
      tabbars: [
        { name: '首页', url: '/home', icon: 'home-o' },
        { name: '分类', url: '/category', icon: 'apps-o' },
        { name: '购物车', url: '/cart', icon: 'shopping-cart-o' },
        { name: '我的', url: '/profile', icon: 'smile-o' }
      ]
    }
  },
  methods: {
    // 在首页界面时，点击 tabbar 的主页按钮也可返回顶部
    onClick(index) {
      if (this.beforeIndex === index && this.$route.path === '/home') {
        window.scrollTo(0, 0)
      } else {
        this.beforeIndex = index
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
