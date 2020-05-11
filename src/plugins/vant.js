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
  Lazyload,
  Grid,
  GridItem,
  Toast,
  PullRefresh
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
Vue.use(Lazyload, {
  loading: require('assets/img/common/placeholder.jpg')
})
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(PullRefresh)

Vue.prototype.Toast = Toast
