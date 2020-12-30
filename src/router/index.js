import Vue from 'vue';
import VueRouter from 'vue-router';
import Navigation from '../components/navigation.vue';
import Information from '../views/Information.vue';
import Order from '../views/Order.vue';
import Login from '../views/Login.vue';
import GuaranteeSlipList from '../views/GuaranteeSlipList.vue';
import GuaranteeSlipParticulars from '../views/GuaranteeSlipParticulars.vue';


Vue.use(VueRouter)

const routes = [{
        //登陆接口
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        redirect: { name: 'Login' },
    },
    //保单详情接口
    {
        path: '/guaranteeSlipParticulars',
        name: 'GuaranteeSlipParticulars',
        component: GuaranteeSlipParticulars
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
            //保单列表接口
            {
                path: '/guaranteeSlipList',
                name: 'GuaranteeSlipList',
                component: GuaranteeSlipList
            }
        ]
    }


]

const router = new VueRouter({
    routes
})

export default router