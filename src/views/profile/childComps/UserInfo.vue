<template>
  <div id="user-info">
    <div class="left">
      <slot name="user-picture">
        <img
          :src="userAvatar"
          class="user-picture"
        />
      </slot>
      <div class="user-login">
        <div class="user-nickname">
          <slot name="user-nickname">
            <div>{{userInfo.username}}</div>
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
import { mapState } from 'vuex'

export default {
  name: 'UserInfo',
  data() {
    return {
      defaultAvatar: require('assets/img/common/profile.png')
    }
  },
  computed: {
    ...mapState(['userInfo']),
    userAvatar() {
      return this.userInfo.avatar || this.defaultAvatar
    }
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
      border-radius: 50%;
      background: var(--color-tint);
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
