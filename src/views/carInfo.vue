<template>
   <div class="app">
         <el-card class="box-card clearfix">
             <div class="car-row1">
                  <div class="client-info">
                <div class="car-one">
                    <div>车辆一</div>
                </div>
                <div class="client-name">
                    <label for="">车牌号码：</label>
                    <el-input width='200' v-model="input" :placeholder="carInfo[0].car_number" class="client-inp" :disabled="true"></el-input>
                </div>
                 <div class="client-name">
                    <label for="">发动机号：</label>
                    <el-input width='200' v-model="input" :placeholder="carInfo[0].engine_number" class="client-inp" :disabled="true"></el-input>
                </div>
                 <div class="client-name">
                    <label for="">品牌型号：</label>
                    <el-input width='200' v-model="input" :placeholder="carInfo[0].brand_number" class="client-inp" :disabled="true"></el-input>
                </div>
                <div class="client-name">
                    <label for="">初登日期：</label>
                    <el-input width='200' v-model="input" :placeholder="registrationDate[0]" class="client-inp" :disabled="true"></el-input>
                </div>
                 <div class="client-name">
                    <label for="">车辆性质：</label>
                    <el-input width='200' v-model="input" :placeholder="carInfo[0].vehicle_nature" class="client-inp" :disabled="true"></el-input>
                </div>
                 <div class="client-name">
                    <label for="">座位数：</label>
                    <el-input width='200' v-model="input" :placeholder="carInfo[0].seats_number" class="client-inp" :disabled="true"></el-input>
                </div>
                  </div>
                  <div class="client-info">
                <div class="car-one">
                    <div>车辆二</div>
                </div>
                <div class="client-name">
                    <label for="">车牌号码：</label>
                    <el-input width='200' v-model="input" :placeholder="carInfo[1].car_number" class="client-inp" :disabled="true"></el-input>
                </div>
                 <div class="client-name">
                    <label for="">发动机号：</label>
                    <el-input width='200' v-model="input" :placeholder="carInfo[1].engine_number" class="client-inp" :disabled="true"></el-input>
                </div>
                 <div class="client-name">
                    <label for="">品牌型号：</label>
                    <el-input width='200' v-model="input" :placeholder="carInfo[1].brand_number" class="client-inp" :disabled="true"></el-input>
                </div>
                <div class="client-name">
                    <label for="">初登日期：</label>
                    <el-input width='200' v-model="input" :placeholder="registrationDate[1]" class="client-inp" :disabled="true"></el-input>
                </div>
                 <div class="client-name">
                    <label for="">车辆性质：</label>
                    <el-input width='200' v-model="input" :placeholder="carInfo[1].vehicle_nature" class="client-inp" :disabled="true"></el-input>
                </div>
                 <div class="client-name">
                    <label for="">座位数：</label>
                    <el-input width='200' v-model="input" :placeholder="carInfo[1].seats_number" class="client-inp" :disabled="true"></el-input>
                </div>
                  </div>
                  <!-- <div class="client-info">
                <div class="car-one">
                    <div>车辆二</div>
                </div>
                <div class="client-name">
                    <label for="">车牌号码：</label>
                    <el-input width='200' v-model="input" placeholder="川A-XXX" class="client-inp" :disabled="true"></el-input>
                </div>
                 <div class="client-name">
                    <label for="">发动机号：</label>
                    <el-input width='200' v-model="input" placeholder="35176327313" class="client-inp" :disabled="true"></el-input>
                </div>
                 <div class="client-name">
                    <label for="">品牌型号：</label>
                    <el-input width='200' v-model="input" placeholder="雅鹿12312-dhks" class="client-inp" :disabled="true"></el-input>
                </div>
                <div class="client-name">
                    <label for="">初登日期：</label>
                    <el-input width='200' v-model="input" placeholder="2019-02-21" class="client-inp" :disabled="true"></el-input>
                </div>
                 <div class="client-name">
                    <label for="">车辆性质：</label>
                    <el-input width='200' v-model="input" placeholder="非营运" class="client-inp" :disabled="true"></el-input>
                </div>
                 <div class="client-name">
                    <label for="">座位数：</label>
                    <el-input width='200' v-model="input" placeholder="5" class="client-inp" :disabled="true"></el-input>
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
            // 客户车辆信息
            carInfo:[
                {
                    car_number:''
                },
                {
                    car_number:''
                }
            ],
            // 时间
            registrationDate:[],
        }
    },
    methods:{
        //获取用户id
        getId(){
         this.id=this.$route.params.id;
        },
        // 获取客户车辆信息
        getUsersCar(){
             this.$axios({
                url:'/customer/customerCar',
                params:{
                id:this.id
            }
            }).then((res)=>{
                // 转换为两位数字
                    function double(data){
                        return data>=10?data:'0'+data;
                    }
                    // 获取到时间戳，在把时间戳改为正常的格式
                    this.carInfo=res.data.data;
                    for(var i=0;i<=this.carInfo.length;i++){
                       let b= this.carInfo[i].registration_date;
                       let g=new Date(b);
                       let d=g.getFullYear() + '-' +double(g.getMonth() + 1) + '-'+double(g.getDate())  + ' ' +double(g.getHours())  + ':' +double(g.getMinutes())  + ':' +double(g.getSeconds());
                       this.registrationDate.push(d);
                    }
            }).catch((err)=>{
                // console.log(err);
            })
        },
    },
    created(){
        this.getId();
        this.getUsersCar();
    } 
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
                // width: 200px;
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