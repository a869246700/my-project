<template>
  <div>
    <van-overlay z-index="99999" :show="isMockShow">
      <div class="wrapper" @click.stop>
        <van-loading size="24px" vertical>{{content}}</van-loading>
      </div>
    </van-overlay>
  </div>
</template>
<script>
export default {
  name: 'Detail',
  props: {
    content: {
      type: String,
      default: '加载中...'
    }
  },
  data() {
    return {
      isMockShow: true
    }
  }
}
</script>
<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>
