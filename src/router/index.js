import Vue from 'vue';
import VueRouter from 'vue-router';
import Navigation from '../components/navigation.vue';
//LC
import Login from '../views/Login.vue';
import GuaranteeSlipList from '../views/GuaranteeSlipList.vue';
import GuaranteeSlipParticulars from '../views/GuaranteeSlipParticulars.vue';
// 莉莉
import AccountManage from '../views/AccountManage.vue'
import DepartmentManage from '../views/DepartmentManage.vue'
import RoleManage from '../views/RoleManage.vue'
import AddAccount from '../views/AddAccount.vue'
import EditAccount from '../views/EditAccount.vue'
import EditRole from "@/views/EditRole";
import AddRole from "@/views/AddRole";
// LJ
import Customer from '../views/Customer'
import ViewDetails from '../views/ViewDetails'
import ViewInfo from '../views/ViewInfo'
import CarInfo from '../views/carInfo'
import TaBankCar from '../views/TaBankCar'
import ViewChit from '../views/ViewChit'
import ViewOrder from '../views/ViewOrder'
import Guarantee from '@/views/GuaranteeSlipParticulars'
//ZR && DHZ
import Information from '../views/Information.vue'
import Order from '../views/Order.vue'
import Details from '../views/Details.vue'
import About from '../views/About.vue'
import AddAbout from '../views/AddAbout.vue'
import EditAbout from "../views/EditAbout";
import Opinion from '../views/opinion.vue'

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
        path: '/guaranteeSlipParticulars/:id',
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
            {
                //客户管理
                path: '/customer',
                name: 'Customer',
                component: Customer,
            },{
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
                }, {
                    // 订单详情
                    path: '/details',
                    name: 'Details',
                    component: Details
                }, {
                    // 保单详情
                    path: '/guarantee/:id',
                    name: 'Guarantee',
                    component: Guarantee
                },]
            },
            //保单列表接口
            {
                path: '/guaranteeSlipList',
                name: 'GuaranteeSlipList',
                component: GuaranteeSlipList
            },
            {
                // 账号管理
                path: '/accountManage',
                name: 'AccountManage',
                component: AccountManage,
            },
            {
                // 部门管理
                path: '/departmentManage',
                name: 'DepartmentManage',
                component: DepartmentManage
            },
            {
                // 角色管理
                path: '/roleManage',
                name: 'RoleManage',
                component: RoleManage
            },
            {
                // 添加账号管理
                path: '/addAccount',
                name: 'AddAccount',
                component: AddAccount
            },
            {
                // 编辑账户管理
                path: '/editAccount',
                name: 'EditAccount',
                component: EditAccount
            },
            {
                // 添加角色管理
                path: '/addRole',
                name: 'addRole',
                component: AddRole
            },
            {
                // 编辑角色管理
                path: '/editRole',
                name: 'EditRole',
                component: EditRole
            },
        ]
    },
]

const router = new VueRouter({
    routes
})

export default router