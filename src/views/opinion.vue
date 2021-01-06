<template>
  <!-- 资讯页面 -->
  <div style="height:100%;">
    <div style="padding:20px;background:#fff;minHeight:93%">
      <!-- 分类按钮区 -->
      <div class="classify">
        <el-row class="newadd">
          <el-col :span="2">
            <div class="grid-content">问题类型：</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content">
              <button
                class="classifybtn"
                :class="[btn1_active == '0' ? 'active' : '']"
                @click="tab1(0)"
              >
                全部
              </button>
            </div>
          </el-col>
          <el-col :span="1">
            <div class="grid-content"></div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content">
              <button
                class="classifybtn"
                :class="[btn1_active == '1' ? 'active' : '']"
                @click="tab1(1)"
              >
                功能异常
              </button>
            </div>
          </el-col>
          <el-col :span="1">
            <div class="grid-content"></div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content">
              <button
                class="classifybtn"
                :class="[btn1_active == '2' ? 'active' : '']"
                @click="tab1(2)"
              >
                体验问题
              </button>
            </div>
          </el-col>
          <el-col :span="1">
            <div class="grid-content"></div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content">
              <button
                class="classifybtn"
                :class="[btn1_active == '3' ? 'active' : '']"
                @click="tab1(3)"
              >
                修改建议
              </button>
            </div>
          </el-col>
        </el-row>
        <el-row class="newadd">
          <el-col :span="2">
            <div class="grid-content">处理状态：</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content">
              <button
                class="classifybtn"
                :class="[btn2_active == '0' ? 'active' : '']"
                @click="tab2(0)"
              >
                全部
              </button>
            </div>
          </el-col>
          <el-col :span="1">
            <div class="grid-content"></div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content">
              <button
                class="classifybtn"
                :class="[btn2_active == '1' ? 'active' : '']"
                @click="tab2(1)"
              >
                已处理
              </button>
            </div>
          </el-col>
          <el-col :span="1">
            <div class="grid-content"></div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content">
              <button
                class="classifybtn"
                :class="[btn2_active == '2' ? 'active' : '']"
                @click="tab2(2)"
              >
                未处理
              </button>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 查询 -->
      <div class="search">
        <el-row>
          <el-col :span="11">
            <div class="grid-content">
              <el-input
                v-model="numberValidateForm.title"
                placeholder="提出者、手机号"
              ></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <div class="block">
                <el-date-picker
                  v-model="numberValidateForm.value1"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="反馈时间"
                  end-placeholder="反馈时间"
                  :picker-options="numberValidateForm.pickerOptions"
                >
                </el-date-picker>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content">
              <button class="operationbtn addcheck formbtn">提交</button>
              <button
                @click="resetForm('numberValidateForm')"
                class="operationbtn addcheck formbtn newbtn"
              >
                重置
              </button>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 新增 -->
      <div>
        <el-row class="newadd">
          <el-col :span="24">
            <div class="grid-content">
              <button class="operationbtn addcheck newaddbtn">+ 新增</button>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 查询条数 -->
      <el-row class="searchnum">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            查询结果：共计<span>{{ datalist.length }}</span
            >条
          </div>
        </el-col>
      </el-row>
      <!-- 表身 -->
      <div class="infor-list">
        <!-- 表头栅格 -->
        <el-row class="tablehead" style="background:#d7d7d7">
          <el-col :span="3">
            <div class="grid-content">反馈时间</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content">问题类型</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content">提出者</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content">手机号</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content">处理状态</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content">操作</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content">备注</div>
          </el-col>
        </el-row>
        <el-row v-for="(v, i) in datalist" :key="i" class="bgcolor" :class="[i%2!=0?'active':'']">
          <el-col :span="3">
            <div class="grid-content">
              <div class="col-time">{{ v.createdate }}</div>
              <div class="col-time">{{ v.createtime }}</div>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content">
              {{ v.category }}
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content">{{ v.presenter }}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content">{{ v.phone }}</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content">{{ v.status }}</div>
          </el-col>
          <el-col :span="3">
            <div
              class="grid-content"
              style="position: relative"
            >
              <div class="operationbtn deldiv" v-show="v.status == '已处理'">
                已完成
              </div>
              <button class="operationbtn delbtn" v-show="v.status == '未处理'">
                处理
              </button>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content">
              <div class="btnwidth">
                <button class="operationbtn operationbtn-left">查看</button>
              </div>
              <div class="btnwidth">
                <button class="operationbtn operationbtn-right">编辑</button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 分页 -->
      <div class="paging">
        <div class="block">
          <el-pagination
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 分类按钮
      btn1_active: "0",
      btn2_active: "0",
      // 上下架按钮
      if_putaway: "下架",
      // 分页
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      // 查询
      numberValidateForm: {
        title: "",
        pickerOptions: {
          shortcuts: [
            {
              text: "最近一周",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "最近三个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              },
            },
          ],
        },
        value1: "",
      },
      // 表数据
      datalist: [
        {
          createdate: "2018-10-12",
          createtime: "11:32:45",
          category: "功能异常",
          presenter: "王小X",
          suggest: "",
          phone: "1315242XXXX",
          status: "已处理",
          resultcontent: "",
        },
        {
          createdate: "2018-10-12",
          createtime: "11:32:45",
          category: "功能异常",
          presenter: "王小X",
          suggest: "",
          phone: "1315242XXXX",
          status: "未处理",
          resultcontent: "",
        },
      ],
    };
  },
  methods: {
    // 分类按钮
    tab1(val) {
      this.btn1_active = val;
    },
    tab2(val) {
      this.btn2_active = val;
    },

    // 查询
    resetForm(formName) {
      // 重置
      this.numberValidateForm.title = "";
      this.numberValidateForm.value1 = "";
      this.btn1_active = "0";
      this.btn2_active = "0";
    },
  },
  mounted() {
    // 渲染页面
    // console.log(this.datalist[0].createdate+' '+this.datalist[0].createtime);
  },
  components: {},
};
</script>

