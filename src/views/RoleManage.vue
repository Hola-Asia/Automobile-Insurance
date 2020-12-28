<template>
  <div class="box">
    <!--头部-->
    <div class="header clearfix">
      <div class="container">
        <ul>
          <li><router-link to="accountManage" class="h-btn">账号管理</router-link></li>
          <li><router-link to="departmentManage" class="h-btn">部门管理</router-link></li>
          <li><router-link to="roleManage" class="h-btn" style="color:#66B1FF;">角色管理</router-link></li>
        </ul>
      </div>
    </div>
    <!--中间-->
    <el-card class="box-card">
      <div class="middle-top">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="角色名称" class="m-top-font">
            <el-input v-model="formInline.role" placeholder="请输入角色名称"></el-input>
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
        <router-link to="AddRole" class="h-add el-icon-plus">添加角色</router-link>
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
              prop="roleName"
              label="角色名称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="date"
              label="创建时间"
              width="240">
          </el-table-column>
          <el-table-column
              label="人员明细">
            <a href="javascript:;" class="show" @click="handleShow">查看</a>
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
              <router-link to="EditRole" class="h-edit">编辑</router-link>
            </template>
          </el-table-column>
        </el-table>
        <!--底部页码-->
        <div class="block clearfix">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[5, 10, 15]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "RoleManage",
  data() {
    return {
      formInline: {
        role: '',
        region: ''
      },
      addShow:false,
      look:true,
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
        roleName: '王小X',
        date:'2016-09-12  10：32：12',
        enableStatus:'已启用',
      }, {
        roleName: '王小X',
        date:'2016-09-12  10：32：12',
        enableStatus:'已启用',
      }, {
        roleName: '王小X',
        date:'2016-09-12  10：32：12',
        enableStatus:'已启用',
      }, {
        roleName: '王小X',
        date:'2016-09-12  10：32：12',
        enableStatus:'已启用',
      },{
        roleName: '王小X',
        date:'2016-09-12  10：32：12',
        enableStatus:'已启用',
      },{
        roleName: '王小X',
        date:'2016-09-12  10：32：12',
        enableStatus:'已启用',
      },{
        roleName: '王小X',
        date:'2016-09-12  10：32：12',
        enableStatus:'已启用',
      },{
        roleName: '王小X',
        date:'2016-09-12  10：32：12',
        enableStatus:'已启用',
      },{
        roleName: '王小X',
        date:'2016-09-12  10：32：12',
        enableStatus:'已启用',
      },{
        roleName: '王小X',
        date:'2016-09-12  10：32：12',
        enableStatus:'已启用',
      }],
    };
  },
  methods: {
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
        this.$alert('<strong style="color: red;font-size: 15px;text-align: center">该部门仍存在人员，请将人员转移部门后，才能删除该部门</strong>', '账号启用/停用', {
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
      const h = this.$createElement;
      this.$msgbox({
        title: '查看部门人员 共计1人',
        message: h('p', null, [
          h('span', null, '内容可以是 '),
          h('i', { style: 'color: teal' }, 'VNode')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        });
      });
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
    .show{
      text-decoration: none;
      color: #409EFF;
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