<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :immediate-check="false"
  >
    <slot></slot>
  </van-list>
</template>

<script>
export default {
  name: 'Scroll',
  data() {
    return {
      // 是否已加载完成
      finished: false,
      // 是否处于加载状态
      loading: false,
      scrollTop: 0
    }
  },
  methods: {
    // 加载
    onLoad() {
      this.$emit('handleDataLoad')
    },
    onScroll() {
      this.scrollTop = document.documentElement.scrollTop
      // 滚动给父元素触发滚动事件
      this.$emit('onScroll', this.scrollTop)
    },
    // 跳转至对应的地方
    scrollTo(target) {
      // 切换scroll的初始高度
      document.documentElement.scrollTop = target
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  }
}
</script>

<style scoped>
.van-list {
  overflow: hidden;
}
</style>
