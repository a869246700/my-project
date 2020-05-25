<template>
  <!-- 下拉刷新 上啦加载更多 -->
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
      <slot></slot>
    </van-list>
  </van-pull-refresh>
</template>

<script>
export default {
  name: 'List',
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    onLoad() {
      this.$emit('loadMore')
    },
    onRefresh() {
      this.$emit('pullRefresh')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
