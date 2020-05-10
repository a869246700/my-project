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

<style scoped>
.back-top {
  position: fixed;
  right: 18px;
  bottom: 55px;
  width: 36px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background: #f6f6f6;
  border-radius: 50%;
}

.back-top span {
  font-size: 32px;
  color: #ff5557;
}
</style>
