<template>
    <div class="app"> 
        <div class="view-info">
            <router-link :to="{name:'ViewInfo',params:{id:id}}" class="view-bar">
                <span :class='[sel==0?"active":""]' @click='fn(0)'>TA的资料</span>
             </router-link>
              <router-link :to="{name:'ViewOrder',params:{id:id}}" class="view-bar">
                <span :class='[sel==1?"active":""]' @click='fn(1)' >TA的订单</span>
             </router-link>
              <router-link :to="{name:'ViewChit',params:{id:id}}" class="view-bar">
                <span :class='[sel==2?"active":""]' @click='fn(2)' >TA的保单</span>
             </router-link>
              <router-link :to="{name:'CarInfo',params:{id:id}}" class="view-bar">
                <span :class='[sel==3?"active":""]' @click='fn(3)' >车辆信息</span>
             </router-link>
              <router-link :to="{name:'TaBankCar',params:{id:id}}" class="view-bar">
                <span :class='[sel==4?"active":""]' @click='fn(4)' >TA的银行卡</span>
             </router-link>
        </div>
        <router-view></router-view>
        
    </div>
</template>
<script>
export default {
 data(){
     return{
         sel:0,
         id:'',
     }
 },
 methods:{
     fn(v){
         this.sel=v;
     },
    //获取用户id
     getId(){
         this.id=this.$route.params.id;
        //  console.log(this.id);
    },
 },
  created(){
        this.getId();
    } 
}
</script>
<style lang="less" scoped>

    .view-info{
        width: 600px;
        display: flex;
        justify-content: space-between;
        height: 50px;
        line-height: 50px;
        margin-left: 50px;
        font-weight: 600;
        /* .view-info-bar{
            width: 100px;
            height: 50px;
            line-height: 50px;
            background-color: green;
            color: #fff;
        } */
        .active{
                color: #409EFF;
            }
        .view-bar{
            // width: 80px;
            height: 22px;
            line-height: 22px;
            text-decoration: none;
            color: #666666;
            // background-color: pink;
           /*  &:hover{
                color: #409EFF;
            } */
            
        }
        
    }
   
</style>