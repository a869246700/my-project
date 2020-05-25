import BackTop from 'components/content/backtop/BackTop'
import {
  smoothScroll
} from './utils'
import Mock from 'components/content/mock/Mock'

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      const timer = null
      smoothScroll(timer)
    },
    // 滚动高度， 指定显示高度
    showBackTop(position, Y) {
      this.isShowBackTop = position > Y
    },
    clickBackTop() {
      this.$refs.scroll.scrollTo(0)
    }
  },
  components: {
    BackTop
  }
}

export const MockMixin = {
  components: {
    Mock
  }
}
