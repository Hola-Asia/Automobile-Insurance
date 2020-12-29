<template>
  <div id="#app">
    <el-row class="clearfix">
      <el-input v-model="selName" class="inputName" :placeholder = placeStr></el-input>
      <div class="block">
        <el-date-picker
            v-model="datePic1"
            type="daterange"
            range-separator="至"
            start-placeholder="编辑时间"
            end-placeholder="编辑时间">
        </el-date-picker>
      </div>
      <div class="block">
        <el-date-picker
            v-model="datePic2"
            type="daterange"
            range-separator="至"
            start-placeholder="上架时间"
            end-placeholder="上架时间">
        </el-date-picker>
      </div>
      <div class="block">
        <el-date-picker
            v-model="datePic3"
            type="daterange"
            range-separator="至"
            start-placeholder="下架时间"
            end-placeholder="下架时间">
        </el-date-picker>
      </div>
      <div class="checkBtn">
        <el-button type="primary">查询</el-button>
        <el-button type="info">重置</el-button>
      </div>
    </el-row>
    <el-row>
      <router-link to="/AddAbout">
        <el-button type="primary">+ 新增</el-button>
      </router-link>
    </el-row>
    <el-row>
      <el-col :span="24" class="resultNum"><span>查询结果：共计4条数据</span></el-col>
    </el-row>
    <el-row>
      <el-table
          :data="tableData"
          stripe
          :header-cell-style="{background:'#D7D7D7',color:'#000',fontWeight:'normal'}"
          style="width: 100%">
        <el-table-column
            align="center"
            prop="recent"
            label="最近编辑时间">
        </el-table-column>
        <el-table-column
            align="center"
            prop="title"
            label="模块名称">
        </el-table-column>
        <el-table-column align="center" label="模块内容">
          <a href="javascript:" class="text">查看</a>
        </el-table-column>
        <el-table-column
            align="center"
            prop="put"
            label="上架时间">
        </el-table-column>
        <el-table-column
            align="center"
            prop="off"
            label="下架时间">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <el-button type="primary" class="off">下架</el-button>
          <router-link to="/EditAbout">
            <el-button type="primary">编辑</el-button>
          </router-link>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="clearfix">
      <div class="block pageNav">
        <el-pagination
            background
            layout="prev, pager, next, sizes, jumper"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="10"
            :total="1000">
        </el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
import '../assets/icon/zr/iconfont.css';
export default {
  name: "About",
  data:function(){
    return {
      //下拉框数据
      placeStr:'模块名称',
      selName:'',
      datePic1:'',
      datePic2:'',
      datePic3:'',
      currentPage4: 1,
      pickerOptions: {
        shortcuts: [{
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      tableData: [{
        recent: '2018-02-06 12:30:56',
        title: '免责声明',
        put: '2016-05-06 12:36:51',
        off: '— —',
      }, {
        recent: '2018-02-06 12:30:56',
        title: '免责声明',
        put: '2016-05-06 12:36:51',
        off: '— —',
      }, {
        recent: '2018-02-06 12:30:56',
        title: '免责声明',
        put: '2016-05-06 12:36:51',
        off: '— —',
      }, {
        recent: '2018-02-06 12:30:56',
        title: '免责声明',
        put: '2016-05-06 12:36:51',
        off: '— —',
      }, {
        recent: '2018-02-06 12:30:56',
        title: '免责声明',
        put: '2016-05-06 12:36:51',
        off: '— —',
      }]
    }
  },
  methods:{
    //下拉框选择
    changeSel(i){
      this.sel = this.selArr[i];
      this.placeStr = `请输入${this.selArr[i]}`;
    },
    //分页切换
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>
<style lang="less" scoped>
.clearfix{
  content: '';
  display: block;
  clear: both;
}
.el-row{
  text-align: left;
  line-height: 60px;
}
.inputName{
  width: 200px;
  margin: 0 15px 0 0;
}
.inputPrice{
  width: 200px;
}
.grid-content{
  display: inline-block;
}
.letter{
  margin-right: 25px;
}
.drop{
  min-width: 73px;
}
.block{
  display: inline-block;
  margin-left: 20px;
}
.checkBtn{
  display: inline-block;
  float: right;
}
.resultNum{
  background-color: #C3E6F5;
  margin-top: 10px;
  span{
    margin-left: 15px;
  }
}
a{
  text-decoration: none;
}
.desc{
  color: #1890FF;
}
.el-table td, .el-table th {
  text-align: center;
}
.el-table{
  margin-top: 15px;
}
.pageNav{
  margin-top: 40px;
  float: right;
}
.el-table th.is-leaf{
  background-color: #409eff;
}
.text{
  color: #409EFF;
}
.off{
  margin-right: 10px;
}
</style>
<style lang="less">
.pageNav ul li{
  font-weight: normal;
}
</style>