<template>
  <div id="#app">
    <el-row>
      <el-col :span="24" class="clearfix">
        <el-row>
            <div class="grid-content letter">
              <span>订单状态</span>
            </div>
            <div class="grid-content">
              <el-button type="primary" plain>全部</el-button>
              <el-button type="primary" plain>已完成</el-button>
              <el-button type="primary" plain>待处理</el-button>
              <el-button type="primary" plain>已关闭</el-button>
            </div>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="clearfix">
      <el-dropdown class="drop" trigger="click" @command="changeSel">
        <span class="el-dropdown-link">{{sel}}<i class="el-icon-arrow-down el-icon--right"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(v,i) in selArr" :command = i>{{v}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-input v-model="selName" class="inputName" :placeholder = placeStr></el-input>
      <el-input v-model="selName" class="inputPrice" placeholder = '保费金额-最小' prefix-icon="iconfont icon-iconmoney"></el-input> -
      <el-input v-model="selName" class="inputPrice" placeholder = '保费金额-最大' prefix-icon="iconfont icon-iconmoney"></el-input>
      <div class="block">
        <el-date-picker
            v-model="datePicStart"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="checkBtn">
        <el-button type="primary">查询</el-button>
        <el-button type="info">重置</el-button>
      </div>
    </el-row>
    <el-row>
      <el-col :span="24" class="resultNum"><span>查询结果：共计4条数据</span></el-col>
    </el-row>
    <el-row>
      <el-table
          :data="tableData"
          stripe
          :header-cell-style="{background:'#D7D7D7',color:'#000',fontWeight:'normal'}"
          style="width: 100%">
        <el-table-column
            align="center"
            prop="id"
            label="订单编号"
            width="180">
        </el-table-column>
        <el-table-column
            align="center"
            prop="license"
            label="车牌号码"
            width="180">
        </el-table-column>
        <el-table-column
            align="center"
            prop="frame"
            label="车架号码">
        </el-table-column>
        <el-table-column
            align="center"
            prop="price"
            label="保费金额">
        </el-table-column>
        <el-table-column
            align="center"
            prop="type"
            label="品牌型号">
        </el-table-column>
        <el-table-column
            align="center"
            prop="name"
            label="车主名称">
        </el-table-column>
        <el-table-column
            align="center"
            prop="phone"
            label="手机号码">
        </el-table-column>
        <el-table-column
            align="center"
            prop="time"
            label="订单完成时间">
        </el-table-column>
        <el-table-column
            prop="status"
            align="center"
            label="订单状态">
        </el-table-column>
        <el-table-column
            label="操作"
            align="center">
            <a href="javascript:" class="desc">订单详情</a>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="clearfix">
      <div class="block pageNav">
        <el-pagination
            background
            layout="prev, pager, next, sizes, jumper"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="10"
            :total="1000">
        </el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
