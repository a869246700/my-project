<template>
  <div id="category">
    <!-- 导航栏 -->
    <nav-bar>
      <template #center>
         <span class="title">商品分类</span>
      </template>
    </nav-bar>
    <div class="wrapper ignore">
      <!-- 侧边栏 -->
      <side-bar :categroyList="categroyList" @handleSideBarClick="handleSideBarClick" />

      <!-- 主体区 -->
      <side-bar-content
        :tabControls="tabControls"
        :goodsList="goodsList"
        @handleTabClick="tabClick"
        :cateList="cateList"
      />
    </div>

    <!-- mock -->
    <mock ref="mock" />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import SideBar from './childComps/SideBar'
import SideBarContent from './childComps/SideBarContent'
import { MockMixin } from 'common/mixin'
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from 'network/category'

const POP = 'pop'
const SELL = 'sell'
const NEW = 'new'

export default {
  name: 'Category',
  mixins: [MockMixin],
  components: {
    NavBar,
    SideBar,
    SideBarContent
  },
  data() {
    return {
      // 分类列表
      categroyList: [],
      // 导航条列表
      tabControls: [
        { title: '推荐', name: 'pop' },
        { title: '精选', name: 'sell' },
        { title: '最新', name: 'new' }
      ],
      // 每一个分类里的数据
      categoryData: {},
      currentType: 'pop',
      currentIndex: -1
    }
  },
  created() {
    this.getCategoryList()
  },
  methods: {
    // 获取分类列表
    async getCategoryList() {
      // 1.获取分类数据
      const { data: res } = await getCategory()

      if (!res.success) {
        return this.$toast.fail('获取分类列表失败！')
      }

      this.categroyList = res.data.category.list

      // 2.初始化每个类别的子数据
      for (let i = 0; i < this.categroyList.length; i++) {
        this.categoryData[i] = {
          subcategories: {},
          categoryDetail: {
            pop: [],
            new: [],
            sell: []
          }
        }
      }

      // 3.请求第一个分类的数据
      this._getSubcategory(0)
    },
    // 获得分类的 key
    async _getSubcategory(index) {
      this.currentIndex = index
      // 根据 maitKey 获取 数据
      const mailKey = this.categroyList[index].maitKey
      const { data: res } = await getSubcategory(mailKey)
      if (!res.success) {
        return this.$toast.fail('获取类型数据失败！')
      }

      this.categoryData[index].subcategories = res.data
      this.categoryData = { ...this.categoryData }

      this._getCategoryDetail(POP)
      this._getCategoryDetail(SELL)
      this._getCategoryDetail(NEW)
    },
    // 获取分类中不同 tab 的数据
    async _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categroyList[this.currentIndex].miniWallkey

      // 2.发送请求,传入miniWallkey和type
      const { data: res } = await getCategoryDetail(miniWallkey, type)
      if (res.length === 0) {
        return this.$toast.fail('获取分类数据失败!')
      }

      // 3. 数据存储
      this.categoryData[this.currentIndex].categoryDetail[type] = res
      this.categoryData = { ...this.categoryData }

      // 4. 隐藏mock
      this.$refs.mock.isMockShow = false
    },
    // 导航栏切换
    tabClick(name) {
      this.currentType = name
    },
    // 侧边栏点击
    handleSideBarClick(index) {
      // 隐藏 mock
      this.$refs.mock.isMockShow = true
      this._getSubcategory(index)
    }
  },
  computed: {
    goodsList() {
      if (this.currentIndex === -1 || this.categoryData[this.currentIndex].categoryDetail[this.currentType].length === 0) return {}
      return this.categoryData[this.currentIndex].categoryDetail
    },
    cateList() {
      if (this.currentIndex === -1 || this.categoryData[this.currentIndex].categoryDetail[this.currentType].length === 0) return {}
      return this.categoryData[this.currentIndex].subcategories
    }
  }
}
</script>

<style lang="less" scoped>
#category {
  height: 100vh;
  overflow: hidden;

  .title {
    font-size: 19px;
    color: #fff;
  }

  .wrapper {
    margin-top: 49px;
    display: flex;
  }
}
</style>
