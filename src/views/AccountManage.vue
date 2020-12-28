<template>
  <div class="box">
      <!--头部-->
      <div class="header clearfix">
        <div class="container">
          <ul>
            <li><router-link to="accountManage" class="h-btn" style="color:#66B1FF;">账号管理</router-link></li>
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
                  <el-option label="已启用" value="hasStart"></el-option>
                  <el-option label="未启用" value="hasNotStart"></el-option>
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
              :data="tableData"
              border
              style="width: 100%" :header-cell-style="{background:'#D7D7D7',fontSize:'14x',textAlign:'center'}"
              :cell-style="{textAlign:'center',fontSize:'13x',padding:'0px'}"
              :row-style="{height:'50px'}"
              :row-class-name="tableRowClassName">
            <el-table-column
                prop="user"
                label="账号名称"
                width="120">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="手机号码"
                width="120">
            </el-table-column>
            <el-table-column
                prop="address"
                label="归属部门"
                width="120">
            </el-table-column>
            <el-table-column
                prop="date"
                label="账号创建时间"
                width="182">
            </el-table-column>
            <el-table-column
                prop="position"
                label="职位"
                width="120">
            </el-table-column>
            <el-table-column
                prop="role"
                label="角色"
                width="120">
            </el-table-column>
            <el-table-column
                prop="enableStatus"
                label="启用状态"
                width="120">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="primary"
                    @click="handleStop(scope.$index, scope.row)">停用</el-button>
                <router-link to="EditAccount" class="h-edit">编辑</router-link>
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
  name: "AccountManage",
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      tableData: [{
        user: '王小X',
        phone:'13215551232',
        address:'技术部',
        date:'2016-09-12  10：32：12',
        position:'技术经理',
        role:'系统管理员',
        enableStatus:'已启用',
      }, {
        user: '王小X',
        phone:'13215551232',
        address:'技术部',
        date:'2016-09-12  10：32：12',
        position:'技术经理',
        role:'系统管理员',
        enableStatus:'已启用',
      }, {
        user: '王小X',
        phone:'13215551232',
        address:'技术部',
        date:'2016-09-12  10：32：12',
        position:'技术经理',
        role:'系统管理员',
        enableStatus:'已启用',
      }, {
        user: '王小X',
        phone:'13215551232',
        address:'技术部',
        date:'2016-09-12  10：32：12',
        position:'技术经理',
        role:'系统管理员',
        enableStatus:'已启用',
      },
        {
          user: '王小X',
          phone:'13215551232',
          address:'技术部',
          date:'2016-09-12  10：32：12',
          position:'技术经理',
          role:'系统管理员',
          enableStatus:'已启用',
        },
        {
          user: '王小X',
          phone:'13215551232',
          address:'技术部',
          date:'2016-09-12  10：32：12',
          position:'技术经理',
          role:'系统管理员',
          enableStatus:'已启用',
        },{
          user: '王小X',
          phone:'13215551232',
          address:'技术部',
          date:'2016-09-12  10：32：12',
          position:'技术经理',
          role:'系统管理员',
          enableStatus:'已启用',
        },{
          user: '王小X',
          phone:'13215551232',
          address:'技术部',
          date:'2016-09-12  10：32：12',
          position:'技术经理',
          role:'系统管理员',
          enableStatus:'已启用',
        },{
          user: '王小X',
          phone:'13215551232',
          address:'技术部',
          date:'2016-09-12  10：32：12',
          position:'技术经理',
          role:'系统管理员',
          enableStatus:'已启用',
        },{
          user: '王小X',
          phone:'13215551232',
          address:'技术部',
          date:'2016-09-12  10：32：12',
          position:'技术经理',
          role:'系统管理员',
          enableStatus:'已启用',
        }],

    };
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    handleStop(index, row) {
      this.$confirm('确定将王小X(1315242XXXX)的账号停用吗？停用后，王小X将无法登录后台', '账号启用/停用', {
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
      console.log(index, row);
    },
    handleEdit(index, row) {
      console.log(index, row);
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

  }
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
          //&:first-child{
          //  color:#66B1FF;
          //}
          &:hover{
            color:#66B1FF;
          }
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