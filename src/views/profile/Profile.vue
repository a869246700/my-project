<template>
  <div id="profile">
    <!-- 顶部标题 -->
    <profile-nav-bar />

    <!-- 用户信息栏 -->
    <user-info />

    <!-- 余额优惠券积分 -->
    <user-wallet />

    <!-- 更多工作栏 -->
    <list-view :list-data="orderList" class="order-list" />
    <list-view :list-data="serviceList" class="service-list" />
  </div>
</template>

<script>
import ProfileNavBar from './childComps/ProfileNavBar'
import UserInfo from './childComps/UserInfo'
import UserWallet from './childComps/UserWallet'
import ListView from './childComps/ListView'

export default {
  name: 'Profle',
  components: {
    ProfileNavBar,
    UserInfo,
    ListView,
    UserWallet
  },
  data() {
    return {
      orderList: [
        { name: 'chat-o', info: '我的消息' },
        { name: 'like-o', info: '我的收藏' },
        { name: 'service-o', info: '我的客服' },
        { name: 'location-o', info: '我的地址' }
      ],
      serviceList: [
        { name: 'vip-card-o', info: '会员中心' },
        { name: 'friends-o', info: '商务合作' },
        { name: 'gift-o', info: '推荐有礼' },
        { name: 'down', info: '下载购物APP' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
#profile {
  margin-bottom: 50px;

  .order-list,
  .service-list {
    margin-top: 12px;
  }
}
</style>
