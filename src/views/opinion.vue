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
              <button class="operationbtn addcheck formbtn" @click="submitbtn">
                提交
              </button>
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
                @click="delnote(i)"
              >
                处理
              </button>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content">
              <div class="btnwidth">
                <button
                  class="operationbtn operationbtn-left"
                  @click="checkmessage(i)"
                >
                  查看
                </button>
              </div>
              <div class="btnwidth">
                <button
                  class="operationbtn operationbtn-right"
                  @click="updatemessage(i)"
                >
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
            :current-page="splitepage.currentPage"
            :page-sizes="splitepage.PageSizes"
            :page-size="splitepage.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="splitepage.page"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 提示弹窗 -->
    <div class="peomptbox" :class="[peompttext == '' ? 'active' : '']">
      <div>{{ peompttext }}</div>
    </div>
    <!-- 弹窗 -->
    <div class="posfix" :class="[titlename == '' ? 'active' : '']">
      <div class="fixbox">
        <div class="fontwid">{{ titlename }}</div>
        <div class="infolump">
          <div class="inlinetit">反馈时间：</div>
          <div class="inlinediv">
            <el-input
              v-model="newincreasedata.createtime"
              placeholder="请输入内容"
              :disabled="timenoupdate"
            ></el-input>
          </div>
        </div>
        <div class="infolump">
          <div class="inlinetit">问题类型：</div>
          <div class="inlinediv">
            <el-select v-model="newincreasedata.category" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="disablesta"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="infolump">
          <div class="inlinetit">提出者：</div>
          <div class="inlinediv">
            <el-input
              v-model="newincreasedata.presenter"
              placeholder="请输入内容"
              :disabled="disablesta"
            ></el-input>
          </div>
        </div>
        <div class="infolump">
          <div class="inlinetit">手机号码：</div>
          <div class="inlinediv">
            <el-input
              v-model="newincreasedata.phone"
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
                  v-model="newincreasedata.resultcontent"
                  style="resize: none"
                  :disabled="disablesta"
                >
                </el-input>
              </div>
            </template>
          </div>
        </div>
        <div class="infolump" :class="[showbool ? '' : 'active']">
          <div class="inlinetit inlinetitpos">处理方案：</div>
          <div class="inlinediv">
            <template>
              <div class="fankuidetextarea">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  placeholder="暂无数据"
                  v-model="newincreasedata.suggest"
                  style="resize: none"
                  :disabled="deldisablesta"
                >
                </el-input>
              </div>
            </template>
          </div>
        </div>
        <div class="infolump infolumpbtn">
          <button
            class="operationbtnli formbtnli"
            @click="datadel"
            v-show="savebtn"
          >
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
      /* addlist: {
        createtime: "",
        category: "",
        presenter: "",
        resultcontent: "",
        phone: "",
        suggest: "",
      }, */
      // 用户input禁用
      disablesta: false,
      // 管理input显示
      deldisablesta: false,
      // 管理input显示
      showbool: true,
      // 时间自动获取不能修改
      timenoupdate: true,
      // 保存按钮
      savebtn: true,
      options1: [
        {
          value: "选项1",
          label: "功能异常",
        },
        {
          value: "选项2",
          label: "体验问题",
        },
        {
          value: "选项3",
          label: "修改建议",
        },
      ],
      titlename: "",
      // 弹窗绑定数据
      newincreasedata: {
        id: "",
        createtime: "",
        category: "",
        presenter: "",
        phone: "",
        status: "",
        suggest: "",
        resultcontent: "",
      },
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
        value1: null,
      },
      // 表数据
      datalist: [],
      // 提示弹窗
      peompttext: "",
      // 分页
      splitepage: {
        page: 0,
        limit: 2,
        currentPage: 1,
        PageSizes: [2, 4, 8, 10],
      },
      // 查询发送数据
      selectdata: {
        category: "",
        presenter: "",
        phone: "",
        status: "",
        createtimestart: "",
        createtimeend: "",
      },
      // 修改发送数据
      updatefunobj: {
        id: "",
        status: "",
        presenter: "",
        phone: "",
        category: "",
        suggest: "",
        createtime: "",
        resultcontent: "",
      },
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
    // 日期分割
    timesplit(val) {
      let date = new Date(val);
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = date.getDate() + " ";
      let h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      let m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      let datetime = {
        date: Y + M + D,
        time: h + m + s,
      };
      return datetime;
    },
    // 计时器
    prompttime() {
      setTimeout(() => {
        this.peompttext = "";
      }, 2000);
    },
    // 分页
    handleSizeChange(val) {
      this.splitepage.limit = val;
      this.splitepage.currentPage = 1;
      this.applypage();
    },
    handleCurrentChange(val) {
      this.splitepage.currentPage = val;
      this.applypage();
    },
    // 正则
    typeofnum(val) {
      let str = val;
      let reg1 = /\D/;
      return str.search(reg1);
    },
    // new Date()转换为年月日时分秒
    transfertime(val) {
      let d = val;
      d =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds();
      return d;
    },
    // 渲染列表页面函数
    applypage() {
      this.$axios({
        url: "/feedback/query",
        method: "post",
        data: {
          pageNum: parseInt(this.splitepage.currentPage),
          pageSize: parseInt(this.splitepage.limit),
          category: this.selectdata.category,
          presenter: this.selectdata.presenter,
          status: this.selectdata.status,
          phone: this.selectdata.phone,
          createtimestart: this.selectdata.createtimestart,
          createtimeend: this.selectdata.createtimeend,
        },
      })
        .then((res) => {
          if (res.data.msg == "") {
            // 分页渲染
            this.splitepage.page = res.data.data.total;
            // 日期渲染
            this.datalist = res.data.data.list;
            let createtimes;
            for (let i = 0; i < this.datalist.length; i++) {
              // 处理状态转换
              if (this.datalist[i].status == "1") {
                this.datalist[i].status = "已处理";
              } else if (this.datalist[i].status == "2") {
                this.datalist[i].status = "未处理";
              }
              // 最后编辑时间
              createtimes = this.timesplit(this.datalist[i].createtime);
              this.datalist[i].createdate = createtimes.date;
              this.datalist[i].createtime = createtimes.time;
              createtimes = {
                date: null,
                time: null,
              };
            }
          } else {
            this.peompttext = res.data.msg;
            this.prompttime();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 修改函数
    updatefun() {
      this.$axios({
        url: "/feedback/update",
        method: "post",
        data: {
          id: this.updatefunobj.id,
          status: this.updatefunobj.status,
          presenter: this.updatefunobj.presenter,
          phone: this.updatefunobj.phone,
          category: this.updatefunobj.category,
          suggest: this.updatefunobj.suggest,
          createtime: this.updatefunobj.createtime,
          resultcontent: this.updatefunobj.resultcontent,
          // 1609867850517
        },
      })
        .then((res) => {
          console.log(res.data.msg);
          if (res.data.code == 0) {
            this.updatefunobj = {
              id: "",
              status: "",
              presenter: "",
              phone: "",
              category: "",
              suggest: "",
              createtime: "",
              resultcontent: "",
            };
            this.peompttext = "修改成功";
            this.prompttime();
            this.applypage();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 重置
    resetForm(formName) {
      this.numberValidateForm.title = "";
      this.numberValidateForm.value1 = null;
      this.btn1_active = "0";
      this.btn2_active = "0";
    },
    // 查询
    submitbtn() {
      this.selectdata =  {
        category: "",
        presenter: "",
        phone: "",
        status: "",
        createtimestart: "",
        createtimeend: "",
      };
      // 判断
      // 问题分类
      if (this.btn1_active == "1") {
        this.selectdata.category = "功能异常";
      } else if (this.btn1_active == "2") {
        this.selectdata.category = "体验问题";
      } else if (this.btn1_active == "3") {
        this.selectdata.category = "修改建议";
      } else {
        this.selectdata.category = "";
      }
      // 处理状态
      if (this.btn2_active != "0") {
        this.selectdata.status = this.btn2_active;
      } else {
        this.selectdata.status = "";
      }
      // 时间转换
      // 反馈时间
      if (this.numberValidateForm.value1 != null) {
        let starttime = this.numberValidateForm.value1[0];
        let endtime = this.numberValidateForm.value1[1];
        this.selectdata.createtimestart = starttime.getTime();
        this.selectdata.createtimeend = endtime.getTime();
      } else {
        this.selectdata.createtimestart = "";
        this.selectdata.createtimeend = "";
      }
      // 手机号和提出人判断
      if (this.typeofnum(this.numberValidateForm.title) == -1) {
        this.selectdata.phone = this.numberValidateForm.title;
      } else {
        this.selectdata.presenter = this.numberValidateForm.title;
      }
      this.splitepage.currentPage = 1;
      this.applypage();
    },
    // 开弹窗
    // 查看
    checkmessage(val) {
      this.titlename = "查看";
      this.disablesta = true;
      this.deldisablesta = true;
      this.showbool = true;
      this.savebtn = false;
      this.newincreasedata = {
        createtime:
          this.datalist[val].createdate + " " + this.datalist[val].createtime,
        category: this.datalist[val].category,
        presenter: this.datalist[val].presenter,
        phone: this.datalist[val].phone,
        status: this.datalist[val].status,
        suggest: this.datalist[val].suggest,
        resultcontent: this.datalist[val].resultcontent,
      };
    },
    // 添加
    adddellist() {
      this.disablesta = false;
      this.deldisablesta = false;
      this.titlename = "添加反馈";
      this.showbool = false;
      let newtime = new Date();
      newtime = this.transfertime(newtime);
      this.newincreasedata = {
        id: "",
        createtime: newtime,
        category: "",
        presenter: "",
        phone: "",
        status: "2",
        suggest: "",
        resultcontent: "",
      };
    },
    // 处理
    delnote(val) {
      this.disablesta = true;
      this.deldisablesta = false;
      this.titlename = "反馈处理";
      this.showbool = true;
      (this.datalist[val].suggest = ""),
        (this.newincreasedata = {
          id: this.datalist[val].id,
          createtime:
            this.datalist[val].createdate + " " + this.datalist[val].createtime,
          category: this.datalist[val].category,
          presenter: this.datalist[val].presenter,
          phone: this.datalist[val].phone,
          status: this.datalist[val].status,
          suggest: this.datalist[val].suggest,
          resultcontent: this.datalist[val].resultcontent,
        });
    },
    // 编辑
    updatemessage(val) {
      this.titlename = "编辑反馈";
      this.disablesta = false;
      this.deldisablesta = true;
      this.showbool = false;
      this.newincreasedata = {
        id: this.datalist[val].id,
        createtime:
          this.datalist[val].createdate + " " + this.datalist[val].createtime,
        category: this.datalist[val].category,
        presenter: this.datalist[val].presenter,
        phone: this.datalist[val].phone,
        resultcontent: this.datalist[val].resultcontent,
      };
    },
    // 关弹窗
    // 保存
    datadel() {
      if (this.newincreasedata.category == "选项1") {
        this.newincreasedata.category = "功能异常";
      } else if (this.newincreasedata.category == "选项2") {
        this.newincreasedata.category = "体验问题";
      } else if (this.newincreasedata.category == "选项3") {
        this.newincreasedata.category = "修改建议";
      } else {
        this.newincreasedata.category = "";
      }
      // 上架
      if (this.newincreasedata.puttime == "选项1") {
        this.newincreasedata.puttime = Date.now();
        this.newincreasedata.status = "1";
        this.newincreasedata.removetime = -62133115205000;
      } else {
        this.newincreasedata.puttime = -62133115205000;
        this.newincreasedata.status = "2";
        this.newincreasedata.removetime = Date.now();
      }

      if (this.titlename == "添加反馈") {
        // 弹窗新增保存调用
        this.titlename = "";
        this.$axios({
          url: "/feedback/add",
          method: "post",
          data: {
            createtime: Date.now(),
            category: this.newincreasedata.category,
            presenter: this.newincreasedata.presenter,
            phone: this.newincreasedata.phone,
            status: "2",
            resultcontent: this.newincreasedata.resultcontent,
          },
        })
          .then((res) => {
            this.newincreasedata = {
              id: "",
              createtime: "",
              category: "",
              presenter: "",
              phone: "",
              status: "",
              suggest: "",
              resultcontent: "",
            };
            // 掉一次渲染界面的axios
            this.peompttext = "添加成功";
            this.prompttime();
            this.applypage();
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.titlename == "编辑反馈") {
        // 弹窗编辑保存调用
        this.updatefunobj = {
          id: this.newincreasedata.id,
          category: this.newincreasedata.category,
          createtime: Date.now(),
          presenter: this.newincreasedata.presenter,
          phone: this.newincreasedata.phone,
          status: "2",
          suggest: " ",
          resultcontent: this.newincreasedata.resultcontent,
        };
        console.log(this.updatefunobj);
        this.titlename = "";
        this.updatefun();
      } else if (this.titlename == "反馈处理") {
        // 弹窗编辑保存调用
        this.updatefunobj = {
          id: this.newincreasedata.id,
          category: this.newincreasedata.category,
          createtime: "",
          presenter: this.newincreasedata.presenter,
          phone: this.newincreasedata.phone,
          status: "1",
          suggest: this.newincreasedata.suggest,
          resultcontent: this.newincreasedata.resultcontent,
        };
        console.log(this.updatefunobj);
        this.titlename = "";
        this.updatefun();
      }
    },
    // 取消
    clowin() {
      this.titlename = "";
      this.savebtn = true;
    },
  },
  created() {
    (this.selectdata = {
      createtime: "",
      category: "",
      presenter: "",
      phone: "",
      status: "",
      createtimestart: "",
      createtimeend: "",
    }),
      this.applypage();
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
  text-align: right;
}
// 提示弹窗
.peomptbox {
  position: fixed;
  top: 30px;
  left: 50%;
  margin-left: -150px;
  background-color: #e7e7e7a8;
  width: 300px;
  height: 100px;
  border-radius: 10px;
  display: block;
  text-align: center;
  line-height: 100px;
  font-size: 18px;
  transition: all 0.5s;
}
.peomptbox.active {
  top: -300px;
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
  top: 50%;
  left: 0;
  right: 0;
  margin: auto;
  width: 400px;
  transform: translate(0, -50%);
  background-color: #fff;
  text-align: left;
  padding: 30px;
  border-radius: 20px;
}
.fontwid {
  font-size: 18px;
  font-weight: 700;
}
.infolump {
  margin-top: 20px;
  display: block;
}
.infolump.active {
  display: none;
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
