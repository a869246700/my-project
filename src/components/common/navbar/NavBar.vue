<template>
  <van-nav-bar title="首页" left-text="返回" fixed border :z-index="999">
    <template #left>
      <span class="logo">G</span>
    </template>
    <template #title class="center">
      <slot></slot>
    </template>
    <template #right>
      <van-icon name="user-o" size="24" color="#fff" />
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #ff6b81;
  color: #fff;
  height: 49px;

  .logo {
    font-size: 32px;
    font-weight: 700;
  }
}
</style>
