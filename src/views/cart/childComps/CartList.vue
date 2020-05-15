<template>
  <div class="cart-list">
    <!-- 商品列表 -->
    <cart-list-item v-for="(item, index) in cartList" :key="index" :product="item" />
  </div>
</template>

<script>
import CartListItem from './CartListItem'
import { mapGetters } from 'vuex'

export default {
  name: 'CartList',
  components: { CartListItem },
  computed: {
    ...mapGetters({
      cartList: 'cartList'
    })
  }
}
</script>

<style lang="less" scoped>
.cart-list {
  margin-bottom: 100px;
  height: calc(100vh - 149px);
  overflow: auto;
}
</style>
