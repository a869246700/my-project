<template>
  <van-nav-bar title="首页" left-text="返回" fixed :z-index="999">
    <template #left>
      <span class="logo" @click="handleClickLogo">G</span>
    </template>
    <template #title class="center">
      <slot name="center"></slot>
    </template>
    <template #right>
      <slot name="right"></slot>
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    handleClickLogo() {
      this.$toast('欢迎来到G商城')
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  height: 49px;

  .logo {
    font-size: 32px;
    font-weight: 700;
  }
}
</style>
