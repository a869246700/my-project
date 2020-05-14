<template>
  <div class="cart-list-item">
    <span class="item-selector">
      <van-icon name="passed" @click="handleCheckClick" :color="product.checked ? '#ff5777' : ''" />
    </span>
    <van-card
      :num="product.count"
      :price="product.price"
      :desc="product.desc"
      :title="product.title"
      :thumb="product.img"
      :origin-price="product.oldPrice"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CartListItem',
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    ...mapActions(['changeCheck']),
    handleCheckClick() {
      this.changeCheck(this.product)
    }
  }
}
</script>

<style lang="less" scoped>
.cart-list-item {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  border-bottom: 1px solid #ccc;

  .item-selector {
    display: inline-block;
    flex: 15%;
    text-align: center;
    font-size: 20px;
  }

  .van-card {
    flex: 85%;
    overflow: hidden;
    margin-top: 0px;
    padding-left: 0 !important;
  }
}
</style>
