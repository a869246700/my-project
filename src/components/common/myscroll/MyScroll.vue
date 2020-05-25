<template>
  <div id="scroll" @scroll="onScroll" ref="scroll">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MyScroll',
  methods: {
    onScroll(e) {
      this.$emit('onScroll', e.target.scrollTop)
    },
    scrollTo(target) {
      this.$refs.scroll.scrollTop = target
    }
  }
}
</script>

<style lang="less" scoped>
#scroll {
  height: 100vh;
  overflow: auto;
}
</style>
