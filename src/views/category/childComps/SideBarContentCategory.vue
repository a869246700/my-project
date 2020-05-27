<template>
  <div class="tab-category">
    <van-row :gutter="5">
      <van-col
        class="item"
        v-for="(item, index) in cateList.list"
        :key="index"
        :span="8"
        @click="$toast(item.title)"
      >
        <a :href="item.link">
          <img class="item-img" :src="item.image" @load="imgLoad" />
          <div class="item-text">{{item.title}}</div>
        </a>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'SideBarContentCategory',
  props: {
    cateList: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      imgCount: 0
    }
  },
  methods: {
    imgLoad() {
      if (++this.imgCount === this.cateList.list.length) {
        // 1. 图片加载完成
        this.$emit('imgLoad')
        // 2. 重置
        this.imgCount = 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tab-category {

  .item {
    text-align: center;
    font-size: 12px;
    padding: 5px;

    .item-img {
      border-radius: 50%;
      width: 80%;
    }

    .item-text {
      margin-top: 15px;
    }
  }
}
</style>
