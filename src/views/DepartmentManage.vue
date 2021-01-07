<template>
  <div class="box">
    <!--头部-->
    <div class="header clearfix">
      <div class="container">
        <ul>
          <li><router-link to="accountManage" class="h-btn">账号管理</router-link></li>
          <li><router-link to="departmentManage" class="h-btn" id="teShu">部门管理</router-link></li>
          <li><router-link to="roleManage" class="h-btn">角色管理</router-link></li>
        </ul>
      </div>
    </div>
    <!--中间-->
    <el-card class="box-card">
      <div class="middle-top">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="部门名称" class="m-top-font">
            <el-input v-model="formInline.depart" placeholder="请输入部门名称"></el-input>
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
        <p>
          <el-button type="primary" class="el-icon-plus" @click="add">添加部门</el-button>
        </p>
      </div>
      <div class="middle-middle">
        <el-table
            v-loading="loading"
            :data="tableData"
            border
            style="width: 100%" :header-cell-style="{background:'#D7D7D7',fontSize:'14x',textAlign:'center'}"
            :cell-style="{textAlign:'center',fontSize:'13x',padding:'0px'}"
            :row-style="{height:'70px'}">
          <el-table-column
              prop="name"
              label="部门名称">
          </el-table-column>
          <el-table-column
              prop="createTime"
              label="创建时间">
          </el-table-column>
          <el-table-column label="查看人员">
            <template slot-scope="scope">
              <a type="primary" @click="handleShow(scope.$index, scope.row)" class="show">查看</a>
            </template>
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
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--底部页码-->
        <div class="block clearfix" v-show="showYeMa">
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
    <!--添加-->
    <el-dialog title="添加部门" :visible.sync="dialogFormVisible" class="addBox">
      <el-form :model="form" >
        <el-form-item label="部门名称" label-width='150px' >
          <el-input v-model="form.name" placeholder="请输入部门名称"></el-input>
        </el-form-item>

        <el-form-item label="启用状态" label-width='150px' >

          <el-select v-model="form.status" placeholder="请选择">
            <el-option label="启用" value="1"></el-option>
            <el-option label="未启用" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" class='btn-kuang'>取 消</el-button>
        <el-button type="primary" @click="addQuRen" class='btn-kuang'>确 定</el-button>
      </div>
    </el-dialog>
    <!--查看-->
    <div v-show="show" class="look">
      <div class="lookKuang">
        <div class="s-top">
          <span class="title">查看部门人员</span>
          <span class="total">共计{{ totalPerson }}人</span>
        </div>
        <div class="showTable">
          <el-table
              v-loading="dialogLoading"
              :data="tableData1"
              style="width: 100%;height: 400px;scrollbar-width: none;overflow:scroll;overflow-x: hidden; overflow-y: auto;" :header-cell-style="{fontSize:'14x',textAlign:'center'}"
              :cell-style="{textAlign:'center',fontSize:'13x',padding:'0px'}"
              :row-style="{height:'40px',border:'none'}"
              stripe>
            <el-table-column
                prop="username"
                label="账号名称"
                width="90">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="手机号码"
                width="120">
            </el-table-column>
            <el-table-column
                prop="departmentName"
                label="归属部门"
                width="100">
            </el-table-column>
            <el-table-column
                prop="roleName"
                label="职位"
                width="80">
            </el-table-column>
          </el-table>
        </div>
        <div class="b-btn">
          <el-button type="primary" class="c-btn" @click="close1">关闭</el-button>
        </div>
      </div>
    </div>
    <!--弹框停用-->
    <el-dialog
        :center="true"
        title="账号启用/停用"
        :visible.sync="dialogVisible"
        width="30%"
        height="100px">
      <span>确定将 {{name}} 停用吗？<br></span>
      <span>停用后，所有账号将无法选择该部门</span>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="stopStatus">确 定</el-button>
          </span>
    </el-dialog>
    <!--弹框启用-->
    <el-dialog
        :center="true"
        title="账号启用/停用"
        :visible.sync="dialogVisible1"
        width="30%"
        height="100px">
      <span>确定将 {{name}} 启用吗？</span><br>
      <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="stopStatus">确 定</el-button>
          </span>
    </el-dialog>
    <!--弹框禁止停用-->
    <el-dialog
        :center="true"
        title="账号启用/停用"
        :visible.sync="dialogVisible2"
        width="30%"
        height="100px">
      <span class="forbidden">该部门仍存在人员，请将人员转移部门</span><br>
      <span class="forbidden">后，才能停用该部门</span>
      <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
          </span>
    </el-dialog>
    <!--弹框删除-->
    <el-dialog
        :center="true"
        title="部门删除"
        :visible.sync="dialogVisible3"
        width="30%"
        height="100px">
      <span>确定将 {{name}} 删除吗？</span><br>
      <span>删除后，所有账号将无法选择该部门</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="departDelete">确 定</el-button>
      </span>
    </el-dialog>
    <!--弹框禁止删除-->
    <el-dialog
        :center="true"
        title="部门删除"
        :visible.sync="dialogVisible4"
        width="30%"
        height="100px">
      <span class="forbidden">该部门仍存在人员，请将人员转移部门</span><br>
      <span class="forbidden">后，才能删除该部门</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible4 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible4 = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "DepartmentManage",
  data() {
    return {
      //搜索内容的v-model
      formInline:{
        depart:'',
        region:'',
      },
      //初始化页面列表
      tableData: [],
      name:'',
      createTime:'',
      status:'',

      //渲染页面的数据
      //分页大小
      yeSize:5,
      //页数
      yeMa:1,
      //账户表里面的总条数
      totalAccount:0,
      //页码
      currentPage1: 1,
      currentPage2: 2,
      currentPage3: 3,
      currentPage4: 4,

      //用来控制模态框的显示与隐藏
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      //添加框
      dialogFormVisible: false,
      form: {
        name: '',
        status: '',
      },
      formLabelWidth: '100px',

      //查看
      show:false,
      //合计人数
      totalPerson:'',
      tableData1: [],
      //即将要删除的部门id
      deleteId:'',
      //用来控制页码是否显示
      showYeMa:true,

      loading:false,
      dialogLoading:false,
    };
  },
  created(){
    //挂载后渲染页面数据内容
    this.init(this.yeSize,this.yeMa);
  },
  methods: {
    //渲染页面
    init(limit,page){
      this.loading=true;
      this.$axios({
        url:'/department/list',
        headers:{
          'token':sessionStorage.token,
        },
        method:'get',
        params:{
          limit:limit,
          page:page,
        },
      }).then((res)=>{
        if (res.status === 200){
          if (res.data.data.length > 0){
            this.totalAccount = res.data.count;
            //先置空
            this.tableData = [];
            (res.data.data).forEach(function (v){
              if (v.status === 1){
                v.status = '启用';
              }else{
                v.status = '未启用';
              }
            })
            this.tableData = res.data.data;
          }else{
            alert('未查询到相关数据信息');
          }
        }
        this.loading=false;
      }).catch((err)=>{
        this.loading=false;
        alert('未连接到接口，渲染页面失败');
      })
    },
    //搜索
    onSubmit() {
      //判断部门名称是否有值
      if (this.formInline.depart.trim()) {
        this.$axios({
          url: '/department/queryDepartmentByName',
          headers:{
            'token':sessionStorage.token,
          },
          params: {
            name: this.formInline.depart.trim(),
          },
          method: "get",
        }).then((res) => {
          console.log(res);
          //查询成功有数据
          if (res.status === 200) {
            if (res.data.data.length > 0) {
              //渲染页码
              this.totalAccount = res.data.count;
              //先置空
              this.tableData = [];
              //渲染数据
              (res.data.data).forEach(function (v) {
                if (v.status === 0) {
                  v.status = '未启用';
                } else {
                  v.status = '启用';
                }
              })
              //不显示底部页码
              this.showYeMa = false;
              this.tableData = res.data.data;
            } else {
              alert('未查询到部门名称数据信息');
            }
          }
        }).catch((err) => {
          console.log(err);
        })
      }else if (this.formInline.region && this.formInline.depart.trim() == ''){
        //启用状态有值
        this.$axios({
          url: '/department/queryDepartmentByStatus',
          headers:{
            'token':sessionStorage.token,
          },
          params: {
            status:this.formInline.region,
          },
          method: "get",
        }).then((res) => {
          //查询成功有数据
          if (res.status === 200) {
            if (res.data.data.length > 0) {
              //渲染页码
              this.totalAccount = res.data.count;
              //先置空
              this.tableData = [];
              //渲染数据
              (res.data.data).forEach(function (v) {
                if (v.status === 0) {
                  v.status = '未启用';
                } else {
                  v.status = '启用';
                }
              })
              //不显示底部页码
              this.showYeMa = false;
              this.tableData = res.data.data;
            } else {
              //先置空
              this.tableData = [];
            }
          }
        }).catch((err) => {
          console.log(err);
        })
      }else{
        this.init(this.yeSize,this.yeMa);
        this.showYeMa = true;
      }
    },

    //停用/启用页面的显示
    handleStop(index, row) {
      //渲染页面
      sessionStorage.setItem('stopDepart',JSON.stringify(row));
      if (row.status == '未启用'){
        this.name = row.name;
        this.dialogVisible1 = true;
      }else{
        this.name = row.name;
        //判断该部门是否有账号存在
        let that = this;
        this.$axios({
          url: '/department/queryAllUserByDepartmentId',
          headers:{
            'token':sessionStorage.token,
          },
          method: 'get',
          params: {
            id: row.id,
          }
        }).then((res) => {
          if (res.status === 200) {
            if (res.data.count > 0) {
              //该部门还有人，不能进行停用
              that.dialogVisible2 = true;
            } else {
              //可以进行停用
              that.dialogVisible = true;
            }
          }
        }).catch((err) => {
          alert(err);
        })
      }
    },
    //当确定停用时
    stopStatus(){
      let stopJson = JSON.parse(sessionStorage.getItem('stopDepart'));
      if (stopJson.status == '启用'){
        stopJson.status = 1;
      }else{
        stopJson.status = 0;
      }
      this.$axios({
        url:'/department/updateDepartmentStatus',
        headers:{
          'token':sessionStorage.token,
        },
        method:'post',
        data:{
          id: stopJson.id,
          status: stopJson.status,
        }
      }).then((res)=>{
        if (res.status == 200){
          if (res.data.code == 0){
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            //关闭弹框
            this.dialogVisible1 = false;
            this.dialogVisible = false;
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

    //显示删除部门的弹框
    handleDelete(index, row) {
      //需要判断当前部门是否还有人，有则不删除，并弹框
      let that = this;
      this.name = row.name;
      this.$axios({
        url: '/department/queryAllUserByDepartmentId',
        headers:{
          'token':sessionStorage.token,
        },
        method: 'get',
        params: {
          id: row.id,
        }
      }).then((res) => {
        if (res.status === 200) {
          if (res.data.count > 0) {
            //该部门还有人，不能进行删除
            this.dialogVisible4 = true;
          } else {
            //可以进行删除
            that.deleteId = row.id;
            this.dialogVisible3 = true;
          }
        }
      }).catch((err) => {
        alert(err);
      })
    },
    //删除部门
    departDelete(){
      //删除该部门
      this.$axios({
        url: '/department/deleteDepartment',
        headers:{
          'token':sessionStorage.token,
        },
        method: 'get',
        params: {
          id: this.deleteId,
        }
      }).then((res) => {
        if (res.status === 200){
          if (res.data.code == 0){
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
            this.dialogVisible3 = false;
            //渲染页面
            this.init(this.yeSize,this.yeMa);
          }
        }else{
          this.$message.error('删除失败！');
        }
      })
    },

    //查看人员信息
    handleShow(index,row){
      this.dialogLoading =true;
      this.show = !this.show;
      //渲染页面
      this.$axios({
        url:'/department/queryAllUserByDepartmentId',
        headers:{
          'token':sessionStorage.token,
        },
        method:'get',
        params:{
          id:row.id,
        }
      }).then((res)=>{
        if (res.status === 200){
          if (res.data.data.length > 0){
            console.log(res.data.count);
            this.totalPerson = res.data.count;
            //先置空
            this.tableData1 = [];
            this.tableData1 = res.data.data;
          }else{
            this.totalPerson = 0;
          }
        }
        this.dialogLoading = false;
      }).catch((err)=>{
        this.dialogLoading = false;
        alert(err);
      })
    },
    //查看人员信息页面的关闭
    close1(){
      this.tableData1 = [];
      this.show = !this.show;
    },

    //用来获取每页显示的条数
    handleSizeChange(val) {
      this.yeSize = val;
      this.init(this.yeSize,this.yeMa);
    },
    //用来获取当前点击的是哪一页
    handleCurrentChange(val) {
      this.yeMa = val;
      this.init(this.yeSize,this.yeMa);
    },

    //添加弹框显示
    add(){
      this.dialogFormVisible=true;
    },
    //添加弹框中点击确定
    addQuRen(){
      this.$axios({
        url:'/department/addDepartment',
        headers:{
          'token':sessionStorage.token,
        },
        method:'post',
        data: this.form,
      }).then((res)=>{
        console.log(res);
        if (res.status == 200){
          console.log(res.data.code);
          if (res.data.code == 0){
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.dialogFormVisible = false;
            //刷新页面
            this.init(this.yeSize,this.yeMa)
          }
        }else{
          this.$message.error('添加失败！');
        }
      }).catch((err)=>{
        alert(err);
      })
    },
  }
}
</script>

<style scoped lang="less">
*{
  margin: 0;
  padding: 0;
}
.box{
  line-height: 0px;
  text-align: left;
  position: relative;
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
.el-select{
  width: 100%;
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
    .show{
      text-decoration: none;
      color: #409EFF;
      cursor: pointer;
    }
  }
  .block{
    float: right;
    margin: 20px;
  }
}
.look{
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(117,117,117,0.5);
  .lookKuang{
    width: 400px;
    height: 500px;
    background: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -250px;
    margin-left: -200px;
    border-radius: 4px;
    .s-top{
      border-bottom: 1px #eee solid;
      width: 100%;
      height: 32px;
      .title{
        width: 122px;
        height: 18px;
        font-weight: bold;
        font-size: 18px;
        padding: 16px 0px 0px 18px;
        display: inline-block;
      }
      .total{
        font-size: 15px;
      }
    }
    .showTable{
      height: 400px;
    }
    .b-btn{
      text-align: center;
      margin-top: 14px;
      .c-btn{
        font-size: 15px;
      }
    }
  }
}

.clearfix:after{
  clear: both;
  content:'';
  display:block;
}
</style>
<style lang="less">
.showTable th,.showTable td {
  border-bottom: none !important;
  padding-bottom: 0px!important;
}
.el-dialog__footer {
  text-align: center!important;
}
::-webkit-scrollbar {
  display: none;
}
.el-table::before {
  height: 0px !important;
}
.forbidden{
  color: red;
}
.el-dialog {
  width: 32%!important;
}
.addBox {
  .el-form-item__content {
    width: 54%;
  }
  .btn-kuang{
    margin-right: 46px;
  }
}

</style>