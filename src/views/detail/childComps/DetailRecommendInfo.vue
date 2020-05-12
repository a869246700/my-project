<template>
  <div class="recommend-info">
    <div class="info-header">热门推荐</div>
    <goods :goodsList="recommends" />
  </div>
</template>

<script>
import Goods from 'components/common/goods/Goods'

export default {
  name: 'DetailRecommendInfo',
  components: {
    Goods
  },
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.recommend-info {
  padding: 5px;
}

.info-header {
  line-height: 40px;
  padding-left: 8px;
  font-size: 15px;
  color: #333;
}
</style>
