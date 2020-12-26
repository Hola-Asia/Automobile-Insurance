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
  </div>
</template>

<script>
export default {
  name: "Order"
}
</script>

<style scoped>
  .letter{
    float: left;
  }
  .clearfix{
    content: '';
    display: block;
    clear: both;
  }
</style>