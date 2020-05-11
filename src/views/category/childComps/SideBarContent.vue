/* eslint-disable vue/return-in-computed-property */
<template>
  <div class="content">
    <tab-control :tabs="tabControls" class="tab-control" @tabClick="handleTabClick" />
    <!-- 列表 -->
    <scroll ref="scroll">
      <goods :goodsList="goodsList" />
    </scroll>
  </div>
</template>

<script>
import TabControl from 'components/common/tabcontrol/TabControl'
import Scroll from 'components/common/scroll/Scroll'
import Goods from 'components/common/goods/Goods'
export default {
  name: 'SideBarContent',
  components: { TabControl, Scroll, Goods },
  data() {
    return {}
  },
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
  methods: {
    // tab栏点击
    handleTabClick(name) {
      this.$emit('handleTabClick', name)
      console.log(this.goodsList)
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  flex: 1;
  height: calc(100vh - 99px);
  overflow: scroll;

  .tab-control {
    // position: sticky;
    top: 0;
    z-index: 999;
  }
}
.content::-webkit-scrollbar {
  display: none;
}
</style>
