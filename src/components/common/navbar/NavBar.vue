<template>
  <van-nav-bar title="首页" left-text="返回" fixed :z-index="999">
    <template #left>
      <span class="logo" @click="Toast('欢迎来到G商城')">G</span>
    </template>
    <template #title class="center">
      <slot></slot>
    </template>
    <template #right>
      <van-icon name="setting-o" size="24" color="#fff" @click="handleLogout" />
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    handleLogout() {
      this.Dialog.confirm({
        title: '确认退出'
      })
        .then(() => {
          window.sessionStorage.removeItem('token')
          this.$router.push('/login')
        })
        .catch(() => {
          this.Toast('取消退出')
        })
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
