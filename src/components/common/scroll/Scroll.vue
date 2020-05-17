<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh" loading-text="刷新中...">
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
      if (this.$router.history.current.path === '/category') {
        this.finished = true
        this.loading = false
      }
      this.$emit('handleDataLoad')
    },
    onScroll() {
      // 防止移动端拿不到 top 值
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      // 滚动给父元素触发滚动事件
      this.$emit('onScroll', this.scrollTop)
    },
    // 跳转高度
    scrollTo(target) {
      window.scrollTo(0, target)
    },
    // 下拉刷新
    onRefresh() {
      // 处于加载状态
      this.loading = true
      if (this.$router.history.current.path === '/category') {
        setTimeout(() => {
          this.refreshing = false
        }, 1000)
      }
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
</style>
