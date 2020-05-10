<template>
  <div>
    <van-grid :column-num="2" :gutter="5">
      <van-grid-item v-for="(item, index) in goodsList" :key="index" class="item">
        <template>
          <div class="aaa">
            <img v-lazy="item.show.img" />
            <div class="item-info">
              <p>{{item.title}}</p>
              <span class="price">{{'￥' + item.price}}</span>
              <span class="collect">{{item.cfav}}</span>
            </div>
          </div>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'Goods',
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
  text-align: center;
  overflow: hidden;
  font-size: 12px;
}

.item .item-info p {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 10px;
}

.item img {
  width: 100%;
  margin-bottom: 10px;
  border-radius: 5px;
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
