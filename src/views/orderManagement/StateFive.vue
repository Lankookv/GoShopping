<template>
  <div class="container">
    <div class="container0-1">
      <span class="title">
        <b>查看订单</b>
      </span>
      <!--      <div class="search">-->
      <!--                <Input  v-model="query.keywords"-->
      <!--                        @on-enter="filterByKeyword"-->
      <!--                        @on-click="filterByKeyword"-->
      <!--                        placeholder="BTS专辑"-->
      <!--                        class="input-search"/>-->
      <!--                <span slot="append">-->
      <!--                  <Button type="primary" style="background-color:transparent;border: none">-->
      <!--                    <i class="iconfont" @click.prevent="filterByKeyword">&#xe635;</i>-->
      <!--                  </Button>-->
      <!--                </span>-->
      <!--      </div>-->
    </div>
    <div class="container0-2">
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple" style="font-size: 20px;line-height: 36px;" @click="toStateOne">待处理</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple" style="font-size: 20px;line-height: 36px;" @click="toStateTwo">待备货</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple" style="font-size: 20px;line-height: 36px;" @click="toStateThree">待发货</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple" style="font-size: 20px;line-height: 36px;" @click="toStateFour">已发货</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-dark" style="font-size: 20px;line-height: 36px;">交易完成<span style="display:inline-block;background: red;width: 26px;height: 26px;border-radius: 13px;margin-left: 5px;font-size: 15px;">{{allOrder.length}}</span></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple" style="font-size: 20px;line-height: 36px;" @click="toStateSix">交易失败</div></el-col>
      </el-row>
    </div>
    <div class="container1">
      <!--      <div v-if="allGoods.length==0&&No_good==false" style="padding-top: 15%">-->
      <!--        <center>-->
      <!--          <div style="margin-top:100px;" >-->
      <!--            <i size="big"class="el-icon-loading" ></i>-->
      <!--          </div>-->
      <!--        </center>-->
      <!--        <div style="text-align: center;">-->
      <!--          <span style="text-align: center">正在努力加载中 请稍后 o(*￣▽￣*)ブ</span>-->
      <!--        </div>-->
      <!--      </div>-->
      <div v-if="allOrders.length===0">
        <center>
          <img src="../../components/icon/pic30.png" style="margin-top: 15%">
        </center>
        <div style="text-align: center;">
          <span style="text-align: center">暂无交易成功的订单哦 /(ㄒoㄒ)/~~</span>
        </div>
      </div>

      <ul  v-else  :loading="loadings.table" >
        <li class="container_1" v-for="(order,index) in allOrder" :key="index">
          <div style="background-color:rgb(246, 121, 46);height: 50px;border-bottom: 1px solid black;">
            <span style="font-size: 30px;line-height: 50px;float:left;margin-left: 20px">{{order[0].startDate.substring(0,10)+"   "+order[0].startDate.substring(11,16)}}</span>
            <button style="font-size: 20px;line-height: 50px;float:left;margin-left:20px;background-color:transparent;border: none;cursor: pointer;" @click="buyerInformation(order[0].orderId)">详细信息</button>
          </div>
          <ol>
            <li class="container_2" v-for="(goods,index) in order" :key="index">
              <img :src="goods.img" style="width: 18%;float: left;margin-left: 1%;margin-top: 1%;">
              <div class="container1-2" style="overflow:hidden;">
                <h2><b>{{goods.goodName}}</b></h2>
                <div style="overflow-y: scroll;overflow-x: hidden;white-space: pre-line;">
                  <small v-html="goods.description"></small>
                </div>
              </div>
              <span>
              <h1 style="color: black;font-size: 40px;margin-top:74px;"><b>{{goods.number}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;￥{{goods.goodPrice}}</b></h1>
                <el-button class="service"  @click="showPost(goods.orderId,goods.stmt)">售后处理</el-button>
            </span>
              <div class="all" v-show="dialogVisible"></div>
              <div class="post" v-show="dialogVisible">
                <div style="height:15%;border-bottom: 1px solid #eee;">
                  <span style="float: left;margin: 2% -15% 3% 3%;font-size: 20px"><b>售后处理</b></span>
                  <img src="../../components/icon/关闭.png" class="iconfont" @click="dialogVisible=!dialogVisible" style="margin-right: 3%;margin-top: 3%">
                </div>
                <div>
                  <!--                  <div style="float:right">-->
                  <img class="agree" src="../../components/icon/同意.png" v-if="post.stmt == 2">
                  <img class="agree" src="../../components/icon/拒绝.png" v-if="post.stmt == 3">
                  <!--                  </div>-->
                  <el-form label-width="140px" style="position: relative">
                    <el-form-item label="申请人"><span style="float: left">{{post.buyerName}}</span></el-form-item>
                    <el-form-item label="电话"><span style="float: left">{{post.phone}}</span></el-form-item>
                    <el-form-item label="地址"><span style="float: left">{{post.buyerAddress}}</span></el-form-item>
                    <el-form-item label="售后内容"><span style="float: left">{{post.postSaleType}}</span></el-form-item>
                    <el-form-item label="具体原因描述"><span style="float: left">{{post.reasons}}</span></el-form-item>
                    <el-form-item label="图片">
                      <div v-for="(img) in post.images">
                        <img :src="img" style="float: left;width: 130px;height: 100px;;padding-right:10px ">
                      </div>
                    </el-form-item>
                  </el-form>
                  <div class="footer" style="margin-bottom: 2%;" v-if="post.stmt == 1 ">
                    <el-button style="background-color: red;width: 15%" @click="notagree(post)">拒绝</el-button>
                    <el-button style="background-color: #00bf17;width: 15%" @click="agree(post)">同意</el-button>
                  </div>
                </div>
              </div>
            </li>
          </ol>
        </li>
      </ul>
      <buyerInformationModal v-show="showModal" :buyer="buyer" v-on:closeme="closeme"></buyerInformationModal>
    </div>
    <!--    <Pagination :total="total"-->
    <!--                :page-size.sync="limit"-->
    <!--                :current.sync="query.page"-->
    <!--                @on-change="pushRouter">-->
    <!--    </Pagination>-->
  </div>
</template>

<script>
  import Pagination from '../../components/Pagination'
  import buyerInformationModal from "../../components/buyerInformationModal"
  import {getBuyerInformation, showOrders,getPost,agreePost,notagreePost} from "../../api";

  export default {
    name: "StateFive",
    components: {
      Pagination,
      buyerInformationModal,
    },
    data() {
      return {
        total: 0,
        page: 1,
        loadings: {
          table: true,
        },
        allOrders:[],
        dialogVisible:false,
        // allOrders:[{orderId:1,img: "http://t13.baidu.com/it/u=2612970998,458336255&fm=224&app=112&f=JPEG?w=500&h=500&s=B8362E9A42E746AC8A0DD5F503009029",orderName:"bts专辑",description:"防弹少年团（BTS）是BigHit Entertainment于2013年6月13日推出的韩国男子演唱组合，由金南俊、金硕珍、闵玧其、郑号锡、朴智旻、金泰亨、田柾国7位成员组成。\n" +
        //     "2013年6月，发行首张单曲专辑《2 COOL 4 SKOOL》 [1]  ，并在Mnet音乐节目《M! Countdown》中正式出道 [2]  ；同年，推出首张迷你专辑《O!RUL8,2?》 [3]  ，获得第5届Melon音乐盛典最佳新人奖 [4]  。2014年6月，推出首张日文单曲辑《NO MORE DREAM -Japanese Ver.-》，在日本正式出道 [5]  ；8月，推出首张正规专辑《DARK & WILD》 [6]  。2015年4月，凭借歌曲《I NEED U》获得了出道后首个韩国音乐节目的一位 [7]  ；同年，获得了第22届MTV欧洲音乐大奖最佳韩国艺人奖 [8]  。2016年10月，发行第二张正规专辑《WINGS》 [9]  。2017年9月，发行第三张迷你专辑《LOVE YOURSELF 承 'Her'》 [10]  ；11月，获得了“全世界在推特被提及次数最多的音乐组合”吉尼斯世界纪录的认证 [11]  。2018年5月，推出第三张正规专辑《LOVE YOURSELF 转 'Tear'》 [12]  ；同月，受邀出席美国第25届公告牌音乐奖典礼并获得“最佳社交艺人”奖 [13]  。2019福布斯100名人榜排名第43位 [14]  。\n" +
        //     "2019年11月3日，MTVEMA获奖名单揭晓，BTS防弹少年团获最佳现场和最强粉丝团奖项。 [15] \n" +
        //     "2020年 [16]  10月，BTS在获奖感言中提及朝鲜战争，表示“会永远铭记两国（韩美）共同经历的苦难历史”。因而引发中国网友和粉丝不满； [17-18]  10月12日，外交部发言人赵立坚回应此事时表示：以史为鉴、面向未来、珍爱和平、促进友好，应该是我们共同的追求，值得我们共同努力。",orderPrice:77.77,},],
        allOrder:[[]],
        k:0,
        type:0,
        post:[],
        showModal:false,
        buyer:[],
      }
    },
    mounted() {
      this.init()
    },
    methods:{
      init(){
        showOrders({
          sellerId:parseInt(sessionStorage.getItem("userId")),
          statement:6,
          contentType: "application/json",
        })
          .then((response)=> {
            this.allOrders=response.data.data.orderList;
            if(this.allOrders.length==0){
              this.allOrder=[];
            }
            else {
              let n = 0;
              let type0 = this.allOrders[0].newOrderId;
              let allOrder0 = [[]];
              allOrder0[n] = [];
              this.allOrders.forEach(function (item) {
                // alert("item.type："+item.type);
                // alert("type0："+type0);
                if (!(item.newOrderId === type0)) {
                  n++;
                  allOrder0[n] = [];
                }
                allOrder0[n].push(item);
                type0 = item.newOrderId;
              });
              this.k = n;
              this.type = type0;
              this.allOrder = allOrder0;
            }
          })
      },
      //拿到售后单
      showPost(val,stmt){
        this.post=[];
        if(stmt==7) {
          this.dialogVisible = !this.dialogVisible;
        }else {
          this.$message.error('该商品没有售后单！');
        }
        getPost({
          orderId:val,
          contentType: "application/json"
        }).then((response) =>{
          this.post=response.data.data;
          if(this.post.postSaleType==1){
            this.post.postSaleType="换货";
          }
          else if(this.post.postSaleType==2){
            this.post.postSaleType="退货退款";
          }else{
            this.post.postSaleType="退款";
          }
        })
      },

//拒绝售后
      notagree(val){
        notagreePost({
          postSaleId:val.postSaleId,
          contentType: "application/json"
        }).then((response) =>{
          this.dialogVisible = !this.dialogVisible;
          this.init();
        })
      },

//同意售后
      agree(val){
        agreePost({
          postSaleId:val.postSaleId,
          contentType: "application/json"
        }).then((response) =>{
          this.dialogVisible = !this.dialogVisible;
          this.init();
        })
      },
      toGoodDetail(orderId){
        this.$router.push({name:'GoodDetails',params:{bid:orderId}})
      },
      toStateOne(){
        this.$router.push({name:'StateOne',})
      },
      toStateTwo(){
        this.$router.push({name:'StateTwo',})
      },
      toStateThree(){
        this.$router.push({name:'StateThree',})
      },
      toStateFour(){
        this.$router.push({name:'StateFour',})
      },
      toStateSix(){
        this.$router.push({name:'StateSix',})
      },
      buyerInformation(orderId){
        getBuyerInformation({
          orderId: orderId,
          contentType: "application/json",
        }).then((response)=> {
          this.buyer=response.data.data;
        })
        this.showModal=!this.showModal;
      },
      closeme(){
        this.showModal=!this.showModal;
      },
    }

  }
</script>

<style scoped lang="less">
  .container0-1{
    height:auto;
    min-height:30px;
    overflow: hidden;
  }
  .container0-2{
    height:auto;
    min-height:20px;
    overflow: hidden;
    margin: 10px 5% 0 5%;
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 8px;
    }
    .bg-purple-dark {
      background: #F88E4E;
      border: 1px solid black;
    }
    .grid-content {
      border-radius: 8px;
      min-height: 36px;
      cursor:pointer;
    }
  }
  .container {
    width: 100%;
    height:auto;
    min-height:50px;
    overflow: hidden;
    .title{
      width: 20%;
      float: left;
      margin-top: 1%;
      margin-left: 3%;
      font-size: 32px;
    }
    .search{
      width: 30%;
      float: right;
      margin-top: 1.3%;
      margin-right: 3%;
      border: 1px solid #ccc;
      border-radius: 20px;
      margin-left: 10px;
      background-color: white;
    }
    .search:focus{
      border-color: #66afe9;
      outline: 0;
      -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
    }
    .input-search{
      border:none;
      width: 80%;
      font-size: 14px;
      font-weight: 700;
      font-family: "Microsoft soft";
      padding: 8px 8px;
      background-color:transparent;
      outline:none;
    }
    .container_1{
      background-color:  #F88E4E;
      border: 1px solid black;
      height:auto;
      min-height:200px;
      overflow: hidden;
      width: 100%;
      margin:1% 4%;
      list-style: none;
    }
    .container1 {
      width: 100%;
      display: inline-block;
      ul {
        display: flex;
        flex-wrap: wrap;//默认不换行
        padding-bottom: 10px;
        padding-inline-start:0;
        margin-top: 0;
        .container_2{
          width: 100%;
          list-style: none;
          height:auto;
          min-height:200px;
          overflow: hidden;
          .container1-2 {
            width: 40%;
            float:left;
            margin-left: 2%;
            text-align: left;
            h2{
              margin-bottom: 2%;
              margin-top: 2%;
              margin-left: 4%;
            }
            div{
              height: 140px;
              width: 101.5%;
              margin:1% 5% 0px 3%;
            }
          }
        }
      }
    }
    .all{
      position:fixed;
      top:0;
      right:0;
      bottom:0;
      left:0;
      opacity:0.5;
      filter:alpha(opacity=5);
      z-index:99;
    }
    .post{
      position:fixed;
      top:0;right:0;
      bottom:0;
      left:0;
      width: 50%;
      height:400px;
      margin:auto;
      background-color:#fff;
      overflow:auto;
      z-index:100;
    }
    .service{
      color: black;
      float: right;
      width: 10%;
      height: 36px;
      margin-right: 3%;
      margin-bottom: 2%;
      background-color: orangered;
      border: 1px solid black;
      cursor:Pointer;
      border-radius: 10px;
    }
    .agree{
      width: 20%;
      float: right;
      position: absolute;
      right: 0;
    }
  }

  .iconfont{
    float: right;
    margin-top: 10px;
    margin-right: 10px;
    font-family:"iconfont" !important;
    width:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
  .iconfont:hover{
    float: right;
    margin-top: 10px;
    margin-right: 10px;
    font-family:"iconfont" !important;
    width:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    cursor:Pointer;
  }

</style>
