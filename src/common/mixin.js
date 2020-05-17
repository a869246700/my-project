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
    showBackTop(position, Y) {
      this.isShowBackTop = position > Y
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
