<template>
  <div id="app">
    <el-main>
      <!--车辆信息-->
      <el-row class="info">
        <i class="iconfont icon-biaoqian"></i>
        <span>车主信息</span>
      </el-row>
      <el-row>
        <table class="user_info">
        </table>
        <el-table
            v-loading="loading"
            class="detail_tr"
            :data="tableData1"
            border
            :cell-style="{textAlign:'center'}"
            :show-header=false
            style="width: 100%">
          <el-table-column
              prop="text1"
              class="cell_style"
              width="180">
          </el-table-column>
          <el-table-column prop="name1"></el-table-column>
          <el-table-column
              prop="text2"
              class="cell_style"
              width="180">
          </el-table-column>
          <el-table-column prop="name2"></el-table-column>
        </el-table>
      </el-row>
      <!--车主信息-->
      <el-row class="info">
        <i class="iconfont icon-biaoqian"></i>
        <span>车辆信息</span>
      </el-row>
      <el-row>
        <el-table
            v-loading="loading"
            class="detail_tr"
            :data="tableData2"
            border
            :cell-style="{textAlign:'center'}"
            :show-header=false
            style="width: 100%">
          <el-table-column
              prop="text1"
              class="cell_style"
              width="180">
          </el-table-column>
          <el-table-column prop="name1"></el-table-column>
          <el-table-column
              prop="text2"
              class="cell_style"
              width="180">
          </el-table-column>
          <el-table-column prop="name2"></el-table-column>
        </el-table>
      </el-row>
      <!--被保险人-->
      <el-row class="info">
        <i class="iconfont icon-biaoqian"></i>
        <span>被保险人</span>
      </el-row>
      <el-row>
        <el-table
            v-loading="loading"
            class="detail_tr"
            :data="tableData3"
            border
            :cell-style="{textAlign:'center'}"
            :show-header=false
            style="width: 100%">
          <el-table-column
              prop="text1"
              class="cell_style"
              width="180">
          </el-table-column>
          <el-table-column prop="name1"></el-table-column>
          <el-table-column
              prop="text2"
              class="cell_style"
              width="180">
          </el-table-column>
          <el-table-column prop="name2"></el-table-column>
        </el-table>
      </el-row>
      <!--投保人-->
      <el-row class="info">
        <i class="iconfont icon-biaoqian"></i>
        <span>投保人</span>
      </el-row>
      <el-row>
        <el-table
            v-loading="loading"
            class="detail_tr"
            :data="tableData4"
            border
            :cell-style="{textAlign:'center'}"
            :show-header=false
            style="width: 100%">
          <el-table-column
              prop="text1"
              class="cell_style"
              width="180">
          </el-table-column>
          <el-table-column prop="name1"></el-table-column>
          <el-table-column
              prop="text2"
              class="cell_style"
              width="180">
          </el-table-column>
          <el-table-column prop="name2"></el-table-column>
        </el-table>
      </el-row>
      <!--商业险险种-->
      <el-row class="info">
        <i class="iconfont icon-biaoqian"></i>
        <span>商业险险种</span>
      </el-row>
      <el-row>
        <el-table
            v-loading="loading"
            class="detail_tr"
            :data="tableData5"
            border
            :cell-style="{textAlign:'center'}"
            :show-header=false
            style="width: 100%">
          <el-table-column
              prop="text1"
              class="cell_style"
              width="180">
          </el-table-column>
          <el-table-column prop="name1"></el-table-column>
          <el-table-column
              prop="text2"
              class="cell_style"
              width="180">
          </el-table-column>
          <el-table-column prop="name2"></el-table-column>
        </el-table>
      </el-row>
      <!--交强险险种-->
      <el-row class="info">
        <i class="iconfont icon-biaoqian"></i>
        <span>交强险险种</span>
      </el-row>
      <el-row>
        <el-table
            v-loading="loading"
            class="detail_tr"
            :data="tableData6"
            border
            :cell-style="{textAlign:'center'}"
            :show-header=false
            style="width: 100%">
          <el-table-column
              prop="text1"
              class="cell_style"
              width="180">
          </el-table-column>
          <el-table-column prop="name1"></el-table-column>
          <el-table-column
              prop="text2"
              class="cell_style"
              width="180">
          </el-table-column>
          <el-table-column prop="name2"></el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <el-button type="primary" @click="back" class="backBtn">返回</el-button>
      </el-row>
    </el-main>
  </div>
</template>

