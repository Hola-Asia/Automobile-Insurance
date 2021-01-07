import Vue from 'vue';
import VueRouter from 'vue-router';
import Navigation from '../components/navigation.vue';
import Information from '../views/Information.vue';
import Order from '../views/Order.vue';
import Login from '../views/Login.vue';
import GuaranteeSlipList from '../views/GuaranteeSlipList.vue';
import GuaranteeSlipParticulars from '../views/GuaranteeSlipParticulars.vue';
import AccountManage from '../views/AccountManage.vue'
import DepartmentManage from '../views/DepartmentManage.vue'
import RoleManage from '../views/RoleManage.vue'
import AddAccount from '../views/AddAccount.vue'
import EditAccount from '../views/EditAccount.vue'
import EditRole from "@/views/EditRole";
import AddRole from "@/views/AddRole";


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