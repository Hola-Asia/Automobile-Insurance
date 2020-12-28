<template>
  <div id="app">
    <el-main>
      <!--车辆信息-->
      <el-row class="info">
        <i class="iconfont icon-biaoqian"></i>
        <span>车主信息</span>
      </el-row>
      <el-row>
        <el-table
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
import '../assets/icon/zr/iconfont.css';
export default {
  name: "Details",
  data:function () {
    return {
      //表格数据1
      tableData1: [{
        text1: '车牌号',
        name1: '川A-XXXXX',
        text2: '使用性质',
        name2: '非营运'
      }, {
        text1: '车架号',
        name1: 'LVSHT*******5612',
        text2: '初登日期',
        name2: '2017-10-10'
      }, {
        text1: '发动机号',
        name1: 'TL***5623',
        text2: '整备质量',
        name2: '1.85'
      }, {
        text1: '座位数',
        name1: '5',
        text2: '厂牌型号',
        name2: '本田牌CAF5462轿车'
      }],
      //表格数据2
      tableData2: [{
        text1: '车主类型',
        name1: '个人',
        text2: '证件号码',
        name2: '320722199153232'
      }, {
        text1: '车主名称',
        name1: '张三',
        text2: '手机号码',
        name2: '17715142222'
      }, {
        text1: '证件类型',
        name1: '身份证',
        text2: '—',
        name2: '—'
      }],
      //表格数据3
      tableData3: [{
        text1: '被保险人类型',
        name1: '个人',
        text2: '证件号码',
        name2: '320722199153232'
      }, {
        text1: '被保险人名称',
        name1: '张三',
        text2: '手机号码',
        name2: '17715142222'
      }, {
        text1: '证件类型',
        name1: '身份证',
        text2: '联系地址',
        name2: '江苏省苏州市相城区春申湖中路222号'
      }],
      //表格数据4
      tableData4: [{
        text1: '投保人类型',
        name1: '个人',
        text2: '证件号码',
        name2: '320722199153232'
      }, {
        text1: '投保人名称',
        name1: '张三',
        text2: '手机号码',
        name2: '17715142222'
      }, {
        text1: '证件类型',
        name1: '身份证',
        text2: '联系地址',
        name2: '江苏省苏州市相城区春申湖中路222号'
      }],
      //表格数据5
      tableData5: [{
        text1: '车损险',
        name1: '145623.32',
        text2: '起保日期',
        name2: '2018-10-11 00：00:00'
      }, {
        text1: '三者险',
        name1: '150万',
        text2: '保单',
        name2: '查看保单'
      }],
      //表格数据6
      tableData6: [{
        text1: '交强险',
        name1: '950',
        text2: '起保日期',
        name2: '2018-10-11 00：00:00'
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
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
<style>
  .detail_tr {pointer-events: none;}
</style>