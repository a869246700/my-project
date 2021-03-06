<template>
  <div id="detail">
    <!-- 顶部栏 -->
    <detail-nav-bar @tabClick="handleTabClick" ref="nav" />

    <!-- 滚动视图 -->
    <my-scroll @onScroll="handleScroll" ref="scroll" class="content">
      <list @pullRefresh="handleRefresh" ref="list" @loadMore="handleLoadMore">
        <!-- 商品轮播图 -->
        <detail-swiper :imgs="topImages" />

        <!-- 商品基本信息 -->
        <detail-base-info :goods="goods" />

        <!-- 商家信息 -->
        <detail-shop-info :shop="shop" />

        <!-- 用户评论 -->
        <detail-comment-info :comment-info="commentInfo" ref="comment" />

        <!-- 商品参数列表 -->
        <detail-param-info :paramInfo="paramInfo" ref="params" />

        <!-- 商品详细信息 -->
        <detail-goods-info :detail-info="detailInfo" ref="goodsinfo" @imgLoad="handleImageLoad" />

        <!-- 推荐商品 -->
        <detail-recommend-info :recommends="recommends" ref="recommend" />
      </list>
    </my-scroll>

    <detail-bottom @addCart="handleBottomClick" />

    <!-- mock -->
    <mock ref="mock" />

    <!-- 返回顶部按钮 -->
    <back-top v-show="isShowBackTop" @click.native="clickBackTop" />

    <!-- 加入购物车 -->
    <detail-add-cart ref="addCart" :sku="sku" @addCart="handleAddCart" />
  </div>
</template>

