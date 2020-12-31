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
              <el-option label="已启用" value="hasStart"></el-option>
              <el-option label="未启用" value="hasNotStart"></el-option>
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
            :data="tableData"
            border
            style="width: 100%" :header-cell-style="{background:'#D7D7D7',fontSize:'14x',textAlign:'center'}"
            :cell-style="{textAlign:'center',fontSize:'13x',padding:'0px'}"
            :row-style="{height:'50px'}"
            :row-class-name="tableRowClassName">
          <el-table-column
              prop="departName"
              label="部门名称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="date"
              label="创建时间"
              width="240">
          </el-table-column>
          <el-table-column
              label="查看人员">
              <a type="primary" @click="handleShow" class="show">查看</a>
<!--              <a href="javascript:;" class="show" @click="handleShow">查看</a>-->
          </el-table-column>
          <el-table-column
              prop="enableStatus"
              label="启用状态"
              width="180">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="primary"
                  @click="handleStop(scope.$index, scope.row)">停用</el-button>
              <el-button
                  size="mini"
                  type="primary"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--底部页码-->
        <div class="block clearfix">
          <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[5, 10, 15]"
              :page-size="100"
              layout=" prev, pager, next, sizes , jumper"
              :total="20">
          </el-pagination>
        </div>
      </div>
    </el-card>
    <!--添加-->
    <div v-show="addShow" class="tianJia">
      <div class="addKuang">
        <p class="addDepart">添加部门</p>
        <label for="userName">部门名称：</label>
        <el-input v-model="departmentName" placeholder="请输入1-16字的账号名称" id="userName" class="inpt"></el-input><br>
        <label>启用状态：</label>
        <el-select v-model="status" placeholder="请选择" class="inpt">
          <el-option
              v-for="item in qiYong"
              :key="item.status"
              :label="item.label"
              :value="item.status">
          </el-option>
        </el-select><br>
        <div class="b-btn">
          <el-button type="info" class="c-btn" @click="clear">取消</el-button>
          <el-button type="primary" class="c-btn">确认</el-button>
        </div>
      </div>
    </div>
    <!--查看-->
    <div v-show="show" class="look">
      <div class="lookKuang">
        <div class="s-top">
          <span class="title">查看部门人员</span>
          <span class="total">共计11人</span>
        </div>
        <div class="showTable">
          <el-table
              :data="tableData1"
              style="width: 100%;height: 400px;overflow:scroll;overflow-x: hidden; overflow-y: auto;" :header-cell-style="{fontSize:'14x',textAlign:'center'}"
              :cell-style="{textAlign:'center',fontSize:'13x',padding:'0px'}"
              :row-style="{height:'40px',border:'none'}"
              stripe>
            <el-table-column
                prop="accountName"
                label="账号名称"
                width="90">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="手机号码"
                width="120">
            </el-table-column>
            <el-table-column
                prop="depart"
                label="归属部门"
                width="100">
            </el-table-column>
            <el-table-column
                prop="position"
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
  </div>
