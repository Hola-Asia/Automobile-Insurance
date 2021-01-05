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
                  <!-- <div class="client-info">
                <div class="car-one">
                    <div>银行卡二</div>
                </div>
                <div class="client-name">
                    <label for="">银行卡号：</label>
                    <el-input width='200' :disabled="true" v-model="input" placeholder="4792741741" class="client-inp"></el-input>
                </div>
                 <div class="client-name">
                    <label for="">开户银行：</label>
                    <el-input width='200' :disabled="true" v-model="input" placeholder="四川农业银行" class="client-inp"></el-input>
                </div>
                 <div class="client-name">
                    <label for="">预留号码：</label>
                    <el-input width='200' :disabled="true" v-model="input" placeholder="46281320110" class="client-inp"></el-input>
                </div>
                <div class="client-name">
                    <label for="">账户信息：</label>
                    <el-input width='200' :disabled="true" v-model="input" placeholder="王小波" class="client-inp"></el-input>
                </div>
                 <div class="client-name">
                    <label for="">证件号码：</label>
                    <el-input width='200' :disabled="true" v-model="input" placeholder="649829471" class="client-inp"></el-input>
                </div>
                  </div> -->
             </div>
             <!-- 返回按钮 -->
                <el-row class="back-row">
                    <el-button type="primary" class="back-btn">返回</el-button>
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
       
    },
    computed:{
        
    },
    created(){
       this.getId();
     // 获取用户银行卡信息
             this.$axios({
                url:'/customer/customerBank',
                params:{
                id:this.id
            }
            }).then((res)=>{
                this.userCard=res.data.data;
            }).catch((err)=>{
                console.log(err);
            });
    },

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