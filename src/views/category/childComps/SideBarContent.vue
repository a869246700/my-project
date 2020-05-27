/* eslint-disable vue/return-in-computed-property */
<template>
  <div id="side-bar-content" v-show="isShow">
    <!-- 滚动视图 -->
    <my-scroll @onScroll="handleScroll" ref="scroll" class="scroll">
      <list @pullRefresh="handleRefresh" ref="list" @loadMore="handleLoadMore">
        <side-bar-content-category :cateList="cateList" @imgLoad="handleImgLoadComplete" />

        <!-- 具体商品列表 -->
        <van-tabs
          v-model="active"
          swipeable
          animated
          lazy-render
          @change="tabChange"
          sticky
          :offset-top="49"
          ref="tabs"
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
      </list>
    </my-scroll>

    <!-- 返回顶部按钮 -->
    <back-top v-show="isShowBackTop" @click.native="clickBackTop" />
  </div>
</template>

<script>
import MyScroll from 'components/common/myscroll/MyScroll'
import List from 'components/content/list/List'
import Goods from 'components/common/goods/Goods'
import SideBarContentCategory from './SideBarContentCategory'
import { backTopMixin } from 'common/mixin'

export default {
  name: 'SideBarContent',
  components: { MyScroll, List, Goods, SideBarContentCategory },
  mixins: [backTopMixin],
  data() {
    return {
      active: 0, // 电器的 tab 的 acitve 项
      offsetYs: [0, 0, 0], // 保存三个分类的高度
      isShow: false // 控制页面的显示与隐藏
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
    },
    cateList: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    // tab栏点击
    tabChange() {
      console.log(this.$refs.tabs.$el.offsetTop)
      if (this.offsetYs[this.active] < this.$refs.tabs.$el.offsetTop) {
        this.$refs.scroll.scrollTo(this.$refs.tabs.$el.offsetTop)
      } else {
        this.$refs.scroll.scrollTo(this.offsetYs[this.active])
      }

      this.$emit('handleTabClick', this.tabControls[this.active].name)
    },
    // 页面滚动监听
    handleScroll(y) {
      // 1. 显示返回顶部
      this.showBackTop(y, 1000)

      // 2.保存高度
      this.offsetYs[this.active] = y
    },
    // 下拉刷新
    handleRefresh() {
      const timer = setTimeout(() => {
        this.$refs.list.refreshing = false
        clearTimeout(timer)
      }, 1000)
    },
    // 上啦加载更多
    handleLoadMore() {
      this.$refs.list.loading = false
      this.$refs.list.finished = true
    },
    // 处理图片加载完成
    handleImgLoadComplete() {
      this.isShow = true
    }
  }
}
</script>

<style lang="less">
#side-bar-content {
  flex: 1;
  height: calc(100vh - 99px);
  overflow: auto;

  .scroll {
    height: calc(100vh - 99px);
  }

  .tabs {
    position: fixed;
    top: 49px;
    left: 80px;
    right: 0;
    transform: translateZ(0);
  }

  .van-sticky--fixed {
    left: 80px;
    transform: translateZ(0);
  }
}
#side-bar-content::-webkit-scrollbar {
  display: none;
}
</style>
