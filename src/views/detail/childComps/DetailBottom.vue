<template>
  <div class="bottom">
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
      <van-goods-action-icon icon="shop-o" text="店铺" color="#ff5000" />
      <van-goods-action-icon
        icon="star"
        :text="starStyle.text"
        :color="starStyle.color"
        @click="handleClickStar"
      />
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      starStyle: {
        text: '收藏',
        color: '#aaa',
        isStar: false
      }
    }
  },
  methods: {
    // 点击收藏和取消收藏
    handleClickStar() {
      // 未收藏
      if (!this.starStyle.isStar) {
        this.starStyle.text = '已收藏'
        this.starStyle.color = '#ff5000'
        this.Toast.success({
          message: '已收藏',
          icon: 'star-o'
        })
      } else {
        this.starStyle.text = '收藏'
        this.starStyle.color = '#aaa'
        this.Toast('已取消收藏')
      }
      this.starStyle.isStar = !this.starStyle.isStar
    }
  }
}
</script>

<style lang="less" scoped>
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 49px;
  z-index: 99999;
}
</style>
