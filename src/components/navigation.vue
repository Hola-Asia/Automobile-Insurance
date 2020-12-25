<template>
  <div style="height:100%">
    <el-container style="height:100%">
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
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title"></span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-document"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-user-solid"></i>
              <span slot="title">客户管理</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-chat-line-square"></i>
              <span slot="title">咨询管理</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-house"></i>
              <span slot="title">关于我们</span>
            </el-menu-item>
            <el-menu-item index="6">
              <i class="el-icon-s-check"></i>
              <span slot="title">保单管理</span>
            </el-menu-item>
            <el-menu-item index="7">
              <i class="el-icon-edit"></i>
              <span slot="title">意见反馈</span>
            </el-menu-item>
            <el-menu-item index="8">
              <i class="el-icon-s-tools"></i>
              <span slot="title">权限管理</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header>
          <el-breadcrumb separator-class="el-icon-arrow-right" class="linehei">
            <el-breadcrumb-item :to="{ path: '/' }">一级分类</el-breadcrumb-item>
            <el-breadcrumb-item>二级分类</el-breadcrumb-item>
          </el-breadcrumb>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
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
  background-color:#545c64;
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
.el-menu-item, .el-submenu__title {
    height: 85px;
    line-height: 85px;
}
el-menu{
    border: none;
}
.linehei{
    height: 60px;
    line-height: 60px;
}

</style>
