<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :src="item"
        :key="index"
        @load="imgLoad"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsInfo',
  props: {
    detailInfo: {
      type: Object
    }
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0
    }
  },
  methods: {
    imgLoad() {
      // 判断所有图片加载完了进行一次回调
      if (++this.counter === this.imagesLength) {
        this.$emit('imgLoad')
      }
    }
  },
  watch: {
    detailInfo() {
      this.imagesLength = this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>

<style lang="less" scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
}

.info-desc {
  padding: 0 15px;

  .start,
  .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .start {
    float: left;
  }

  desc {
    padding: 15px 0;
    font-size: 14px;
  }
  .end {
    float: right;
  }

  .start::before,
  .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .end::after {
    right: 0;
  }
}
</style>
