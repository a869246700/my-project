<template>
  <van-sidebar v-model="activeKey" class="sidebar" @change="handleCategoryChange" ref="sidebar">
    <van-sidebar-item :title="item.title" v-for="(item, index) in categroyList" :key="index" />
  </van-sidebar>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {
      // 标记点中的分类
      activeKey: 0
    }
  },
  props: {
    categroyList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    // 监听侧边栏点击的index变化
    handleCategoryChange(index) {
      this.$emit('handleSideBarClick', index)
      this.$refs.sidebar.$el.scrollTop = this.$refs.sidebar.$children[index].$el.offsetTop - 49
    }
  }
}
</script>

<style lang="less" scoped>
.sidebar {
  width: 80px;
  height: calc(100vh - 99px);
  overflow: auto;
}

.sidebar::-webkit-scrollbar {
  display: none;
}
</style>
