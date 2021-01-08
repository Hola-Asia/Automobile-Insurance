<template>
  <div class="box">
      <!--头部-->
      <div class="header clearfix">
        <div class="container">
          <ul>
            <li><router-link to="accountManage" class="h-btn" id="teShu">账号管理</router-link></li>
            <li><router-link to="departmentManage" class="h-btn">部门管理</router-link></li>
            <li><router-link to="roleManage" class="h-btn">角色管理</router-link></li>
          </ul>
        </div>
      </div>
      <!--中间-->
      <el-card class="box-card">
          <div class="middle-top">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="手机号码" class="m-top-font">
                <el-input v-model="formInline.user" placeholder="请输入手机号码"></el-input>
              </el-form-item>
              <el-form-item label="启用状态" class="m-top-font">
                <el-select v-model="formInline.region" placeholder="请选择">
                  <el-option label="请选择" value=""></el-option>
                  <el-option label="启用" value="1"></el-option>
                  <el-option label="未启用" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">搜索</el-button>
              </el-form-item>
            </el-form>
            <router-link to="AddAccount" class="h-add el-icon-plus">添加账号</router-link>
          </div>
          <div class="middle-middle">
          <el-table
              v-loading="dialogLoading"
              :data="tableData"
              border
              style="width: 100%" :header-cell-style="{background:'#D7D7D7',fontSize:'14x',textAlign:'center'}"
              :cell-style="{textAlign:'center',fontSize:'13x',padding:'0px'}"
              :row-style="{height:'70px'}">
            <el-table-column
                prop="username"
                label="账号名称">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="手机号码">
            </el-table-column>
            <el-table-column
                prop="departmentName"
                label="归属部门">
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="账号创建时间">
            </el-table-column>
            <el-table-column
                prop="roleName"
                label="职位">
            </el-table-column>
            <el-table-column
                prop="status"
                label="启用状态">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="primary"
                    @click="handleStop(scope.$index, scope.row)" v-if="scope.row.status=='未启用'">启用</el-button>
                <el-button
                    size="mini"
                    type="primary"
                    @click="handleStop(scope.$index, scope.row)" v-else-if="scope.row.status=='启用'">停用</el-button>
                <el-button
                    size="mini"
                    type="primary"
                    @click="openEdit(scope.$index, scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--底部页码-->
          <div class="block clearfix">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage1"
                :page-sizes="[5, 10, 15]"
                :page-size="100"
                layout=" prev, pager, next, sizes , jumper"
                :total=totalAccount>
            </el-pagination>
          </div>
        </div>
      </el-card>
      <!--弹框停用-->
      <el-dialog
          :center="true"
          title="账号启用/停用"
          :visible.sync="dialogVisible"
          width="30%"
          height="100px">
          <span>确定将{{username}}({{phone}})的账号停用吗？</span><br>
          <span>停用后，{{username}}将无法登录后台</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="quDingStop">确 定</el-button>
          </span>
      </el-dialog>
      <!--弹框启用-->
      <el-dialog
          :center="true"
          title="账号启用/停用"
          :visible.sync="dialogVisible1"
          width="30%"
          height="100px">
          <span>确定将{{username}}({{phone}})的账号启用吗？</span>
          <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="quDingStop">确 定</el-button>
          </span>
      </el-dialog>
  </div>
</template>
<script>

