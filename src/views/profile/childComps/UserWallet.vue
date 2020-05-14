<template>
  <van-row class="account">
    <van-col :span="8" class="account-item">
      <div class="number">
        <span class="balance">29.00</span>元
        <div class="account-info">我的余额</div>
      </div>
    </van-col>
    <van-col :span="8" class="account-item">
      <div class="number">
        <span class="balance">6</span>个
      </div>
      <div class="account-info">我的优惠</div>
    </van-col>
    <van-col :span="8" class="account-item">
      <div class="number">
        <span class="balance">999</span>分
      </div>
      <div class="account-info">我的积分</div>
    </van-col>
  </van-row>
</template>

<script>
export default {
  name: 'UserWallet'
}
</script>

<style lang="less" scoped>
.account {
  display: flex;

  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
    color: #666;
    font-size: 13px;
    padding: 18px;

    .balance {
      font-size: 22px;
      font-weight: 700;
      color: #ff5f3e;
    }

    .account-info {
      margin-top: 6px;
    }
  }
  .account-item:last-of-type {
    margin-right: 0;
  }
}
</style>
