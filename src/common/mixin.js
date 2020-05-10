import BackTop from 'components/content/backtop/BackTop'
import {
  animate
} from './utils'

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
