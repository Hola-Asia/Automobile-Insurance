<template>
  <div>
      <el-card class="box-card">
        <el-row id="option1">
          <div>
            <span>保单类型:</span>
            <el-button :type="guaranteeSlipType==null?'primary':''" @click='guaranteeSlipTypeSet(null)'>全部</el-button>
            <el-button :type="guaranteeSlipType==0?'primary':''" @click='guaranteeSlipTypeSet(0)'>交强险</el-button>
            <el-button :type="guaranteeSlipType==1?'primary':''" @click='guaranteeSlipTypeSet(1)'>商业险</el-button>
          </div>
        </el-row>
        <el-row id="option2">
          <div>
            <span>保单状态:</span>
            <el-button :type="guaranteeSlipStatus==null?'primary':''" @click='guaranteeSlipStatusSet(null)'>全部</el-button>
            <el-button :type="guaranteeSlipStatus==0?'primary':''" @click='guaranteeSlipStatusSet(0)'>已失效</el-button>
            <el-button :type="guaranteeSlipStatus==1?'primary':''" @click='guaranteeSlipStatusSet(1)'>已退保</el-button>
            <el-button :type="guaranteeSlipStatus==2?'primary':''" @click='guaranteeSlipStatusSet(2)'>保障中</el-button>
          </div>
        </el-row>
        <el-row>
          <!-- 下拉框 -->
          <el-col :span="4">
            <div class="grid-content bg-purple-dark">
              <el-select v-model="value" placeholder="请选择">
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
          <el-col :span="8"><el-input :placeholder="value==''?'请先选择搜索类型':'请输入内容'" v-model="input" clearable :disabled="value==''?true:false"></el-input></el-col>
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
          <el-col :span="24" class="quantity"><span>查询结果: 共计4条数据</span></el-col>
        </el-row>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="policyNumber"
              label="保单号码"
              width="185">
            </el-table-column>
            <el-table-column
              prop="licenseNumber"
              label="车牌号码"
              width="180">
            </el-table-column>
            <el-table-column
              prop="frameNumber"
              label="车架号码">
            </el-table-column>
            <el-table-column
              prop="typesOfInsurance"
              label="险种">
            </el-table-column>
            <el-table-column
              prop="brandModel"
              label="品牌型号">
            </el-table-column>
            <el-table-column
              prop="owner"
              label="车主名称">
            </el-table-column>
            <el-table-column
              prop="phoneNumber"
              label="手机号码">
            </el-table-column>
            <el-table-column
              prop="startingTime"
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
              <router-link to="/guaranteeSlipParticulars">
              <el-button  type="text" size="small">查看保单</el-button>
              </router-link>
            </el-table-column>
          </el-table>
          <el-row :gutter="20">
            <el-col :span="8" :offset="16"><div class="block">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10,15,20]"
                layout="total,prev,pager,next,jumper,sizes"
                :total="30">
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
          value: '选项1',
          label: '保单号码'
        }, {
          value: '选项2',
          label: '车主名称'
        }, {
          value: '选项3',
          label: '手机号码'
        }, {
          value: '选项4',
          label: '车架号'
        }, {
          value: '选项5',
          label: '车牌号'
        }],
        //搜索类型
        value: '',
        //搜索内容
        input: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        //分页数据
        currentPage4: 1,
        //搜索时间段
        timer: '',
        //保单类型
        guaranteeSlipType:null,
        //保单状态
        guaranteeSlipStatus:null,
        //表格数据
        tableData: [{
          //保单号码
          policyNumber: '12345678901234567890',
          // 车牌号码
          licenseNumber: '京A-XXXXX',
          // 车架号码
          frameNumber: 'LFVHESR516452XXXX',
          // 险种
          typesOfInsurance:'车损险/三者险',
          // 品牌型号
          brandModel:'雅阁HG7154CBMA轿车',
          // 车主名称
          owner:'王小X',
          // 手机号码
          phoneNumber:'1315242XXXX',
          // 保险起始时间
          startingTime:'2018-10-12 11:32:45',
          // 保险结束时间
          endTime:'2019-10-11 24:00:00',
          // 保单状态
          status:'保障中',
          // 操作
          operation:'查看保单'
        },{
          //保单号码
          policyNumber: '12345678901234567890',
          // 车牌号码
          licenseNumber: '京A-XXXXX',
          // 车架号码
          frameNumber: 'LFVHESR516452XXXX',
          // 险种
          typesOfInsurance:'车损险/三者险',
          // 品牌型号
          brandModel:'雅阁HG7154CBMA轿车',
          // 车主名称
          owner:'王小X',
          // 手机号码
          phoneNumber:'1315242XXXX',
          // 保险起始时间
          startingTime:'2018-10-12 11:32:45',
          // 保险结束时间
          endTime:'2019-10-11 24:00:00',
          // 保单状态
          status:'保障中',
          // 操作
          operation:'查看保单'
        },{
          //保单号码
          policyNumber: '12345678901234567890',
          // 车牌号码
          licenseNumber: '京A-XXXXX',
          // 车架号码
          frameNumber: 'LFVHESR516452XXXX',
          // 险种
          typesOfInsurance:'车损险/三者险',
          // 品牌型号
          brandModel:'雅阁HG7154CBMA轿车',
          // 车主名称
          owner:'王小X',
          // 手机号码
          phoneNumber:'1315242XXXX',
          // 保险起始时间
          startingTime:'2018-10-12 11:32:45',
          // 保险结束时间
          endTime:'2019-10-11 24:00:00',
          // 保单状态
          status:'保障中',
          // 操作
          operation:'查看保单'
        },{
          //保单号码
          policyNumber: '12345678901234567890',
          // 车牌号码
          licenseNumber: '京A-XXXXX',
          // 车架号码
          frameNumber: 'LFVHESR516452XXXX',
          // 险种
          typesOfInsurance:'车损险/三者险',
          // 品牌型号
          brandModel:'雅阁HG7154CBMA轿车',
          // 车主名称
          owner:'王小X',
          // 手机号码
          phoneNumber:'1315242XXXX',
          // 保险起始时间
          startingTime:'2018-10-12 11:32:45',
          // 保险结束时间
          endTime:'2019-10-11 24:00:00',
          // 保单状态
          status:'保障中',
          // 操作
          operation:'查看保单'
        }]
      }
      },
        methods: {
          //重置按钮
          reset() {
              this.value='';
              this.input='';
              this.timer='';
              this.guaranteeSlipType=1;
              this.guaranteeSlipStatus=1;
          },
          //保单类型按钮
          guaranteeSlipTypeSet(i){
            this.guaranteeSlipType=i;
          },
          //保单状态按钮
          guaranteeSlipStatusSet(i){
            this.guaranteeSlipStatus=i;
          },
          //分页
          handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
          },
          handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
          },
          beg(){
            this.$axios({
                url: '/policy/listWhere',
                data: {
                  // 车牌号码 
                  // "carNumber": "string",
                  // 车架号码 
                  // "chassisNumber": "string",
                  // 保单结束时间 
                  // "endTime": "2020-12-30T07:08:25.788Z",
                  // 保单id 
                  // "id": 0,
                  // 险种 
                  // "insuranceName": "string",
                  // 车主姓名
                  // "name": "string",
                  // 保单号码
                  // "number": 0,
                  // 分页大小
                  // "pageSize": 5,
                  // 电话号码 
                  // "phone": "string",
                  // 开始序号 
                  // "startIndex": 0,
                  // 保单起始时间 
                  // "startTime": "2020-12-30T07:08:25.788Z",
                  // 险种状态 0为交强险,1为商业险
                  // "type": 0,
                  // 保单状态 0为失效,1为退保,2为保障中 
                  // "status": 0
                }
            }).then((res)=>{
                alert(res);
            }).catch((err)=>{
                alert(err)
            })
          }
        }
      
    }
    
</script>

<style lang="less" scoped>
</style>
<style lang="less">
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