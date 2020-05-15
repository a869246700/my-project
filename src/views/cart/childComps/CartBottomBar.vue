<template>
  <div>
    <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit">
      <check-button :is-checked="isSelectAll" @click.native="handleCheckAll" :is-disabled="this.cartList.length === 0" />
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
  data() {
    return {
    }
  },
  methods: {
    ...mapActions(['changeAllCheck']),
    onSubmit() {
      setTimeout(() => {
        // 清理购物车
      }, 800)
      this.Toast.success('提交订单成功')
    },
    handleCheckAll() {
      if (this.cartList.length === 0) {
        return this.Toast('购物车当前为空')
      }
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
    ...mapGetters(['cartList']),
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
  background: #f0f0f0;
}
</style>
