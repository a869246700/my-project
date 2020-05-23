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

首页主要是做渲染

* 顶部 NavBar

  + left：自定义Icon
  + center：Search 组件

  

* 滚动视图 Scroll

  + 轮播图  HomeSwiper

  + 首页推荐内容  HomeRecommend

  + 首页导航栏  TabControl

  + 商品列表  Goods

    

* TabControl 的粘性布局实现
  1. 直接使用 vant 组件自带的 van-sticky 组件设置 offset-top 属性即可实现粘性布局。
  2. 在首页定义两个 TabControl 组件，

     1. 第一个 TabControl 组件使用固定定位，定位在 NavBar 的正下方**绑定一个ref**，使用 v-if 条件判定将其隐藏。
     
     2. 第二个 TabControl 组件直接放在滚动视图里**绑定一个ref**。
     
     3. 在主页的Dom对象挂载完后，在生命函数 Mounted中 ，计算得到第二个 TabControl 组件的离顶高度。
   
     4. 通过 Scroll 滚动视图的 Scroll滚动事件，当滚动高度大于第二个 TabControl 组件的离顶高度时，将 第一个 TabControl 组件显示出来，滚动高度小于第二个 TabControl 组件的离顶高度，则隐藏。
     
     5. 因为使用了两个 TabControl 组件，不同的 TabControl 组件点击后的 active 是不同的，所以我们要在 handleTabControlClick 方法里，实现两个 TabControl 组件的 active 一致。
     
        
  
* 使用混入 Mixin
  + 返回顶部  BackTop：该组件是用于显示返回顶部按钮的，当页面的高度超过某个高度，我们就可以让该组件在页面上的右下角显示，点击则可以返回页面的顶部
  + 加载组件  Mock：进入页面时加载时显示，在数据请求后
  
  

### 三、分类-Category

本页面主要实现的是，根据不同的分类名称获取不同的数据，再根据分类中类型的不同再划分数据。

* SiderBar 和 SiderBarContent 在页面滚动时会同时滚动

  + 将 Category 界面的高度设置为100vh


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

​    

* 顶部 NavBar

  + left：自定义Icon
  + center：文本 "商品分类"

  

* 侧边栏  SideBar

  

* 主体视图 SideBarContent
  + 分页导航栏  TabControl
  + 商品列表  Goods



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
  
+ 展示用户头像、用户账号名、用户的手机号等等
  
    
  
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
  + 点击返回之前的页面



### 七、商品详情页面-Detail

该页面主要用与商品的详情显示

* 顶部自定义导航栏 DetailNavBar
  + left：返回上一级按钮
  + center：独立的 TabControl 导航组件
    - 用于用户点击跳转至页面不同位置，
    
  - 当页面滚动到指定的位置时，tabcontrol 当前的选中会不同
    
      
  
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
