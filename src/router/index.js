import Vue from 'vue'
import VueRouter from 'vue-router'
import Navigation from '../components/navigation.vue'
import Information from '../views/Information.vue'
import Order from '../views/Order.vue'
import Details from '../views/Details.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {name: 'Navigation'},
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
        // 订单管理页接口
        path: '/details',
        name: 'Details',
        component: Details
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
