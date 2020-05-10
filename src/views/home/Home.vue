<template>
  <div id="home">
    <!-- 头部框 -->
    <nav-bar />

    <!-- 滚动框 -->
    <scroll
      ref="scroll"
      class="scroll"
      @handleDataLoad="getCurrentTypeData"
      @onScroll="handleScroll"
    >
      <!-- 轮播图 -->
      <home-swiper :imgs="swiperList" />

      <!-- 推荐视图 -->
      <home-recommend :recommendList="recommendList" />

      <!-- 顶部导航栏，吸顶效果 -->
      <tab-control :tabs="tabControls" @tabClick="handleTabClick" class="tabcontrol" />

      <!-- 物品显示 -->
      <goods :goodsList="goodsList" ref="goods" />
    </scroll>

    <!-- 返回顶部按钮 -->
    <back-top v-show="isShowBackTop" @click.native="backTop" />
  </div>
</template>

<script>
// 导入组件
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/common/tabcontrol/TabControl'
import Scroll from 'components/common/scroll/Scroll'
import Goods from 'components/common/goods/Goods'
import BackTop from 'components/content/backtop/BackTop'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'
import { getHomeMultidata, getHomeGoods } from 'network/home'
import { backTopMixin } from 'common/mixin.js'

export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    Scroll,
    Goods,
    BackTop,
    HomeSwiper,
    HomeRecommend
  },
  mixins: [backTopMixin],
  data() {
    return {
      // tabControl 的 tabs
      tabControls: [
        { title: '推荐', name: 'pop' },
        { title: '精选', name: 'sell' },
        { title: '最新', name: 'new' }
      ],
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
          page: 1,
          offsetTop: 0
        },
        new: {
          list: [],
          page: 1,
          offsetTop: 0
        },
        sell: {
          list: [],
          page: 1,
          offsetTop: 0
        }
      },
      // 当前的 tab
      currentType: 'pop',
      // 离开时的
      saveY: 0
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
      this.$refs.scroll.loading = false

      if (res.data.list.length === 0) {
        this.$refs.scroll.finished = true
        return
      }
      this.goods[type].list.push(...res.data.list)
    },
    // 获取轮播图
    async getHomeMultidata() {
      const { data: res } = await getHomeMultidata({ url: '/home/multidata' })
      this.swiperList = res.data.banner.list
      this.recommendList = res.data.recommend.list
    },
    // 初始化首页商品数据
    initHomeDatas() {
      this.getData('pop', 1)
      this.getData('sell', 1)
      this.getData('new', 1)
    },
    // 监听tabs点击切换
    handleTabClick(name) {
      this.currentType = name
      this.$refs.scroll.scrollTo(this.goods[this.currentType].offsetTop)
    },
    // 加载当前类型的数据
    getCurrentTypeData() {
      const page = this.goods[this.currentType].page + 1
      this.getData(this.currentType, page)
    },
    // 监听页面滚动
    handleScroll(offsetTop) {
      // 记录当前类型的滚动高度
      this.goods[this.currentType].offsetTop = offsetTop
      this.showBackTop(offsetTop, 1000)
    },
    // 点击返回最高
    clickBackTop() {}
  },
  computed: {
    // 数据列表数据
    goodsList() {
      return this.goods[this.currentType].list
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(this.saveY)
  },
  deactivated() {
    this.saveY = this.goods[this.currentType].offsetTop
  }
}
</script>

<style scoped>
#home {
  margin-bottom: 50px;
}
.scroll {
  margin-top: 49px;
}
</style>
