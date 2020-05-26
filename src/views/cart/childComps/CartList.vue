<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 商品列表 -->
      <cart-list-item v-for="(item, index) in cartList" :key="index" :product="item" />
    </van-pull-refresh>
  </div>
</template>

<script>
import CartListItem from './CartListItem'
import { mapGetters } from 'vuex'

export default {
  name: 'CartList',
  components: { CartListItem },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    // 模拟下拉刷新
    onRefresh() {
      const timer = setTimeout(() => {
        this.isLoading = false
        clearTimeout(timer)
      }, 1000)
    }
  },
  computed: {
    ...mapGetters({
      cartList: 'cartList'
    })
  }
}
</script>

<style lang="less" scoped>
.van-pull-refresh {
  height: calc(100vh - 99px);
}
</style>
