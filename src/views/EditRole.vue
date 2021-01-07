<template>
  <div class="editRole">
    <el-card class="box-card">
      <p class="header">编辑角色</p>
      <div class="content">
        <label for="roleName" class="c-label">角色：</label>
        <el-input v-model="roleMsg" placeholder="请输入角色名" id="roleName" class="inpt" :disabled="true"></el-input><br>
        <label class="c-label">设置权限：</label><br>
        <div class="duoXuan">
          <div :key="inx" v-for="inx in Object.keys(orderMap)">
            <el-checkbox :indeterminate="orderMap[inx].isIndeterminate" v-model="orderMap[inx].checkAll" @change="(val)=>{handleCheckAllChange(val,inx,arr1[inx])}">{{arr[inx]}}</el-checkbox>
            <el-checkbox-group v-model="orderMap[inx].checkedCities" @change="(val)=>{handleCheckedCitiesChange(val,inx)}">
              <el-checkbox  v-for="(value,i) in orderMap[inx].orders" :label="value.name" :key="i" class="setCheck">{{value.name}}</el-checkbox>
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
import { Loading } from 'element-ui';

export default {
  name: "editRole",
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

      diYiJi:[],
      diErJi:[],
      diYiYu:[],

      //用来存放点击的数据的id,name
      selectData:[],
      //用来存放要提交的数据
      permissions:[],
      loading:'',
    };
  },
  created() {
    this.roleMsg = this.$route.params.roleName;
    // console.log(this.$route.params.id);
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

          //调用另一个渲染已点击的接口
          this.$axios({
            url:'/permission/queryRoleHavingPermission',
            method:'get',
            params:{
              name:this.$route.params.roleName
            }
          }).then((res1)=>{
            if(res1.status == 200){
              if(res1.data.data.length > 0){
                //循环上一个接口的数据，判断需要选中的数据有哪些
                for(let i=0;i<res1.data.data.length;i++){
                  for(let j=0;j<res.data.data.length;j++){
                    if (res1.data.data[i].id === res.data.data[j].id){
                      let json = {};
                      //就是满足要求的数据
                      json.name = res1.data.data[i].name;
                      json.id = res1.data.data[i].id;
                      json.parentId = res1.data.data[i].parentId;
                      that.selectData.push(json);
                    }
                  }
                }
                //循环给orderMap里面添加数据
                // //取出一级菜单
                // that.diYiJi = that.selectData.filter((v)=>{
                //   return v.parentId == 0;
                // })
                // console.log(that.diYiJi)
                //取出除过满足条件的一级菜单
                that.diYiYu = that.selectData.filter((v)=>{
                  return v.parentId != 0;
                });
                //取出二级菜单
                for (let i=0;i < that.daLei.length;i++){
                  that.orderMap[i].orders1 = that.diYiYu.filter((v)=>{
                    return v.parentId == that.daLei[i].id;
                  })
                }
                for (let i=0;i < that.daLei.length;i++){//4
                  for (let j=0;j<that.orderMap[i].orders1.length;j++){
                    that.orderMap[i].checkedCities.push(that.orderMap[i].orders1[j].name);
                  }
                }
              }else{
                console.log('未查询到渲染选中的相关信息')
              }
            }
          });

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
      // console.log(num);
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
    clear(){
      this.$router.go(-1);
    },
    quRen(){
      //循环所有的orders,取得对应的id
      for (let k=0;k<this.daLei.length;k++) {//4
        for(let i=0;i<this.orderMap[k].checkedCities.length;i++) {
          for (let j = 0; j < this.orderMap[k].orders.length; j++) {
            if (this.orderMap[k].checkedCities[i] == this.orderMap[k].orders[j].name) {
              this.permissions.push(this.orderMap[k].orders[j].id);
            }
          }
        }
      }
      this.$axios({
        url:'/role/updateRole',
        method:'post',
        data:{
          "permissions": this.permissions,
          "roleId": this.$route.params.id,
        }
      }).then((res)=>{
        if (res.status == 200){
          if (res.data.code == 0){
            //添加成功
            this.$message({
              message: '编辑成功！',
              type: 'success'
            });
            //返回主页
            this.$router.go(-1);
          }else{
            this.$message.error('编辑失败！');
          }
        }
      }).catch((err)=>{
        alert(err);
      })
    },
  }
}
</script>

<style scoped lang="less">
.editRole{
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


