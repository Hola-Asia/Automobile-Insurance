import Vue from 'vue'
import VueRouter from 'vue-router'
import Navigation from '../components/navigation.vue'
import Information from '../views/Information.vue'
import Order from '../views/Order.vue'
import Customer from '../views/Customer'
import ViewDetails from '../views/ViewDetails'
import ViewInfo from '../views/ViewInfo'
import CarInfo from '../views/carInfo'
import TaBankCar from '../views/TaBankCar'
import ViewChit from '../views/ViewChit'
import ViewOrder from '../views/ViewOrder'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: { name: 'Navigation' },
    },
    {
        path: '/navigation',
        name: 'Navigation',
        component: Navigation,
        children: [{
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
                //客户管理
                path: '/customer',
                name: 'Customer',
                component: Customer,
            },
            {
                //查看详情
                path: '/viewDetails/:id',
                name: 'ViewDetails',
                component: ViewDetails,
                children: [{
                    path: '/viewInfo/:id',
                    name: 'ViewInfo',
                    component: ViewInfo,
                }, {
                    path: '/carInfo/:id',
                    name: 'CarInfo',
                    component: CarInfo
                }, {
                    path: '/taBankCar/:id',
                    name: 'TaBankCar',
                    component: TaBankCar
                }, {
                    path: '/viewChit/:id',
                    name: 'ViewChit',
                    component: ViewChit
                }, {
                    path: '/viewOrder/:id',
                    name: 'ViewOrder',
                    component: ViewOrder
                }]
            }
        ]
    },
]

const router = new VueRouter({
    routes
})

export default router