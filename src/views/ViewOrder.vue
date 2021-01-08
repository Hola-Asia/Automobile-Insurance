<template>
  <div id="#app">
      <el-card class="box-card">
            <!-- 订单状态 -->
            <div class="deal-row">
                <span>订单状态：</span> 
                <el-button :key="i" v-for="(v,i) in btnArr1" class="deal-btn" @click="fn(i)" :class="[sel==i?'active':'']">{{v}}</el-button>
            </div>
            <!-- 查询结果 -->
            <el-row>
                <el-col :span="24">
                    <div class="query-ending">查询结果：共计{{queryPageInfo.total}}条数据</div>
                </el-col>
            </el-row>
            <!-- 表格 -->
             <el-table border :data="tableData" stripe style="width: 100%" class="table-Cus-info" :header-cell-style="{background:'#D7D7D7',textAlign: 'center'}" :cell-style="{ textAlign: 'center' }">
                <el-table-column prop="oder_number" label="订单编号" width="160" class="bg-Cus">
                </el-table-column>
                <el-table-column prop="car_number" label="车牌号码" width="160" class="bg-Cus">
                </el-table-column>
                <el-table-column prop="chassis_number" label="发动机号" width="200" class="bg-Cus">
                </el-table-column>
                <el-table-column prop="amount" label="保费金额" width="150" class="bg-Cus">
                </el-table-column>
               <!--  <el-table-column prop="oder_number" label="品牌型号" width="150" class="bg-Cus">
                </el-table-column> -->
                <el-table-column prop="name" label="车主名称" width="140" class="bg-Cus">
                </el-table-column>
                <el-table-column prop="phone" label="手机号码" width="200">
                </el-table-column>
                <!-- <el-table-column prop="o_id" label="关联保单数" width="120">
                </el-table-column> -->
                <el-table-column prop="oder_time" label="订单完成时间" width="280">
                </el-table-column>
                <el-table-column prop="oder_status" label="订单状态" width="120">
                </el-table-column>
                <el-table-column label="操作">
                     <!-- <router-link :to="{name:'Details',params:{id:id}}"> -->
                        <el-button type="text" size="small" @click="detailsInfo">订单详情</el-button>
                     <!-- </router-link> -->
                </el-table-column>
            </el-table> 
            <!-- 分页 -->
            <el-pagination class="pages-Cus" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryPageInfo.page"
            :page-sizes="[1, 2, 3]" :page-size="queryPageInfo.limit"
             layout="prev, pager, next,sizes, jumper" :total="queryPageInfo.total">
            </el-pagination>
      </el-card>
  </div>
</template>

<script>
export default {
  name: "Customer",
  data() {
    return {
      // 1、按钮 订单状态
      sel:0,
      sel1:'',
      btnArr1:['全部','已完成','待处理','已关闭'],
      // 表格
      tableData: [],
      // 分页
      queryPageInfo:{
      // 当前页
      page:1,
      // 当前每页显示多少条数据
      limit:3,
      // 总数
      total:3,
      },
      id:'',
      token:sessionStorage.token
    }
  },
  methods: {
    // 1、按钮
      fn(val){
        this.sel=val;
        if(this.sel==0){
          this.sel1='';
        }else{
          this.sel1=this.sel-1;
        }
        // 发送axios
        this.orderList();
      },
     //2、获取用户id
        getId(){
         this.id=this.$route.params.id;
        },
     //3、渲染列表数据
      orderList(){
        this.$axios({
          url:'/customer/queryCustomerOrder',
          method:'post',
          headers:{
              'token':this.token
            },
          data:{
            startIndex:(this.queryPageInfo.page-1)*this.queryPageInfo.limit,
            pageSize:this.queryPageInfo.limit,
            oderStatus:this.sel1,
            id:this.id
          }
        }).then((res)=>{
          this.tableData=res.data.data.list;
          this.queryPageInfo.total=res.data.data.total;
          for(var i=0;i<res.data.data.list.length;i++){
             // 判断是否实名
              switch(res.data.data.list[i].oder_status){
                  case 0:
                    res.data.data.list[i].oder_status='已完成';
                    break;
                    // 已完成 待处理 已关闭
                  case 1:
                    res.data.data.list[i].oder_status='待处理';
                    break;
                  case 2:
                    res.data.data.list[i].oder_status='已关闭';
                    break;
              }
              // 把时间戳转换为具体日期
              // 转换为两位数字
            function double(data){
                return data>=10?data:'0'+data;
            }
            // 获取到时间戳，在把时间戳改为正常的格式
               let b= res.data.data.list[i].oder_time;
               let g=new Date(b);
               let d=g.getFullYear() + '-' +double(g.getMonth() + 1) + '-'+double(g.getDate())  + ' ' +double(g.getHours())  + ':' +double(g.getMinutes())  + ':' +double(g.getSeconds());
               res.data.data.list[i].oder_time=d;
          }
          
          
        }).catch((err)=>{
          console.log(err);
        })
      },
     // 4、分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.queryPageInfo.limit=val;
        this.orderList();
      },
      handleCurrentChange(val) {
        this.queryPageInfo.page=val;
        console.log(`当前页: ${val}`);
        this.orderList();

      },
      // 5、订单状态
      detailsInfo(){
        this.$router.push('/details?id='+this.id);
      }
    },
    created(){
      this.getId();
      this.orderList();
    }
}
</script>

<style lang="less"  scoped>

  .letter{
    float: left;
  }
  .clearfix{
    content: '';
    display: block;
    clear: both;
  }
  .chit-query{
      margin-top: 30px;
  }
  .box-card{
    //   height: 100%;
      line-height: 42px;
       /* 交易 */
    .deal-row{
        display: flex;
        width: 800px;
        height: 44px;
        margin-bottom: 10px;
        .deal-btn{
            width: 150px;
            margin-left: 20px;
            // color: #000;
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