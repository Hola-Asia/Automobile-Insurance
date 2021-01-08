<template>
  <div id="#app">
      <el-card class="box-card">
            <!-- 实名状态 -->
            <div class="deal-row">
                <span>实名状态：</span> 
                <el-button :key="i" v-for="(v,i) in btnArr2" class="deal-btn" @click="fn1(i)" :class="[sel1==i?'active':'']">{{v}}</el-button>
            </div>
            <!--搜索 查询  -->
            <!-- 4块     10 6 6 2 -->
            <el-form :model="numberValidateForm" ref="numberValidateForm">
                <el-row :gutter="30">
                 <!--搜索  -->
                <el-col :span="8">
                     <el-form-item prop="input3">
                       <el-input placeholder="请输入内容" v-model="numberValidateForm.input3" class="input-with-select">
                         <el-select class="cus-sel" v-model="select" slot="prepend" placeholder="请选择">
                           <el-option label="车主名称" value="1"></el-option>
                           <el-option label="手机号码" value="2"></el-option>
                           <el-option label="证件号码" value="3"></el-option>
                         </el-select>
                         <el-button slot="append" icon="el-icon-search"></el-button>
                       </el-input>
                     </el-form-item>
                </el-col>
                <el-col :span="6">
                </el-col>
                <el-col :span="6">
                </el-col>
                <!-- 查询 重置 -->
                <el-col :span="4">
                     <el-col :span="12">
                        <el-button type="primary" class="query-btn" @click='queryCusInfo'>查询</el-button>
                    </el-col>
                     <el-col :span="12">
                        <el-button type="info" class="query-btn" @click='resetForm("numberValidateForm")'>重置</el-button>
                    </el-col>
                </el-col>
                </el-row>
            </el-form>
            <!-- 查询结果 -->
            <el-row>
                <el-col :span="24">
                    <div class="query-ending">查询结果：共计{{total}}条数据</div>
                </el-col>
            </el-row>
            <!-- 表格 -->
             <el-table border :data="tableData" stripe style="width: 100%" class="table-Cus-info" :header-cell-style="{background:'#D7D7D7',textAlign: 'center'}" :cell-style="{ textAlign: 'center' }">
                <el-table-column prop="holder" label="车主名称" width="200" class="bg-Cus">
                </el-table-column>
                <el-table-column prop="phone_number" label="手机号码" width="200">
                </el-table-column>
                <el-table-column prop="idcard_number" label="证件号码" width="280">
                </el-table-column>
                <el-table-column prop="count_sum" label="订单数" width="200">
                </el-table-column>
                <el-table-column prop="amount_sum" label="保费金额" width="200">
                </el-table-column>
                <el-table-column prop="authentication_id" label="实名认证" width="200">
                </el-table-column>
                <el-table-column label="操作">
                   <template slot-scope="scope">
                     <router-link :to="{name:'ViewInfo',params:{id:id}}">
                        <el-button type="text" size="small" @click="viewPersonInfo(scope.row)">查看详情</el-button>
                     </router-link>
                   </template>
                </el-table-column>
            </el-table> 
            <!-- 分页 -->
            <el-pagination class="pages-Cus" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.page"
            :page-sizes="[2, 3, 4, 5]" :page-size="queryInfo.limit "
             layout="prev, pager, next,sizes, jumper" :total="total">
            </el-pagination>
      </el-card>
  </div>
</template>

