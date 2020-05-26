<template>
  <van-grid-item @click="handleItemClick">
    <div class="item">
      <img v-lazy="showImg" @load="imgLoad"/>
      <div class="item-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">{{'￥' + goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
      </div>
    </div>
  </van-grid-item>
</template>

<script>
export default {
  name: 'GoodsItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    handleItemClick() {
      this.$router.push({
        path: '/detail',
        query: {
          id: this.goodsItem.iid
        }
      })
    },
    // 监听图片加载
    imgLoad() {
      this.$emit('imgLoad')
    }
  },
  computed: {
    showImg() {
      return (
        this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      )
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
