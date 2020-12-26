<template>
    <div>
        <div>
            <h1>汽 车 保 险 后 台 管 理 系 统</h1>
            <el-input placeholder="请输入用户名" v-model="user" clearable></el-input>
            <el-input type="password" placeholder="请输入密码" v-model="password" clearable></el-input>
            <el-row>
            <el-button>登陆</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
      return {
        user: '',
        password:''
      }
    }
}
</script>

<style lang="less" scoped>

</style>