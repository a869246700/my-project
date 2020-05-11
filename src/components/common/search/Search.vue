<template>
  <div class="search">
    <van-icon name="search" class="search-icon" />
    <input type="text" v-model.trim="searchContent" @keydown.enter="handleSearch" placeholder="请输入搜素内容" />
    <van-icon name="close" class="close" v-if="searchContent" @click="handleClickClear" />
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      // 搜索内容
      searchContent: ''
    }
  },
  methods: {
    // 点击搜索
    handleSearch() {
      if (!this.searchContent) return
      this.$emit('handleSearch', this.searchContent)
      console.log(this.searchContent)
    },
    // 点击清空搜索框
    handleClickClear() {
      this.searchContent = ''
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  position: relative;
  color: #999;
  font-size: 18px;

  input {
    width: 100%;
    height: 35px;
    border-radius: 30px;
    padding: 0 30px;
    border: 0;
    outline: none;
    box-sizing: border-box;
    font-size: 14px;
  }

  .search-icon,
  .close {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    color: #999;
  }

  .search-icon {
    left: 8px;
    height: 16px;
    line-height: 16px;
    width: 16px;
  }

  .close {
    right: 5px;
    width: 26px;
    height: 26px;
    line-height: 26px;
    font-size: 20px;
  }
}
</style>
