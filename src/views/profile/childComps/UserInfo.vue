<template>
  <div id="user-info">
    <div class="left">
      <slot name="user-picture">
        <van-image
          src="http://img.qqzhi.com/uploads/2018-12-22/122719846.jpg"
          class="user-picture"
          round
          lazy-load
        />
      </slot>
      <div class="user-login">
        <div class="user-nickname">
          <slot name="user-nickname">
            <div>{{userNickName}}</div>
          </slot>
        </div>
        <div class="user-phone">
          <img src="~assets/img/common/phone.png" class="phone-icon" />
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
    </div>
    <van-icon name="arrow" class="right" />
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data() {
    return {
      userNickName: ''
    }
  },
  mounted() {
    // 模拟获取用户登录名
    this.userNickName = window.sessionStorage.getItem('token').split('$2020$')[0]
  }
}
</script>

<style lang="less" scoped>
#user-info {
  background-color: var(--color-tint);
  padding: 15px;
  margin-top: 49px;
  display: flex;
  color: #fff;

  .left {
    flex: 1;
    display: flex;

    .user-picture {
      height: 60px;
      width: 60px;
      border-radius: 70px;
      background: #eee;
    }

    .user-login {
      margin: 10px 0 0 10px;

      .user-nickname {
        margin-left: 4px;
        font-size: 20px;
      }

      .user-phone {
        margin-top: 8px;
        font-size: 14px;

        .phone-icon {
          width: 17px;
          height: 17px;
          vertical-align: bottom;
        }
      }
    }
  }

  .right {
    display: block;
    align-self: center;
    width: 18px;
    height: 18px;
  }
}
</style>
