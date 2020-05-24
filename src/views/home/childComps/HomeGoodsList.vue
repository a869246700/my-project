<template>
  <van-tabs
    v-model="active"
    swipeable
    animated
    sticky
    lazy-render
    :offset-top="49"
    @change="tabChange"
  >
    <van-tab :title="tabs[0].title" :key="0">
      <goods :goodsList="goodsList.pop.list" />
    </van-tab>
    <van-tab :title="tabs[1].title" :key="1">
      <goods :goodsList="goodsList.sell.list" />
    </van-tab>
    <van-tab :title="tabs[2].title" :key="2">
      <goods :goodsList="goodsList.new.list" />
    </van-tab>
  </van-tabs>
</template>

<script>
import Goods from 'components/common/goods/Goods'
export default {
  name: 'HomeGoodsList',
  props: {
    goodsList: {
      type: Object,
      default: () => {}
    },
    tabs: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Goods
  },
  data() {
    return {
      active: 0
    }
  },
  methods: {
    tabChange() {
      this.$emit('tabChange', this.tabs[this.active].name)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
