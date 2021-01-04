<template>
  <div class="addBox">
    <el-card class="box-card">
      <p class="header">添加账号</p>
      <div class="content">
        <label for="userName">账号名称：</label>
        <el-input v-model="addData.username" placeholder="请输入1-16字的账号名称" id="userName" class="inpt"></el-input><br>
        <label for="phone">手机号码：</label>
        <el-input v-model="addData.phone" placeholder="请输入手机号" id="phone" class="inpt" @change="checkPhone"></el-input><br>
        <label for="pass">密码：</label>
        <el-input v-model="addData.password" placeholder="请输入登录密码" id="pass" class="inpt"></el-input><br>
        <label>归属部门：</label>
        <el-select v-model="addData.departmentId" placeholder="请选择" class="inpt">
          <el-option
              v-for="item in departOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select><br>
        <label>职位：</label>
        <el-select v-model="addData.roleId" placeholder="请选择" class="inpt">
          <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select><br>
        <label>启用状态：</label>
        <el-select v-model="addData.status" placeholder="请选择" class="inpt">
          <el-option
              v-for="item in startOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select><br>
        <div class="b-btn">
          <el-button type="info" class="c-btn">取消</el-button>
          <el-button type="primary" class="c-btn" @click="tiJiao">确认</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AddAccount",
  data() {
    return {
      departOptions: [],
      roleOptions: [],
      startOptions: [{
        value: '1',
        label: '启用'
      },{
        value: '0',
        label: '未启用'
      }],

      //需要传的数据
      addData:{
        username:'',
        phone:'',
        password:'',
        departmentId:'',
        roleId:'',
        status:'',
      },
    };
  },
  created() {
    this.getDepartment();
    this.getRole();
  },
  methods: {
    //获取全部的职位
    getRole(){
      let that = this;
      this.$axios({
        url:'/role/queryAllRoleName',
        method:'get',
      }).then((res)=>{
        if (res.status === 200){
          if (res.data.data.length >0){
            (res.data.data).forEach(function (v,i){
              //用来临时存放全部的职位
              let roleJson = {};
              roleJson.value = v.id;
              roleJson.label = v.roleName;
              that.roleOptions.push(roleJson);
            })
          }else{
            alert('获取全部职位数据失败')
          }
        }
      }).catch((err)=>{
        alert(err);
      })
    },
    //获取全部的部门
    getDepartment(){
      let that = this;
      this.$axios({
        url:'/department/queryAllDepartmentName',
        method:'get',
      }).then((res)=>{
        if (res.status === 200){
          if (res.data.data.length >0){
            (res.data.data).forEach(function (v,i){
              //用来临时存放全部的部门
              let departJson = {};
              departJson.value = v.id;
              departJson.label = v.name;
              that.departOptions.push(departJson);
            })
          }else{
            alert('获取全部部门数据失败')
          }
        }
      }).catch((err)=>{
        alert(err);
      })
    },
    //正则验证手机号码
    checkPhone(){
      let reg = /^1[3-9]\d{9}$/;
      if (!reg.test(this.addData.phone)){
        //如果不符合要求
        alert('请输入正确的手机号码');
      }
    },
    tiJiao(){
      this.$axios({
        url:'/user/addUser',
        method:'post',
        data: this.addData,
      }).then((res)=>{
        if (res.status == 200){
          if (res.data.code == 0){
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            //返回主页
            this.$router.go(-1);
          }
        }else{
          this.$message.error('添加失败！');
        }
      }).catch((err)=>{
        console.log(err);
      })
    }
  }
}
</script>

<style scoped lang="less">
.addBox{
  text-align: left;
  line-height: 50px;
  .box-card{
    .header{
      font-size: 16px;
      font-weight: bold;
      color: #666666;
      margin-left: 20px;
    }
    .content{
      margin-left: 20px;
      .inpt{
        width: 300px;
        height: 40px;
        margin-top: 14px;
      }
      label{
        display: inline-block;
        width: 100px;
        margin-top: 14px;
      }
      .b-btn{
        margin-top: 20px;
        .c-btn{
          margin-right: 20px;
          margin-left: 78px;
        }
      }
    }
  }
}
</style>