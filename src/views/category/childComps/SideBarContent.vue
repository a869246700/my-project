/* eslint-disable vue/return-in-computed-property */
<template>
  <div class="content">
    <tab-control :tabs="tabControls" class="tab-control" @tabClick="handleTabClick" />
    <!-- 列表 -->
    <scroll ref="scroll" class="scroll">
      <van-pull-refresh v-model="isRefresh" @refresh="handleDownRefresh">
        <van-list
          loading-text="加载中"
          finished-text="没有更多了"
          v-model="isLoading"
          :finished="isFinished"
        >
          <goods :goodsList="goodsList" />
        </van-list>
      </van-pull-refresh>
    </scroll>
  </div>
</template>

<script>
import TabControl from 'components/common/tabcontrol/TabControl'
import Scroll from 'components/common/scroll/Scroll'
import Goods from 'components/common/goods/Goods'
import { goodsItemImageListenerMixin } from 'common/mixin'

export default {
  name: 'SideBarContent',
  mixins: [goodsItemImageListenerMixin],
  components: { TabControl, Scroll, Goods },
  props: {
    tabControls: {
      type: Array,
      default() {
        return []
      }
    },
    goodsList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isRefresh: true,
      isLoading: false,
      isFinished: true
    }
  },
  methods: {
    // tab栏点击
    handleTabClick(name) {
      this.$emit('handleTabClick', name)
    },
    handleDownRefresh() {
      setTimeout(() => (this.isRefresh = false), 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  flex: 1;
}

.tab-control {
  position: fixed;
  left: 90px;
  right: 0;
  top: 49px;
  z-index: 999;
}

.scroll {
  width: 100%;
  height: calc(100vh - 147px);
  margin-top: 44px;
}
</style>
