<template>
  <div style="border-top:1px solid #fff;">
      <div class="content">
          <div>
            <p class="clearfix">
                <span class="left">中国银行保险监督管理委员会监制</span>
            </p>
            <h2 class="clearfix">
                <span class="center thick underline">机动车综合商业保险保险单（电子保单）</span>
            </h2>
            <p class="clearfix">
                <span class="left">代理业务；代理人：平安创展保险销售服务有限</span>
            </p>
            <p class="clearfix">
                <span class="left">公司苏州分公司；地址：苏州工业园区时代广场</span>
            </p>
            <p class="clearfix">
                <span class="left">24幢502室</span><span class="right">确认码：V0201PAIC32002000160033869XXXX</span>
            </p>
            <p class="clearfix">
                <span class="right">保单验真码: HQKrvHToBNfYyFXXXX</span>
            </p>
            <p class="clearfix">
                <span class="left">行驶证车主:{{name}}</span><span class="right">保险单号:{{number}}</span>
            </p>
            <p class="clearfix">
                <span class="left">鉴于投保人已向保险人提出投保申请,并同意按约定交付保险费,保险人依照承保险种及其对应条款和特别约定承担赔偿责任。</span>
            </p>
      </div>
      <table border="1" cellspacing="0">
            <tr>
                <td rowspan="2" colspan="2" class="thick center1">被保<br>险人<br>信息</td>
                <td colspan="9" class="thick">以下信息来源于您的投保申请，是为您提供理赔及售后的重要依据，请务必仔细核实，如果有错误或者遗漏请立即拨打XXXXX进行修改</td>
            </tr>
            <tr>
                <td colspan="9">
                    <p class="clearfix">
                        <span class="left">姓 名： {{name}}</span><span class="center">证件类型： {{idType}}</span><span class="right">证件号码：
                        {{idCard}}</span>
                    </p>
                    <p class="clearfix center">
                        <span>性 别： 男</span><span class="right">联系电话： {{phone}}</span>
                    </p>
                    <p class="clearfix">
                        <span class="left">通讯地址：{{address}}</span><span class="right">电子邮箱：47921637xxxx@qq.com</span>
                    </p>
                </td>
            </tr>
            <tr>
                <td rowspan="3" colspan="2" class="center1">车辆<br>信息</td>
                <td class="center1">车牌号码</td>
                <td colspan="2">{{carNumber}}</td>
                <td class="center1">发动机号码</td>
                <td colspan="2">{{engine}}</td>
                <td class="center1">车架号码</td>
                <td colspan="2">{{chassisNumber}}</td>
            </tr>
            <tr>
                <td class="center1">核定载客</td>
                <td colspan="2">{{seat}}人</td>
                <td class="center1">初登日期</td>
                <td colspan="2">{{timestampToTime(startTime)}}</td>
                <td class="center1">厂牌型号</td>
                <td colspan="2">锋范牌HG7154CBMA轿车</td>
            </tr>
            <tr>
                <td class="center1">核载质量</td>
                <td colspan="2">——</td>
                <td class="center1">使用性质</td>
                <td colspan="2">非营运</td>
                <td class="center1">机动车种类</td>
                <td colspan="2">六座以下客车</td>
            </tr>
            <tr>
                <td colspan="3" class="thick">解决争议方式</td>
                <td colspan="8">诉讼</td>
            </tr>
            <tr>
                <td colspan="3" class="thick">保险期间</td>
                <td colspan="8">自{{timestampToTime(startTime)}}起至{{timestampToTime(endTime)}}止</td>
            </tr>
            <tr>
                <td colspan="4" class="center1">承保险种</td>
                <td colspan="3" class="center1">保险金额/<br>责任限额</td>
                <td class="center1">保险费<br>（元）</td>
                <td colspan="2" class="center1">是否投保<br>不计免赔</td>
                <td colspan="1" class="center1">保险费小计<br>（元）</td>
            </tr>
            <tr>
                <td colspan="4" class="center1">机动车损失险</td>
                <td colspan="3" class="center1">125465.80元</td>
                <td class="center1">1256.23</td>
                <td colspan="2" class="center1">是</td>
                <td colspan="1" class="center1">1300</td>
            </tr>
            <tr>
                <td colspan="4" class="center1">机动车第三者责任保险</td>
                <td colspan="3" class="center1">2000000.00元</td>
                <td class="center1">1076.59</td>
                <td colspan="2" class="center1">是</td>
                <td colspan="1" class="center1">1100</td>
            </tr>
            <tr>
                <td colspan="4" class="center1">车损险每次事故绝对免赔额</td>
                <td colspan="7" class="center1">0元/次</td>
            </tr>
            <tr>
                <td colspan="4" class="center1">保险费合计</td>
                <td colspan="7" class="center1">RMB  2400.00元（大写）人民币贰仟肆佰元整</td>
            </tr>
            <tr>
                <td class="center1 thick"> 特 别 <br> 约  定 </td>
                <td colspan="10">1) 尊敬的客户：投保次日起，承保及理赔等信息您可通过本公司网页www.pingan.com、客服热线95511、门店核实信息。若对查询结果有异议，请登陆网站留言或拨打服务热线。<br> 2) 如对我公司服务有任何疑问，可拨打：江苏保险纠纷投诉处理中心“4008012378”保险咨询投诉
                热线对我公司服务进行监督。 <br>3) 无其它特别约定。</td>
            </tr>
            <tr>
                <td colspan="11">
                    <p class="clearfix"><span class="left">代理机构跟单销售人员姓名：XXX</span><span class="right">执业证号码：2101273200008000201902XXXX</span></p>
                    <p class="clearfix"><span class="center">银行流水号：CPC39020091700012679XXXX</span></p>
                    <p class="clearfix center1">
                        <span class="left">收费确认时间：{{timestampToTime(startTime)}}</span>
                        <span>投保确认时间：{{timestampToTime(startTime)}}</span>
                        <span class="right">打印时间：{{timestampToTime(startTime)}}</span>
                    </p>
                </td>
            </tr>
            <tr>
                <td class="center1 thick" colspan="1"> 重  要 <br> 提  示 </td>
                <td colspan="10">
                    <p>1.本保险合同由保险条款、投保单、保险单、批单和特别约定组成。</p>
                    <p>2.收到本保险单、承保险种对应的保险条款后，请立即核对，如有不符或疏漏，请及时通知保险人并办理变更或补充手续。</p>
                    <p>3.请详细阅读承保险种对应的保险条款，特别是责任免除和赔偿处理。</p>
                    <p>4.被保险机动车因改装、加装、改变使用性质等导致危险程度显著增加以及转卖、转让、赠送他人的，应通知保险人。</p>
                    <p>5.被保险人应当在保险事故发生后及时通知保险人。</p>
                </td>
            </tr>
            <tr>
                <td colspan="11">
                    <p class="clearfix"><span>公司名称：吴江个代业务部</span></p>
                    <p class="clearfix"><span>公司地址：苏州市吴江区长安路3099号吴江商会大厦南楼</span></p>
                    <p class="clearfix center1">
                        <span class="left">报案及服务电话：XXXXX</span>
                        <span>网址：www.pinan.com.cn</span>
                        <span class="right">签单日期：2018年6月10日（保险人签章）</span>
                    </p>
                </td>
            </tr>
      </table>
      <div>
          <p class="clearfix center1">
                <span class="left">核保：XXX  2018年6月10日</span>
                <span>制单：27578XX  2018年6月10日</span>
                <span class="right">经办：XX</span>
          </p>
          <p><span>温馨提示：您收到保单后可登陆中国平安网站(http://www.pingan.com/bjdzbd)或拨打95511，通过右上角的“保险单号”及“验真码”查验保单真伪。</span></p>
          <p class="center1"><span class="thick" style="font-size: 28px">中国平安财产保险股份有限公司</span></p>
          <p class="center1"><span class="thick" style="font-size: 12px"> PING AN PROPERTY ＆ CASUALTY INSURANCE COMPANY OF CHINA,LTD</span></p>
      </div>
      </div>
      
  </div>
</template>

<script>
export default {
    data() {
        return {
             id:this.$route.params.id,
            //  车牌号码
             carNumber:null,
            //  车架号码 
             chassisNumber:null,
            //  保单结束时间
             endTime:null,
            //  险种
             insuranceName:null,
            //  开始时间
             startTime:null,
            //  保单状态 0为失效,1为退保,2为保障中 
             status:null,
            //  险种状态 0为交强险,1为商业险
            type:null,
            // 身份证
            idCard:null,
            // 电话号码
            phone:null,
            // 发动机号
            engine:null,
            // 座位
            seat:null,
            // 名字
            name:null,
            // 保单号码 
            number:null,
            // 证件类型
            idType:null,
            // 地址
            address:null,
            // token
            token:sessionStorage.token,
        }
    },
    methods: {
        beg(){
            this.$axios({
                url:'/policy/findId',
                // headers:{
                //   'token':this.token
                //   },
                params:{
                    'id':this.id
                }
            }).then((res)=>{
                //  车牌号码
             this.carNumber=res.data.data.carNumber;
            //  车架号码 
             this.chassisNumber=res.data.data.chassisNumber;
            //  保单结束时间
             this.endTime=res.data.data.endTime;
            //  险种
             this.insuranceName=res.data.data.insuranceName;
            //  开始时间
             this.startTime=res.data.data.startTime;
            //  保单状态 0为失效,1为退保,2为保障中 
             this.status=res.data.data.status;
            //  险种状态 0为交强险,1为商业险
            this.type=res.data.data.type;
            // 身份证
            this.idCard=res.data.data.idCard;
            // 电话号码
            this.phone=res.data.data.phone;
            // 发动机号
            this.engine=res.data.data.engine;
            // 座位
            this.seat=res.data.data.seat;
            // 名字
            this.name=res.data.data.name;
            // 保单号码 
            this.number=res.data.data.number;
            // 证件类型
            this.idType=res.data.data.idType;
            // 地址
            this.address=res.data.data.address;
            }).catch((err)=>{
                console.log(err);
            })
        },
         //加工时间
       timestampToTime(timestamp) {
        let date = new Date(timestamp);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + ' ';
        let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
      }
    },
    mounted() {
        this.beg();
    },
}
</script>

<style>
    .left{
        float: left;
        text-align: left;
    }
    .right{
        float: right;
        text-align: right;
    }
    .center{
        display: block;
        text-align: center;
    }
    .center1{
        text-align: center;
    }
    .thick{
        font-weight: bold;
    }
    .underline{
        text-decoration: underline;
    }
    h2 span{
        font-size: 18px;
    }
    .clearfix:after{
        content: '';
        clear: both;
        display: block;
    }
    .content{
        width: 1013px;
        margin: 20px auto 0;
    }
    table{
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>