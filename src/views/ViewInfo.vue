<template>
    <div class="app">
        <!-- 卡片 -->
        <el-card class="box-card">
            <div class="client-info">
                <div class="client-name">
                    <label for="">客户名称：</label>
                    <el-input width='200' v-model="input" :placeholder="userInfo.holder" class="client-inp" :disabled="true"></el-input>
                </div>
                 <div class="client-name">
                    <label for="">证件号码：</label>
                    <el-input width='200' v-model="input" :placeholder="userInfo.idCardNumber" class="client-inp" :disabled="true"></el-input>
                </div>
                 <div class="client-name">
                    <label for="">手机号码：</label>
                    <el-input width='200' v-model="input" :placeholder="userInfo.phoneNumber" class="client-inp" :disabled="true"></el-input>
                </div>
                 <div class="client-name">
                    <label for="">实名认证：</label>
                    <el-input width='200' v-model="input" :placeholder="userInfo.authentication" class="client-inp" :disabled="true"></el-input>
                </div>
                <!-- 返回按钮 -->
                <el-row class="back-row">
                    <el-button type="primary" class="back-btn" @click='back'>返回</el-button>
                </el-row>
                
            </div>
        </el-card>
        
    </div>
</template>
<script>
export default {
    data(){
        return{
            input:'',
            id:'',
            // 客户信息
            userInfo:[],
        }
    },
    methods:{
        //获取用户id
        getId(){
            this.id=this.$route.params.id;
        },
        // 获取当前客户资料
        getUsersInfo(){
             this.$axios({
                url:'/customer/customerMessage',
                params:{
                id:this.id
            }
            }).then((res)=>{
                this.userInfo=res.data.data;
                if(res.data.data.authentication==1){
                    res.data.data.authentication='已实名'
                 }else{
                     res.data.data.authentication='未实名'
                 }
            }).catch((err)=>{
                console.log(err);
            })
        },
        // 返回
        back(){
            this.$router.push('/customer');
        }
    },
    created(){
        this.getId();
        this.getUsersInfo();
    }
}
</script>
<style lang="less" scoped>
     // 客户信息
    .client-info{
        margin: 70px;
        height: 600px;
        width: 540px;
        border: 6px solid #ccc;
        padding-top: 20px;
        
        .client-name{
            display: flex;
            justify-content: left;
            height: 70px;
            line-height: 70px;
            label{
                width: 200px;
                height: 50px;
                text-align: right;
            }
            .client-inp{
                width: 260px;
            }
        }
        // 返回按钮
        .back-row{
           padding-left:120px;
           text-align: left;
        }
        .back-btn{
            width: 100px;
            // text-align: left;
        }
    }

</style>