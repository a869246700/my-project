import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import FastClick from 'fastclick'
import 'assets/css/global.css'

Vue.config.productionTip = false

// 图片懒加载
Vue.use(VueLazyload, {
  loading: require('assets/img/common/placeholder.jpg')
})

// 解决移动端300ms延迟
FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
