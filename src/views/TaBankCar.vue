<template>
   <div class="app">
         <el-card class="box-card clearfix">
             <div class="car-row1">
                     <div class="client-info">
                <div class="car-one">
                    <div>银行卡一</div>
                </div>
                <div class="client-name">
                    <label for="">银行卡号：</label>
                    <el-input width='200' :disabled="true" v-model="input" :placeholder="userCard[0].bank_card" class="client-inp"></el-input>
                </div>
                 <div class="client-name">
                    <label for="">开户银行：</label>
                    <el-input width='200' :disabled="true" v-model="input" :placeholder="userCard[0].bank_deposit" class="client-inp"></el-input>
                </div>
                 <div class="client-name">
                    <label for="">预留号码：</label>
                    <el-input width='200' :disabled="true" v-model="input" :placeholder="userCard[0].phone_number" class="client-inp"></el-input>
                </div>
                <div class="client-name">
                    <label for="">账户名称：</label>
                    <el-input width='200' :disabled="true" v-model="input" :placeholder="userCard[0].holder" class="client-inp"></el-input>
                </div>
                 <div class="client-name">
                    <label for="">证件号码：</label>
                    <el-input width='200' :disabled="true" v-model="input" :placeholder="userCard[0].idcard_number" class="client-inp"></el-input>
                </div>
                  </div>
                  <div class="client-info">
                <div class="car-one">
                    <div>银行卡二</div>
                </div>
                <div class="client-name">
                    <label for="">银行卡号：</label>
                    <el-input width='200' :disabled="true" v-model="input" :placeholder="userCard[1].bank_card" class="client-inp"></el-input>
                </div>
                 <div class="client-name">
                    <label for="">开户银行：</label>
                    <el-input width='200' :disabled="true" v-model="input" :placeholder="userCard[1].bank_deposit" class="client-inp"></el-input>
                </div>
                 <div class="client-name">
                    <label for="">预留号码：</label>
                    <el-input width='200' :disabled="true" v-model="input" :placeholder="userCard[1].phone_number" class="client-inp"></el-input>
                </div>
                <div class="client-name">
                    <label for="">账户名称：</label>
                    <el-input width='200' :disabled="true" v-model="input" :placeholder="userCard[1].holder" class="client-inp"></el-input>
                </div>
                 <div class="client-name">
                    <label for="">证件号码：</label>
                    <el-input width='200' :disabled="true" v-model="input" :placeholder="userCard[1].idcard_number" class="client-inp"></el-input>
                </div>
                
                  </div>
             </div>
             <!-- 返回按钮 -->
                <el-row class="back-row">
                    <el-button type="primary" class="back-btn" @click="back">返回</el-button>
                </el-row>
        </el-card>
    </div> 
</template>
<script>
export default {
     data(){
        return{
            input:'',
            value1:'',
            id:'',
            token:sessionStorage.token,
            // 用户银行卡信息
            userCard:[
                {
                    bank_card:''   
                },
                {
                    bank_card:''
                }
            ],
        }
    },
    methods:{
         //获取用户id
        getId(){
         this.id=this.$route.params.id;
        }, 
       // 返回
        back(){
            this.$router.push('/customer');
        }
    },
    computed:{
        
    },
    created(){
       this.getId();
     // 获取用户银行卡信息
             this.$axios({
                url:'/customer/customerBank',
                headers:{
                    'token':this.token
                },
                params:{
                id:this.id
            }
            }).then((res)=>{
                console.log(res.data.data);
                this.userCard=res.data.data;
            }).catch((err)=>{
                console.log(err);
            });
    },
   /*  watch:{
        userCard:function(){

        }
    } */

}
</script>
<style lang="less" scoped>
 // 车辆信息
    .car-row1{
        display: flex;
        flex-direction: row;
        justify-content: left;
    }
    .client-info{
        // flex: 1;
        margin: 40px;
        height: 520px;
        width: 480px;
        border: 6px solid #ccc;
        .car-one{
            height: 50px;
            line-height: 50px;
            width: 100%;
            background-color: #ccc;
            margin-bottom: 40px;
        }
        .client-name{
            display: flex;
            justify-content: left;
            height: 70px;
            line-height: 70px;
            label{
                width: 146px;
                height: 50px;
                text-align: right;
            }
            .client-inp{
                width: 260px;
            }
        } 
    }
 // 返回按钮
        .back-row{
           padding-left:120px;
           text-align: left;
           .back-btn{
            width: 100px;
            // text-align: left;
        }
        }
</style>