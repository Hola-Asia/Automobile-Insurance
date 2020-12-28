<template>
  <div class="editBox">
    <el-card class="box-card">
      <p class="header">编辑账号</p>
      <div class="content">
      <label for="userName">账号名称：</label>
      <el-input v-model="userName" placeholder="请输入1-16字的账号名称" id="userName" class="inpt"></el-input><br>
      <label for="phone">手机号码：</label>
      <el-input v-model="phone" placeholder="请输入手机号" id="phone" class="inpt"></el-input><br>
      <label for="pass">密码：</label>
      <el-input v-model="pass" placeholder="请输入登录密码" id="pass" class="inpt"></el-input><br>
      <label>归属部门：</label>
      <el-select v-model="depart" placeholder="请选择" class="inpt">
        <el-option
            v-for="item in departOptions"
            :key="item.depart"
            :label="item.label"
            :value="item.depart">
        </el-option>
      </el-select><br>
      <label for="position">职位：</label>
      <el-input v-model="position" placeholder="请输入职位" id="position" class="inpt"></el-input><br>
      <label>角色：</label>
      <el-select v-model="role" placeholder="请选择" class="inpt">
        <el-option
            v-for="item in roleOptions"
            :key="item.role"
            :label="item.label"
            :value="item.role">
        </el-option>
      </el-select><br>
      <label>启用状态：</label>
      <el-select v-model="status" placeholder="请选择" class="inpt">
        <el-option
            v-for="item in startOptions"
            :key="item.status"
            :label="item.label"
            :value="item.status">
        </el-option>
      </el-select><br>
      <div class="b-btn">
        <el-button type="info" class="c-btn">取消</el-button>
        <el-button type="primary" class="c-btn">确认</el-button>
      </div>
    </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "EditAccount",
  data() {
    return {
      sizeForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      departOptions: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      depart:'',

      roleOptions: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      role:'',
      startOptions: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      status: '',

      userName:'',
      phone:'',
      pass:'',
      position:'',
    };
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style scoped lang="less">
.editBox{
  text-align: left;
  line-height: 50px;
  .box-card{
    .header{
      font-size: 16px;
      font-weight: bold;
      color: #666666;
      margin-left: 20px;
    }
    .content{
      margin-left: 20px;
      .inpt{
        width: 300px;
        height: 40px;
        margin-top: 14px;
      }
      label{
        display: inline-block;
        width: 100px;
        margin-top: 14px;
      }
      .b-btn{
        margin-top: 20px;
        .c-btn{
          margin-right: 20px;
          margin-left: 78px;
        }
      }
    }
  }
}
</style>