<style lang="less" scoped>
// 头部分类区
.classify .newadd {
  margin-bottom: 10px;
}
.classifybtn {
  width: 100%;
  height: 35px;
  background-color: #fff;
  color: #464646;
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  outline: none;
  transition: all 0.2s;
}
.classifybtn:hover {
  border: 1px solid #409eff;
}
.classifybtn.active {
  background-color: #409eff;
  color: #fff;
}
// 搜索 日期卡长度
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 300px;
}
// 新增
.newadd .el-col .grid-content {
  text-align: left;
}
.formbtn {
  background-color: #409eff;
  margin-left: 5px;
  margin-right: 5px;
}
.newaddbtn {
  background-color: #409eff;
}
.newbtn {
  background-color: #adadad;
}
// 查询条数居左
.searchnum .el-col .grid-content {
  text-align: left;
  padding-left: 40px;
}
// 表
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 0px;
}
.bg-purple-dark {
  background: #40a0ff31;
}
.bg-purple {
  background: #dbdcdd;
}
.bg-purple-light {
  background: rgba(219, 220, 221, 0.096);
}
.grid-content {
  border-radius: 0px;
  min-height: 40px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-row .el-col .grid-content {
  height: 46px;
  line-height: 46px;
  font-size: 14px;
  overflow: hidden;
}
.infor-list .el-row .el-col .grid-content {
  text-align: center;
  border: 1px solid #e4e4e4;
}
.col-time {
  height: 23px;
  line-height: 23px;
}
.infor-list .el-row {
  margin-bottom: 0;
}
// 表头字体
.tablehead .el-col div {
  font-weight: 700;
}
// 表颜色
.bgcolor {
  background-color: #fff;
}
.bgcolor.active {
  background-color: #f2f2f2;
}
// 推荐开关
.el-switch {
  height: 40px;
  line-height: 40px;
}
// 上下架按钮
.addcheck {
  padding: 8px 20px;
  border-radius: 4px;
}
.delbtn {
  background-color: #409eff;
  padding: 4px 12px;
  border-radius: 4px;
}
.deldiv {
  background-color: #adadad;
  width: 54px;
  height: 24px;
  line-height: 24px;
  border-radius: 4px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.btnwidth {
  width: 50%;
  display: inline-block;
}
.operationbtn {
  border: none;
  outline: none;
  color: #fff;
  font-size: 14px;
}
.operationbtn-left {
  background-color: #409eff;
  padding: 4px 12px;
  border-right: 1px solid rgba(255, 255, 255, 0.603);
  border-radius: 4px;
}
.operationbtn-right {
  background-color: #409eff;
  padding: 4px 12px;
  border-radius: 4px;
}
.operationbtn:hover {
  background-color: #40a0ffb6;
}
.newbtn:hover {
  background-color: #c4c4c4b6;
}
// 分页 需要改全局样式
.paging {
  margin-top: 15px;
}
</style>
