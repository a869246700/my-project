<template>
  <van-nav-bar title="首页" left-text="返回" fixed border :z-index="999">
    <template #left>
      <span class="logo">G</span>
    </template>
    <template #title class="center">
      <div class="search">
        <van-icon name="search" class="search-icon" />
        <input type="text" v-model.trim="searchContent" @keydown.enter="handleSearch" />
        <van-icon name="close" class="close" v-if="searchContent" @click="handleClickClear" />
      </div>
    </template>
    <template #right>
      <van-icon name="user-o" size="24" color="#fff" />
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: 'NavBar',
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
.van-nav-bar {
  background-color: #ff6b81;
  color: #fff;
  height: 49px;

  .logo {
    font-size: 32px;
    font-weight: 700;
  }

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
}
</style>
