<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
export default {
  name: 'app',
  components: {
    TabBar
  }
}
</script>

<style scoped>
#app {
  background-color: #f6f6f6;
}
</style>
