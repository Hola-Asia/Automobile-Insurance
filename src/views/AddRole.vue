<template>
  <div class="addRole">
    <el-card class="box-card">
      <p class="header">添加角色</p>
      <div class="content">
        <label for="roleName" class="c-label">角色：</label>
        <el-input v-model="roleMsg" placeholder="超级管理员" id="roleName" class="inpt" :disabled="true"></el-input><br>
        <label class="c-label">设置权限：</label><br>
        <div class="duoXuan">
          <el-checkbox :indeterminate="isIndeterminate1" v-model="checkAll1" @change="handleCheckAllChange1">订单管理</el-checkbox>
          <el-checkbox-group v-model="checkedCities1" @change="handleCheckedCitiesChange1">
            <el-checkbox  v-for="order in orders1" :label="order" :key="order" class="setCheck">{{order}}</el-checkbox>
          </el-checkbox-group>
          <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">客户管理</el-checkbox>
          <el-checkbox-group v-model="checkedCities2" @change="handleCheckedCitiesChange2" >
            <el-checkbox v-for="order in orders2" :label="order" :key="order" class="setCheck">{{order}}</el-checkbox>
          </el-checkbox-group>
          <el-checkbox :indeterminate="isIndeterminate3" v-model="checkAll3" @change="handleCheckAllChange3">咨讯管理</el-checkbox>
          <el-checkbox-group v-model="checkedCities3" @change="handleCheckedCitiesChange3" >
            <el-checkbox v-for="order in orders3" :label="order" :key="order" class="setCheck">{{order}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="b-btn">
          <el-button type="info" class="c-btn">取消</el-button>
          <el-button type="primary" class="c-btn">确认</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
const orderManage = ['查询', '重置', '返回', '订单详情', '查看保单'];
const userManage = ['查询', '重置','订单详情', '查看保单'];
const informationManage = ['查询', '重置', '新增', '下架', '编辑'];
export default {
  name: "AddRole",
  data() {
    return {
      //订单
      roleMsg:'',
      checkAll1: false,
      checkedCities1: ['返回', '订单详情', '查看保单'],
      orders1: orderManage,
      isIndeterminate1: true,
      //客户
      checkAll2: false,
      checkedCities2: ['订单详情', '查看保单'],
      orders2: userManage,
      isIndeterminate2: true,
    //  资讯
      checkAll3: false,
      checkedCities3: ['查询', '重置', '新增'],
      orders3: informationManage,
      isIndeterminate3: true,
    };
  },
  methods: {
    handleCheckAllChange1(val) {
      this.checkedCities1 = val ? orderManage : [];
      this.isIndeterminate1 = false;
    },
    handleCheckedCitiesChange1(value) {
      let checkedCount = value.length;
      this.checkAll1 = checkedCount === this.orders1.length;
      this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.orders1.length;
    },
    handleCheckAllChange2(val) {
      this.checkedCities2 = val ? userManage : [];
      this.isIndeterminate2 = false;
    },
    handleCheckedCitiesChange2(value) {
      let checkedCount = value.length;
      this.checkAll2 = checkedCount === this.orders2.length;
      this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.orders2.length;
    },
    handleCheckAllChange3(val) {
      this.checkedCities3 = val ? informationManage : [];
      this.isIndeterminate3 = false;
    },
    handleCheckedCitiesChange3(value) {
      let checkedCount = value.length;
      this.checkAll3 = checkedCount === this.orders3.length;
      this.isIndeterminate3 = checkedCount > 0 && checkedCount < this.orders3.length;
    }
  }
}
</script>

<style scoped lang="less">
.addRole{
  text-align: left;
  line-height: 40px;
  .box-card {
    width: 100%;
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
        text-align: center;
      }
      .c-label{
        display: inline-block;
        width: 100px;
        margin-top: 4px;
        margin-left: 4px;
      }
      .duoXuan{
        margin-left: 15px;
        .setCheck{
          display: block;
          margin-left: 20px;
        }
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
