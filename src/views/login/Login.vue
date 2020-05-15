<template>
  <div id="login">
    <van-image
      round
      width="150"
      height="150"
      src="http://img.qqzhi.com/uploads/2018-12-22/122719846.jpg"
      class="avatar"
      lazy-load
    />
    <!-- 表单验证 -->
    <van-form @submit="onSubmit">
      <!-- 用户名输入框 -->
      <van-field
        v-model.trim="username"
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
            @click="Toast('用户名的长度为 3 - 10 位')"
          />
          <van-icon name="cross" @click="handleUsernameClear" v-show="username.length !== 0" />
        </template>
      </van-field>
      <!-- 密码输入框 -->
      <van-field
        v-model.trim="password"
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
            @click="Toast('密码的长度为 6 - 15 位')"
          />
          <van-icon name="cross" @click="handlePasswordClear" v-show="password.length !== 0" />
        </template>
      </van-field>
      <div class="login-btn">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>

    <!-- mock -->
    <mock ref="mock" content="登录中..." v-if="isShow" />
  </div>
</template>

<script>
import { MockMixin } from 'common/mixin'

export default {
  name: 'Login',
  mixins: [MockMixin],
  data() {
    return {
      // 动态绑定用户名
      username: '',
      // 动态绑定密码
      password: '',
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
      ]
    }
  },
  methods: {
    // 点击登录
    onSubmit(values) {
      // 让登录中的动画显示
      this.isShow = true
      // 模拟后台生成 token
      const token = this.username + '$2020$' + +new Date()
      // 将 token 保存到 sessionStorage
      window.sessionStorage.setItem('token', token)
      // 模拟异步请求登录
      setTimeout(() => {
        this.isShow = false

        // 跳转到主页
        this.$router.push('/home')
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
    }
  },
  deactivated() {
    // 重置表单，避免退出的时候 缓存内容
    this.username = ''
    this.password = ''
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
    margin-bottom: 20px;
  }

  .login-btn {
    margin: 50px 80px;
  }
}
</style>
