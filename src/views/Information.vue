<template>
  <!-- 资讯页面 -->
  <div style="height: 100%">
    <div class="waikuai">
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
                @click="newincrease"
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
            查询结果：共计<span>111</span>条
          </div>
        </el-col>
      </el-row>
      <!-- 表身 -->
      <div class="infor-list">
        <!-- 表头 -->
        <el-row class="tablehead" style="background: #d7d7d7">
          <el-col :span="3">
            <div class="grid-content">最近编辑时间</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">文章标题</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content">文章编号</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content">文章分类</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content">推荐</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content">上架时间</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content">下架时间</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content">操作</div>
          </el-col>
        </el-row>
        <!-- 表内容 -->
        <el-row
          v-for="(v, i) in datalist"
          :key="i"
          class="bgcolor"
          :class="[i % 2 != 0 ? 'active' : '']"
        >
          <!-- 最后编辑时间 -->
          <el-col :span="3">
            <div class="grid-content">
              <div class="col-time">{{ v.lastdate }}</div>
              <div class="col-time">{{ v.lasttime }}</div>
            </div>
          </el-col>
          <!-- 标题 -->
          <el-col :span="6">
            <div class="grid-content">
              {{ v.title }}
            </div>
          </el-col>
          <!-- 编号 -->
          <el-col :span="3">
            <div class="grid-content">{{ v.number }}</div>
          </el-col>
          <!-- 分类 -->
          <el-col :span="2">
            <div class="grid-content">{{ v.category }}</div>
          </el-col>
          <!-- 推荐 -->
          <el-col :span="2" v-model="i">
            <div class="grid-content" @click="recommended(i)">
              <el-switch
                style="display: block"
                v-model="v.recommend"
                active-color="#30b37c"
                inactive-color="#aaa"
                active-value="1"
                inactive-value="2"
                @change="recommendbtn"
              >
              </el-switch>
            </div>
          </el-col>
          <!-- 上架时间 -->
          <el-col :span="3">
            <div class="grid-content">
              <div v-show="v.putdate != '1-01-30 '">
                <div class="col-time">{{ v.putdate }}</div>
                <div class="col-time">{{ v.puttime }}</div>
              </div>
              <div v-show="v.putdate == '1-01-30 '">—— ——</div>
            </div>
          </el-col>
          <!-- 下架时间 -->
          <el-col :span="3">
            <div class="grid-content">
              <div v-show="v.removedate != '1-01-30 '">
                <div class="col-time">{{ v.removedate }}</div>
                <div class="col-time">{{ v.removetime }}</div>
              </div>
              <div v-show="v.removedate == '1-01-30 '">—— ——</div>
            </div>
          </el-col>
          <!-- 操作按钮 -->
          <el-col :span="2">
            <div class="grid-content">
              <el-button-group>
                <button
                  class="operationbtn operationbtn-left"
                  v-show="v.status == '1'"
                  @click="putawaybtn(i)"
                >
                  下架
                </button>
                <button
                  class="operationbtn operationbtn-left"
                  v-show="v.status == '2'"
                  @click="soldoutbtn(i)"
                >
                  上架
                </button>
                <button
                  class="operationbtn operationbtn-right"
                  @click="compilebtn(i)"
                >
                  编辑
                </button>
              </el-button-group>
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
    <!-- 修改新增弹窗 -->
    <div class="posfix" :class="[wintitle == '' ? 'active' : '']">
      <div class="fixbox">
        <div class="infolump">
          <div class="inlinetit inlinealltit">{{ wintitle }}</div>
        </div>
        <div class="infolump">
          <div class="inlinetit">文章标题：</div>
          <div class="inlinediv">
            <el-input
              v-model="newincreasedata.title"
              placeholder="请输入内容"
            ></el-input>
          </div>
        </div>
        <div class="infolump">
          <div class="inlinetit">文章分类：</div>
          <div class="inlinediv">
            <el-select v-model="newincreasedata.category" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="infolump">
          <div class="inlinetit">是否推荐：</div>
          <div class="inlinediv">
            <el-select v-model="newincreasedata.recommend" placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="infolump">
          <div class="inlinetit">是否上架：</div>
          <div class="inlinediv">
            <el-select v-model="newincreasedata.puttime" placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="infolump">
          <div class="inlinetit inlinetitpos">文章内容：</div>
          <div class="inlinediv">
            <div class="fankuidetextarea">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="请输入内容"
                v-model="newincreasedata.content"
                style="resize: none"
              >
              </el-input>
            </div>
          </div>
        </div>
        <div class="infolump">
          <button class="operationbtnli formbtnli" @click="datadel">
            保存
          </button>
          <router-link to="/information">
            <button class="operationbtnli newbtnli" @click="cancelbtn">
              取消
            </button>
          </router-link>
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
      btn3_active: "0",
      // 上下架按钮
      if_putaway: "下架",
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
        value2: null,
        value3: null,
      },
      // 表数据
      datalist: [],
      // 新增
      newincreasedata: {
        lasttime: Date.now(),
        title: "",
        number: "",
        category: "",
        recommend: "",
        puttime: "",
        removetime: "",
        content: "",
        status: "",
      },
      // 查询发送数据
      selectdata: {
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
      },
      // 修改发送数据
      updatefunobj: {
        id: "",
        category: "",
        content: "",
        number: "",
        puttime: "",
        recommend: "",
        removetime: "",
        status: "",
        title: "",
      },
      // 表内数据操作
      id: "",
      recommend_val: "",
      // 分页
      splitepage: {
        page: 0,
        limit: 2,
        currentPage: 1,
        PageSizes: [2, 4, 8, 10],
      },
      // 提示弹窗
      peompttext: "",
      // 修改新增弹窗
      wintitle: "",
      title: "",
      category: "",
      recommend: "",
      put: "",
      content: "",
      options2: [
        {
          value: "选项1",
          label: "是",
        },
        {
          value: "选项2",
          label: "否",
        },
      ],
      options1: [
        {
          value: "选项1",
          label: "车险改革",
        },
        {
          value: "选项2",
          label: "用车养车",
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
    // 重置
    resetForm(formName) {
      this.numberValidateForm.title = "";
      this.numberValidateForm.value1 = null;
      this.numberValidateForm.value2 = null;
      this.numberValidateForm.value3 = null;
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
      this.$axios({
        url: "/information/query",
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
  created() {
    // 渲染页面
    (this.selectdata = {
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
    }),
      this.applypage();
  },
  components: {},
  watch: {},
};
</script>

<style lang="less" scoped>
// 白色底框
.waikuai {
  padding: 20px;
  background-color: #fff;
  min-height: 93%;
}
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
// 编辑新增弹窗
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
  height: 450px;
  border-radius: 20px;
  background-color: #fff;
  text-align: left;
  padding: 30px;
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
.textareacls:focus {
  outline: none;
  border-color: #409eff;
}
.infolump {
  margin-top: 20px;
}
.inlinetit {
  width: 100px;
  display: inline-block;
}
.inlinealltit {
  font-size: 18px;
  font-weight: 600;
}
.inlinetitpos {
  position: relative;
  top: -35px;
}
.inlinediv {
  width: 300px;
  display: inline-block;
}
.operationbtnli {
  border: none;
  outline: none;
  color: #fff;
  font-size: 14px;
  padding: 8px 20px;
  border-radius: 4px;
  margin-right: 20px;
}
.formbtnli {
  background-color: #409eff;
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
