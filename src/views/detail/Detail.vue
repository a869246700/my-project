<template>
  <div id="detail">
    <!-- navbar -->
    <detail-nav-bar @tabClick="handleTabClick" ref="nav" />

    <scroll
      ref="scroll"
      class="scroll"
      @handleDataLoad="handleLoadMore"
      @onScroll="handleScroll"
      @handleRefresh="handleRefresh"
    >
      <!-- 商品轮播图 -->
      <detail-swiper :imgs="topImages" />

      <!-- 商品基本信息 -->
      <detail-base-info :goods="goods" />

      <!-- 商家信息 -->
      <detail-shop-info :shop="shop" />

      <!-- 商品详细信息 -->
      <detail-goods-info :detail-info="detailInfo" ref="goodsinfo" />

      <!-- 商品参数列表 -->
      <detail-param-info :paramInfo="paramInfo" ref="params" />

      <!-- 用户评论 -->
      <detail-comment-info :comment-info="commentInfo" ref="comment" />

      <!-- 推荐商品 -->
      <detail-recommend-info :recommends="recommends" ref="recommend" />
    </scroll>

    <detail-bottom />

    <!-- mock -->
    <mock ref="mock" />

    <!-- 返回顶部按钮 -->
    <back-top v-show="isShowBackTop" @click.native="backTop" />
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import { MockMixin, backTopMixin } from 'common/mixin'
// 请求
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from 'network/detail'
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetaiBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailRecommendInfo from './childComps/DetailRecommendInfo'
import DetailBottom from './childComps/DetailBottom'

export default {
  name: 'Detail',
  mixins: [MockMixin, backTopMixin],
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottom
  },
  data() {
    return {
      Id: null, // 商品 id
      topImages: [], // 轮播图照片
      goods: {}, // 商品概要信息
      shop: {}, // 商家信息
      detailInfo: {}, //  商品详细信息
      paramInfo: {}, // 参数信息
      commentInfo: {}, // 评论信息
      recommends: [], // 推荐信息
      themeTopYs: [], // 每个组件的offsetTop
      currentIndex: 0
    }
  },
  created() {
    // 1. 进入页面时，根据传过来的 id 进行操作
    this.initGoodsInfo()
  },
  methods: {
    // 初始化商品信息
    async initGoodsInfo() {
      // 保存商品的 Id
      this.Id = this.$route.query.id
      // 根据 Id 请求数据
      const { data: res } = await getDetail(this.Id)
      if (res.status.code !== 1001) {
        return this.toast.fail('请求商品详细数据失败!')
      }

      // 保存数据
      // 1. 获取顶部轮播图图片
      this.topImages = res.result.itemInfo.topImages
      // 2.商品信息
      this.goods = new Goods(
        res.result.itemInfo,
        res.result.columns,
        res.result.shopInfo.services
      )
      // 3. 商铺信息对象
      this.shop = new Shop(res.result.shopInfo)
      // 4. 商品详细信息
      this.detailInfo = res.result.detailInfo
      // 5. 商品参数信息
      this.paramInfo = new GoodsParam(
        res.result.itemParams.info,
        res.result.itemParams.rule
      )
      // 6. 获取评论信息
      if (res.result.rate.cRate !== 0) {
        this.commentInfo = res.result.rate.list[0]
      }

      // 7. 获取推荐数据
      const resp = await getRecommend()
      if (resp.status !== 200) {
        return this.toast.fail('获取推荐信息失败!')
      }
      this.recommends.push(...resp.data.data.list)

      // 加载成功，隐藏 mock
      this.$refs.mock.isMockShow = false

      // 计算各部件的高度
      this.initHeight()
    },
    // 下拉加载更多
    handleLoadMore() {
      this.$refs.scroll.loading = false
      this.$refs.scroll.finished = true
    },
    // 滚动监听
    handleScroll(y) {
      // 当页面滚动高度超过 2000 显示 backtop 组件
      this.showBackTop(y, 2000)

      const length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          y + 5 >= this.themeTopYs[i] &&
          y + 5 < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i
          this.$refs.nav.active = this.currentIndex
        }
      }
    },
    // 下拉刷新
    handleRefresh() {
      setTimeout(() => {
        this.$refs.scroll.refreshing = false
      }, 1000)
    },
    // 计算组件在页面的高度
    initHeight() {
      // 定义高度
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // 添加一个占位
      this.themeTopYs.push(Number.MAX_VALUE)
    },
    // 顶部 Tab 点击事件
    handleTabClick(index) {
      // 点击跳转至固定的高度
      this.$refs.scroll.scrollTo(this.themeTopYs[index])
    }
  }
}
</script>
<style lang="less" scoped>
#detail {
  position: relative;
  background-color: #fff;
  margin-bottom: 49px;

  .scroll {
    margin-top: 49px;
  }
}
</style>
