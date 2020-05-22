<template>
  <div>
    <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit">
      <check-button :is-checked="isSelectAll" :is-disabled="isExist" @click.native="handleCheckAll" />
    </van-submit-bar>
  </div>
</template>

<script>
import CheckButton from './CheckButton'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  methods: {
    ...mapActions(['changeAllCheck', 'removeAllChecked']),
    onSubmit() {
      // 1. 如果没有商品 或者 没有商品被选中，直接返回
      // 1.1 没有商品
      if (this.isExist) return this.Toast.fail('购物车没有商品')
      // 1.2 没有商品选中
      if (this.isExistChecked) return this.Toast.fail('没有选中商品')

      // 2. 移除被选中的商品
      this.removeAllChecked()

      // 3. 提示成功
      this.Toast.success('提交订单成功')
    },
    handleCheckAll() {
      if (this.isExist) return

      if (this.isSelectAll) {
        //   全部选中的情况
        this.changeAllCheck(true)
        this.Toast('商品取消全选')
      } else {
        //   全部未选中 或者 部分未选中
        this.changeAllCheck(false)
        this.Toast('商品全选')
      }
    }
  },
  computed: {
    ...mapGetters(['cartList', 'cartLength', 'isExistChecked']),
    // 判断购物车是否有东西
    isExist() {
      return this.cartLength === 0
    },
    // 总的 被checked 的价格
    totalPrice() {
      return (
        this.cartList
          .filter(item => {
            return item.checked
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count
          }, 0)
          .toFixed(2) * 100
      )
    },
    // 判断是否全选
    isSelectAll() {
      if (this.cartList.length === 0) return false
      return this.cartList.every(item => item.checked)
    }
  }
}
</script>

<style lang="less" scoped>
.van-submit-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  background: #f6f6f6;
}
</style>
