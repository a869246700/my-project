<template>
  <div id="cart">
    <!-- 顶部栏 -->
    <nav-bar>
      <span class="title">购物车{{'(' + length + ')'}}</span>
    </nav-bar>

    <!-- 购物车列表 -->
    <cart-list class="cart-list" />

    <!-- 底部状态栏 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters({
      length: 'cartLength'
    })
  }
}
</script>

<style lang="less" scoped>
#cart {
  .title {
    font-size: 19px;
    color: #fff;
  }

  .cart-list {
    margin-top: 49px;
  }
}
</style>
