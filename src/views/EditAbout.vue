<template>
  <div id="app">
    <el-row>
      <el-col :span="2" class="title">
        模块名称 :
      </el-col>
      <el-input
          class="modelName"
          v-model="input1"
          clearable>
      </el-input>
    </el-row>
    <el-row>
      <el-col :span="2" class="title">
        模块内容 :
      </el-col>
      <el-col :span="22" class="title">
        <el-input
            type="textarea"
            v-model="textarea"
            maxlength="5000"
            show-word-limit
            :autosize="{ minRows: 4}"
        >
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" class="title">
        是否上架 :
      </el-col>
      <el-switch
          v-model="switch1"
          active-color="#13ce66"
          inactive-color="#ff4949">
      </el-switch>
    </el-row>
    <el-row v-show="!switch1">
      <el-col :span="2" class="title">
        上架时间 :
      </el-col>
      <div class="block">
        <el-date-picker
            v-model="value1"
            type="datetime"
            placeholder="选择日期时间">
        </el-date-picker>
      </div>
    </el-row>
    <el-row v-show="switch1">
      <el-col :span="2" class="title">
        下架时间 :
      </el-col>
      <div class="block">
        <el-date-picker
            v-model="value1"
            type="datetime"
            placeholder="选择日期时间">
        </el-date-picker>
      </div>
    </el-row>
    <el-row>
      <el-button type="primary" class="aboutBtn" @click="addProtocols">保存</el-button>
      <el-button type="info" class="aboutBtn" @click="back">返回</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "EditAbout",
  data:function () {
    return {
      input1:'',
      textarea:'',
      value1:'',
      switch1:true
    }
  },
  methods:{
    back(){
      history.go(-1);
    },
    open() {
      this.$alert('内容不能为空', '提示', {
        confirmButtonText: '确定',
      });
    },
    info(msg) {
      this.$alert(msg, '提示', {
        confirmButtonText: '确定',
      });
    },
    addProtocols(){
      if (this.value1 === '' || this.textarea === '' || this.input1 === ''){
        this.open();
        return;
      }
      let isStatus = 0;
      let putTime = '';
      let removeTime = '';
      if (this.switch1){
        isStatus = 1;
        removeTime = this.value1;
      }else {
        isStatus = 0;
        putTime = this.value1;
      }
      this.$axios({
        url:'/protocols/update',
        method:'post',
        data:{
          content:this.textarea,
          name:this.input1,
          status:isStatus,
          lasttime:new Date(),
          puttime:putTime,
          remoevetime:removeTime,
        }
      }).then((res)=>{
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
.clearfix{
  content: '';
  display: block;
  clear: both;
}
.el-row{
  text-align: left;
  line-height: 60px;
  margin: 30px 0;
}
.modelName{
  width: 300px;
}
.title{
  text-align: center;
}
.aboutBtn{
  padding: 15px 40px;
  margin: 20px 30px;
}
</style>