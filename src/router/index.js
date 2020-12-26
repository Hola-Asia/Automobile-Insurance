import Vue from 'vue'
import VueRouter from 'vue-router'
import Navigation from '../components/navigation.vue'
import Information from '../views/Information.vue'

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
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
