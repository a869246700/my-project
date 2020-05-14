<template>
  <div id="list">
    <div v-for="(item, index) in listData" :key="index" class="item">
      <span class="icon">
        <van-icon :name="item.name" />
      </span>
      <div class="info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListView',
  props: {
    listData: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
#list {
  background-color: #fff;
  font-size: 15px;
  color: #333;

  .item {
    height: 44px;
    line-height: 44px;
    position: relative;

    .icon {
      margin-top: 10px;
      position: absolute;
      left: 16px;
      top: -7px;
    }

    .info {
      margin-left: 40px;
      border-bottom: 1px solid rgba(100, 100, 100, 0.1);
      padding-left: 5px;
    }
  }

  .item:last-of-type .info {
    border-bottom: none;
  }
}
</style>
