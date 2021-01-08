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
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="info" @click="reset">重置</el-button>
      </div>
    </el-row>
    <el-row>
      <router-link to="/AddAbout">
        <el-button type="primary">+ 新增</el-button>
      </router-link>
    </el-row>
    <el-row>
      <el-col :span="24" class="resultNum"><span>查询结果：共计{{total}}条数据</span></el-col>
    </el-row>
    <el-row>
      <el-table
          v-loading="loading"
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
          <template slot-scope="scope">
            <a href="javascript:" class="text" @click="viewInfo(scope.$index,scope.row)">查看</a>
          </template>
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
        <el-table-column
            v-if=false
            prop="id"
            align="center"
            label="id">
        </el-table-column>
        <el-table-column align="center" prop="status" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" class="off" @click="changeStatus(scope.$index,scope.row)">{{ scope.row.status }}</el-button>
            <el-button type="primary" @click="edit(scope.$index,scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="clearfix">
      <div class="block pageNav">
        <el-pagination
            background
            layout="prev, pager, next, sizes, jumper"
            :page-sizes="[5, 10, 20, 50]"
            :page-size=this.pageSize
            :total=this.total
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </el-row>
    <el-dialog
        title="查看协议"
        :visible.sync="dialogVisible"
        width="30%">
      <span>{{information}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="confirmBtn">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import '@/assets/icon/zr/iconfont.css';
export default {
  name: "About",
  data:function(){
    return {
      //下拉框数据
      loading:true,
      total:0,
      placeStr:'模块名称',
      selName:'',
      datePic1:'',
      datePic2:'',
      datePic3:'',
      pageSize:5,
      val:1,
      msg:'',
      dialogVisible: false,
      currentPage4: 1,
      information:'',
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
      tableData: []
    }
  },
  methods:{
    openVn() {
      this.$message(this.msg);
    },
    viewInfo(index,data){
      this.$axios({
        url:'/protocols/queryById',
        method:'post',
        headers:{
          token:sessionStorage.token,
        },
        params:{
          id:data.id
        }
      }).then((res)=>{
        this.information = res.data.data.content?res.data.data.content:'暂无内容';
      });
      this.dialogVisible = true;
    },
    //上下架切换
    changeStatus(index,data){
      this.$axios({
        url:'/protocols/queryById',
        method:'post',
        headers:{
          token:sessionStorage.token,
        },
        params:{
          id:data.id
        }
      }).then((res)=>{
        this.$axios({
          url:'/protocols/update',
          headers:{
            token:sessionStorage.token,
          },
          method:'post',
          data:{
            status:res.data.data.status === '1'?'2':'1',
            id:data.id
          }
        }).then((res)=>{
          this.msg = res.data.code === 0?'操作成功':'操作失败，请稍后再试'
          this.openVn();
          this.getData();
        })
      })
    },
    //条件查询
    search(){
      console.log(this.datePic1[0])
      this.$axios({
        url:'/protocols/query',
        headers:{
          token:sessionStorage.token,
        },
        method:'post',
        data:{
          name:this.selName,
          lattimestart:this.datePic1[0]?this.datePic1[0].toISOString():'',
          lasttimeend:this.datePic1[1]?this.datePic1[1].toISOString():'',
          puttimestart:this.datePic2[0]?this.datePic2[0].toISOString():'',
          puttimeend:this.datePic2[1]?this.datePic2[1].toISOString():'',
          removetimestart:this.datePic3[0]?this.datePic3[0]:'',
          removetimeend:this.datePic3[1]?this.datePic3[1].toISOString():'',
          pageSize:this.pageSize,
          pageNum:1
        }
      }).then((res)=>{
        if (res.data.code === 50011){
          this.msg = '无匹配数据';
          this.openVn();
          this.getData();
        }else if (res.data.data.total){
          this.tableData = [];
          for (let i=0;i<res.data.data.list.length;i++){
            this.tableData.push({
              recent:this.timestampToTime(res.data.data.list[i].lasttime),
              title:res.data.data.list[i].name,
              put:res.data.data.list[i].puttime?this.timestampToTime(res.data.data.list[i].puttime):'— —',
              off:res.data.data.list[i].removetime?this.timestampToTime(res.data.data.list[i].removetime):'— —',
              id:res.data.data.list[i].id,
              status:res.data.data.list[i].status === '1'?'下架':'上架',
            })
          }
          this.total = res.data.data.total;
          this.$nextTick(()=>{
            this.loading = false;
          })
        }
      })
    },
    //分页切换
    handleSizeChange(val) {
      this.loading = true;
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.loading = true;
      this.val = val;
      this.getData();
    },
    //重置按钮
    reset(){
      this.selName = '';
      this.datePic1 = '';
      this.datePic2 = '';
      this.datePic3 = '';
    },
    confirmBtn(){
      this.dialogVisible = false;
      this.information = '';
    },
    getData(){
      this.$axios({
        url:'/protocols/query',
        headers:{
          token:sessionStorage.token,
        },
        method:'post',
        data:{
          pageSize:this.pageSize,
          pageNum:this.val
        }
      }).then((res)=>{
        console.log(res)
        this.tableData = [];
        for (let i=0;i<res.data.data.list.length;i++){
          this.tableData.push({
            recent:this.timestampToTime(res.data.data.list[i].lasttime),
            title:res.data.data.list[i].name,
            put:res.data.data.list[i].puttime?this.timestampToTime(res.data.data.list[i].puttime):'— —',
            off:res.data.data.list[i].removetime?this.timestampToTime(res.data.data.list[i].removetime):'— —',
            id:res.data.data.list[i].id,
            status:res.data.data.list[i].status === '1'?'下架':'上架',
          })
        }
        this.total = res.data.data.total;
        this.$nextTick(()=>{
          this.loading = false;
        })
      })
    },
    //日期格式化
    timestampToTime(timestamp) {
      let date = new Date(timestamp);
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let D = date.getDate() + ' ';
      let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    edit(index,data){
      this.$router.push('/editabout?id='+data.id);
    }
  },
  mounted() {
    this.getData();
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