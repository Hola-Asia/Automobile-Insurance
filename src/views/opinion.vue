<template>
  <!-- 资讯页面 -->
  <div style="height: 100%">
    <div style="padding: 20px; background: #fff; minheight: 93%">
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
              <button
                class="operationbtn addcheck newaddbtn"
                @click="adddellist"
              >
                + 新增
              </button>
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
        <el-row class="tablehead" style="background: #d7d7d7">
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
        <el-row
          v-for="(v, i) in datalist"
          :key="i"
          class="bgcolor"
          :class="[i % 2 != 0 ? 'active' : '']"
        >
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
            <div class="grid-content" style="position: relative">
              <div class="operationbtn deldiv" v-show="v.status == '已处理'">
                已完成
              </div>
              <button
                class="operationbtn delbtn"
                v-show="v.status == '未处理'"
                @click="delnote"
              >
                处理
              </button>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content">
              <div class="btnwidth">
                <button class="operationbtn operationbtn-left" @click="del">
                  查看
                </button>
              </div>
              <div class="btnwidth">
                <button class="operationbtn operationbtn-right" @click="del">
                  编辑
                </button>
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

    <!-- 弹窗 -->
    <div class="posfix" :class="posfixstatus == 0 ? 'active' : ''">
      <div class="fixbox">
        <div class="fontwid">{{ titlename }}</div>
        <div class="infolump">
          <div class="inlinetit">反馈时间：</div>
          <div class="inlinediv">
            <el-input
              v-model="createtime"
              placeholder="请输入内容"
              :disabled="disablesta"
            ></el-input>
          </div>
        </div>
        <div class="infolump">
          <div class="inlinetit">问题类型：</div>
          <div class="inlinediv">
            <el-input
              v-model="category"
              placeholder="请输入内容"
              :disabled="disablesta"
            ></el-input>
          </div>
        </div>
        <div class="infolump">
          <div class="inlinetit">提出者：</div>
          <div class="inlinediv">
            <el-input
              v-model="presenter"
              placeholder="请输入内容"
              :disabled="disablesta"
            ></el-input>
          </div>
        </div>
        <div class="infolump">
          <div class="inlinetit">手机号码：</div>
          <div class="inlinediv">
            <el-input
              v-model="phone"
              placeholder="请输入内容"
              :disabled="disablesta"
            ></el-input>
          </div>
        </div>
        <div class="infolump">
          <div class="inlinetit inlinetitpos">反馈内容：</div>
          <div class="inlinediv">
            <template>
              <div class="fankuidetextarea">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  placeholder="请输入内容"
                  v-model="textarea2"
                  style="resize: none"
                  :disabled="disablesta"
                >
                </el-input>
              </div>
            </template>
          </div>
        </div>
        <div class="infolump">
          <div class="inlinetit inlinetitpos">处理方案：</div>
          <div class="inlinediv">
            <template>
              <div class="fankuidetextarea">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  placeholder="请输入内容"
                  v-model="textarea2"
                  style="resize: none" :disabled="deldisablesta"
                >
                </el-input>
              </div>
            </template>
          </div>
        </div>
        <div class="infolump infolumpbtn">
          <button class="operationbtnli formbtnli" @click="datadel">
            保存
          </button>
          <button class="operationbtnli newbtnli" @click="clowin">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea2: "",
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
      // 弹窗
      addlist: {
        createtime: "",
        category: "",
        presenter: "",
        resultcontent: "",
        phone: "",
        suggest: "",
      },
      posfixstatus: "0",
      disablesta: false,
      deldisablesta: false,
      titlename: "",
      createtime: "",
      category: "",
      presenter: "",
      resultcontent: "",
      phone: "",
      suggest: "",
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

    // 弹窗

    // 开弹窗
    // 添加
    adddellist() {
      if (this.addlist.createtime == "") {
        this.posfixstatus = "1";
        this.disablesta = false;
        this.deldisablesta = false;
        this.titlename = "添加反馈";
      }
    },
    // 处理
    delnote() {
      this.posfixstatus = "1";
      this.disablesta = true;
      this.deldisablesta = false;
      this.titlename = "处理";
    },
    // 查看
    del() {
      this.posfixstatus = "1";
      this.titlename = "查看";
      this.disablesta = true;
      this.deldisablesta = true;
    },

    // 关弹窗
    // 保存
    datadel() {
      // if (addlist.createtime == "") {
      this.posfixstatus = "0";
      // }
    },
    // 取消
    clowin() {
      this.posfixstatus = "0";
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
// 弹窗
.posfix {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(117, 117, 117, 0.5);
  width: 100%;
  height: 100%;
  display: block;
}
.posfix.active {
  display: none;
}
.fixbox {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 400px;
  height: 500px;
  background-color: #fff;
  text-align: left;
  padding: 30px;
}
.fontwid {
  font-size: 18px;
  font-weight: 700;
}
.infolump {
  margin-top: 20px;
}
.infolumpbtn {
  text-align: center;
}
.inlinetit {
  width: 100px;
  display: inline-block;
}
.inlinetitpos {
  position: relative;
  top: -35px;
}
.inlinediv {
  width: 300px;
  display: inline-block;
}
.textareacls {
  display: block;
  resize: vertical;
  padding: 5px 15px;
  line-height: 1.5;
  box-sizing: border-box;
  width: 100%;
  font-size: inherit;
  color: #606266;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  resize: none;
  min-height: 54px;
  height: 54px;
}
.inlinediv .el-textarea .el-textarea__inner {
  resize: none !important;
}
.textareacls:focus {
  outline: none;
  border-color: #409eff;
}
.textareacls:disabled {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  cursor: not-allowed;
}
.textareacls::placeholder {
  color: #c0c4cc;
  font-size: 15px;
}
.operationbtnli {
  border: none;
  outline: none;
  color: #fff;
  font-size: 14px;
  padding: 8px 20px;
  border-radius: 4px;
}
.formbtnli {
  background-color: #409eff;
  margin-right: 40px;
}
.newbtnli {
  background-color: #c4c4c4;
}
.formbtn:hover {
  background-color: #40a0ffb6;
}
.newbtn:hover {
  background-color: #c4c4c4b6;
}
</style>
<style lang="less">
.fankuidetextarea textarea {
  resize: none;
}
</style>
