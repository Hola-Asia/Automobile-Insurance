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
            <router-link to="/order">
              <el-menu-item index="2">
                <i class="el-icon-document"></i>
                <span slot="title">订单管理</span>
              </el-menu-item>
            </router-link>
            <router-link to="/">
              <el-menu-item index="3">
                <i class="el-icon-user-solid"></i>
                <span slot="title">客户管理</span>
              </el-menu-item>
            </router-link>
            <router-link to="/information">
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
            <router-link to="/">
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
            <router-link to="/">
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
                <el-dropdown-item command="a">退出登录</el-dropdown-item></el-dropdown-item>
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
    return {};
  },
  methods: {
    // 导航
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 下拉
    handleCommand(command) {
      this.$message("click on item " + command);
    },
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
  line-height: 160px;
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
