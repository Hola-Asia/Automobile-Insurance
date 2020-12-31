<template>
  <div class="editBox">
    <el-card class="box-card">
      <p class="header">编辑账号</p>
      <div class="content">
      <label for="userName">账号名称：</label>
      <el-input v-model="userName" placeholder="请输入1-16字的账号名称" id="userName" class="inpt"></el-input><br>
      <label for="phone">手机号码：</label>
      <el-input v-model="phone" placeholder="请输入手机号" id="phone" class="inpt"></el-input><br>
      <label for="pass">密码：</label>
      <el-input v-model="pass" placeholder="请输入修改后密码" id="pass" class="inpt"></el-input><br>
      <label>归属部门：</label>
      <el-select v-model="depart" placeholder="请选择" class="inpt">
        <el-option
            v-for="item in departOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select><br>
      <label>职位：</label>
      <el-select v-model="role" placeholder="请选择" class="inpt">
        <el-option
            v-for="item in roleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select><br>
      <label>启用状态：</label>
      <el-select v-model="status" placeholder="请选择" class="inpt">
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
      sizeForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      //定义一个临时变量，用来存放状态
      statusTemp:'',

      departOptions: [],
      depart:'',

      roleOptions: [],
      role:'',

      startOptions: [{
        value: '选项1',
        label: '启用'
      }, {
        value: '选项2',
        label: '未启用'
      }],
      status: '',
      userName:'',
      phone:'',
      pass:'********',

    };
  },
  created() {
    this.init();
    this.getRole();
    this.getDepartment();
  },
  methods: {
    init(){
      let that = this;
      console.log(this.$route.params.conlltion);
      this.$axios({
        url:'/user/queryUserById',
        method:'get',
        params:{
          id:this.$route.params.conlltion,
        }
      }).then((res)=>{
        if (res.status === 200){
          if (res.data.data){
            if (res.data.data.status == 0){
              res.data.data.status = '未启用';
            }else{
              res.data.data.status = '启用';
            }
            //渲染页面
            that.userName = res.data.data.username;
            that.phone = res.data.data.phone;
            that.depart = res.data.data.departmentName;
            that.role = res.data.data.roleName;
            that.status = res.data.data.status;
          }else{
            alert('页面渲染失败')
          }
        }
      }).catch((err)=>{
        alert(err);
      })
    },
    onSubmit() {
      console.log('submit!');
    },
    //获取全部的职位
    getRole(){
      let that = this;
      this.$axios({
        url:'/role/queryAllRoleName',
        method:'get',
      }).then((res)=>{
        console.log(res);
        if (res.status === 200){
          if (res.data.data.length >0){
            console.log(res.data.data);
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
        console.log(res);
        if (res.status === 200){
          if (res.data.data.length >0){
            (res.data.data).forEach(function (v,i){
              //用来临时存放全部的部门
              let departJson = {};
              departJson.value = v.id;
              departJson.label = v.name;
              that.departOptions.push(departJson);
            })
            console.log(that.departOptions);
          }else{
            alert('获取全部部门数据失败')
          }
        }
      }).catch((err)=>{
        alert(err);
      })
    },
    //确认
    queRen(){
      if (this.status == '启用'){
        this.statusTemp = 1;
      }else{
        this.statusTemp = 0;
      }
      this.$axios({
        url:'/user/updateUser',
        method:'post',
        data:{
          username: this.userName,
          phone:this.phone,
          password:this.pass,
          departmentId:this.depart,
          roleId:this.role,
          status:this.statusTemp,
        }
      }).then((res)=>{
        console.log(res);
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