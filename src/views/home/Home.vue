<template>
  <div id="home" ref="home">
    <!-- 头部框 -->
    <nav-bar>
      <search />
    </nav-bar>

    <tab-control
      :tabs="tabControls"
      @tabClick="handleTabClick"
      ref="tabcontrol1"
      v-show="isTabFixed"
      class="tab-control"
    />

    <!-- 滚动框 -->
    <scroll
      ref="scroll"
      class="content"
      :probe-type="3"
      @scroll="handleScroll"
      :pull-up-load="true"
      @pullingUp="getCurrentTypeData"
    >
      <van-pull-refresh v-model="isRefresh" @refresh="handleDownRefresh">
        <!-- 轮播图 -->
        <home-swiper :imgs="swiperList" @imageLoad="caclTabOffsetTop" />

        <!-- 推荐视图 -->
        <home-recommend :recommendList="recommendList" @imageLoad="caclTabOffsetTop" />

        <!-- 顶部导航栏，吸顶效果 -->
        <tab-control :tabs="tabControls" @tabClick="handleTabClick" ref="tabcontrol2" />

        <!-- 物品显示 -->
        <van-list
          loading-text="加载中"
          finished-text="没有更多了"
          v-model="isLoading"
          :finished="isFinished"
        >
          <goods :goodsList="goodsList" ref="goods" />
        </van-list>
      </van-pull-refresh>
    </scroll>

    <!-- 返回顶部按钮 -->
    <back-top v-show="isShowBackTop" @click.native="backTop" />

    <!-- mock -->
    <mock ref="mock" />
  </div>
</template>

<script>
// 导入组件
import NavBar from 'components/common/navbar/NavBar'
import Search from 'components/common/search/Search'
import TabControl from 'components/common/tabcontrol/TabControl'
import Scroll from 'components/common/scroll/Scroll'
import Goods from 'components/common/goods/Goods'
import BackTop from 'components/content/backtop/BackTop'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'
import { getHomeMultidata, getHomeGoods } from 'network/home'
import {
  backTopMixin,
  MockMixin,
  goodsItemImageListenerMixin,
  tabControlMixin
} from 'common/mixin'

import { POP, NEW, SELL } from 'common/const'

export default {
  name: 'Home',
  components: {
    NavBar,
    Search,
    TabControl,
    Scroll,
    Goods,
    BackTop,
    HomeSwiper,
    HomeRecommend
  },
  mixins: [
    backTopMixin,
    MockMixin,
    goodsItemImageListenerMixin,
    tabControlMixin
  ],
  data() {
    return {
      // tabControl 的 tabs
      tabControls: ['推荐', '精选', '最新'],
      // 轮播图数据
      swiperList: [],
      // 模拟页面
      page: 1,
      // 首页推荐的数据列表
      recommendList: [],
      // 商品数据
      goods: {
        pop: {
          list: [],
          page: 0,
          offsetTop: 0
        },
        new: {
          list: [],
          page: 0,
          offsetTop: 0
        },
        sell: {
          list: [],
          page: 0,
          offsetTop: 0
        }
      },
      // 当前的 tab
      currentType: 'pop',
      // 离开时的
      saveY: 0,
      // 是否吸顶
      isTabFixed: false,
      // tabcontrol 吸顶高度
      tabOffsetTop: 0,
      // 监听轮播图和推荐栏的图片加载
      loadImageNumber: 0,
      // 控制上啦刷新
      isRefresh: true,
      // 控制上拉加载更多
      isLoading: false,
      isFinished: false
    }
  },
  created() {
    this.initHomeDatas()
    this.getHomeMultidata()
  },
  methods: {
    // 获取商品的数据
    async getData(type, page) {
      const { data: res } = await getHomeGoods(type, page)

      this.loading = false
      // 如果已经没有返回数据,则显示无
      if (res.data.list.length === 0) {
        this.isFinished = true
        return
      }
      // 防止加载过快
      setTimeout(() => {
        this.goods[type].list.push(...res.data.list)
        this.$refs.scroll.finishPullUp()
      }, 500)
    },
    // 获取轮播图
    async getHomeMultidata() {
      const { data: res } = await getHomeMultidata({ url: '/home/multidata' })
      this.swiperList = res.data.banner.list
      this.recommendList = res.data.recommend.list
    },
    // 初始化首页商品数据
    initHomeDatas() {
      this.getData('pop', ++this.goods.pop.page)
      this.getData('sell', ++this.goods.sell.page)
      this.getData('new', ++this.goods.new.page)
      setTimeout(() => {
        this.$refs.mock.isMockShow = false
      }, 500)
    },
    // 上拉加载当前类型的数据
    getCurrentTypeData() {
      console.log('上啦加载更多')
      const page = ++this.goods[this.currentType].page
      this.getData(this.currentType, page)
    },
    // 监听页面滚动
    handleScroll(position) {
      // 1. 判断 backTop 是否显示
      this.showBackTop(position, this.tabOffsetTop)
      // 2. 决定 tab-control 是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop
      // 3. 记录每一种类型的高度
      this.goods[this.currentType].offsetTop = this.$refs.scroll.getScrollY()
    },
    // 用来计算 tab 的固定高度
    caclTabOffsetTop() {
      this.loadImageNumber++
      if (this.loadImageNumber === 2) {
        this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop
        this.goods.pop.offsetTop = -this.$refs.tabcontrol2.$el.offsetTop
        this.goods.new.offsetTop = -this.$refs.tabcontrol2.$el.offsetTop
        this.goods.sell.offsetTop = -this.$refs.tabcontrol2.$el.offsetTop
      }
    },
    // tab点击切换事件
    handleTabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      this.$refs.tabcontrol1.activeIndex = index
      this.$refs.tabcontrol2.activeIndex = index
      this.$refs.scroll.scrollTo(0, this.goods[this.currentType].offsetTop)
    },
    // 下拉刷新
    handleDownRefresh() {
      // 刷新首页所有数据
      this.goods.pop.list = []
      this.goods.new.list = []
      this.goods.sell.list = []
      this.initHomeDatas()
      this.refresh()
      setTimeout(() => {
        this.isRefresh = false
      }, 1000)
    }
  },
  computed: {
    // 数据列表数据
    goodsList() {
      return this.goods[this.currentType].list
    }
  },
  activated() {
    // 进入当前组件
    this.refresh()
    // 刷新Home的高度
    this.$refs.scroll.scrollTo(0, this.saveY)
  },
  deactivated() {
    // 保存高度
    this.saveY = this.$refs.scroll.getScrollY()
  }
}
</script>

<style lang="less" scoped>
#home {
  position: relative;
  height: 100vh;

  .content {
    position: absolute;
    top: 49px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .tab-control {
    position: relative;
    z-index: 9;
    top: 49px;
  }
}
</style>
