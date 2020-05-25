/* eslint-disable vue/return-in-computed-property */
<template>
  <div id="side-bar-content">
    <!-- 滚动视图 -->
    <my-scroll @onScroll="handleScroll" ref="scroll" class="scroll">
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
        <van-tab :title="tabControls[0].title" :key="tabControls[0].title">
          <goods :goodsList="goodsList.pop" />
        </van-tab>
        <van-tab :title="tabControls[1].title" :key="tabControls[1].title">
          <goods :goodsList="goodsList.sell" />
        </van-tab>
        <van-tab :title="tabControls[2].title" :key="tabControls[2].title">
          <goods :goodsList="goodsList.new" />
        </van-tab>
      </van-tabs>
    </my-scroll>

    <!-- 返回顶部按钮 -->
    <back-top v-show="isShowBackTop" @click.native="clickBackTop" />
  </div>
</template>

<script>
import MyScroll from 'components/common/myscroll/MyScroll'
import Goods from 'components/common/goods/Goods'
import { backTopMixin } from 'common/mixin'

export default {
  name: 'SideBarContent',
  components: { MyScroll, Goods },
  mixins: [backTopMixin],
  data() {
    return {
      active: 0,
      offsetYs: [0, 0, 0]
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
      this.$refs.scroll.scrollTo(this.offsetYs[this.active])
      this.$emit('handleTabClick', this.tabControls[this.active].name)
    },
    handleScroll(y) {
      // 1. 显示返回顶部
      this.showBackTop(y, 1000)

      // 2.保存高度
      this.offsetYs[this.active] = y
    }
  }
}
</script>

<style lang="less">
#side-bar-content {
  flex: 1;
  height: calc(100vh - 99px);
  overflow: auto;

  .van-sticky--fixed {
    left: 80px;
    transform: translateZ(0);
  }
}
#side-bar-content::-webkit-scrollbar {
  display: none;
}
</style>
