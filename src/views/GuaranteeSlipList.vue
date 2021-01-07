<template>
  <div>
      <el-card class="box-card">
        <el-row id="option1">
          <div>
            <span>保单类型:</span>
            <el-button :type="type==null?'primary':''" @click='guaranteeSlipTypeSet(null)'>全部</el-button>
            <el-button :type="type==0?'primary':''" @click='guaranteeSlipTypeSet(0)'>交强险</el-button>
            <el-button :type="type==1?'primary':''" @click='guaranteeSlipTypeSet(1)'>商业险</el-button>
          </div>
        </el-row>
        <el-row id="option2">
          <div>
            <span>保单状态:</span>
            <el-button :type="status==null?'primary':''" @click='guaranteeSlipStatusSet(null)'>全部</el-button>
            <el-button :type="status==0?'primary':''" @click='guaranteeSlipStatusSet(0)'>已失效</el-button>
            <el-button :type="status==1?'primary':''" @click='guaranteeSlipStatusSet(1)'>已退保</el-button>
            <el-button :type="status==2?'primary':''" @click='guaranteeSlipStatusSet(2)'>保障中</el-button>
          </div>
        </el-row>
        <el-row>
          <!-- 下拉框 -->
          <el-col :span="4">
            <div class="grid-content bg-purple-dark">
              <el-select v-model="value" placeholder="请选择" @change="variation">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <!-- 输入框 -->
          <el-col :span="8"><el-input :placeholder="value==null?'请先选择搜索类型':'请输入内容'" v-model="input" clearable :disabled="value==null?true:false"></el-input></el-col>
          <el-col :span="8">
              <div class="grid-content bg-purple">
                  <div class="block">
                      <span class="demonstration"></span>
                      <el-date-picker
                      v-model="timer"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions">
                      </el-date-picker>
                  </div>
              </div>
          </el-col>
          <!-- 查询按钮 -->
          <el-col :span="2"><el-button type="primary" @click="beg">查询</el-button></el-col>
          <!-- 重置按钮 -->
          <el-col :span="2"><el-button type="info" @click="reset">重置</el-button></el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="quantity"><span>查询结果: 共计{{total}}条数据</span></el-col>
        </el-row>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="number"
              label="保单号码"
              width="185">
            </el-table-column>
            <el-table-column
              prop="carNumber"
              label="车牌号码"
              width="180">
            </el-table-column>
            <el-table-column
              prop="chassisNumber"
              label="车架号码">
            </el-table-column>
            <el-table-column
              prop="insuranceName"
              label="险种">
            </el-table-column>
            <el-table-column
              prop="name"
              label="车主名称">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机号码">
            </el-table-column>
            <el-table-column
              prop="startTime"
              label="保险起始时间"
              width="110">
            </el-table-column>
            <el-table-column
              prop="endTime"
              label="保险结束时间"
              width="110">
            </el-table-column>
            <el-table-column
              prop="status"
              label="保单状态">
            </el-table-column>
            <el-table-column
              label="操作">
            <template slot-scope="scope"  v-if="tableData">
              <router-link :to="{name:'GuaranteeSlipParticulars',params:{id:id}}">
              <el-button  type="text" size="small" @click="handleClick(scope.row)">查看保单</el-button>
              </router-link>
            </template>
            </el-table-column>
          </el-table>
          <el-row :gutter="20">
            <el-col :span="8" :offset="16"><div class="block">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[8,10,12]"
                layout="total,prev,pager,next,jumper,sizes"
                :total="total">
              </el-pagination>
            </div></el-col>
          </el-row>
      </el-card>
  </div>
</template>

