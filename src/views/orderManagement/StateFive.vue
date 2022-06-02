<template>
  <div class="container">
    <div class="container0-1">
      <span class="title">
        <b>查看订单</b>
      </span>
    </div>
    <div class="container0-2">
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple" style="font-size: 20px;line-height: 36px;" @click="toStateOne">待处理</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple" style="font-size: 20px;line-height: 36px;" @click="toStateTwo">待备货</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple" style="font-size: 20px;line-height: 36px;" @click="toStateThree">待发货</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple" style="font-size: 20px;line-height: 36px;" @click="toStateFour">已发货</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-dark" style="font-size: 20px;line-height: 36px;">交易完成</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple" style="font-size: 20px;line-height: 36px;" @click="toStateSix">交易失败</div></el-col>
      </el-row>
    </div>
    <div class="container1">
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
            <button style="font-size: 20px;line-height: 50px;float:left;margin-left:20px;background-color:transparent;border: none;cursor: pointer;">详细信息</button>
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
                    <img class="agree" src="../../components/icon/已同意.png" v-if="post.stmt == 2">
                    <img class="agree" src="../../components/icon/已拒绝.png" v-if="post.stmt == 3">
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
    </div>
  </div>
</template>

<script>
  import Pagination from '../../components/Pagination'
  import {showOrders, getPost,agreePost,notagreePost} from "../../api";


  export default {
    name: "StateFive",
    components: {
      Pagination,
    },
    data() {
      return {
        total: 0,
        page: 1,
        dialogVisible:false,
        loadings: {
          table: true,
        },
        allOrders:[],
        allOrder:[[]],
        post:[],
        k:0,
        type:0,
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
            let n=0;
            let type0=this.allOrders[0].newOrderId;
            let allOrder0=[[]];
            allOrder0[n]=[];
            this.allOrders.forEach(function (item) {
              // alert("item.type："+item.type);
              // alert("type0："+type0);
              if (!(item.newOrderId===type0)){
                n++;
                allOrder0[n]=[];
              }
              allOrder0[n].push(item);
              type0=item.newOrderId;
            });
            this.k=n;
            this.type=type0;
            this.allOrder=allOrder0;
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
    }

  }
</script>

<style scoped lang="less">
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
</style>
