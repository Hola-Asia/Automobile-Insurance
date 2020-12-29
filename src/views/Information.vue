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
