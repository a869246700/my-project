# my-project

## 一、项目安装

``` powershell
// 项目依赖安装
npm install

// 编译程序和开发
npm run serve

// 编译程序并打包
npm run build

// 绑定和修复文件
npm run lint
```

## 二、整体内容

### 一、项目结构

* 项目依赖：Vue + VueRouter + Vuex + Axios + Vant 
* 采用底部 TabBar 路由导航栏，点击跳转至不同的路由页面，目前页面有 Home、Category、Detail、Cart、Profile、Login 页面
* 请求数据来源于 coderwhy 
* [项目演示地址](http://goo.codergoo.cn)

### 二、 首页-home

首页主要是做渲染轮播图，推荐商品展示、搜索等

* 顶部 NavBar
  + left：自定义Icon
  + center：Search 组件

* 滚动视图 Scroll
  + 轮播图  HomeSwiper
  + 首页推荐内容  HomeRecommend
  + 首页导航栏  TabControl
  + 商品列表  Goods

* 滚动视图 MyScroll
  + 列表视图 List
    - 轮播图  HomeSwiper
    - 首页推荐内容  HomeRecommend
    - 商品列表  HomeGoodsList
      * 首页导航栏 Tabs
      * 商品展示 Goods

* TabControl 的粘性布局实现
  1. 第一种方法：直接使用 vant 组件自带的 van-sticky 组件设置 offset-top 属性即可实现粘性布局。

  2. 第二种方法：在首页定义两个 TabControl 组件，

     1. 第一个 TabControl 组件使用固定定位，定位在 NavBar 的正下方**绑定一个ref**，使用 v-if 条件判定将其隐藏。
     2. 第二个 TabControl 组件直接放在滚动视图里**绑定一个ref**。
     3. 在主页的Dom对象挂载完后，在生命函数 Mounted中 ，计算得到第二个 TabControl 组件的离顶高度。
     4. 通过 Scroll 滚动视图的 Scroll滚动事件，当滚动高度大于第二个 TabControl 组件的离顶高度时，将 第一个 TabControl 组件显示出来，滚动高度小于第二个 TabControl 组件的离顶高度，则隐藏。
     5. 因为使用了两个 TabControl 组件，不同的 TabControl 组件点击后的 active 是不同的，所以我们要在 handleTabControlClick 方法里，实现两个 TabControl 组件的 active 一致。

  3.  第三种方法：通过监听页面滚动事件，获取页面滚动的高度和TabControl的固定高度（注意：TabControl的固定高度的获取时机）。当页面滚动的高度和大于等于TabControl的固定高度后，为其添加样式为固定定位即可实现。

* 使用混入 Mixin
  + 返回顶部  BackTop：该组件是用于显示返回顶部按钮的，当页面的高度超过某个高度，我们就可以让该组件在页面上的右下角显示，点击则可以返回页面的顶部

  + 加载组件  Mock：进入页面时数据加载时显示，在获取到请求数据后隐藏

  
  

### 三、分类-Category

本页面主要实现的是，根据不同的分类名称获取不同的数据，再根据分类中类型的不同再划分数据。

* 顶部 NavBar
  + left：自定义Icon
  + center：文本 "商品分类"

* 中间 wrapper
  + 侧边栏  SiderBar
  + 主体视图  SiderBarContent
    - 滚动视图  Scroll
      * 列表视图  List
        - 导航栏  Tabs
        - 商品展示  Goods 

* 使用混入 Mixin
  + 加载组件  Mock：进入页面时加载时显示，在获取到请求数据后隐藏

 + 需要实现两个组件滚动时相互不影响，且不影响整个页面的滚动

    

``` css
        #category {
            height: 100vh;
            overflow: hidden;
            超出则隐藏
        }
```

  + 将 SideBar 和 SideBarContent 的高度设置为 100vh - NavBar - TabBar 的高度

    

``` css
        .side-bar {
            height: calc(100vh - 50px - 49px);
            overflow: auto;
            超出则滚动
        }

        .sideBar-content {
            height: calc(100vh - 50px - 49px);
            overflow: auto;
            超出则滚动
        }
```

### 四、购物车-Cart

本页面主要是显示：用户将商品选择加入购物车后，购物车商品列表的展示

* 前提：用户需要登录

* 顶部 NavBar
  + left：自定义Icon
  + center：文本 "购物车(当前加入购物车的内容)"

* 购物车列表 CartList

* 底部菜单选项 CartBottomBar
  + 全选按钮：1. 列表为空时，默认该按钮 disabled
  + 选中商品的价格显示
  + 购买按钮：1. 列表为空时点击，会提示     2. 没有选中商品点击时，会提示

### 五、个人中心

本界面主要是显示用户个人信息，例如钱包中心、一些服务中心等等

* 顶部 ProfileNavBar
  + left：自定义Icon
  + center：文本 "个人中心"
  + right： 登入注销

* 用户信息栏 UserInfo

* 展示用户头像、用户账号名、用户的手机号等等 

* 用户钱包栏 UserWallet
  + 包含钱包余额、优惠券、积分等

* 服务中心栏 ListView
  + 展示各种专属用用户的服务内容
    - 我的收藏
    - 我的客服
    - 我的会员
    - ...

### 六、登录-Login

该页面主要用于用户登录，由于该页面结构比较简单，没有拆分成组件

* 用户头像（头像图书数据只是模拟）

* 登录表单 
  + username：3 - 10 位字符
  + password：6 - 15 位字符，密码部分使用明密文切换效果，点击眼睛 Icon 切换明密文格式
  + 登录按钮

* 返回上一级按钮

* 点击返回之前的页面

* 使用混入 Mixin
  + 加载组件  Mock：登陆时显示，在获取到登陆请求数据后隐藏

  

### 七、商品详情页面-Detail

该页面主要用与商品的详情显示

* 顶部自定义导航栏 DetailNavBar
  + left：返回上一级按钮
  + center：独立的 TabControl 导航组件
    - 用于用户点击跳转至页面对应的位置
  + 当页面滚动到指定的位置时，tabcontrol 当前的选中会不同

* 滚动视图 Scroll
  + 商品轮播图 DetailSwiper
  + 商品基本信息 DetaiBaseInfo
  + 商家信息 DetailShopInfo
  + 用户评论 DetailCommentInfo
  + 商品参数 DetailParamInfo
  + 商品详细信息，图片等 DetailGoodsInfo
  + 推荐商品 DetailRecommendInfo

* 底部栏 DetailBottom
  + 客服
  + 店铺
  + 收藏
  + 加入购物车：点击，没有登录会跳转至登录界面
  + 立即购买：点击，没有登录会跳转至登录界面

* 加入购物车页面 DetailAddCart
  + 使用的是 vantUI 封装的 sku 组件
  + 先设置隐藏，当点击加入购物车或者立即购买时显示

  

* 使用混入 Mixin
  + 返回顶部  BackTop：该组件是用于显示返回顶部按钮的，当页面的高度超过某个高度，我们就可以让该组件在页面上的右下角显示，点击则可以返回页面的顶部
  + 加载组件  Mock：进入页面时加载时显示，在获取到请求数据后隐藏

### 八、底部 TabBar 导航栏

* 点击切换至不同的页面
* 在购物车栏，采用了 badge 红色标记，来记录购物车中存在多少中商品

## 三、 项目优化

### 1. 项目打包阶段移除所有 console

使用 babel-plugin-transform-remove-console

1. 安装 babel-plugin-transform-remove-console

   

``` shell
   npm install babel-plugin-transform-remove-console --save-dev
   ```

   

2. 在项目中的 babel.config.js 文化中中配置 transform-remove-console, 但是在 babel.config.js 中配置，不仅在运行时生效，也在开发时生效

   

``` javascript
   module.exports = {
       presets: [
           '@vue/cli-plugin-babel/preset'
       ],
       plugins: [
           [
               'import',
               {
                   libraryName: 'vant',
                   libraryDirectory: 'es',
                   style: true
               },
               'vant'
           ],
           'transform-remove-console'
       ]
   }
```

   

* 注意事项：配置完后，需要在重新 serve 项目后，再使用 build 打包项目

3. 我们要对其进行优化，判断运行时的 mode 的值，判断是开发还是运行阶段

   

``` javascript
   // 这里是项目发布阶段需要用到的 babel 插件
   const prodPlugins = []

   if (process.env.NODE_ENV === 'production') {
       prodPlugins.push('transform-remove-console')
   }

   module.exports = {
       presets: [
           '@vue/cli-plugin-babel/preset'
       ],
       plugins: [
           [
               'import',
               {
                   libraryName: 'vant',
                   libraryDirectory: 'es',
                   style: true
               },
               'vant'
           ],
           // 发布产品时候的插件数组
           ...prodPlugins
       ]
   }
```

### 2. 为开发模式与发布模式指定不同的打包入口

* 开发模式的入口文件为：src/main-dev.js

* 发布模式的入口文件为：src/main.prod.js

  

通过在 vue.config.js 文件中，配置 chainWebpack 或者 configureWebpack 来规定，打包的入口文件

``` javascript
module.exports = {
    chainWebpack: config => {
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main-prod.js')
        })
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main-dev.js')
        })
    },
    configureWebpack: {
        resolve: {
            alias: {
                assets: '@/assets',
                components: '@/components',
                views: '@/views',
                network: '@/network',
                common: '@/common'
            }
        }
    },
    publicPath: './',
    devServer: {
        open: true,
        port: 8080
    }
}
```

### 3. 使用 externals 加载外部 CDN 资源

* 默认情况下，通过 import 语法导入的第三方依赖包，最终会被打包合并到同一个文件中，从而导致打包成功后，单文件体积过大的问题

* 为了解决该问题，可以通过 webpack 的 externals 节点，来配置并加载外部的 CDN资源， 凡是生命在 externals 的第三方依赖包，都不会被打包

* 通过 externals 加载外部 CDN 资源

  1. 在 vue.config.js 配置文件中配置

    

``` javascript
config.set('externals', {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    axios: 'axios',
    vuex: 'Vuex',
    'vue-lazyload': 'VueLazyload'
})
```

  

``` javascript
module.exports = {
    chainWebpack: config => {
        // 发布模式
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main-prod.js')

            config.set('externals', {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                axios: 'axios',
                vuex: 'Vuex',
                'vue-lazyload': 'VueLazyload'
            })
        })

        // 开发模式
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main-dev.js')
        })
    },
    configureWebpack: {
        resolve: {
            alias: {
                assets: '@/assets',
                components: '@/components',
                views: '@/views',
                network: '@/network',
                common: '@/common'
            }
        }
    },
    publicPath: './',
    devServer: {
        open: true,
        port: 8080
    }
}
```

 

  2. 同时，需要在 public/index.html 文件的头部，添加如下的CDN资源引用

``` javascript
      config.set('externals', {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          axios: 'axios',
          vuex: 'Vuex',
          'vue-lazyload': 'VueLazyload'
      })
```

``` html
     <!DOCTYPE html>
     <html lang="en">

     <head>
         <meta charset="utf-8">
         <meta http-equiv="X-UA-Compatible" content="IE=edge">
         <meta name="viewport" content="width=device-width,initial-scale=1.0">
         <link rel="icon" href="<%= BASE_URL %>favicon.ico">
         <title><%= htmlWebpackPlugin.options.title %></title>
         <!-- js文件 -->
         <script src="https://cdn.staticfile.org/vue/2.6.11/vue.min.js"></script>
         <script src="https://cdn.jsdelivr.net/npm/vue-router@3.1.6/dist/vue-router.min.js"></script>
         <script src="https://cdn.jsdelivr.net/npm/vuex@3.3.0/dist/vuex.min.js"></script>
         <script src="https://cdn.staticfile.org/axios/0.19.2/axios.min.js"></script>
         <script src="https://cdn.jsdelivr.net/npm/vue-lazyload@1.3.3/vue-lazyload.min.js"></script>
     </head>

     <body>
         <noscript>
             <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled.
                 Please enable it to continue.</strong>
         </noscript>
         <div id="app"></div>
         <!-- built files will be auto injected -->
     </body>

     </html>
```

     

### 4. 外部 cdn 载入 vantUI

1. 在 src/main-prod.js 文件中，将 import './plugins/vant.js' 移除

2. 在 index.html 页面中加入

   

``` html
   <!-- 引入样式文件 -->
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vant@2.8/lib/index.css" />

   <!-- 引入 Vant 的 JS 文件 -->
   <script src="https://cdn.jsdelivr.net/npm/vant@2.8/lib/vant.min.js"></script>
```

### 5. 自定制首页的内容

不同的打包环境下，首页内容可能会有所不同，我们可以通过插件的方式进行定制

* 通过在 vue.config.js 文件中的发布模式情况下，配置一个 isProd 属性，用于首页定制，来判断是否加载js和css文件

  

``` javascript
  config.plugin('html').tap(args => {
      args[0].isProd = true
      return args
  })
```

* 在 index.html 页面使用 isProd 判断是否加载外部引入的文件 和 自定制标题名

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.isProd ? '' : 'dev - '  %>G商城</title>

    <% if(htmlWebpackPlugin.options.isProd) { %>
    <!-- js文件 -->
    <script src="https://cdn.staticfile.org/vue/2.6.11/vue.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-router@3.1.6/dist/vue-router.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vuex@3.3.0/dist/vuex.min.js"></script>
    <script src="https://cdn.staticfile.org/axios/0.19.2/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-lazyload@1.3.3/vue-lazyload.min.js"></script>
    <% } %>
</head>

<body>
    <noscript>
        <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled.
            Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
</body>

</html>
```

### 6. 路由懒加载

通过声明对象的写法，使用 () => import() 语法进行路由懒加载

``` javascript
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')
const Login = () => import('views/login/Login')
```

### 7. 图片懒加载

使用 **VueLazyload** 插件，在需要懒加载的图片、背景图等地方，使用 v-lazy 来代替 src。

* 安装插件

  

``` javascript
  // 1. 安装插件
  npm install VueLazyload--save - dev

  // 2. 在 main.js 主文件中引入, 并且挂载
  import Vue from 'vue'
  import VueLazyload from 'vue-lazyload'

  // options 是可选参数，详细配置项请前往官方文档查看
  Vue.use(VueLazyload, options)

      // 3. 使用懒加载
      <
      img v - lazy = "http://www.******.com/123.png" >
```
