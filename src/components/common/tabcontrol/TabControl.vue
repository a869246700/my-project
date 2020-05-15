<template>
  <van-row>
    <van-col
      :span="8"
      :class="{active: index === activeIndex}"
      v-for="(item, index) in tabs"
      :key="index"
      @click="handleTabClick(index)"
    >
      <span>{{item}}</span>
    </van-col>
  </van-row>
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
      activeIndex: 0
    }
  },
  methods: {
    handleTabClick(index) {
      this.activeIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style lang="less" scoped>
.van-row {
  height: 48px;
  line-height: 48px;
  text-align: center;
  background-color: #fff;

  .van-col {
    span {
      padding: 10px;
    }
  }
  .active {
    span {
      border-bottom: 2px solid #ee0a24;
    }
  }
}
</style>
