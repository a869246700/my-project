<template>
  <div>
    <van-grid :column-num="2" :gutter="5">
      <van-grid-item v-for="(item, index) in goodsList" :key="index" @click="handleItemClick(item)">
        <template>
          <div class="item">
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
  },
  methods: {
    handleItemClick(item) {
      this.Toast.success({
        message: '获取商品信息成功',
        overlay: true,
        forbidClick: true
      })
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

<<<<<<< HEAD
.item-info p {
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
=======
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
>>>>>>> category
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
