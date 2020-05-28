<template>
  <!-- 轮播图 -->
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(item, index) in imgs" :key="index">
      <img v-lazy="item.image" class="swiper-image" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: 'HomeSwiper',
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
.my-swipe {
  height: 200px;
}

.my-swipe .van-swipe-item {
  color: #fff;
  text-align: center;
  background-color: #39a9ed;
}

.swiper-image {
  width: 100%;
  height: 200px;
  vertical-align: middle;
}
</style>