export default {
  name: "AccountManage",
  data() {
    return {
      //搜索框里面的v-model
      formInline: {
        user: '',
        region: ''
      },
      //渲染页面的初始化数据
      //账号名称
      username:'',
      //密码
      phone:'',
      //分页大小
      yeSize:5,
      //页数
      yeMa:1,
      //渲染页面的数组
      tableData: [],
      //渲染页码
      currentPage1: 1,
      currentPage2: 2,
      currentPage3: 3,
      currentPage4: 4,
      //账户表里面的总条数
      totalAccount:0,
      dialogLoading:false,
      //用来控制模态框的显示与隐藏
      dialogVisible: false,
      dialogVisible1: false,

      //用来存放启用/未启用状态的临时变量
      tempStatus:0,

      //通过启用状态分页的数据
      //分页大小
      statusYeSize:5,
      //页数
      statusYeMa:1,
    };
  },
  created(){
    //挂载后渲染页面数据内容
    this.init(this.yeSize,this.yeMa);
  },
  methods: {
    //渲染页面
    init(limit,page){
      this.dialogLoading=true;
      let that = this;
      this.$axios({
        url:'/user/list',
        method:'get',
        headers:{
          'token':sessionStorage.token,
        },
        params:{
          limit:limit,
          page:page,
        },
      }).then((res)=>{
        if (res.status === 200){
          if (res.data.data.length > 0){
            that.totalAccount = res.data.count;
            //先置空
            that.tableData=[];
            (res.data.data).forEach(function (v){
              if (v.status === 1){
                v.status = '启用';
              }else{
                v.status = '未启用';
              }
              that.tableData.push(v);
            })
          }else{
            alert('未查询到相关数据信息');
          }
        }
        this.dialogLoading=false;
      }).catch((err)=>{
        this.dialogLoading=false;
        alert('未连接到接口，渲染页面失败');
      })
    },

    //点击搜索按钮
    onSubmit() {
      let that = this;
      //判断手机号码是否有值
      if (this.formInline.user.trim()){
        //用正则判断手机号是否符合要求
        let reg = /^1[3-9]\d{9}$/;
        if(reg.test(this.formInline.user.trim())){
          //通过手机号码查询数据渲染页面
          this.$axios({
            url:'/user/queryUserByPhone',
            params:{
              phone: this.formInline.user.trim(),
            },
            headers:{
              'token':sessionStorage.token,
            },
            method:"get",
          }).then((res)=>{
            //查询成功有数据
            if (res.status === 200){
              if (res.data.data.length > 0){
                //查询成功循环渲染页码
                //先置空
                that.tableData = [];
                //渲染数据
                (res.data.data).forEach(function (v){
                  if(v.status === 0){
                    v.status = '未启用';
                  }else{
                    v.status = '启用';
                  }
                  that.tableData.push(v);
                })
                //由于手机号码是唯一的，默认只有一条数据，手动修改
                that.totalAccount=1;

              }else{
                alert('未查询到手机号码信息');
              }
            }
          }).catch((err)=>{
            alert(err)
          })
        }else{
          alert('请输入正确的手机号！！')
        }
      }else if(this.formInline.region && this.formInline.user == ''){
        //通过启用状态查询数据渲染页面
        this.statusXuanRan(this.formInline.region,this.statusYeMa,this.statusYeSize);
      }else{
        this.init(this.yeSize,this.yeMa);
      }
    },

    //通过启用状态分页渲染数据
    statusXuanRan(status,page,limit){
      this.dialogLoading=true;
      let that = this;
      this.$axios({
        url:'/user/queryUserByStatus',
        method:'get',
        headers:{
          'token':sessionStorage.token,
        },
        params:{
          status:status,
          page:page,
          limit:limit,
        },
      }).then((res)=>{
        if (res.status === 200){
          if (res.data.data.length > 0){
            //渲染页面
            //查询成功循环渲染页码和页面信息
            that.totalAccount = res.data.count;
            //先置空
            that.tableData = [];
            //渲染数据
            (res.data.data).forEach(function (v){
              if(v.status === 0){
                v.status = '未启用';
              }else{
                v.status = '启用';
              }
              that.tableData.push(v);
            })
          }else{
            alert('未查询到相关数据信息');
          }
        }
        this.dialogLoading=false;
      }).catch((err)=>{
        this.dialogLoading=false;
        alert(err);
      })
    },

    //跳转编辑页面
    openEdit(index, row){
      const loading = this.$loading({
        lock: false,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 600);
      // console.log(index,row.id);
      this.$router.push({name:'EditAccount',params:{ conlltion : row.id }});
    },

    //弹出停用/启用的弹框
    handleStop(index, row) {
      sessionStorage.setItem('stopUser',JSON.stringify(row));
      if (row.status == '未启用'){
        this.dialogVisible1=true;
      }else{
        this.dialogVisible=true;
      }
      //渲染页面
      this.username = row.username;
      this.phone = row.phone;
    },
    //确定停用/启用
    quDingStop(){
      let stopJson = JSON.parse(sessionStorage.getItem('stopUser'));
      if (stopJson.status == '启用'){
        stopJson.status = 1;
      }else{
        stopJson.status = 0;
      }
      console.log(stopJson.status);
      this.$axios({
        url:'/user/updateUserByStatus',
        headers:{
          'token':sessionStorage.token,
        },
        method:'get',
        params:{
          id:stopJson.id,
          status:stopJson.status,
        },
      }).then((res)=>{
        if (res.status == 200){
          if (res.data.code == 0){
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            //关闭弹框
            this.dialogVisible1=false;
            this.dialogVisible=false;
            //渲染页面
            this.init(this.yeSize,this.yeMa);
          }
        }else{
          this.$message.error('修改失败！');
        }
      }).catch((err)=>{
        alert(err);
      })
    },

    //用来获取每页显示的条数
    handleSizeChange(val) {
      //判断是搜索的分页，还是最初的渲染页面
      if (this.formInline.region){
        this.statusYeSize = val;
        this.statusXuanRan(this.formInline.region,this.statusYeMa,this.statusYeSize);
      }else{
        this.yeSize = val;
        this.init(this.yeSize,this.yeMa);
      }
    },
    //用来获取当前点击的是哪一页
    handleCurrentChange(val) {
      if (this.formInline.region){
        this.statusYeMa = val;
        this.statusXuanRan(this.formInline.region,this.statusYeMa,this.statusYeSize);
      }else{
        this.yeMa = val;
        this.init(this.yeSize,this.yeMa);
      }
    },
  },
}
</script>
<style scoped lang="less">
.box{
  line-height: 0px;
  text-align: left;
}
.header {
  .container{
    width: 1110px;
    // margin: 0 auto;
    ul{
      width: 600px;
      height: 40px;
      margin-left: 38px;
      li {
        width: 176px;
        height: 30px;
        list-style: none;
        float: left;
        .h-btn{
          color: #666666;
          text-decoration: none;
          margin-right: 50px;
          line-height: 30px;
          font-weight: bold;
          font-size: 16px;
          &:hover{
            color:#66B1FF;
          }
        }
        #teShu{
          color:#66B1FF;
        }
      }
    }
  }
}

