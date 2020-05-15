import BackTop from 'components/content/backtop/BackTop'
import Mock from 'components/content/mock/Mock'
import {
  debounce
} from 'common/utils'
import {
  POP,
  NEW,
  SELL
} from './const'

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
    showBackTop(position, Y) {
      this.isShowBackTop = (-position.y) > Y
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

export const goodsItemImageListenerMixin = {
  provide() {
    return {
      refresh: this.refresh
    }
  },
  methods: {
    refresh() {
      this.$refs.scroll.refresh()
    }
  },
  mounted() {
    // this.refresh = () => debounce(this.$refs.scroll.refresh, 200)
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
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
    }
  }
}