<script>
export default {
  name: "Customer",
  data() {
    return {
      // 2、按钮 实名状态
      sel1:0,
      btnArr2:['全部','已实名','未实名'],
      sel2:'',
      // 3.表单
      numberValidateForm:{
        // 搜索框
        input3: '',
      },
      token:sessionStorage.token,
      // 下拉框
      select: '',
    //   表格
      tableData: [],
    // 分页
    queryInfo:{
          query:'',
          // 当前的页数
          page:1,
          // 当前每页显示多少条数据
          limit:3
       },
     userlist:[],
     total:20,
    //用户id
    id:1,
    }
  },
  created(){
      this.userList();
      this.userlistTotal();
  },
  methods: {
    // 按钮的颜色变化
      fn1(val){
        this.sel1=val;
        this.sel2=this.sel1;
        if(this.sel1==0){
          this.sel2='';
        }
      },
      // 查询
      queryCusInfo(){
        switch (this.select){
          case '':
            this.$message.error('请选择查询方式哦！');
             break;
          case '1':
            // 车主名称
             this.$axios({
              url:'/customer/queryCustomerByHolder',
              method:'post',
              headers:{
              'token':this.token
            },
              data:{
                startIndex:this.queryInfo.page,
                pageSize:this.queryInfo.limit,
                holder:this.numberValidateForm.input3,
                authenticationId:this.sel2
              }
           }).then((res)=>{
                console.log(res.data.data);
                this.tableData=res.data.data;
                this.total=this.tableData.length;
                console.log(this.total);
                this.isRealName(res.data.data);
           }).catch((err)=>{
                console.log(err);
           });
             break;
          case '2':
            // 手机号码
             this.$axios({
               url:'/customer/queryCustomerByPhone',
               method:'post',
               headers:{
                  'token':this.token
                },
               data:{
                 phoneNumber:this.numberValidateForm.input3,
                 startIndex:this.queryInfo.page,
                 pageSize:this.queryInfo.limit,
                 authenticationId:this.sel2
               }
             }).then((res)=>{
              //  console.log(res);
                console.log(res.data.data);
                this.tableData=res.data.data;
                this.total=this.tableData.length;
                this.isRealName(res.data.data);
             }).catch((err)=>{
               console.log(err);
             })
             break;
          case '3':
            // 证件号码
            this.$axios({
               url:'/customer/queryCustomerByIdcard',
               method:'post',
               headers:{
                  'token':this.token
                },
               data:{
                 idCardNumber:this.numberValidateForm.input3,
                 startIndex:this.queryInfo.page,
                 pageSize:this.queryInfo.limit,
                 authenticationId:this.sel2
               }
             }).then((res)=>{
               console.log(res);
                console.log(res.data.data);
                this.tableData=res.data.data;
                this.total=this.tableData.length;
                this.isRealName(res.data.data);
                
             }).catch((err)=>{
               console.log(err);
             })
             break;
        }
      },
      // 重置
      resetForm(formName){
        this.$refs[formName].resetFields();
        this.userList();
        this.userlistTotal();
        this.sel1=0;
      },
      // 渲染用户列表
      userList(){
        this.$axios({
          url:'/customer/list',
          headers:{
              'token':this.token
            },
          params:{
            startIndex:this.queryInfo.page,
            pageSize:this.queryInfo.limit
          }
        }).then((res)=>{
          this.tableData=res.data.data;
          // 判断是否实名认证
          this.isRealName(res.data.data);
        }).catch((err)=>{
          console.log(err);
        });
      },
      // 获取客户总数据
      userlistTotal(){
        this.$axios({
          url:'/customer/listAll',
          headers:{
              'token':this.token
            },
        }).then((res)=>{
          this.total=res.data.data.length;
        }).catch((err)=>{
          console.log(err);
        });
      },
    // 监听pagesize改变的事件
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.queryInfo.limit=val;
        console.log(this.limit);
        this.userList();
      },
      // 监听 页码值 改变的事件
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.queryInfo.page=val;
        // console.log(this.page);
        this.userList();
      },
      // 获取当前用户的id
      viewPersonInfo(row){
         this.id=row.id;
      },
      viewDatails(){
          alert(111);
      },
      // 判断是否实名
      isRealName(data){
         for(var i=0;i<=data.length;i++){
            if(data[i].authentication_id==1){
              this.tableData[i].authentication_id='已实名'
            }else{
              data[i].authentication_id='未实名'
            }
          }
      }
  },
}
</script>

<style lang="less"  scoped>

  .letter{
    float: left;
  }
  /* .clearfix{
    content: '';
    display: block;
    clear: both;
  } */
  .cus-sel{
    width: 120px;
    
  }
  .box-card{
      line-height: 42px;
       /* 交易 */
    .deal-row{
        display: flex;
        width: 600px;
        height: 44px;
        margin-bottom: 30px;
        .deal-btn{
            width: 150px;
            margin-left: 20px;
        }
        .active{
          background-color: #409EFF;
          color: #fff;
        }
    }
    // 搜索
     .el-select .el-input {
     width: 120px;
     }
    .input-with-select .el-input-group__prepend {
    background-color: #fff;
    }
    // 查询
    .query-btn{
        width: 100%;
    }
    // 查询结果
    .query-ending{
        height: 50px;
        line-height: 50px;
        background-color: #C3E6F5;
        margin-top: 30px;
        text-align: left;
        padding-left: 20px;
    }
    // 表单
    .table-Cus-info{
        // border: 1px solid #ccc;
        margin-top: 20px;
        // text-align: center!important;
        .bg-Cus{
            background-color: #D7D7D7;
            text-align: center;

        }
    }
    // 分页
    .pages-Cus{
        margin-top: 20px;
        text-align: right;
        padding-right: 20px;
    }
  }
</style>