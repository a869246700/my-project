<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <slot></slot>
    </van-list>
  </van-pull-refresh>
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
      refreshing: false,
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
    },
    // 下拉刷新
    onRefresh() {
      // 处于加载状态
      this.loading = true
      // 触发重新刷新事件
      this.$emit('handleRefresh')
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  }
}
</script>

<style lang="less" scoped>
.van-list {
  overflow: hidden;
}
</style>
