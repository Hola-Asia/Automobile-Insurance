<template>
  <div id="#app">
      <el-card class="box-card">
            <!--  是否交易-->
            <div class="deal-row">
                <span>保单类型：</span> 
                <el-button :key="i" v-for="(v,i) in btnArr1" class="deal-btn" @click="fn(i)" :class="[sel==i?'active':'']">{{v}}</el-button>
            </div>
            <!-- 实名状态 -->
            <div class="deal-row">
                <span>保险状态：</span> 
                <el-button :key="i" v-for="(v,i) in btnArr2" class="deal-btn" @click="fn1(i)" :class="[sel1==i?'active':'']">{{v}}</el-button>
            </div>
            <!--搜索 查询  -->
            <!-- 4块     10 6 6 2 -->
            <el-form :model="ruleForm" ref="ruleForm">
              <el-row :gutter="30" class="chit-query">
                 <!--搜索  -->
                <el-col :span="8">
                  <el-form-item prop="input3">
                       <el-input placeholder="请输入内容"  v-model="ruleForm.input3" class="input-with-select">
                         <el-select class="cus-sel" v-model="ruleForm.select" slot="prepend" placeholder="请选择">
                           <el-option label="保单号码" value="1"></el-option>
                           <el-option label="车主名称" value="2"></el-option>
                           <el-option label="车架号" value="3"></el-option>
                           <el-option label="车牌号" value="4"></el-option>
                         </el-select>
                         <el-button slot="append" icon="el-icon-search"></el-button>
                       </el-input>
                  </el-form-item>
                </el-col>
                <!-- 日期 -->
                <el-col :span="8">
                    <div class="block">
                      <el-date-picker v-model="value1" type="daterange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期">
                      </el-date-picker>
                </div>
                </el-col>
                <!-- 查询、重置 -->
                <el-col :span="4">
                     <el-col :span="12">
                        <el-button type="primary" class="query-btn" @click="insuranceTime">查询</el-button>
                    </el-col>
                     <el-col :span="12">
                        <el-button type="info" class="query-btn" @click="resetForm('ruleForm')">重置</el-button>
                    </el-col>
                </el-col>
                <el-col :span="4"></el-col>
              </el-row>
            </el-form>
            <!-- 查询结果 -->
            <el-row>
                <el-col :span="24">
                    <div class="query-ending">查询结果：共计{{pageList.total}}条数据</div>
                </el-col>
            </el-row>
            <!-- 表格 -->
             <el-table border :data="tableData" stripe style="width: 100%" class="table-Cus-info" :header-cell-style="{background:'#D7D7D7',textAlign: 'center'}" :cell-style="{ textAlign: 'center' }">
                <el-table-column prop="number" label="保单号码" width="160" class="bg-Cus">
                </el-table-column>
                <el-table-column prop="car_number" label="车牌号码" width="160" class="bg-Cus">
                </el-table-column>
                <el-table-column prop="chassis_number" label="车架号码" width="180" class="bg-Cus">
                </el-table-column>
                <el-table-column prop="type" label="险种" width="150" class="bg-Cus">
                </el-table-column>
                <el-table-column prop="name" label="车主名称" width="100" class="bg-Cus">
                </el-table-column>
                <el-table-column prop="phone" label="手机号码" width="180">
                </el-table-column>
                <el-table-column prop="plicy_start_time" label="保险起始时间" width="240">
                </el-table-column>
                <el-table-column prop="plicy_end_time" label="保险结束时间" width="240">
                  
                </el-table-column>
                <el-table-column prop="status" label="保单状态" width="100">
                </el-table-column>
                <el-table-column label="操作">
                     <router-link :to="{name:'Guarantee',params:{id:id}}">
                        <el-button type="text" size="small">查看保单</el-button>
                     </router-link>
                </el-table-column>
            </el-table> 
            <!-- 分页 -->
            <el-pagination class="pages-Cus" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageList.page"
            :page-sizes="[1, 2, 3]" :page-size="pageList.limit"
             layout="prev, pager, next,sizes, jumper" :total="pageList.total">
            </el-pagination>
      </el-card>
  </div>
</template>

