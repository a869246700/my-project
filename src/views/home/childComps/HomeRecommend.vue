<template>
  <van-grid :column-num="4" border :gutter="2">
    <van-grid-item
      v-for="(item, index) in recommendList"
      :key="index"
      @click="handleItemClick(item.title)"
    >
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
  },
  methods: {
    handleItemClick(title) {
      this.Toast.loading({
        message: title,
        forbidClick: true,
        overlay: true
      })
    }
  }
}
</script>

<style lang="less" scoped>
.van-grid-item {
  img {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
  }
  span {
    font-size: 12px;
  }
}
</style>
