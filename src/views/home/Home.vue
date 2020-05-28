<template>
  <div id="home">
    <!-- 头部框 -->
    <nav-bar>
      <template #center>
        <search />
      </template>
    </nav-bar>

    <!-- 滚动框 -->
    <my-scroll class="scroll ignore" ref="scroll" @onScroll="handleScroll">
      <list @pullRefresh="handleRefresh" ref="list" @loadMore="getCurrentTypeData">
        <!-- 轮播图 -->
        <home-swiper :imgs="swiperList" />

        <!-- 推荐视图 -->
        <home-recommend :recommendList="recommendList" />

        <!-- 商品列表 -->
        <home-goods-list
          ref="goodslist"
          :goodsList="goods"
          :tabs="tabControls"
          @tabChange="handleTabChange"
        />
      </list>
    </my-scroll>

    <!-- 返回顶部按钮 -->
    <back-top v-show="isShowBackTop" @click.native="clickBackTop" />

    <!-- mock -->
    <mock ref="mock" />
  </div>
</template>

<script>
// 导入组件
import NavBar from 'components/common/navbar/NavBar'
import Search from 'components/common/search/Search'
import MyScroll from 'components/common/myscroll/MyScroll'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'
import HomeGoodsList from './childComps/HomeGoodsList'
import List from 'components/content/list/List'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { backTopMixin, MockMixin } from 'common/mixin'

export default {
  name: 'Home',
  components: {
    NavBar,
    Search,
    MyScroll,
    HomeSwiper,
    HomeRecommend,
    HomeGoodsList,
    List
  },
  mixins: [backTopMixin, MockMixin],
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
      // 1. 请求数据
      const { data: res } = await getHomeGoods(type, page)

      // 2. 修改加载状态
      this.$refs.list.loading = false
      if (res.data.list.length === 0) {
        this.$refs.list.finished = true
        return
      }

      // 3. 保存数据
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
      this.getData('pop', ++this.goods.pop.page)
      this.getData('sell', ++this.goods.sell.page)
      this.getData('new', ++this.goods.new.page)

      const timer = setTimeout(() => {
        this.$refs.list.refreshing = false
        this.$refs.mock.isMockShow = false
        clearTimeout(timer)
      }, 800)
    },
    // 监听tabs点击切换
    handleTabChange(name) {
      // 1. 改变当前类型
      this.currentType = name

      // 2. 滚动到对应类型的高度
      // 2.1 如果高度低于粘性布局的高度，则直接跳转到粘性布局
      if (this.goods[this.currentType].offsetTop < this.$refs.goodslist.$el.offsetTop) {
        this.$refs.scroll.scrollTo(this.$refs.goodslist.$el.offsetTop)
      } else {
        // 2.2 如果高度大于粘性布局的高度，则跳转至保存的高度
        this.$refs.scroll.scrollTo(this.goods[this.currentType].offsetTop)
      }
    },
    // 加载当前类型的数据
    getCurrentTypeData() {
      // 页码 ++
      this.getData(this.currentType, ++this.goods[this.currentType].page)
    },
    // 监听页面滚动
    handleScroll(y) {
      // 1. 判断 backTop 是否显示
      this.showBackTop(y, 1000)

      // 2. 保存当前类型的高度
      this.goods[this.currentType].offsetTop = y
    },
    // 下拉刷新首页
    handleRefresh() {
      // 1. 清空保存的所有数据
      this.goods.pop.list = []
      this.goods.pop.offsetTop = 0
      this.goods.new.list = []
      this.goods.new.offsetTop = 0
      this.goods.sell.list = []
      this.goods.sell.offsetTop = 0
      // 2. 重新请求数据
      this.initHomeDatas()
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

<style lang="less" scoped>
#home {
  .scroll {
    margin-top: 44px;
    height: calc(100vh - 94px);
  }

  .tab-control {
    position: fixed;
    top: 49px;
    left: 0;
    right: 0;
    z-index: 999;
  }
}
</style>
