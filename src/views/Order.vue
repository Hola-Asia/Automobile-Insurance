<template>
  <div id="#app">
    <el-row>
      <el-col :span="24" class="clearfix">
        <el-row>
          <el-col :span="2">
            <div class="grid-content">
              <span>订单状态</span>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content letter">
              <el-button type="primary" plain>全部</el-button>
              <el-button type="primary" plain>已完成</el-button>
              <el-button type="primary" plain>待处理</el-button>
              <el-button type="primary" plain>已关闭</el-button>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-dropdown trigger="click" @command="changeSel">
        <span class="el-dropdown-link">{{sel}}<i class="el-icon-arrow-down el-icon--right"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(v,i) in selArr" :command = i>{{v}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-input v-model="selName" class="inputName" :placeholder = placeStr></el-input>
      <el-input v-model="selName" class="inputPrice" placeholder = '保费金额-最小'>￥</el-input> -
      <el-input v-model="selName" class="inputPrice" placeholder = '保费金额-最大'></el-input>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Order",
  data:function(){
    return {
      //下拉框数据
      placeStr:'请选择筛选方式',
      sel:'筛选方式',
      selArr:['订单编号','车主名称','手机号码','车架号','车牌号'],
      selName:''
    }
  },
  methods:{
    //下拉框选择
    changeSel(i){
      this.sel = this.selArr[i];
      this.placeStr = `请输入${this.selArr[i]}`;
    }
  }
}
</script>

<style lang="less" scoped>
  .letter{
    float: left;
  }
  .clearfix{
    content: '';
    display: block;
    clear: both;
  }
  .el-row{
    text-align: left;
    line-height: 50px;
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
    width: 150px;
  }
</style>