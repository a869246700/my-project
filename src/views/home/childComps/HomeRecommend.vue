<template>
  <van-grid :gutter="5" :column-num="4">
    <van-grid-item v-for="(item, index) in recommendList" :key="index">
      <img v-lazy="item.image" />
      <span>{{item.title}}</span>
    </van-grid-item>
  </van-grid>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    recommendList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.van-grid-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}

.van-grid-item span {
  font-size: 12px;
}
</style>
