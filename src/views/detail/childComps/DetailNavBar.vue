<template>
  <van-nav-bar title="标题" left-arrow @click-left="handleGoBack" fixed>
    <template #title>
      <div class="center">
        <van-tabs v-model="active" @click="handleTabClick">
          <van-tab title="商品"></van-tab>
          <van-tab title="参数"></van-tab>
          <van-tab title="评论"></van-tab>
          <van-tab title="推荐"></van-tab>
        </van-tabs>
      </div>
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: 'DetailNavBar',
  data() {
    return {
      active: 0
    }
  },
  methods: {
    // 点击返回上一级
    handleGoBack() {
      this.$router.go(-1)
    },
    // 监听 Tabs 切换
    handleTabClick(index) {
      this.$emit('tabClick', this.active)
    }
  }
}
</script>

<style lang="less" scoped>
.center {
  min-width: 200px;
}
</style>
