<template>
  <van-checkbox v-model="ischecked">全选</van-checkbox>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    ischecked: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style>

</style>
