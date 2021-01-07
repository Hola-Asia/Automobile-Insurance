<template>
  <!-- 资讯页面 -->
  <div>
    <!-- 分类按钮区 -->
    <div class="classify">
      <el-row class="newadd">
        <el-col :span="2">
          <div class="grid-content">文章分类：</div>
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
              车险改革
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
              用车养车
            </button>
          </div>
        </el-col>
      </el-row>
      <el-row class="newadd">
        <el-col :span="2">
          <div class="grid-content">是否推荐：</div>
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
              是
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
              否
            </button>
          </div>
        </el-col>
      </el-row>
      <el-row class="newadd">
        <el-col :span="2">
          <div class="grid-content">文章状态：</div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content">
            <button
              class="classifybtn"
              :class="[btn3_active == '0' ? 'active' : '']"
              @click="tab3(0)"
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
              :class="[btn3_active == '1' ? 'active' : '']"
              @click="tab3(1)"
            >
              已上架
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
              :class="[btn3_active == '2' ? 'active' : '']"
              @click="tab3(2)"
            >
              已下架
            </button>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 查询 -->
    <div class="search">
      <el-row>
        <el-col :span="5">
          <div class="grid-content">
            <el-input
              v-model="numberValidateForm.title"
              placeholder="文章标题、文章编号"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content">
            <div class="block">
              <el-date-picker
                v-model="numberValidateForm.value1"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="编辑时间"
                end-placeholder="编辑时间"
                :picker-options="numberValidateForm.pickerOptions"
              >
              </el-date-picker>
            </div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content">
            <div class="block">
              <el-date-picker
                v-model="numberValidateForm.value2"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="上架时间"
                end-placeholder="上架时间"
                :picker-options="numberValidateForm.pickerOptions"
              >
              </el-date-picker>
            </div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content">
            <div class="block">
              <el-date-picker
                v-model="numberValidateForm.value3"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="下架时间"
                end-placeholder="下架时间"
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
          查询结果：共计<span>111</span>条
        </div>
      </el-col>
    </el-row>
    <!-- 表身 -->
    <div class="infor-list">
      <!-- 表头 -->
      <el-row class="tablehead">
        <el-col :span="3">
          <div class="grid-content bg-purple">最近编辑时间</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">文章标题</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">文章编号</div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple-light">文章分类</div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">推荐</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple-light">上架时间</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">下架时间</div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple-light">操作</div>
        </el-col>
      </el-row>
      <el-row v-for="(v, i) in datalist" :key="i">
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <div class="col-time">{{ v.lastdata }}</div>
            <div class="col-time">{{ v.lasttime }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            {{ v.title }}
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">{{ v.number }}</div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple-light">{{ v.class }}</div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-switch
              style="display: block"
              v-model="v.recommend"
              active-color="#30b37c"
              inactive-color="#aaa"
              active-value="on"
              inactive-value="off"
            >
            </el-switch>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple-light">
            <div v-show="v.putdata != ''">
              <div class="col-time">{{v.putdata}}</div>
              <div class="col-time">{{v.puttime}}</div>
            </div>
            <div v-show="v.putdata == ''">—— ——</div>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <div v-show="v.removedata != ''">
              <div class="col-time">{{v.removedata}}</div>
              <div class="col-time">{{v.removetime}}</div>
            </div>
            <div v-show="v.removedata == ''">—— ——</div>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple-light">
            <el-button-group>
              <button
                class="operationbtn operationbtn-left"
                v-show="if_putaway == '下架'"
              >
                下架
              </button>
              <button
                class="operationbtn operationbtn-left"
                v-show="if_putaway == '上架'"
              >
                上架
              </button>
              <button class="operationbtn operationbtn-right">编辑</button>
            </el-button-group>
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
</template>

<script>
export default {
  data() {
    return {
      // token值储存
      token:sessionStorage.token,
      // 分类按钮
      btn1_active: "0",
      btn2_active: "0",
      btn3_active: "0",
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
        value2: "",
        value3: "",
      },
      // 表数据
      datalist: [
        {
          lastdata: "2018-02-06",
          lasttime: "12：30：56",
          title: "车险改革后怎么没有免赔率险了？",
          number: "11454112",
          class: "车险改革",
          recommend: "on",
          putdata: "2016-05-06",
          puttime: "12：36：51",
          removedata: "",
          removetime: "",
        },
        {
          lastdata: "2018-02-06",
          lasttime: "12：30：56",
          title: "车险改革后怎么没有免赔率险了？",
          number: "11454112",
          class: "车险改革",
          recommend: "off",
          putdata: "",
          puttime: "",
          removedata: "2016-05-06",
          removetime: "12：36：51",
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
    tab3(val) {
      this.btn3_active = val;
    },

    // 查询
    resetForm(formName) {
      // 重置
      this.numberValidateForm.title = "";
      this.numberValidateForm.value1 = "";
      this.numberValidateForm.value2 = "";
      this.numberValidateForm.value3 = "";
      this.btn1_active = "0";
      this.btn2_active = "0";
      this.btn3_active = "0";
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
    // 修改调用axios
    updatefun() {
      this.$axios({
        url: "/information/update",
        headers:{
          'token':this.token
        },
        method: "post",
        data: {
          id: this.updatefunobj.id,
          category: this.updatefunobj.category,
          content: this.updatefunobj.content,
          lasttime: Date.now(),
          number: this.updatefunobj.number,
          puttime: this.updatefunobj.puttime,
          recommend: this.updatefunobj.recommend,
          removetime: this.updatefunobj.removetime,
          status: this.updatefunobj.status,
          title: this.updatefunobj.title,
        },
      })
        .then((res) => {
          console.log(res.data.msg);
          if (res.data.code == 0) {
            this.updatefunobj = {
              id: "",
              category: "",
              content: "",
              number: "",
              puttime: "",
              recommend: "",
              removetime: "",
              status: "",
              title: "",
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
    // 计时器
    prompttime() {
      this.newincreasedata = {
        lasttime: Date.now(),
        title: "",
        number: "",
        category: "",
        recommend: "",
        puttime: "",
        removetime: "",
        content: "",
        status: "",
      };
      setTimeout(() => {
        this.peompttext = "";
      }, 2000);
    },
    // 正则
    typeofnum(val) {
      let str = val;
      let reg1 = /\D/;
      return str.search(reg1);
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
    // 渲染分页axios
    applypage() {
      console.log(this.selectdata);
      this.$axios({
        url: "/information/query",
        headers:{
          'token':this.token
        },
        method: "post",
        data: {
          pageNum: parseInt(this.splitepage.currentPage),
          pageSize: parseInt(this.splitepage.limit),
          number: this.selectdata.number,
          title: this.selectdata.title,
          category: this.selectdata.category,
          recommend: this.selectdata.recommend,
          status: this.selectdata.status,
          lasttimeend: this.selectdata.lasttimeend,
          lattimestart: this.selectdata.lattimestart,
          puttimeend: this.selectdata.puttimeend,
          puttimestart: this.selectdata.puttimestart,
          removetimeend: this.selectdata.removetimeend,
          removetimestart: this.selectdata.removetimestart,
        },
      })
        .then((res) => {
          if ((res.data.msg == "")) {
            // 分页渲染
            this.splitepage.page = res.data.data.total;
            // 日期渲染
            this.datalist = res.data.data.list;
            let puttimes, lasttimes, removetimes;
            for (let i = 0; i < this.datalist.length; i++) {
              // 最后编辑时间
              lasttimes = this.timesplit(this.datalist[i].lasttime);
              // res.data.data[i].lasttime.split('9');
              this.datalist[i].lastdate = lasttimes.date;
              this.datalist[i].lasttime = lasttimes.time;
              lasttimes = {
                date: null,
                time: null,
              };
              // 上架时间
              if (this.datalist[i].puttime != null) {
                puttimes = this.timesplit(this.datalist[i].puttime);
                this.datalist[i].putdate = puttimes.date;
                this.datalist[i].puttime = puttimes.time;
                puttimes = {
                  date: null,
                  time: null,
                };
              }
              // 下架时间
              if (this.datalist[i].removetime != null) {
                removetimes = this.timesplit(this.datalist[i].removetime);
                this.datalist[i].removedate = removetimes.date;
                this.datalist[i].removetime = removetimes.time;
                removetimes = {
                  date: null,
                  time: null,
                };
              }
            }
          }else {
            this.peompttext = res.data.msg;
            this.prompttime();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 首次渲染
    // 提交
    submitbtn() {
      //清空渲染要赋值的对象
      this.selectdata = {
        title: "",
        number: "",
        status: "",
        category: "",
        recommend: "",
        redactstarttime: "",
        redactendtime: "",
        putstarttime: "",
        putendtime: "",
        removestarttime: "",
        removeendtime: "",
      };
      // 判断
      // 分类
      if (this.btn1_active == "1") {
        this.selectdata.category = "车险改革";
      } else if (this.btn1_active == "2") {
        this.selectdata.category = "用车养车";
      } else {
        this.selectdata.category = "";
      }
      // 推荐
      if (this.btn2_active == "1") {
        this.selectdata.recommend = "1";
      } else if (this.btn2_active == "2") {
        this.selectdata.recommend = "2";
      } else {
        this.selectdata.recommend = "";
      }
      // 上架
      if (this.btn3_active == "1") {
        this.selectdata.status = "1";
      } else if (this.btn3_active == "2") {
        this.selectdata.status = "2";
      } else {
        this.selectdata.status = "";
      }
      // 时间转换
      // 最近编辑时间
      if (this.numberValidateForm.value1 != null) {
        let starttime = this.numberValidateForm.value1[0];
        let endtime = this.numberValidateForm.value1[1];
        this.selectdata.lattimestart = starttime.getTime();
        this.selectdata.lasttimeend = endtime.getTime();
      } else {
        this.selectdata.lattimestart = "";
        this.selectdata.lasttimeend = "";
      }
      // 上架时间
      if (this.numberValidateForm.value2 != null) {
        let starttime = this.numberValidateForm.value2[0];
        let endtime = this.numberValidateForm.value2[1];
        this.selectdata.puttimeend = endtime.getTime();
        this.selectdata.puttimestart = starttime.getTime();
      } else {
        this.selectdata.puttimeend = "";
        this.selectdata.puttimestart = "";
      }
      // 下架时间
      if (this.numberValidateForm.value3 != null) {
        let starttime = this.numberValidateForm.value3[0];
        let endtime = this.numberValidateForm.value3[1];
        this.selectdata.removetimeend = endtime.getTime();
        this.selectdata.removetimestart = starttime.getTime();
      } else {
        this.selectdata.removetimeend = "";
        this.selectdata.removetimestart = "";
      }
      if(this.typeofnum(this.numberValidateForm.title)==-1) {
        this.selectdata.number = this.numberValidateForm.title;
      }else {
        this.selectdata.title = this.numberValidateForm.title;
      }
      this.splitepage.currentPage = 1
      this.applypage();
    },
    // 点击新增按钮弹开弹窗
    newincrease() {
      this.wintitle = "新增";
    },
    // 推荐
    recommendbtn(val) {
      this.recommend_val = val;
    },
    recommended(val) {
      this.$axios({
        url: "/information/update",
        headers:{
          'token':this.token
        },
        method: "post",
        data: {
          id: this.datalist[val].id,
          // lasttime: Date.now(),
          recommend: this.recommend_val,
        },
      })
        .then((res) => {
          if (res.data.code == 0) {
            this.peompttext = "修改成功";
            this.prompttime();
            this.applypage();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 下架
    putawaybtn(val) {
      let datetime1 = new Date();
      this.$axios({
        url: "/information/update",
        headers:{
          'token':this.token
        },
        method: "post",
        data: {
          id: this.datalist[val].id,
          recommend: "2",
          removetime: Date.now(),
          status: "2",
        },
      })
        .then((res) => {
          if (res.data.code == 0) {
            this.peompttext = "修改成功";
            this.prompttime();
            this.applypage();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 上架
    soldoutbtn(val) {
      let datetime2 = new Date();
      this.$axios({
        url: "/information/update",
        headers:{
          'token':this.token
        },
        method: "post",
        data: {
          id: this.datalist[val].id,
          puttime: Date.now(),
          recommend: "1",
          removetime: -62133046674000,
          status: "1",
        },
      })
        .then((res) => {
          if (res.data.code == 0) {
            this.peompttext = "修改成功";
            this.prompttime();
            this.applypage();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击编辑按钮弹开弹窗
    compilebtn(val) {
      this.wintitle = "编辑";
      this.id = this.datalist[val].id;
      // 推荐
      if (this.datalist[val].recommend == "1") {
        this.newincreasedata.recommend = "选项1";
      } else if (this.datalist[val].recommend == "2") {
        this.newincreasedata.recommend = "选项2";
      }
      // 上架
      if (this.datalist[val].puttime != "1-01-30 20:11:08") {
        this.newincreasedata.puttime = "选项1";
      } else if (this.datalist[val].puttime == "1-01-30 20:11:08") {
        this.newincreasedata.puttime = "选项2";
      }
      this.newincreasedata.title = this.datalist[val].title;
      this.newincreasedata.category = this.datalist[val].category;
      this.newincreasedata.content = this.datalist[val].content;
      this.newincreasedata.number = this.datalist[val].number;
    },
    // 弹窗保存函数
    datadel() {
      if (this.newincreasedata.category == "选项1") {
        this.newincreasedata.category = "车险改革";
      } else {
        this.newincreasedata.category = "用车养车";
      }
      // 推荐
      if (this.newincreasedata.recommend == "选项1") {
        this.newincreasedata.recommend = "1";
      } else {
        this.newincreasedata.recommend = "2";
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

      if (this.wintitle == "新增") {
        // 弹窗新增保存调用
        this.wintitle = "";
        this.$axios({
          url: "/information/add",
          headers:{
          'token':this.token
        },
          method: "post",
          data: {
            lasttime: this.newincreasedata.lasttime,
            title: this.newincreasedata.title,
            category: this.newincreasedata.category,
            recommend: this.newincreasedata.recommend,
            status: this.newincreasedata.status,
            puttime: this.newincreasedata.puttime,
            removetime: this.newincreasedata.removetime,
            content: this.newincreasedata.content,
          },
        })
          .then((res) => {
            console.log(res.data.msg);
            this.newincreasedata = {
              lasttime: Date.now(),
              title: "",
              number: "",
              category: "",
              recommend: "",
              puttime: "",
              removetime: "",
              content: "",
            };
            // 掉一次渲染界面的axios
            this.peompttext = "添加成功";
            this.prompttime();
            this.applypage();
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.wintitle == "编辑") {
        // 弹窗编辑保存调用
        this.updatefunobj = {
          id: this.id,
          category: this.newincreasedata.category,
          content: this.newincreasedata.content,
          number: this.newincreasedata.number,
          puttime: this.newincreasedata.puttime,
          recommend: this.newincreasedata.recommend,
          removetime: this.newincreasedata.removetime,
          status: this.newincreasedata.status,
          title: this.newincreasedata.title,
        };
        this.wintitle = "";
        this.updatefun();
      }
    },
    // 弹窗取消
    cancelbtn() {
      this.newincreasedata = {
        lasttime: Date.now(),
        title: "",
        number: "",
        category: "",
        recommend: "",
        puttime: "",
        removetime: "",
        content: "",
      };
      this.wintitle = "";
    },
  },
  mounted() {
    // 渲染页面
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
  width: 260px;
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
  background-color: #c4c4c4;
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
  border: 1px solid #99a9bf34;
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
.operationbtn {
  border: none;
  outline: none;
  color: #fff;
  font-size: 14px;
}
.operationbtn-left {
  background-color: #409eff;
  padding: 4px 6px;
  border-right: 1px solid rgba(255, 255, 255, 0.603);
  border-radius: 4px 0 0 4px;
}
.operationbtn-right {
  background-color: #409eff;
  padding: 4px 6px;
  border-radius: 0 4px 4px 0;
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