</template>
<script>
export default {
  name: "DepartmentManage",
  data() {
    return {
      formInline: {
        depart: '',
        region: ''
      },

      tableData1: [{
        accountName: '王小虎',
        phone: '13512456321',
        depart: '产品部',
        position: '产品经理',
      }, {
        accountName: '王小虎',
        phone: '13512456321',
        depart: '产品部',
        position: '产品经理',
      }, {
        accountName: '王小虎',
        phone: '13512456321',
        depart: '产品部',
        position: '产品经理',
      }, {
        accountName: '王小虎',
        phone: '13512456321',
        depart: '产品部',
        position: '产品经理',
      },{
        accountName: '王小虎',
        phone: '13512456321',
        depart: '产品部',
        position: '产品经理',
      }, {
        accountName: '王小虎',
        phone: '13512456321',
        depart: '产品部',
        position: '产品经理',
      },{
        accountName: '王小虎',
        phone: '13512456321',
        depart: '产品部',
        position: '产品经理',
      },{
        accountName: '王小虎',
        phone: '13512456321',
        depart: '产品部',
        position: '产品经理',
      }, {
        accountName: '王小虎',
        phone: '13512456321',
        depart: '产品部',
        position: '产品经理',
      },{
        accountName: '王小虎',
        phone: '13512456321',
        depart: '产品部',
        position: '产品经理',
      },{
        accountName: '王小虎',
        phone: '13512456321',
        depart: '产品部',
        position: '产品经理',
      }, {
        accountName: '王小虎',
        phone: '13512456321',
        depart: '产品部',
        position: '产品经理',
      },{
        accountName: '王小虎',
        phone: '13512456321',
        depart: '产品部',
        position: '产品经理',
      },{
        accountName: '王小虎',
        phone: '13512456321',
        depart: '产品部',
        position: '产品经理',
      }, {
        accountName: '王小虎',
        phone: '13512456321',
        depart: '产品部',
        position: '产品经理',
      }],
      addShow:false,
      show:false,

      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      departmentName:'',
      qiYong:[{
        status: '选项1',
        label: '已启用'
      }, {
        status: '选项2',
        label: '未启用'
      }],
      status: '',

      tableData: [{
        departName: '王小X',
        date:'2016-09-12  10：32：12',
        enableStatus:'已启用',
      }, {
        departName: '王小X',
        date:'2016-09-12  10：32：12',
        enableStatus:'已启用',
      }, {
        departName: '王小X',
        date:'2016-09-12  10：32：12',
        enableStatus:'已启用',
      }, {
        departName: '王小X',
        date:'2016-09-12  10：32：12',
        enableStatus:'已启用',
      },{
          departName: '王小X',
          date:'2016-09-12  10：32：12',
          enableStatus:'已启用',
      },{
          departName: '王小X',
          date:'2016-09-12  10：32：12',
          enableStatus:'已启用',
      },{
          departName: '王小X',
          date:'2016-09-12  10：32：12',
          enableStatus:'已启用',
      },{
          departName: '王小X',
          date:'2016-09-12  10：32：12',
          enableStatus:'已启用',
      },{
          departName: '王小X',
          date:'2016-09-12  10：32：12',
          enableStatus:'已启用',
      },{
          departName: '王小X',
          date:'2016-09-12  10：32：12',
          enableStatus:'已启用',
        },,{
        departName: '王小X',
        date:'2016-09-12  10：32：12',
        enableStatus:'已启用',
      },{
        departName: '王小X',
        date:'2016-09-12  10：32：12',
        enableStatus:'已启用',
      },{
        departName: '王小X',
        date:'2016-09-12  10：32：12',
        enableStatus:'已启用',
      },{
        departName: '王小X',
        date:'2016-09-12  10：32：12',
        enableStatus:'已启用',
      },],
    };
  },
  methods: {
    close1(){
      this.show = !this.show;
    },
    onSubmit() {
      console.log('submit!');
    },
    handleStop(index, row) {
      //需要判断当前部门是都还有人，有则不删除，并弹框
      if (true){
        this.$alert('<strong style="color: red;font-size: 15px;text-align: center">该部门仍存在人员，请将人员转移部门后，才能停用该部门</strong>', '账号启用/停用', {
          dangerouslyUseHTMLString: true
        });
      }else{
        this.$confirm('确定将 产品部 停用吗？停用后，所有账号将无法选择该部门', '账号启用/停用', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
            .then(() => {
              this.$message({
                type: 'info',
                message: '保存修改'
              });
            })
            .catch(action => {
              this.$message({
                type: 'info',
                message: '取消修改'
              })
            });
      }
      console.log(index, row);
    },
    handleDelete(index, row) {
      //需要判断当前部门是都还有人，有则不删除，并弹框
      if (false){
        this.$alert('<strong style="color: #FF0000;font-weight:400;font-size: 15px;text-align: center">该部门仍存在人员，请将人员转移部门后，才能删除该部门</strong>', '账号启用/停用', {
          dangerouslyUseHTMLString: true
        });
      }else{
        this.$confirm('确定将 产品部 删除吗？删除后，所有账号将无法选择该部门', '账号启用/停用', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
            .then(() => {
              this.$message({
                type: 'info',
                message: '保存修改'
              });
            })
            .catch(action => {
              this.$message({
                type: 'info',
                message: '取消修改'
              })
            });
      }
      console.log(index, row);
    },
    handleShow(){
      this.show = !this.show;
    },
    // tableRowClassName({row,rowIndex}) {
    //   if (rowIndex === 1) {
    //     return 'warning-row';
    //   }
    //   // if (rowIndex%2 === 0) {
    //   //   return 'select-row';
    //   // }
    //   return '';
    // },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    add(){
      this.addShow=!this.addShow;
    },
    clear(){
      this.addShow=!this.addShow;
    }
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
    margin: 0 auto;
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
.tianJia{
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(117,117,117,0.5);
  .addKuang{
    width: 400px;
    height: 300px;
    background: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -150px;
    margin-left: -200px;
    border-radius: 4px;
    .addDepart{
      width: 100%;
      height: 30px;
      font-weight: bold;
      font-size: 20px;
      padding: 32px 0px 0px 16px;
    }
    label{
      display: inline-block;
      width: 95px;
      margin: 23px 10px 42px 30px;
    }
    .inpt{
      width: 227px;
      height: 15px;
    }
    .b-btn{
      text-align: center;
      margin-top: 14px;
    }
    .c-btn{
      margin-right: 32px;
    }
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
::-webkit-scrollbar {
  display: none;
}
.el-table::before {
  height: 0px !important;
}
</style>