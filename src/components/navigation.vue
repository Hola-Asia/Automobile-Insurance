<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-aside width="200px">
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <router-link to="/">
              <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title"></span>
              </el-menu-item>
            </router-link>
            <router-link v-if="ordreJurisdiction" to="/order">
              <el-menu-item index="2">
                <i class="el-icon-document"></i>
                <span slot="title">订单管理</span>
              </el-menu-item>
            </router-link>


            <router-link v-if="clientsJurisdiction" to="/customer">

              <el-menu-item index="3">
                <i class="el-icon-user-solid"></i>
                <span slot="title">客户管理</span>
              </el-menu-item>
            </router-link>
            <router-link v-if="informationJurisdiction" to="/information">
              <el-menu-item index="4">
                <i class="el-icon-chat-line-square"></i>
                <span slot="title">资讯管理</span>
              </el-menu-item>
            </router-link>
            <router-link to="/">
              <el-menu-item index="5">
                <i class="el-icon-house"></i>
                <span slot="title">关于我们</span>
              </el-menu-item>
            </router-link>
            <router-link v-if="politiqueJurisdiction" to="/guaranteeSlipList">
              <el-menu-item index="6">
                <i class="el-icon-s-check"></i>
                <span slot="title">保单管理</span>
              </el-menu-item>
            </router-link>
            <router-link to="/">
              <el-menu-item index="7">
                <i class="el-icon-edit"></i>
                <span slot="title">意见反馈</span>
              </el-menu-item>
            </router-link>
            <router-link v-if="jurisdictionAdministration||accountManagement||departmentManagement||gestionSectorielle" to="accountManage">
              <el-menu-item index="8">
                <i class="el-icon-s-tools"></i>
                <span slot="title">权限管理</span>
              </el-menu-item>
            </router-link>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header>
          <el-breadcrumb separator-class="el-icon-arrow-right" class="linehei">
            <el-breadcrumb-item :to="{ path: '/' }"
              >一级分类</el-breadcrumb-item
            >
            <el-breadcrumb-item>二级分类</el-breadcrumb-item>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-s-home"></i>
                个人用户
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-breadcrumb>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
        // 权限值
        jurisdiction:sessionStorage.jurisdiction||null,
        //订单管理权限
        ordreJurisdiction:false,
        // 保单管理权限
        politiqueJurisdiction:false,
        //客户管理权限
        clientsJurisdiction:false,
        //资讯管理权限
        informationJurisdiction:false,
        //权限管理
        jurisdictionAdministration:false,
        //账号管理
        accountManagement:false,
        //角色管理
        departmentManagement:false,
        //部门管理
        gestionSectorielle:false,
        // token
        token:sessionStorage.token
    };
  },
  methods: {
    // 导航
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    // 下拉
    handleCommand(command) {
      this.beg();
    },
    //请求退出接口
    beg(){
      this.$axios({
        url:'/user/logout',
        params:{
          'token':this.token
        }
      }).then((res)=>{
        this.$router.push('/login');
        delete sessionStorage.token;
        delete sessionStorage.jurisdiction;
        this.$message({
          message: '您已成功退出登录',
          type: 'success'
        });
      }).catch((err)=>{
        this.$message.error('服务器开小差去了(*￣︶￣)');
      })
    },
    //判断权限
    jurisdictionFn(){
      this.jurisdiction=sessionStorage.jurisdiction;
      let json=JSON.parse(this.jurisdiction)||0;
      for (let i = 0; i < json.length; i++) {
        switch(json[i].menuName){
          case "订单管理":
            this.ordreJurisdiction=true;
          break;
          case "保单管理":
            this.politiqueJurisdiction=true;
          break;
          case "客户管理":
            this.clientsJurisdiction=true;
          break;
          case "资讯管理":
            this.informationJurisdiction=true;
          break;
          case "权限管理":
            this.jurisdictionAdministration=true;
          break;
          case "账号管理":
            this.accountManagement=true;
          break;
          case "角色管理":
            this.departmentManagement=true;
          break;
          case "部门管理":
            this.gestionSectorielle=true;
          break;
        }
        
      }
    }
  },
  mounted() {
      this.jurisdictionFn();
  },
  components: {},
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 100%;
  height: 100%;
}

.el-main {
  background-color: #f1f1f1;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-col-12 {
  width: 100%;
}
el-menu-item {
  height: 60px;
  line-height: 60px;
}
.el-menu-item,
.el-submenu__title {
  height: 85px;
  line-height: 85px;
}
.el-menu {
  border: none;
}
.linehei {
  height: 60px;
  line-height: 60px;
}
a {
  text-decoration: none;
}
/* 下拉菜单 */
.el-dropdown-link {
  cursor: pointer;
  color: #606266;
}
.el-dropdown-link:hover {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown span {
  border: none;
  outline: none;
}
.el-header[data-v-09d1a3b8],
.el-footer[data-v-09d1a3b8] {
  text-align: right;
}
</style>
