<template>
  <div id="login">
    <img v-lazy="avatar" class="avatar" />
    <!-- 表单验证 -->
    <van-form @submit="onSubmit" ref="form">
      <!-- 用户名输入框 -->
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="请输入用户名"
        left-icon="contact"
        :rules="userNameRules"
      >
        <template #right-icon>
          <van-icon
            name="question"
            v-show="username.length === 0"
            @click="$toast('用户名的长度为 3 - 10 位')"
          />
          <van-icon name="cross" @click="handleUsernameClear" v-show="username.length !== 0" />
        </template>
      </van-field>
      <!-- 密码输入框 -->
      <van-field
        v-model="password"
        :type="isPasswordShow ? 'text' : 'password'"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :left-icon="isPasswordShow ? 'eye-o' : 'closed-eye'"
        @click-left-icon="isPasswordShow=!isPasswordShow"
        :rules="passwordRules"
      >
        <template #right-icon>
          <van-icon
            name="question"
            v-show="password.length === 0"
            @click="$toast('密码的长度为 6 - 15 位')"
          />
          <van-icon name="cross" @click="handlePasswordClear" v-show="password.length !== 0" />
        </template>
      </van-field>
      <div class="login-btn">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>

    <div>
      <span class="backTo" @click="handleBackToPrevious">点击返回上一级</span>
    </div>

    <!-- mock -->
    <mock ref="mock" :content="mockContent" v-if="isShow" />
  </div>
</template>

<script>
import { MockMixin } from 'common/mixin'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  mixins: [MockMixin],
  data() {
    return {
      // 动态绑定用户名
      username: '',
      // 动态绑定密码
      password: '',
      // 模拟头像地址
      avatar: 'http://img.qqzhi.com/uploads/2018-12-22/122719846.jpg',
      // 密码是否可见
      isPasswordShow: false,
      // 登录动画显示隐藏
      isShow: false,
      // 用户名校验规则
      userNameRules: [
        { required: true, message: '请填写用户名' },
        { validator: this.userNameValidator, message: '长度在 3 到 10 个字符' }
      ],
      // 密码校验规则
      passwordRules: [
        { required: true, message: '请填写密码' },
        { validator: this.passwordValidator, message: '长度在 6 到 15 个字符' }
      ],
      // mock 的提示信息
      mockContent: '登录中...'
    }
  },
  methods: {
    ...mapActions(['login']),
    // 点击登录
    onSubmit(values) {
      // 1. 让登录中的动画显示
      this.isShow = true
      // 2. 模拟后台生成 token
      const token = this.username + '$2020$' + +new Date()
      // 3. 用户信息保存
      const userInfo = {
        username: this.username,
        password: this.password,
        avatar: this.avatar,
        money: 999,
        discountCouponNum: 5,
        shoppingPoints: 300,
        token: token
      }
      this.login(userInfo)

      // 4. 将 token 保存到 sessionStorage

      window.sessionStorage.setItem('token', token)

      // 5. 模拟异步请求登录
      const timer = setTimeout(() => {
        this.isShow = false

        // 6. 跳转到到之前也页
        this.$router.go(-1)

        clearTimeout(timer)
      }, 1500)
    },
    // 用户名自定义检验方法
    userNameValidator() {
      if (this.username.length < 3 || this.username.length > 10) return false
      return true
    },
    // 密码自定义检验方法
    passwordValidator() {
      if (this.password.length < 6 || this.password.length > 15) return false
      return true
    },
    // 点击清空用户名
    handleUsernameClear() {
      this.username = ''
    },
    // 点击清空密码
    handlePasswordClear() {
      this.password = ''
    },
    // 点击返回上一级
    handleBackToPrevious() {
      // 跳转至上一级
      this.$router.go(-1)
    }
  },
  deactivated() {
    // 重置表单校验信息
    this.$refs.form.resetValidation()
    // 密码设为不可见
    this.isPasswordShow = false
  }
}
</script>

<style lang="less" scoped>
#login {
  position: relative;
  height: 100vh;
  background: #f6f6f6;
  z-index: 999;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .avatar {
    width: 9rem;
    height: 9rem;
    border-radius: 50%;
    margin-bottom: 20px;
  }

  .login-btn {
    margin: 50px 80px;
  }

  .backTo {
    font-size: 12px;
    color: dodgerblue;
  }
}
</style>
