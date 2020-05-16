import Vue from 'vue'
import {
  Button,
  Cell,
  Col,
  Row,
  NavBar,
  Icon,
  Search,
  Tabbar,
  TabbarItem,
  List,
  Sticky,
  Tabs,
  Tab,
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  Toast,
  PullRefresh,
  Sidebar,
  SidebarItem,
  Overlay,
  Loading,
  GoodsAction,
  GoodsActionButton,
  GoodsActionIcon,
  Sku,
  Form,
  Field,
  Card,
  SubmitBar,
  Checkbox,
  Dialog,
  Lazyload,
  Image as VanImage
} from 'vant'

Vue.use(Button)
Vue.use(Cell)
Vue.use(Col)
Vue.use(Row)
Vue.use(NavBar)
Vue.use(Icon)
Vue.use(Search)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(List)
Vue.use(Sticky)
Vue.use(Tabs)
Vue.use(Tab)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(PullRefresh)
Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(SidebarItem)
Vue.use(Overlay)
Vue.use(Loading)
Vue.use(GoodsAction)
Vue.use(GoodsActionButton)
Vue.use(GoodsActionIcon)
Vue.use(Sku)
Vue.use(Form)
Vue.use(Field)
Vue.use(VanImage)
Vue.use(Card)
Vue.use(SubmitBar)
Vue.use(Checkbox)
Vue.use(Lazyload, {
  loading: require('assets/img/common/placeholder.jpg')
})

Toast.setDefaultOptions({
  duration: 1000
})
Toast.setDefaultOptions('loading', {
  forbidClick: true
})
Vue.prototype.Toast = Toast

Vue.prototype.Dialog = Dialog
