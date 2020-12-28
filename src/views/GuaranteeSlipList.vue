<template>
  <div>
      <el-card class="box-card">
            <el-row id="option1">
                <div>
                    <span>保单类型:</span>
                    <el-button type="primary">全部</el-button>
                    <el-button>交强险</el-button>
                    <el-button>商业险</el-button>
                </div>
            </el-row>
            <el-row id="option2">
                <div>
                    <span>保单状态:</span>
                    <el-button type="primary">全部</el-button>
                    <el-button>已失效</el-button>
                    <el-button>已退保</el-button>
                    <el-button>保障中</el-button>
                </div>
            </el-row>
                <el-row>
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
                    <el-col :span="8"><div class="grid-content bg-purple"><el-input placeholder="请输入内容" v-model="input" clearable> </el-input></div></el-col>
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
                    <el-col :span="2"><div class="grid-content bg-purple-dark"><el-button type="primary">查询</el-button></div></el-col>
                    <el-col :span="2"><div class="grid-content bg-purple-dark"><el-button type="info" @click="reset">重置</el-button></div></el-col>
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
        value: '',
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
        timer: ''
      }

      },
        methods: {
        reset() {
            this.value='';
            this.input='';
            this.timer='';
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
        margin-top: 61px;
    }
    
</style>