<script>
import MyScroll from 'components/common/myscroll/MyScroll'
import List from 'components/content/list/List'
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
import DetailAddCart from './childComps/DetailAddCart'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Detail',
  mixins: [MockMixin, backTopMixin],
  components: {
    MyScroll,
    List,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottom,
    DetailAddCart
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
      currentIndex: 0, // 当前滚动到的位置
      sku: {}, // 添加商品的配置项
      promptLoginDialogVisible: false // 控制提示登录的显示与隐藏
    }
  },
  created() {
    // 1. 进入页面时，根据传过来的 id 进行操作
    this.initGoodsInfo()
  },
  methods: {
    ...mapActions(['addCart']),
    // 初始化商品信息
    async initGoodsInfo() {
      try {
        // 保存商品的 Id
        this.Id = this.$route.query.id
        // 根据 Id 请求数据
        const { data: res } = await getDetail(this.Id)

        if (res.status.code !== 1001) {
          return this.$toast.fail('请求商品详细数据失败!')
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
        if (res.result.itemParams.rule) {
          this.paramInfo = new GoodsParam(
            res.result.itemParams.info,
            res.result.itemParams.rule
          )
        } else {
          this.$toast.fail('商品参数信息不完整')
          this.paramInfo = new GoodsParam(res.result.itemParams.info, {})
        }
        // 6. 获取评论信息
        if (res.result.rate.cRate !== 0) {
          this.commentInfo = res.result.rate.list[0]
        }

        // 7. 获取推荐数据
        const resp = await getRecommend()
        if (resp.status !== 200) {
          return this.$toast.fail('获取推荐信息失败!')
        }
        this.recommends.push(...resp.data.data.list)

        // 8. 加载成功，隐藏 mock
        this.$refs.mock.isMockShow = false

        // 9. 模拟，配置购买栏的参数
        this.$refs.addCart.goodsId = this.Id
        this.handleConfigureTrading()
      } catch (e) {
        this.$refs.mock.isMockShow = false
        // 1. 提示用户商品请求失败
        this.$toast.fail('请求商品数据失败!')

        // 2. 返回上一级目录
        const timer = setTimeout(() => {
          this.$router.go(-1)
          clearTimeout(timer)
        }, 1000)
      }
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
    // 计算组件在页面的高度
    initHeight() {
      // 定义高度
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // 添加一个占位
      this.themeTopYs.push(Number.MAX_VALUE)
    },
    // 顶部 Tab 点击事件
    handleTabClick(index) {
      // 点击跳转至固定的高度
      this.$refs.scroll.scrollTo(this.themeTopYs[index])
    },
    // 监听底部点击事件
    handleBottomClick() {
      // 加入购物车或者购买时，需要先登录
      // 如果没有登录，提醒需要登录，点击前往登录，或者取消前往登录
      if (!this.isLogin) {
        this.$dialog
          .confirm({
            title: '友情提示',
            message: '您还未登录，请前往登录！'
          })
          .then(() => {
            this.handleToLogin()
          })
          .catch(() => {
            this.$toast('已取消')
          })
      } else {
        this.$refs.addCart.show = true
      }
    },
    // 前往登录
    handleToLogin() {
      this.$router.push('/login')
    },
    // 监听全部图片是否加载完成
    handleImageLoad() {
      // 计算每个 tabControl 项的高度
      this.initHeight()
    },
    // 处理 sku 参数
    handleConfigureTrading() {
      // 计算商品价格
      const price = this.goods.lowNowPrice * 100
      let oldPrice = 0
      if (this.goods.oldPrice === undefined) {
        oldPrice = this.goods.lowNowPrice * 100
      } else {
        oldPrice = this.goods.oldPrice.slice(1) * 100
      }
      // 默认图片为轮播图的第一个图片
      this.$refs.addCart.goods.picture = this.topImages[0]

      // 如果就一种样式
      if (this.topImages.length === 1) {
        this.sku = {
          tree: [
            {
              k: '样式分类', // skuKeyName：规格类目名称
              v: [
                {
                  id: '1',
                  name: '样式1',
                  imgUrl: this.topImages[0],
                  previewImgUrl: this.topImages[0]
                }
              ],
              k_s: 's1'
            },
            {
              k: '尺码', // skuKeyName：规格类目名称
              v: [
                {
                  id: '0',
                  name: 'S'
                },
                {
                  id: '1',
                  name: 'M'
                },
                {
                  id: '2',
                  name: 'L'
                },
                {
                  id: '3',
                  name: 'XL'
                },
                {
                  id: '4',
                  name: '2XL'
                }
              ],
              k_s: 's2'
            }
          ],
          list: [
            // 样式1的
            {
              id: 1,
              price: price,
              s1: '1',
              s2: '0',
              stock_num: 50
            },
            {
              id: 1,
              price: price,
              s1: '1',
              s2: '1',
              stock_num: 60
            },
            {
              id: 1,
              price: price,
              s1: '1',
              s2: '2',
              stock_num: 70
            },
            {
              id: 1,
              price: oldPrice,
              s1: '1',
              s2: '3',
              stock_num: 80
            }
          ],
          stock_num: 260 // 商品总库存
        }
      } else {
        this.sku = {
          tree: [
            {
              k: '样式分类', // skuKeyName：规格类目名称
              v: [
                {
                  id: '1',
                  name: '样式1',
                  imgUrl: this.topImages[0],
                  previewImgUrl: this.topImages[0]
                },
                {
                  id: '2',
                  name: '样式2',
                  imgUrl: this.topImages[1],
                  previewImgUrl: this.topImages[1]
                }
              ],
              k_s: 's1'
            },
            {
              k: '尺码', // skuKeyName：规格类目名称
              v: [
                {
                  id: '0',
                  name: 'S'
                },
                {
                  id: '1',
                  name: 'M'
                },
                {
                  id: '2',
                  name: 'L'
                },
                {
                  id: '3',
                  name: 'XL'
                },
                {
                  id: '4',
                  name: '2XL'
                }
              ],
              k_s: 's2'
            }
          ],
          list: [
            // 样式1的
            {
              id: 1,
              price: price,
              s1: '1',
              s2: '0',
              stock_num: 50
            },
            {
              id: 1,
              price: price,
              s1: '1',
              s2: '1',
              stock_num: 60
            },
            {
              id: 1,
              price: price,
              s1: '1',
              s2: '2',
              stock_num: 70
            },
            {
              id: 1,
              price: oldPrice,
              s1: '1',
              s2: '3',
              stock_num: 80
            },
            // 样式2的
            {
              id: 2,
              price: oldPrice,
              s1: '2',
              s2: '1',
              stock_num: 70
            },
            {
              id: 2,
              price: price,
              s1: '2',
              s2: '2',
              stock_num: 80
            },
            {
              id: 2,
              price: oldPrice,
              s1: '2',
              s2: '3',
              stock_num: 60
            }
          ],
          stock_num: 470 // 商品总库存
        }
      }
      this.sku.price =
        this.goods.oldPrice === undefined
          ? `${this.goods.lowNowPrice}`
          : `${this.goods.lowNowPrice} - ${this.goods.oldPrice.slice(1)}` // 默认价格（单位元）
      this.sku.hide_stock = false // 是否隐藏剩余库存
    },
    // 选择完购买商品属性后点击确定
    handleAddCart(skuData) {
      // 1. 获取购物车所需信息
      const product = {}
      product.id = this.Id
      product.img = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.lowNowPrice
      product.count = skuData.selectedNum
      // 如果没有 oldPrice 这个属性
      if (this.goods.oldPrice === undefined) {
        product.oldPrice = null
      } else {
        product.oldPrice = this.goods.oldPrice.slice(1)
      }
      // 2. 将商品添加到购物车里
      this.addCart(product).then(res => {
        this.$toast.success('成功')
      })
    },
    handleRefresh() {
      const timer = setTimeout(() => {
        this.$refs.list.refreshing = false
        clearTimeout(timer)
      }, 1000)
    },
    handleLoadMore() {
      this.$refs.list.loading = false
      this.$refs.list.finished = true
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>
<style lang="less" scoped>
#detail {
  position: relative;
  background-color: #fff;

  .content {
    margin-top: 44px;
    height: calc(100vh - 93px);
  }
}
</style>
