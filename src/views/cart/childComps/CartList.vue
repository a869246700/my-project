<template>
  <div class="cart-list">
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
      setTimeout(() => {
        this.isLoading = false
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
.cart-list {
  margin-top: 49px;
  margin-bottom: 100px;
  height: calc(100vh - 50px - 49px - 50px);
  overflow: auto;
}
</style>
