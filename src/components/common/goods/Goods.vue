<template>
  <div>
    <van-grid :column-num="2" :gutter="5">
      <goods-item v-for="(item, index) in goodsList" :key="index" :goodsItem="item">
      </goods-item>
    </van-grid>
  </div>
</template>

<script>
import GoodsItem from './GoodsItem'
export default {
  name: 'Goods',
  components: {
    GoodsItem
  },
  props: {
    goodsList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.item {
  position: relative;
  text-align: center;
  overflow: hidden;
  font-size: 12px;
}

.item img {
  width: 100%;
  margin-bottom: 10px;
  border-radius: 5px;
}

.item-info p {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 10px;
}

.price {
  color: #ff5777;
  margin-right: 20px;
}

.collect {
  position: relative;
}

.collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
}
</style>
