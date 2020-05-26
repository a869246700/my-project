<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more" @click="HandleClickForMore">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt />
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" v-for="(item, index) in commentInfo.images" :key="index" />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from 'common/utils'
export default {
  name: 'DetailCommentInfo',
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    HandleClickForMore() {
      this.$toast('功能还未开发完全')
    }
  },
  filters: {
    showDate(value) {
      const date = new Date(value * 1000)
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style lang="less" scoped>
.comment-info {
  padding: 5px 12px;
  color: #333;
  border-bottom: 5px solid #f2f5f8;
}

.info-header {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  .header-title {
    float: left;
    font-size: 15px;
  }

  .header-more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }

  .arrow-right {
    border-top: 1px solid #999;
    border-left: 1px solid #999;
    width: 9px;
    height: 9px;
    background-color: transparent;
    transform: rotate(135deg);
    display: inline-block;
    margin-left: 0.1rem;
  }
}

.info-user {
  padding: 10px 0 5px;

  img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  span {
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }
}

.info-detail {
  padding: 0 5px 15px;

  p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;

    .date {
      margin-right: 8px;
    }
  }

  .info-imgs {
    margin-top: 10px;

    img {
      width: 70px;
      height: 70px;
      margin-right: 5px;
    }
  }
}
</style>
