<template>
  <nav-bar>
    <template #center>
      <span class="title">个人中心</span>
    </template>
    <template #right>
      <span v-if="isLogin" @click="handleLogout">注销</span>
      <span v-if="!isLogin" @click="hanleClickToLogin">登录</span>
    </template>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'ProfileNavBar',
  components: {
    NavBar
  },
  methods: {
    ...mapActions(['logout']),
    // 点击前往登录
    hanleClickToLogin() {
      this.$router.push('login')
    },
    handleLogout() {
      this.$dialog.confirm({
        title: '确认退出'
      })
        .then(() => {
          // 删除本地的 token
          window.sessionStorage.removeItem('token')
          this.logout()
        })
        .catch(() => {
          this.$toast('取消退出')
        })
    }
  },
  computed: {
    // 方式 1
    // isLogin() {
    //   return this.$stroe.state.isLogin
    // },
    // userInfo() {
    //   return this.$store.state.userInfo
    // },
    // 方式 2
    ...mapState(['isLogin', 'userInfo']),
    ...mapGetters(['loginInfo'])
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 19px;
  color: #fff;
}
</style>
