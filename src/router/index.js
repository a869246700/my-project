import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')
const Login = () => import('views/login/Login')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: Login },
  { path: '/home', component: Home },
  { path: '/category', component: Category },
  { path: '/cart', component: Cart },
  { path: '/profile', component: Profile },
  { path: '/detail', component: Detail }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// router.beforeEach((to, from, next) => {
//   // 如果访问登录界面则直接返回
//   if (to.path === '/login') return next()
//   // 如果访问其他页面需要登录获取的token后才能进行
//   const token = window.sessionStorage.getItem('token')
//   // 如果没有获取到token，则跳转至登录界面登录
//   if (!token) return next('/login')
//   // 存在 token 则放行
//   next()
// })

export default router
