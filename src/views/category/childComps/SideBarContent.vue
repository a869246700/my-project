/* eslint-disable vue/return-in-computed-property */
<template>
  <div id="side-bar-content">
    <!-- 列表 -->
    <van-tabs
      v-model="active"
      swipeable
      animated
      lazy-render
      @change="tabChange"
      sticky
      :offset-top="49"
    >
      <van-tab :title="tabControls[0].title">
        <goods :goodsList="goodsList.pop" />
      </van-tab>
      <van-tab :title="tabControls[1].title">
        <goods :goodsList="goodsList.sell" />
      </van-tab>
      <van-tab :title="tabControls[2].title">
        <goods :goodsList="goodsList.new" />
      </van-tab>
    </van-tabs>
    <scroll ref="scroll" class="scroll"></scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import Goods from 'components/common/goods/Goods'
export default {
  name: 'SideBarContent',
  components: { Scroll, Goods },
  data() {
    return {
      active: 0
    }
  },
  props: {
    tabControls: {
      type: Array,
      default: () => []
    },
    goodsList: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    // tab栏点击
    tabChange() {
      console.log(this.tabControls[this.active].name)
      this.$emit('handleTabClick', this.tabControls[this.active].name)
    }
  }
}
</script>

<style lang="less">
#side-bar-content {
  flex: 1;
  height: calc(100vh - 99px);
  overflow: scroll;

  .van-sticky--fixed {
    left: 80px !important;
  }
}
#side-bar-content::-webkit-scrollbar {
  display: none;
}
</style>
