<template>
  <van-swipe :autoplay="3000" indicator-color="white" lazy-render :height="300">
    <van-swipe-item v-for="(item, index) in imgs" :key="index">
      <img v-lazy="item" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: 'DetailSwiper',
  props: {
    imgs: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
img {
  width: 100%;
}
</style>
