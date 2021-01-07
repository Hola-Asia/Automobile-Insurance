<template>
  <div class="editBox">
    <el-card class="box-card">
      <p class="header">编辑账号</p>
      <div class="content">
      <label for="userName">账号名称：</label>
      <el-input v-model="editJson.username" placeholder="请输入1-16字的账号名称" id="userName" class="inpt"></el-input><br>
      <label for="phone">手机号码：</label>
      <el-input v-model="editJson.phone" placeholder="请输入手机号" id="phone" class="inpt" @change="checkPhone"></el-input><br>
      <label for="pass">密码：</label>
      <el-input v-model="editJson.password" placeholder="请输入修改后密码" id="pass" class="inpt"></el-input><br>
      <label>归属部门：</label>
      <el-select v-model="editJson.departmentId" placeholder="请选择" class="inpt">
        <el-option
            v-for="item in departOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select><br>
      <label>职位：</label>
      <el-select v-model="editJson.roleId"  placeholder="请选择" class="inpt">
        <el-option
            v-for="item in roleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select><br>
      <label>启用状态：</label>
      <el-select v-model="editJson.status" placeholder="请选择" class="inpt">
        <el-option
            v-for="item in startOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select><br>
      <div class="b-btn">
        <el-button type="info" class="c-btn">取消</el-button>
        <el-button type="primary" class="c-btn" @click="queRen">确认</el-button>
      </div>
    </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "EditAccount",
  data() {
    return {
      //创建一个临时变量用来存放状态
      tempStatus:'',
      departOptions: [],
      roleOptions: [],
      startOptions: [{
        value: '启用',
        label: '启用'
      },{
        value: '未启用',
        label: '未启用'
      }],
      editJson:{
        status: '',
        username:'',
        phone:'',
        password:'********',
        departmentId:'',
        roleId:'',
      },
      id:this.$route.params.conlltion,
    };
  },
  created() {
    this.init();
    this.getRole();
    this.getDepartment();
  },
  methods: {
    //初始化页面
    init(){
      let that = this;
      this.$axios({
        url:'/user/queryUserById',
        method:'get',
        params:{
          id:this.$route.params.conlltion,
        }
      }).then((res)=>{
        if (res.status === 200){
          if (res.data.data){
            let user = JSON.stringify(res.data.data);
            sessionStorage.setItem('user',user);
            if (res.data.data.status == 0){
              res.data.data.status = '未启用';
            }else{
              res.data.data.status = '启用';
            }
            if (res.data.data.password == null){
              res.data.data.password = '********';
            }
            //渲染页面
            that.editJson = res.data.data;
          }else{
            alert('页面渲染失败')
          }
        }
      }).catch((err)=>{
        alert(err);
      })
    },
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
    //验证手机号码
    checkPhone(){
      //用正则判断手机号是否符合要求
      let reg = /^1[3-9]\d{9}$/;
      if(!reg.test(this.editJson.phone.trim())){
        alert('请输入正确的手机号码');
      }
    },
    //确认
    queRen(){
      let userJson = JSON.parse(sessionStorage.getItem('user'));
      if (typeof this.editJson.departmentId == "string"){
        this.depart = userJson.departmentId;
      }
      if (typeof this.editJson.roleId == "string"){
        this.role=userJson.roleId;
      }
      if (typeof this.editJson.status == "string"){
        if (this.status == '未启用'){
          this.tempStatus=0;
        }else{
          this.tempStatus=1;
        }
      }
      this.$axios({
        url:'/user/updateUser',
        method:'post',
        data:{
          username: this.editJson.username,
          phone:this.editJson.phone,
          password:this.editJson.password,
          departmentId:this.editJson.departmentId,
          roleId:this.editJson.roleId,
          status:this.tempStatus,
          id:this.id,
        }
      }).then((res)=>{
        console.log(res);
        if (res.status == 200){
          if (res.data.code == 0){
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            //返回主页
            this.$router.go(-1);
          }
        }else{
            this.$message.error('修改失败！');
        }
      }).catch((err)=>{
        console.log(err);
      })
    },
  }
}
</script>

<style scoped lang="less">
.editBox{
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
        margin-top: 32px;
      }
      .b-btn{
        margin-top: 60px;
        .c-btn{
          margin-right: 20px;
          margin-left: 78px;
        }
      }
    }
  }
}
</style>
<style lang="less">
.myClass{
  width: 300px!important;
}
</style>