<script>
// import '../assets/icon/zr/iconfont.css';
export default {
  name: "Details",
  data:function () {
    return {
      loading:true,
      //表格数据1
      tableData1: [{
        text1: '车牌号',
        name1: '',
        text2: '使用性质',
        name2: '非营运'
      }, {
        text1: '车架号',
        name1: '',
        text2: '初登日期',
        name2: '2017-10-10'
      }, {
        text1: '发动机号',
        name1: '',
        text2: '整备质量',
        name2: '1.85'
      }, {
        text1: '座位数',
        name1: '',
        text2: '厂牌型号',
        name2: '本田牌CAF5462轿车'
      }],
      //表格数据2
      tableData2: [{
        text1: '车主类型',
        name1: '',
        text2: '证件号码',
        name2: ''
      }, {
        text1: '车主名称',
        name1: '',
        text2: '手机号码',
        name2: ''
      }, {
        text1: '证件类型',
        name1: '',
        text2: '—',
        name2: '—'
      }],
      //表格数据3
      tableData3: [{
        text1: '被保险人类型',
        name1: '',
        text2: '证件号码',
        name2: ''
      }, {
        text1: '被保险人名称',
        name1: '',
        text2: '手机号码',
        name2: ''
      }, {
        text1: '证件类型',
        name1: '',
        text2: '联系地址',
        name2: ''
      }],
      //表格数据4
      tableData4: [{
        text1: '投保人类型',
        name1: '',
        text2: '证件号码',
        name2: ''
      }, {
        text1: '投保人名称',
        name1: '',
        text2: '手机号码',
        name2: ''
      }, {
        text1: '证件类型',
        name1: '',
        text2: '联系地址',
        name2: ''
      }],
      //表格数据5
      tableData5: [{
        text1: '车损险',
        name1: '',
        text2: '起保日期',
        name2: ''
      }, {
        text1: '三者险',
        name1: '',
        text2: '保单',
        name2: '查看保单'
      }],
      //表格数据6
      tableData6: [{
        text1: '交强险',
        name1: '950',
        text2: '起保日期',
        name2: '2018-10-11 00:00:00'
      }, {
        text1: '车船税',
        name1: '360',
        text2: '保单',
        name2: '查看保单'
      }]
    }
  },
  methods:{
    back(){
      history.go(-1);
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
    }
  },
  mounted() {
    this.$axios({
      url:'/oder/findId',
      params:{
        id:this.$route.query.id
      }
    }).then((res)=>{
      console.log(res.data.data)
      this.tableRes = res.data.data;
      this.tableData1[0].name1 = this.tableRes[0].carNumber;
      this.tableData1[1].name1 = this.tableRes[0].chassisNumber;
      this.tableData1[2].name1 = this.tableRes[0].engine;
      this.tableData1[3].name1 = this.tableRes[0].seat;
      this.tableData2[0].name1 = this.tableRes[0].carType;
      this.tableData2[0].name2 = this.tableRes[0].idCard;
      this.tableData2[1].name1 = this.tableRes[0].holder;
      this.tableData2[1].name2 = this.tableRes[0].cuPhone;
      this.tableData2[2].name1 = this.tableRes[0].idType;
      this.tableData3[0].name1 = this.tableRes[0].type;
      this.tableData3[0].name2 = this.tableRes[0].idCard;
      this.tableData3[1].name1 = this.tableRes[0].name;
      this.tableData3[1].name2 = this.tableRes[0].phone;
      this.tableData3[2].name1 = this.tableRes[0].idType;
      this.tableData3[2].name2 = this.tableRes[0].cuAddress;
      this.tableData4[0].name1 = this.tableRes[0].type;
      this.tableData4[0].name2 = this.tableRes[0].idCard;
      this.tableData4[1].name1 = this.tableRes[0].name;
      this.tableData4[1].name2 = this.tableRes[0].phone;
      this.tableData4[2].name1 = this.tableRes[0].idType;
      this.tableData4[2].name2 = this.tableRes[0].cuAddress;
      this.tableData5[0].name1 = this.tableRes[0].price;
      this.tableData5[0].name2 = this.timestampToTime(this.tableRes[0].time);
      this.tableData5[1].name1 = this.tableRes[1].price;
      this.$nextTick(()=>{
        this.loading = false;
      })
    })
  }
}
</script>

<style lang="less" scoped>
  @import '../assets/icon/zr/iconfont.css';
  .el-row{
    text-align: left;
    line-height: 50px;
  }
  .el-main{
    background-color: #fff;
  }
  .info{
    >i{
      margin-right: 10px;
    }
  }
  /deep/ table{
    border-color: #ccc;
  }
  /deep/ tbody tr td{
    border-color: #ccc;
  }
  /deep/ tbody tr td:nth-of-type(1){
    background-color: #F2F2F2;
    font-weight: bold;
  }
  /deep/ tbody tr td:nth-of-type(3){
    background-color: #F2F2F2;
    font-weight: bold;
  }
  .backBtn{
    margin-top: 30px;
    padding: 15px 50px;
  }
  .el-table--border{
    border: 1px solid #ccc;
  }
  .user_info {
    width: 100%;
    tr{
      td{
        border: 1px solid #ccc;
        margin: 0;
      }
      td:nth-of-type(2n+1){
        background-color: #F2F2F2;
      }
    }
  }

</style>
<style>
  .detail_tr {pointer-events: none;}
</style>