.box-card{
  width: 100%;
  .middle-top {
    margin-left: 16px;
    margin-top: 25px;
    .m-top-font {
      font-size: 20px;
      margin-right: 50px;
    }
    .h-add{
      width: 90px;
      height: 40px;
      font-size: 14px;
      text-decoration: none;
      color: #FFF;
      background-color: #409EFF;
      border-radius: 4px;
      line-height: 40px;
      text-align: center;
    }
  }
  .middle-middle {
    width: 100%;
    margin-left: 16px;
    margin-top: 20px;
    .el-table .select-row {
      background: #F2F2F2;
    }
    .el-table .warning-row {
      background: oldlace;
    }
    .el-table .success-row {
      background: #f0f9eb;
    }
    .h-edit{
      width: 54px;
      height: 28px;
      font-size: 12px;
      text-decoration: none;
      color: #FFF;
      background-color: #409EFF;
      border-radius: 3px;
      line-height: 27px;
      text-align: center;
      margin-left: 10px;
      display: inline-block;
    }
  }
  .block{
    float: right;
    margin: 20px;
  }
}
.clearfix:after{
  clear: both;
  content:'';
  display:block;
}
</style>
<style lang="less">
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
  border-radius: 6px!important;
  border: 1px #D9D9D9 solid;
}
.el-message-box__header {
  border-bottom: 1px #EBEEF5 solid;
}
.el-message-box__title {
  font-weight: bold;
}
.el-message-box__message {
  margin: 0 auto!important;
  width: 290px;
  height: 46px;
}
.el-message-box__message p {
  font-size: 14px;
  color: #333333;
}
.el-dialog__body {
  padding: 10px 20px!important;
  line-height: 27px;
}
.el-dialog--center .el-dialog__body {
  text-align: center!important;
}
</style>