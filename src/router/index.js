import Vue from 'vue'
import VueRouter from 'vue-router'
import Navigation from '../components/navigation.vue'
import Information from '../views/Information.vue'
import Order from '../views/Order.vue'
import Details from '../views/Details.vue'
import About from '../views/About.vue'
import AddAbout from '../views/AddAbout.vue'
import EditAbout from "../views/EditAbout";
import Opinion from '../views/opinion.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {name: 'Order'},
  },
  {
    path: '/navigation',
    name: 'Navigation',
    component: Navigation,
    children: [
      {
        // 资讯页接口
        path: '/information',
        name: 'Information',
        component: Information
      },
      {
        // 订单管理页接口
        path: '/order',
        name: 'Order',
        component: Order
      },
      {
        // 意见反馈页接口
        path: '/opinion',
        name: 'Opinion',
        component: Opinion
      },
      {
        // 订单详情页接口
        path: '/details',
        name: 'Details',
        component: Details
      },
      {
        // 关于我们
        path: '/about',
        name: 'About',
        component: About
      },
      {
        // 关于我们新增
        path: '/addabout',
        name: 'AddAbout',
        component: AddAbout
      },
      {
        // 关于我们编辑
        path: '/editabout',
        name: 'EditAbout',
        component: EditAbout
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