<script>
export default {
    data() {
      return {
            //多选内容
          options: [{
            value: '保单号码',
            label: '保单号码'
          }, {
            value: '车主名称',
            label: '车主名称'
          }, {
            value: '手机号码',
            label: '手机号码'
          }, {
            value: '车架号',
            label: '车架号'
          }, {
            value: '车牌号',
            label: '车牌号'
          }],
          //搜索类型
          value: null,
          //搜索内容
          input: null,
          // 车主姓名
          name: null,
          // 保单号码
          number: null,
          // 电话号码 
          phone: null,
          // 车牌号码 
          carNumber: null,
          // 车架号码 
          chassisNumber: null,
          //分页数据
          currentPage: 1,
          // 分页大小
          pageSize: 10,
          // 数据总数
          total:0,
          //搜索时间段
          timer: null,
          //保单类型
          type:null,
          //保单状态
          status:null,
          //表格数据
          tableData: [],
          // 用户id
          id:0,
          // token
          token:sessionStorage.token,
          // 权限值
          jurisdiction:sessionStorage.jurisdiction||null,
          // 时间插件
          pickerOptions: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, 
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, 
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          }
        }
      },
    methods: {
      // 下拉框变动
      variation(){
        //输入数据初始化
        //搜索内容
        this.input=null;
        // 车主姓名
        this.name= null;
        // 保单号码
        this.number= null;
        // 电话号码 
        this.phone= null;
        // 车牌号码 
        this.carNumber= null;
        // 车架号码 
        this.chassisNumber= null;
      },
      //重置按钮
      reset() {
          //搜索类型
          this.value=null;
          //搜索内容
          this.input=null;
          //搜索时间
          this.timer=null;
          //保单类型
          this.type=null;
          //保单状态
          this.status=null;
          // 车主姓名
          this.name= null;
          // 保单号码
          this.number= null;
          // 电话号码 
          this.phone= null;
          // 车牌号码 
          this.carNumber= null;
          // 车架号码 
          this.chassisNumber= null;
          //分页数据
          this.currentPage=1;
          //搜索时间段
          this.timer= null;
          this.beg();
      },
      //保单类型按钮
      guaranteeSlipTypeSet(i){
        this.type=i;
      },
      //保单状态按钮
      guaranteeSlipStatusSet(i){
        this.status=i;
      },
      //分页
      handleSizeChange(val) {
        this.pageSize=val;
        this.beg();
      },
      handleCurrentChange(val) {
        this.currentPage=val;
        this.beg();
      },
      //请求接口
      beg(){
          let e=null;
          let s=null;
          //判断是否有时间并加工时间
          if(this.timer==null){
            s=null;
            e=null;
          }else{
            // 起始时间
            s = new Date(this.timer[0]);
            s=s.getFullYear() + '-' + (s.getMonth() + 1) + '-' + s.getDate();
            // 结束时间
            e = new Date(this.timer[1]);
            e=e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate();
          };
          //判断下拉框搜索内容
          switch(this.value){
            case '保单号码':
              this.number=this.input;
            break;
            case '车主名称':
              this.name=this.input;
            break;
            case '手机号码':
              this.phone=this.input;
            break;
            case '车架号':
              this.chassisNumber=this.input;
            break;
            case '车牌号':
              this.carNumber=this.input;
            break;
          }
          //请求总接口
          this.$axios({
            url: '/policy/listWhere',
            headers:{
              'token':this.token
            },
            method: 'post',
            data: {
              // 车牌号码 
              "carNumber": this.carNumber,
              // 车架号码 
              "chassisNumber": this.chassisNumber,
              // 保单起始时间 
              "startTime": s,
              // 保单结束时间 
              "endTime": e,
              // 车主姓名
              "name": this.name,
              // 保单号码
              "number": this.number,
              // 分页大小
              "pageSize": this.pageSize,
              // 电话号码 
              "phone": this.phone,
              // 开始序号 
              "startIndex": this.pageSize*(this.currentPage-1),
              // "startIndex": this.startIndex,
              // 险种状态 0为交强险,1为商业险
              "type": this.type,
              // 保单状态 0为失效,1为退保,2为保障中 
              "status": this.status
            }
        }).then((res)=>{
          if(res.data.data==null){
            this.total=0;
            this.tableData=[];
          }else{
            // 数据总数
            this.total=res.data.data.total;
            this.tableData=res.data.data.list;
            for(let i=0;i<this.tableData.length;i++){
              // 加工响应数据
              switch(this.tableData[i].status){
                case 0:
                  this.tableData[i].status='已失效'
                break;
                case 1:
                  this.tableData[i].status='已退保'
                break;
                case 2:
                  this.tableData[i].status='保障中'
                break;
              }
              this.tableData[i].startTime=this.timestampToTime(this.tableData[i].startTime);
              this.tableData[i].endTime=this.timestampToTime(this.tableData[i].endTime);
            }
          }
        }).catch((err)=>{
            console.log(err);
        })
        
          
      },
      //加工时间数据
      timestampToTime(timestamp) {
        let date = new Date(timestamp);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = (date.getDate()< 10? '0'+date.getDate(): date.getDate()) + ' ';
        let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
      },
      // 传id
      handleClick(row) {
        this.id=row.id;
      }
    },
    created() {
      this.beg();
    }
  }
</script>

<style lang="less" scoped>
</style>
<style lang="less" scoped>
     .box-card {
    width: 100%;
    height: 100%;
    position: relative;
    left: 0;
    top: 0;
    }
    #option1,#option2{
        text-align: left;
        height: 60px;
        line-height: 60px;
        button{
            margin-left: 30px;
        }
    }
    .grid-content.bg-purple-dark{
        line-height: 20px;
        margin-top: 6px;
    }
    .quantity{
      background: #C3E6F5;
      text-align: left;
      line-height: 50px;
      height: 50px;
      span{
        margin-left: 20px;
        font-size: 14px;
      }
    }
    .el-row{
      line-height: 50px;
      height: 50px;
    }
    thead tr{
      line-height: 40px;
      height: 40px;
      text-align: center;
      th div{
        text-align: center;
      }
    }
    tbody td div{
      text-align: center;
    }
    .el-pagination{
      margin-top: 20px;
    }
</style>