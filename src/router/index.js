import Vue from 'vue'
import VueRouter from 'vue-router'
import Navigation from '../components/navigation.vue'
import Information from '../views/Information.vue'
import Opinion from '../views/opinion.vue'
import Order from '../views/Order.vue'

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
        // 资讯管理页接口
        path: '/information',
        name: 'Information',
        component: Information
      },
      {
        // 订单管理页接口
        path: '/order',
        name: 'Order',
        component: Order
      },{
        // 意见反馈页接口
        path: '/opinion',
        name: 'Opinion',
        component: Opinion
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
