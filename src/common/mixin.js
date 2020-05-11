import BackTop from 'components/content/backtop/BackTop'
import {
  animate
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
      animate(window, 0)
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
