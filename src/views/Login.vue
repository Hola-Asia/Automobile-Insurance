<template>
    <div class="background">
      <h1>汽 车 保 险 后 台 管 理 系 统</h1>
      <div class="form">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label=" " prop="user">
            <el-input class="user" type="text" v-model="ruleForm.user" autocomplete="off" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label=" " prop="password">
            <el-input class="password" type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
export default {
    data() {
      //账号验证
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          if (this.ruleForm.password !== '') {
            this.$refs.ruleForm.validateField('password');
          }
          callback();
        }
      };
      //密码验证
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          user: '',
          password: ''
        },
        rules: {
          user: [
            { validator: validatePass, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      //登陆按钮
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.beg();
          } else {
            if(this.ruleForm.user==''&&this.ruleForm.password==''){
              this.open1('账号和密码不能为空');
            }else if(this.ruleForm.user==''){
              this.open1('账号不能为空');
            }else{
              this.open1('密码不能为空');
            }
            return false;
          }
        });
      },
      //重置按钮
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //提示框
      open1(v) {
        this.$message.error(v);
      },
      open2(v) {
        this.$message({
          message: v,
          type: 'success'
        });
      },
      // 请求接口
      beg(){
        this.$axios({
          method:'post',
          url:'/user/login',
          data:{
            'username':this.ruleForm.user,
            'password':this.ruleForm.password
          }
        }).then((res)=>{
          if(res.data.data==null){
            this.open1('账号或密码错误')
          }else if(res.data.data.token){
            sessionStorage.token=res.data.data.token;
            this.$router.push('/guaranteeSlipList');
            this.open2('登录成功')
          }
          
        }).catch((err)=>{
          this.open1('服务器开小差去了(*￣︶￣)')
        })
      }
    }
}
</script>

<style lang="less" scoped>
.background{
  background: url(./../assets/images/login/login.png) center;
  background-size: cover;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
 h1{
    color: #fff;
    text-align: center;
    font-size: 36px;
    margin-top: 400px;
  }
.form{
  background: #00A0C3;
  width: 400px;
  height: 300px;
  margin: 0px 0 0 -242px;
  position: absolute;
  left: 50%;
  top: 50%;
  
  .user,.password{
    width: 286px;
    height: 40px;
    color: #fff;
    text-align: center;
  }
}
</style>