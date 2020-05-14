<template>
  <van-sku
    v-if="show"
    v-model="show"
    :sku="sku"
    :goods="goods"
    :goods-id="goodsId"
    :quota="0"
    :quota-used="0"
    :hide-stock="sku.hide_stock"
    @buy-clicked="onAddCartClicked"
    :show-add-cart-btn="false"
    buy-text="确定"
    class="add-cart"
  />
</template>

<script>
export default {
  name: 'DetailAddCate',
  props: {
    sku: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      show: false,
      goodsId: 1,
      goods: {
        picture: ''
      }
    }
  },
  methods: {
    // 点击加入购物车
    onAddCartClicked(skuData) {
      this.show = false
      this.$emit('addCart', skuData)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
