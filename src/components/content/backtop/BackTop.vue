<template>
  <div class="back-top">
    <span class="iconfont icontop"></span>
  </div>
</template>

<script>
export default {
  name: 'BackTop'
}
</script>

<style lang="less" scoped>
.back-top {
  position: fixed;
  right: 18px;
  bottom: 65px;
  width: 36px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background: #f6f6f6;
  border-radius: 50%;

  span {
    font-size: 32px;
    color: var(--color-tint);
  }
}
</style>
