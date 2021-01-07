<template>

  <div class="addRole">
    <el-card class="box-card">
      <p class="header">编辑角色</p>
      <div class="content">
        <label for="roleName" class="c-label">角色：</label>
        <el-input v-model="roleMsg" placeholder="请输入角色名" id="roleName" class="inpt"></el-input><br>
        <label class="c-label">设置权限：</label><br>
        <div class="duoXuan">
          <div v-for="inx in Object.keys(orderMap)">
            <el-checkbox :indeterminate="orderMap[inx].isIndeterminate" v-model="orderMap[inx].checkAll" @change="(val)=>{handleCheckAllChange(val,inx,arr1[inx])}">{{arr[inx]}}</el-checkbox>
            <el-checkbox-group v-model="orderMap[inx].checkedCities" @change="(val)=>{handleCheckedCitiesChange(val,inx)}">
              <el-checkbox  v-for="(value,i) in orderMap[inx].orders" :label="value.name" :key="i" class="setCheck" @change="jiShu(value.id)">{{value.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="b-btn">
          <el-button type="info" class="c-btn" @click="clear">取消</el-button>
          <el-button type="primary" class="c-btn" @click="quRen">确认</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AddRole",
  data() {
    return {
      //对应角色的v-model
      roleMsg:'',
      orderMap: {
        0:{
          checkAll:false,
          checkedCities:[],
          orders:[],
          orders1:[],
          isIndeterminate:true
        },
        1:{
          checkAll:false,
          checkedCities:[],
          orders:[],
          orders1:[],
          isIndeterminate:true
        },
        2:{
          checkAll:false,
          checkedCities:[],
          orders:[],
          orders1:[],
          isIndeterminate:true
        },
        3:{
          checkAll:false,
          checkedCities:[],
          orders:[],
          orders1:[],
          isIndeterminate:true
        },
      },//全部的项

      daLei:[],
      xiaoLei:[],
      daLeiYu:[],
      arr:[],
      arr1:[],
      permissions:[],
    };
  },
  created() {
    this.roleMsg = this.$route.params.conlltion;
    let that = this;
    this.$axios({
      url:'/permission/queryAllPermission',
      method:'get',
    }).then((res)=>{
      if(res.status == 200){
        if(res.data.data.length > 0){
          //取出一级菜单
          that.daLei = (res.data.data).filter((v)=>{
            return v.parentId == 0;
          });
          //循环取出大类中的name
          for (let i=0;i<that.daLei.length;i++){
            that.arr.push(that.daLei[i].name);
          };
          //循环取出大类中的id
          for (let i=0;i<that.daLei.length;i++){
            that.arr1.push(that.daLei[i].id);
          }
          //取出除过满足条件的一级菜单
          that.daLeiYu = (res.data.data).filter((v)=>{
            return v.parentId != 0;
          });
          //取出二级菜单
          for (let i=0;i < that.daLei.length;i++){
            that.orderMap[i].orders =that.daLeiYu.filter((v)=>{
              return v.parentId == that.daLei[i].id;
            })
          }
        }else{
          alert('未查询到权限相关信息')
        }
      }
    }).catch((err)=>{
      alert(err);
    })
  },
  methods: {
    //判断是否选中大类
    handleCheckAllChange(val,inx,num) {
      console.log(num)
      // this.permissions.push(num);
      let arr = this.orderMap[inx].orders.map(function (v){
        return v.name
      })
      this.orderMap[inx].checkedCities = val ? arr : [];
      this.orderMap[inx].isIndeterminate = false;
    },
    //判断小类的选中状态，控制大类是否选中
    handleCheckedCitiesChange(value,inx) {
      let checkedCount = value.length;
      this.orderMap[inx].checkAll = checkedCount === this.orderMap[inx].orders.length;
      this.orderMap[inx].isIndeterminate = checkedCount > 0 && checkedCount < this.orderMap[inx].orders.length;
    },
    //用来计数
    jiShu(count){
      this.permissions.push(count);
    },
    clear(){
      this.$router.go(-1);
    },
    quRen(){
      this.$axios({
        url:'/role/addRole',
        method:'post',
        data:{
          "permissions": this.permissions,
          "roleName": this.roleMsg,
        }
      }).then((res)=>{
        if (res.status == 200){
          if (res.data.code == 0){
            //添加成功
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            //返回主页
            this.$router.go(-1);
          }else{
            this.$message.error('添加失败！');
          }
        }
      }).catch((err)=>{
        alert(err);
      })
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


