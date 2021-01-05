<template>
  <div id="#app">
      <el-card class="box-card">
            <!-- 订单状态 -->
            <div class="deal-row">
                <span>订单状态：</span> 
                <el-button :key="i" v-for="(v,i) in btnArr1" class="deal-btn" @click="fn(i)" :class="[sel==i?'active':'']">{{v}}</el-button>
              
            </div>
            <!--搜索 查询  -->
            <!-- 4块     10 6 6 2 -->
            <el-row :gutter="30" class="chit-query">
                 <!--搜索  -->
                <el-col :span="8">
                     <div>
                       <el-input placeholder="请输入内容"  v-model="input3" class="input-with-select">
                         <el-select v-model="select" slot="prepend" placeholder="请选择">
                           <el-option label="订单编号" value="1"></el-option>
                           <el-option label="车主名称" value="2"></el-option>
                           <el-option label="手机号码" value="3"></el-option>
                           <el-option label="发动机号" value="4"></el-option>
                         </el-select>
                         <el-button slot="append" icon="el-icon-search"></el-button>
                       </el-input>
                     </div>
                </el-col>
                <!-- 订单数 -->
                <el-col :span="6">
                    <el-col :span="11">
                        <el-input v-model="input1" placeholder="保险金额-最小"></el-input>
                    </el-col>
                     <el-col :span="2">
                         <span>-</span>
                     </el-col>
                    <el-col :span="11">
                        <el-input v-model="input2" placeholder="保险金额-最大"></el-input>
                    </el-col>
                </el-col>
                <!-- 保费金额 -->
                <el-col :span="6">
                    <el-col :span="11">
                        <el-input v-model="input1" placeholder="订单开始时间"></el-input>
                    </el-col>
                     <el-col :span="2">
                         <span>至</span>
                     </el-col>
                    <el-col :span="11">
                        <el-input v-model="input2" placeholder="订单完成时间"></el-input>
                    </el-col>
                </el-col>
                <!-- 查询 重置 -->
                <el-col :span="4">
                     <el-col :span="12">
                        <el-button type="primary" class="query-btn">查询</el-button>
                    </el-col>
                     <el-col :span="12">
                        <el-button type="info" class="query-btn">重置</el-button>
                    </el-col>
                </el-col>
            </el-row>
            <!-- 查询结果 -->
            <el-row>
                <el-col :span="24">
                    <div class="query-ending">查询结果：共计4条数据</div>
                </el-col>
            </el-row>
            <!-- 表格 -->
             <el-table border :data="tableData" stripe style="width: 100%" class="table-Cus-info" :header-cell-style="{background:'#D7D7D7',textAlign: 'center'}" :cell-style="{ textAlign: 'center' }">
                <el-table-column prop="name" label="订单编号" width="150" class="bg-Cus">
                </el-table-column>
                <el-table-column prop="name" label="车牌号码" width="100" class="bg-Cus">
                </el-table-column>
                <el-table-column prop="name" label="发动机号" width="200" class="bg-Cus">
                </el-table-column>
                <el-table-column prop="name" label="保费金额" width="150" class="bg-Cus">
                </el-table-column>
                <el-table-column prop="name" label="品牌型号" width="150" class="bg-Cus">
                </el-table-column>
                <el-table-column prop="name" label="车主名称" width="100" class="bg-Cus">
                </el-table-column>
                <el-table-column prop="tel" label="手机号码" width="100">
                </el-table-column>
                <el-table-column prop="idName" label="关联保单数" width="200">
                </el-table-column>
                <el-table-column prop="orderNum" label="订单完成时间" width="200">
                </el-table-column>
                <el-table-column prop="price" label="订单状态" width="100">
                </el-table-column>
                <el-table-column label="操作">
                     <router-link to="/orderDetails">
                        <el-button type="text" size="small">订单详情</el-button>
                     </router-link>
                </el-table-column>
            </el-table> 
            <!-- 分页 -->
            <el-pagination class="pages-Cus" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
            :page-sizes="[6, 8, 10, 15]" :page-size="10"
             layout="  prev, pager, next,sizes, jumper" :total="60">
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
      btnArr1:['全部','已完成','待处理','已关闭'],
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      select: '',
    //   表格
      tableData: [{
          name: '王小虎',
          tel:'18200209020',
          idName:'511623199702455743',
          orderNum: '1',
          price:'2329.6',
          realName:'已实名',
          operate:'查看详情'
        },{
          name: '王小虎',
          tel:'18200209020',
          idName:'511623199702455743',
          orderNum: '1',
          price:'2329.6',
          realName:'已实名',
          operate:'查看详情'
        },{
          name: '王小虎',
          tel:'18200209020',
          idName:'511623199702455743',
          orderNum: '1',
          price:'2329.6',
          realName:'已实名',
          operate:'查看详情'
        },{
          name: '王小虎',
          tel:'18200209020',
          idName:'511623199702455743',
          orderNum: '1',
          price:'2329.6',
          realName:'已实名',
          operate:'查看详情'
        },{
          name: '王小虎',
          tel:'18200209020',
          idName:'511623199702455743',
          orderNum: '1',
          price:'2329.6',
          realName:'已实名',
          operate:'查看详情'
        }],
    // 分页
     currentPage1: 5,
     currentPage2: 5,
     currentPage3: 5,
     currentPage4: 4
    }
  },
  methods: {
    // 1、按钮
      fn(val){
        this.sel=val;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      viewDatails(){
          alert(111);
      }
    },
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