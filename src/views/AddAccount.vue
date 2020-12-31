<template>
  <div class="addBox">
    <el-card class="box-card">
      <p class="header">添加账号</p>
      <div class="content">
        <label for="userName">账号名称：</label>
        <el-input v-model="userName" placeholder="请输入1-16字的账号名称" id="userName" class="inpt"></el-input><br>
        <label for="phone">手机号码：</label>
        <el-input v-model="phone" placeholder="请输入手机号" id="phone" class="inpt"></el-input><br>
        <label for="pass">密码：</label>
        <el-input v-model="password" placeholder="请输入登录密码" id="pass" class="inpt"></el-input><br>
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
          <el-button type="primary" class="c-btn">确认</el-button>
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

      departOptions: [],
      depart:'',

      roleOptions: [],
      role:'',
      startOptions: [{
        value: '选项1',
        label: '启用'
      },{
        value: '选项2',
        label: '未启用'
      }],
      status: '',

      userName:'',
      phone:'',
      password:'',
    };
  },
  created() {
    this.getDepartment();
    this.getRole();
  },
  methods: {
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
              roleJson.value = '选项'+(i+1);
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
              departJson.value = '选项'+(i+1);
              departJson.label = v.name;
              that.departOptions.push(departJson);
            })
          }else{
            alert('获取全部部门数据失败')
          }
        }
        // console.log(that.departOptions);
      }).catch((err)=>{
        alert(err);
      })
    },
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