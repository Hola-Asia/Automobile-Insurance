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
            @change="isChange"
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
            @change="isChange"
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
      id:undefined,
      input1:'',
      textarea:'',
      value1:'',
      switch1:true,
      change:0,
      msg:''
    }
  },
  methods:{
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
    back(){
      history.go(-1);
    },
    open() {
      this.$alert('内容不能为空', '提示', {
        confirmButtonText: '确定',
      });
    },
    isChange(){
      this.change = 1;
    },
    info(msg) {
      this.$alert(msg, '提示', {
        confirmButtonText: '确定',
      });
    },
    openVn() {
      this.$message(this.msg);
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
        if (this.change === 0){
          removeTime = this.value1;
        }else {
          removeTime = this.value1.toISOString();
        }
      }else {
        isStatus = 0;
        if (this.change === 0){
          putTime = this.value1;
        }else {
          putTime = this.value1.toISOString();
        }
      }
      this.$axios({
        url:'/protocols/update',
        method:'post',
        headers:{
          token:sessionStorage.token,
        },
        data:{
          content:this.textarea,
          name:this.input1,
          status:isStatus.toString(),
          lasttime:new Date().toISOString(),
          puttime:putTime,
          remoevetime:removeTime,
          id:this.id
        }
      }).then((res)=>{
        if (res.data.code === 0){
          this.msg = '修改成功'
          this.openVn();
          this.$router.go(-1);
        }
      })
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.$axios({
      url:'/protocols/queryById',
      headers:{
        token:sessionStorage.token,
      },
      params:{
        id:this.$route.query.id
      }
    }).then((res)=>{
      console.log(res)
      this.input1 = res.data.data.name;
      this.textarea = res.data.data.content?res.data.data.content:'暂无内容';
      this.switch1 = res.data.data.status === '1';
      this.value1 = res.data.data.status === '1'?res.data.data.remoevetime:res.data.data.puttime;
    })
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