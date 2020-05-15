<template>
  <van-checkbox v-model="isChecked" :disabled="isDisabled">全选</van-checkbox>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: true
    },
    isDisabled: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style>

</style>
