<template>
  <van-tabs v-model="activeIndex" border @click="handleTabClick">
    <van-tab :title="item.title" v-for="(item, index) in tabs" :key="index" :name="item.name"></van-tab>
  </van-tabs>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    tabs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      // 当前的选中 tab 名称
      activeIndex: 0
    }
  },
  methods: {
    handleTabClick(name) {
      this.$emit('tabClick', name)
    }
  }
}
</script>

<style scoped>
</style>