import '../assets/icon/zr/iconfont.css';
export default {
  name: "Order",
  data:function(){
    return {
      //下拉框数据
      placeStr:'请选择筛选方式',
      sel:'筛选方式',
      selArr:['订单编号','车主名称','手机号码','车架号','车牌号'],
      selName:'',
      datePicStart:'',
      currentPage4: 1,
      pickerOptions: {
        shortcuts: [{
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      tableData: [{
        id: 'CX4584121456',
        license: '川A-XXXXX',
        frame: 'LFGPB56521156XXXX',
        price: '3829.6',
        type: '雅阁HG7154CBMA轿车',
        name: '王小X',
        phone: '1315242XXXX',
        time: '2020-09-11  19：08：09',
        status: '已完成',
      }, {
        id: 'CX4584121456',
        license: '川A-XXXXX',
        frame: 'LFGPB56521156XXXX',
        price: '3829.6',
        type: '雅阁HG7154CBMA轿车',
        name: '王小X',
        phone: '1315242XXXX',
        time: '2020-09-11  19：08：09',
        status: '待处理',
      }, {
        id: 'CX4584121456',
        license: '川A-XXXXX',
        frame: 'LFGPB56521156XXXX',
        price: '3829.6',
        type: '雅阁HG7154CBMA轿车',
        name: '王小X',
        phone: '1315242XXXX',
        time: '2020-09-11  19：08：09',
        status: '已关闭',
      }, {
        id: 'CX4584121456',
        license: '川A-XXXXX',
        frame: 'LFGPB56521156XXXX',
        price: '3829.6',
        type: '雅阁HG7154CBMA轿车',
        name: '王小X',
        phone: '1315242XXXX',
        time: '2020-09-11  19：08：09',
        status: '已完成',
      }, {
        id: 'CX4584121456',
        license: '川A-XXXXX',
        frame: 'LFGPB56521156XXXX',
        price: '3829.6',
        type: '雅阁HG7154CBMA轿车',
        name: '王小X',
        phone: '1315242XXXX',
        time: '2020-09-11  19：08：09',
        status: '已完成',
      }, {
        id: 'CX4584121456',
        license: '川A-XXXXX',
        frame: 'LFGPB56521156XXXX',
        price: '3829.6',
        type: '雅阁HG7154CBMA轿车',
        name: '王小X',
        phone: '1315242XXXX',
        time: '2020-09-11  19：08：09',
        status: '已完成',
      }, {
        id: 'CX4584121456',
        license: '川A-XXXXX',
        frame: 'LFGPB56521156XXXX',
        price: '3829.6',
        type: '雅阁HG7154CBMA轿车',
        name: '王小X',
        phone: '1315242XXXX',
        time: '2020-09-11  19：08：09',
        status: '已完成',
      }, {
        id: 'CX4584121456',
        license: '川A-XXXXX',
        frame: 'LFGPB56521156XXXX',
        price: '3829.6',
        type: '雅阁HG7154CBMA轿车',
        name: '王小X',
        phone: '1315242XXXX',
        time: '2020-09-11  19：08：09',
        status: '已完成',
      }, {
        id: 'CX4584121456',
        license: '川A-XXXXX',
        frame: 'LFGPB56521156XXXX',
        price: '3829.6',
        type: '雅阁HG7154CBMA轿车',
        name: '王小X',
        phone: '1315242XXXX',
        time: '2020-09-11  19：08：09',
        status: '已完成',
      }, {
        id: 'CX4584121456',
        license: '川A-XXXXX',
        frame: 'LFGPB56521156XXXX',
        price: '3829.6',
        type: '雅阁HG7154CBMA轿车',
        name: '王小X',
        phone: '1315242XXXX',
        time: '2020-09-11  19：08：09',
        status: '已完成',
      }, {
        id: 'CX4584121456',
        license: '川A-XXXXX',
        frame: 'LFGPB56521156XXXX',
        price: '3829.6',
        type: '雅阁HG7154CBMA轿车',
        name: '王小X',
        phone: '1315242XXXX',
        time: '2020-09-11  19：08：09',
        status: '已完成',
      }, {
        id: 'CX4584121456',
        license: '川A-XXXXX',
        frame: 'LFGPB56521156XXXX',
        price: '3829.6',
        type: '雅阁HG7154CBMA轿车',
        name: '王小X',
        phone: '1315242XXXX',
        time: '2020-09-11  19：08：09',
        status: '已完成',
      }]
    }
  },
  methods:{
    //下拉框选择
    changeSel(i){
      this.sel = this.selArr[i];
      this.placeStr = `请输入${this.selArr[i]}`;
    },
    //分页切换
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>
<style lang="less" scoped>
  .clearfix{
    content: '';
    display: block;
    clear: both;
  }
  .el-row{
    text-align: left;
    line-height: 60px;
  }
  .el-dropdown{
    >span{
      cursor: pointer;
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .inputName{
    width: 200px;
    margin: 0 15px;
  }
  .inputPrice{
    width: 200px;
  }
  .grid-content{
    display: inline-block;
  }
  .letter{
    margin-right: 25px;
  }
  .drop{
    min-width: 73px;
  }
  .block{
    display: inline-block;
    margin-left: 20px;
  }
  .checkBtn{
    display: inline-block;
    float: right;
  }
  .resultNum{
    background-color: #C3E6F5;
    margin-top: 10px;
    span{
      margin-left: 15px;
    }
  }
  a{
    text-decoration: none;
  }
  .desc{
    color: #1890FF;
  }
  .el-table td, .el-table th {
    text-align: center;
  }
  .el-table{
    margin-top: 15px;
  }
  .pageNav{
    margin-top: 40px;
    float: right;
  }
  .el-table th.is-leaf{
    background-color: #409eff;
  }
</style>
<style lang="less">
  .pageNav ul li{
    font-weight: normal;
  }
</style>