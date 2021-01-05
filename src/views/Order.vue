<template>
  <div id="#app">
    <el-row>
      <el-col :span="24" class="clearfix">
        <el-row>
            <div class="grid-content letter">
              <span>订单状态</span>
            </div>
            <div class="grid-content">
              <el-button type="primary" v-for="(v,i) in btnArr" :plain="index !== i" @click="changeBtn(i)">{{v}}</el-button>
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
      <el-input v-model="priceMin" class="inputPrice" placeholder = '保费金额-最小' prefix-icon="iconfont icon-iconmoney"></el-input> -
      <el-input v-model="priceMax" class="inputPrice" placeholder = '保费金额-最大' prefix-icon="iconfont icon-iconmoney"></el-input>
      <div class="block">
        <el-date-picker
            v-model="datePic"
            type="date"
            placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="checkBtn">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="info" @click="reset">重置</el-button>
      </div>
    </el-row>
    <el-row>
      <el-col :span="24" class="resultNum"><span v-cloak>查询结果：共计{{allData}}条数据</span></el-col>
    </el-row>
    <el-row>
        <el-table
            :data="tableData"
            stripe
            v-loading="loadingTable"
            :header-cell-style="{background:'#D7D7D7',color:'#000',fontWeight:'normal'}"
            style="width: 100%">
          <el-table-column
              align="center"
              prop="oder_number"
              label="订单编号"
              width="180">
          </el-table-column>
          <el-table-column
              align="center"
              prop="car_number"
              label="车牌号码"
              width="180">
          </el-table-column>
          <el-table-column
              align="center"
              prop="chassis_number"
              label="车架号码">
          </el-table-column>
          <el-table-column
              align="center"
              prop="amount"
              label="保费金额">
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
              prop="oder_time"
              label="订单完成时间">
          </el-table-column>
          <el-table-column
              prop="oder_status"
              align="center"
              label="订单状态">
          </el-table-column>
          <el-table-column
              v-if=false
              prop="id"
              align="center"
              label="ID">
          </el-table-column>
          <el-table-column
              label="操作"
              align="center">
            <template slot-scope="scope">
              <a href="javascript:" class="desc" @click="Clicklongin(scope.$index,scope.row)">订单详情</a>
            </template>
          </el-table-column>
        </el-table>
    </el-row>
    <el-row class="clearfix">
      <div class="block pageNav">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            layout="prev, pager, next, sizes, jumper"
            :page-sizes="[5, 10, 20, 50]"
            :page-size=pageSize
            :total=allData>
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
      id:0,
      loadingTable:true,
      placeStr:'请选择筛选方式',
      allData:0,
      sel:'筛选方式',
      selArr:['订单编号','车主名称','手机号码','车架号','车牌号'],
      selName:'',
      datePic:'',
      pageSize:5,
      currentPage4: 1,
      priceMin:'',
      priceMax:'',
      index:0,
      val:1,
      btnArr:['全部','已完成','待处理','已关闭'],
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
      tableData: []
    }
  },
  methods: {
    //下拉框选择
    changeSel(i) {
      this.sel = this.selArr[i];
      this.placeStr = `请输入${this.selArr[i]}`;
    },
    //分页切换
    handleSizeChange(val) {
      this.loadingTable = true;
      console.log(val)
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.loadingTable = true;
      this.val = val;
      this.getData();
    },
    reset() {
      this.sel = '筛选方式';
      this.placeStr = '请选择筛选方式';
      this.selName = '';
      this.datePic = '';
      this.priceMin = '';
      this.priceMax = '';
    },
    changeBtn(i) {
      this.index = i;
    },
    //日期格式化
    timestampToTime(timestamp) {
      let date = new Date(timestamp);
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let D = date.getDate() + ' ';
      let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    getData() {
      this.tableData = [];
      this.$axios({
        method:'post',
        url:'/oder/allList',
        data:{
          pageSize:this.pageSize,
          startIndex:this.pageSize*(this.val - 1),
        }
      }).then((res)=>{
        this.allData = res.data.data.total;
        this.tableData = res.data.data.list;
        for (let i=0;i<this.tableData.length;i++){
          this.tableData[i].oder_time = this.timestampToTime(this.tableData[i].oder_time);
          this.tableData[i].oder_status = this.tableData[i].oder_status === 0 ? '已完成' : this.tableData[i].oder_status === 1 ? '待处理' : '已关闭';
        }
        this.$nextTick(()=>{
          console.log(this.tableData)
          this.loadingTable = false;
        });
      })
    },
    search() {
      let status = 0;
      this.tableData = [];
      switch (this.index){
        case 0:
          status = '';
          break;
        case 1:
          status = 0;
          break;
        case 2:
          status = 1;
          break;
        case 3:
          status = 2;
          break;
        default:
          status = '';
          break;
      }
      switch (this.sel) {
        case "订单编号":
          this.$axios({
            method:'post',
            url:'/oder/allList',
            data:{
              pageSize:this.pageSize,
              startIndex:0,
              minAmount:this.priceMin,
              maxAmount:this.priceMax,
              oderTime:this.datePic,
              oderNumber:this.selName,
              oderStatus:status
            }
          }).then((res)=>{
            if (res.data.data !== null){
              this.allData = res.data.data.total;
            }else {
              this.allData = 0;
              this.tableData = [];
              this.open();
              return;
            }
            this.tableData = res.data.data.list;
            for (let i=0;i<this.tableData.length;i++){
              this.tableData[i].oder_time = this.timestampToTime(this.tableData[i].oder_time);
              this.tableData[i].oder_status = this.tableData[i].oder_status === 0 ? '已完成' : this.tableData[i].oder_status === 1 ? '待处理' : '已关闭';
            }
            this.$nextTick(()=>{
              this.loadingTable = false;
              this.open();
            });
          })
          break;
        case "车主名称":
          this.$axios({
            method:'post',
            url:'/oder/allList',
            data:{
              pageSize:this.pageSize,
              startIndex:0,
              minAmount:this.priceMin,
              maxAmount:this.priceMax,
              oderTime:this.datePic,
              masterName:this.selName,
              oderStatus:status
            }
          }).then((res)=>{
            if (res.data.data !== null){
              this.allData = res.data.data.total;
            }else {
              this.allData = 0;
              this.tableData = [];
              this.open();
              return;
            }
            this.tableData = res.data.data.list;
            for (let i=0;i<this.tableData.length;i++){
              this.tableData[i].oder_time = this.timestampToTime(this.tableData[i].oder_time);
              this.tableData[i].oder_status = this.tableData[i].oder_status === 0 ? '已完成' : this.tableData[i].oder_status === 1 ? '待处理' : '已关闭';
            }
            this.$nextTick(()=>{
              this.loadingTable = false;
              this.open();
            });
          })
          break;
        case "手机号码":
          this.$axios({
            method:'post',
            url:'/oder/allList',
            data:{
              pageSize:this.pageSize,
              startIndex:0,
              minAmount:this.priceMin,
              maxAmount:this.priceMax,
              oderTime:this.datePic,
              phone:this.selName,
              oderStatus:status
            }
          }).then((res)=>{
            if (res.data.data !== null){
              this.allData = res.data.data.total;
            }else {
              this.allData = 0;
              this.tableData = [];
              this.open();
              return;
            }
            this.tableData = res.data.data.list;
            for (let i=0;i<this.tableData.length;i++){
              this.tableData[i].oder_time = this.timestampToTime(this.tableData[i].oder_time);
              this.tableData[i].oder_status = this.tableData[i].oder_status === 0 ? '已完成' : this.tableData[i].oder_status === 1 ? '待处理' : '已关闭';
            }
            this.$nextTick(()=>{
              this.loadingTable = false;
              this.open();
            });
          })
          break;
        case "车架号":
          this.$axios({
            method:'post',
            url:'/oder/allList',
            data:{
              pageSize:this.pageSize,
              startIndex:0,
              minAmount:this.priceMin,
              maxAmount:this.priceMax,
              oderTime:this.datePic,
              carChassis:this.selName,
              oderStatus:status
            }
          }).then((res)=>{
            if (res.data.data !== null){
              this.allData = res.data.data.total;
            }else {
              this.allData = 0;
              this.tableData = [];
              this.open();
              return;
            }
            this.tableData = res.data.data.list;
            for (let i=0;i<this.tableData.length;i++){
              this.tableData[i].oder_time = this.timestampToTime(this.tableData[i].oder_time);
              this.tableData[i].oder_status = this.tableData[i].oder_status === 0 ? '已完成' : this.tableData[i].oder_status === 1 ? '待处理' : '已关闭';
            }
            this.$nextTick(()=>{
              this.loadingTable = false;
              this.open();
            });
          })
          break;
        case "车牌号":
          this.$axios({
            method:'post',
            url:'/oder/allList',
            data:{
              pageSize:this.pageSize,
              startIndex:0,
              minAmount:this.priceMin,
              maxAmount:this.priceMax,
              oderTime:this.datePic,
              carNumber:this.selName,
              oderStatus:status
            }
          }).then((res)=>{
            if (res.data.data !== null){
              this.allData = res.data.data.total;
            }else {
              this.allData = 0;
              this.tableData = [];
              this.open();
              return;
            }
            this.tableData = res.data.data.list;
            for (let i=0;i<this.tableData.length;i++){
              this.tableData[i].oder_time = this.timestampToTime(this.tableData[i].oder_time);
              this.tableData[i].oder_status = this.tableData[i].oder_status === 0 ? '已完成' : this.tableData[i].oder_status === 1 ? '待处理' : '已关闭';
            }
            this.$nextTick(()=>{
              this.loadingTable = false;
              this.open();
            });
          })
          break;
        default:
          this.$axios({
            method:'post',
            url:'/oder/allList',
            data:{
              pageSize:this.pageSize,
              startIndex:0,
              minAmount:this.priceMin,
              maxAmount:this.priceMax,
              oderTime:this.datePic,
              oderStatus:status
            }
          }).then((res)=>{
            if (res.data.data !== null){
              this.allData = res.data.data.total;
            }else {
              this.allData = 0;
              this.tableData = [];
              this.open();
              return;
            }
            this.tableData = res.data.data.list;
            for (let i=0;i<this.tableData.length;i++){
              this.tableData[i].oder_time = this.timestampToTime(this.tableData[i].oder_time);
              this.tableData[i].oder_status = this.tableData[i].oder_status === 0 ? '已完成' : this.tableData[i].oder_status === 1 ? '待处理' : '已关闭';
            }
            this.$nextTick(()=>{
              this.loadingTable = false;
              this.open();
            });
          })
          break;
      }
    },
    open() {
      this.$message('查询成功');
    },
    Clicklongin(index,data){
      this.$router.push('/details?id='+data.id);
    }
  },
  mounted() {
    this.getData();
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
  .el-button--primary:focus, .el-button--primary:hover {
    background: #409EFF;
    border-color: #409EFF;
    color: #FFF;
  }
</style>
<style lang="less">
  .pageNav ul li{
    font-weight: normal;
  }
</style>