<script>
export default {
  name: "Customer",
  data() {
    return {
      // 1.按钮 保单类型
      sel:0,
      btnArr1:['全部','交强险','商业险'],
      // 要改的保单类型数据
      sel2:'',
      // 保单状态
      sel1:0,
      // 要改得保单状态
      sel3:'',
      btnArr2:['全部','已失效','已退保','保障中'],
      // 用户id
      id:'',
      // 查询
      // 表单
      ruleForm:{
          input3:'',
          select:'',
      },
      // 选择查询
      chooseQuery:{
        // 保单号码
        policyNumber:'',
        // 车主名称
        carName:'',
        // 车架号
        vin:'',
        // 车牌号
        licenseNumber:''
      },
      // 获取的时间
      value1:'',
      //要传的时间戳 
      value2:[],
    //   表格
      tableData: [],
    // 分页
    pageList:{
      // 当前页数
      page:1,
      limit:3,
      // 总条数
      total:2,
    },
    }
  },
  methods: {
    // 按钮
      fn(val){
        this.sel=val;
      },
      fn1(val){
        this.sel1=val;
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageList.limit=val;
        this.policyList();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageList.page=val;
        this.policyList();
      },
      // 重置
       resetForm(formName){
        this.$refs[formName].resetFields();
        this.sel1=0;
        this.sel=0;
        this.ruleForm.select='';
        this.ruleForm.input3='';
        this.value1=[];
        this.value2=[];
        this.chooseQuery.policyNumber='';
        this.chooseQuery.carName='';
        this.chooseQuery.vin='';
        this.chooseQuery.licenseNumber='';
        
        // this.policyList();
        this.insuranceTime();
      },
      // 获取id
       getId(){
         this.id=this.$route.params.id;
        },
      // 查询
      insuranceTime(){
        // 把时间转换为时间戳
        function double(data){
          return data>=10?data:'0'+data;
        };
        for(var i=0;i<this.value1.length;i++){
           let g=new Date(this.value1[i]);
           let d=g.getFullYear() + '-' +double(g.getMonth() + 1) + '-'+double(g.getDate());
            this.value2.push(d);
        }
        // 根据保单类型进行查询
         switch (this.sel){
           case 0:
             this.sel2='';
             break;
           case 1:
             this.sel2=0;
             break;
           case 2:
             this.sel2=1;
             break;
         };
        // 根据保险状态进行查询
        switch (this.sel1){
          case 0:
             this.sel3='';
             break;
           case 1:
             this.sel3=0;
             break;
           case 2:
             this.sel3=1;
             break;
           case 3:
             this.sel3=2;
             break; 
        };
        // 判断选择状态
        switch(this.ruleForm.select){
           case '':
              // this.$message.error('请选择查询方式哦！');
              this.ruleForm.input3='';
              console.log('空');
              break;
           case '1':
            console.log('保单号码');
            this.chooseQuery.policyNumber=this.ruleForm.input3;
             break;
           case '2':
            console.log('车主名称');
            this.chooseQuery.carName=this.ruleForm.input3;
             break;
           case '3':
            console.log('车架号');
            this.chooseQuery.vin=this.ruleForm.input3;
             break;
           case '4':
            console.log('车牌号');
            this.chooseQuery.licenseNumber=this.ruleForm.input3;
             break;
        };
        // 保单开始时间，结束时间
        this.policyList();
        this.value2=[];
      },
      // 渲染列表
      policyList(){
          this.$axios({
            url:'/customer/queryPolicy',
            method:'post',
            data:{
              // 车牌号码
                "carNumber": this.chooseQuery.licenseNumber,
                // 车架号码
                "chassisNumber": this.chooseQuery.vin,
                // 保单结束时间
                "endTime": this.value2[1],
                // 客户id
                "id":this.id,
                // 险种
                "insuranceName": "",
                // 车主名字
                "name": this.chooseQuery.carName,
                // 保单号码
                "number": this.chooseQuery.policyNumber,
                // 分页大小
                "pageSize": this.pageList.limit,
                // 电话号码
                "phone": "",
                // 开始序号
                "startIndex": (this.pageList.page-1)*this.pageList.limit,
                // 保单起始时间
                "startTime": this.value2[0],
                // 保单状态
                "status": this.sel3,
                // 险种状态
                "type": this.sel2
            }
          }).then((res)=>{
            this.tableData=res.data.data.list;
            this.pageList.total=res.data.data.total;
            for(var i=0;i<this.tableData.length;i++){
                // 判断险种
                if(res.data.data.list[i].type=='0'){
                    res.data.data.list[i].type='交强险';
                }else{
                    res.data.data.list[i].type='商业险';
                }
                // 判断保单状态
                switch(res.data.data.list[i].status){
                    case 0:
                      res.data.data.list[i].status='已失效';
                      break;
                    case 1:
                      res.data.data.list[i].status='已退保';
                      break;
                    case 2:
                      res.data.data.list[i].status='保障中';
                      break;
                }
                   
                function double(data){
                    return data>=10?data:'0'+data;
                }

                 // 获取到时间戳，在把时间戳改为正常的格式
                 // 判断保单起始时间
                       let b= res.data.data.list[i].plicy_start_time;
                       let g=new Date(b);
                       let d=g.getFullYear() + '-' +double(g.getMonth() + 1) + '-'+double(g.getDate())  + ' ' +double(g.getHours())  + ':' +double(g.getMinutes())  + ':' +double(g.getSeconds());
                       res.data.data.list[i].plicy_start_time=d;
                // 判断保单结束时间
                       let b1= res.data.data.list[i].plicy_end_time;
                       let g1=new Date(b1);
                       let d1=g1.getFullYear() + '-' +double(g1.getMonth() + 1) + '-'+double(g1.getDate())  + ' ' +double(g1.getHours())  + ':' +double(g1.getMinutes())  + ':' +double(g1.getSeconds());
                       res.data.data.list[i].plicy_end_time=d1;
            }
            

          }).catch((err)=>{
            console.log(err);
          })
      },
    },
    created(){
      this.getId();
      this.policyList();
    }
}
</script>

<style lang="less"  scoped>
  .letter{
    float: left;
  }
 .cus-sel{
    width: 120px;
  }
  .chit-query{
      margin-top: 30px;
  }
  .box-card{
    //   height: 100%;
      line-height: 42px;
       /* 交易 */
    .deal-row{
        display: flex;
        width: 800px;
        height: 44px;
        margin-bottom: 10px;
        .deal-btn{
            width: 150px;
            margin-left: 20px;
        }
        .active{
          background-color: #409EFF;
          color: #fff;
        }
    }
    // 搜索
     .el-select .el-input {
     width: 120px;
     }
    .input-with-select .el-input-group__prepend {
    background-color: #fff;
    }
    // 查询
    .query-btn{
        width: 100%;
    }
    // 查询结果
    .query-ending{
        height: 50px;
        line-height: 50px;
        background-color: #C3E6F5;
        margin-top: 30px;
        text-align: left;
        padding-left: 20px;
    }
    // 表单
    .table-Cus-info{
        // border: 1px solid #ccc;
        margin-top: 20px;
        // text-align: center!important;
        .bg-Cus{
            background-color: #D7D7D7;
            text-align: center;

        }
    }
    // 分页
    .pages-Cus{
        margin-top: 20px;
        text-align: right;
        padding-right: 20px;
    }
  }
</style>