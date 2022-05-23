<template>
  <div class="container" style="overflow: hidden;">
    <el-container style="font-weight: bold;">
      <el-aside width="350px;" id="HandsomeWu">
        <el-menu :default-openeds="[]" style="background-color: #FBBF9B;width: 220px;overflow:hidden;">
          <el-submenu index="1" >
            <template slot="title"><i class="el-icon-message"></i>账号管理</template>
            <el-menu-item-group class="firstItems">
              <el-menu-item index="1-1" class="items" @click="toChangePassword">修改密码</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>商品管理</template>
            <el-menu-item-group class="firstItems">
              <el-menu-item index="2-1" class="items" @click="toHistoryGoods">查看历史商品</el-menu-item>
              <el-menu-item index="2-2" class="items" @click="toReleaseGoods">发布商品</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>订单管理</template>
            <el-menu-item-group class="firstItems">
              <el-menu-item index="3-1" class="items" @click="toOrders">查看订单</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-setting"></i>客户管理</template>
            <el-menu-item-group class="firstItems">
              <el-menu-item index="4-1" class="items" @click="toBuyers">查看客户信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <div style="height: 50px">嗨~欢迎来到购小拼在线购物平台</div>
          <div class="container-1">
            <div class="container-1-1">
              <img src="../components/icon/v.png" class="faces">
              <span style="float: left;margin-left: 3%;margin-top: 3%;font-size: 24px">{{acount}}</span>
            </div>
            <div class="container-1-2" style="text-align: center;">
              <div><hr></div>
              <div style="margin: auto">
                <el-row :gutter="10" style="font-size: 22px;font-weight: bold" class="state">
                  <el-col :span="3"><div class="grid-content bg-urple" style="font-size: 16px;line-height: 36px;" @click="toStateOne()">待处理<span>&nbsp;{{stmt2}}</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple" style="font-size: 16px;line-height: 36px;" @click="toStateTwo()">待备货<span>&nbsp;{{stmt3}}</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple" style="font-size: 16px;line-height: 36px;" @click="toStateThree()">待发货<span>&nbsp;{{stmt4}}</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple" style="font-size: 16px;line-height: 36px;" @click="toStateFour()">已发货<span>&nbsp;{{stmt5}}</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple" style="font-size: 16px;line-height: 36px;" @click="toStateFive()">交易完成<span>&nbsp;{{stmt67}}</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple" style="font-size: 16px;line-height: 36px;" @click="toStateSix()">交易失败<span>&nbsp;{{stmt0102}}</span></div></el-col>
                </el-row>
              </div>
            </div>
          </div>
          <!--          <div class="container2">-->
          <!--            <ul >-->
          <!--              <li class="container_1">-->
          <!--                <div style="background-color:rgb(246, 121, 46);height: 50px;border-bottom: 1px solid black;">-->
          <!--&lt;!&ndash;                                              <span style="font-size: 30px;line-height: 50px;float:left;margin-left: 20px">{{order[0].startDate.substring(0,10)+"   "+order[0].startDate.substring(11,16)}}</span>&ndash;&gt;-->
          <!--                  <button style="font-size: 20px;line-height: 50px;float:left;margin-left:20px;background-color:transparent;border: none;cursor: pointer;">详细信息</button>-->
          <!--                </div>-->
          <!--                <ol>-->
          <!--                  <li class="container_2">-->
          <!--                    <img src="../components/icon/v.png" style="width: 18%;float: left;margin-left: 1%;margin-top: 1%;">-->
          <!--                    <div class="container1-2" style="overflow:hidden;">-->
          <!--                      <h2><b>xxx</b></h2>-->
          <!--                      <div style="overflow-y: scroll;overflow-x: hidden;white-space: pre-line;">-->
          <!--                        <small>xxx</small>-->
          <!--                      </div>-->
          <!--                    </div>-->
          <!--                    <span>-->
          <!--                        <h1 style="color: black;font-size: 40px;margin-top:74px;"><b>5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;￥99</b></h1>-->
          <!--                      <el-button class="service"  @click="showPost(goods.orderId,goods.stmt)">售后处理</el-button>-->
          <!--                      </span>-->
          <!--                    <div class="all" v-show="dialogVisible"></div>-->
          <!--                    <div class="post" v-show="dialogVisible">-->
          <!--                      <div style="height:15%;border-bottom: 1px solid #eee;">-->
          <!--                        <span style="float: left;margin: 2% -15% 3% 3%;font-size: 20px"><b>售后处理</b></span>-->
          <!--                        <img src="../../components/icon/关闭.png" class="iconfont" @click="dialogVisible=!dialogVisible" style="margin-right: 3%;margin-top: 3%">-->
          <!--                      </div>-->
          <!--                      <div>-->
          <!--                        <div style="float:right">-->
          <!--                          <img class="agree" src="../../components/icon/已同意.png" v-if="post.stmt == 2">-->
          <!--                        </div>-->
          <!--                        <el-form label-width="140px" style="position: relative">-->

          <!--                          <el-form-item label="申请人"><span style="float: left">{{post.buyerName}}</span></el-form-item>-->
          <!--                          <el-form-item label="电话"><span style="float: left">{{post.phone}}</span></el-form-item>-->
          <!--                          <el-form-item label="地址"><span style="float: left">{{post.buyerAddress}}</span></el-form-item>-->
          <!--                          <el-form-item label="售后内容"><span style="float: left">{{post.postSaleType}}</span></el-form-item>-->
          <!--                          <el-form-item label="具体原因描述"><span style="float: left">{{post.reasons}}</span></el-form-item>-->
          <!--                          <el-form-item label="图片">-->
          <!--                            <div v-for="(img) in post.images">-->
          <!--                              <img :src="img" style="float: left;width: 130px;height: 100px;;padding-right:10px ">-->
          <!--                            </div>-->
          <!--                          </el-form-item>-->
          <!--                        </el-form>-->
          <!--                        <div class="footer" style="margin-bottom: 2%;" v-if="post.stmt == 1 ">-->
          <!--                          <el-button style="background-color: red;width: 15%" @click="notagree(post)">拒绝</el-button>-->
          <!--                          <el-button style="background-color: #00bf17;width: 15%" @click="agree(post)">同意</el-button>-->
          <!--                        </div>-->
          <!--                      </div>-->
          <!--                    </div>-->
          <!--                  </li>-->
          <!--                </ol>-->
          <!--              </li>-->
          <!--            </ul>-->
          <!--          </div>-->
          <!--        <div class="container2">-->
          <!--          <ul >-->
          <!--            <li class="container_1">-->
          <!--              <div style="background-color:rgb(246, 121, 46);height: 50px;border-bottom: 1px solid black;">-->
          <!--                                            <span style="font-size: 30px;line-height: 50px;float:left;margin-left: 20px">{{order[0].startDate.substring(0,10)+"   "+order[0].startDate.substring(11,16)}}</span>-->
          <!--                <button style="font-size: 20px;line-height: 50px;float:left;margin-left:20px;background-color:transparent;border: none;cursor: pointer;">详细信息</button>-->
          <!--              </div>-->
          <!--              <ol>-->
          <!--                <li class="container_2">-->
          <!--                  <img src="../components/icon/v.png" style="width: 18%;float: left;margin-left: 1%;margin-top: 1%;">-->
          <!--                  <div class="container1-2" style="overflow:hidden;">-->
          <!--                    <h2><b>xxx</b></h2>-->
          <!--                    <div style="overflow-y: scroll;overflow-x: hidden;white-space: pre-line;">-->
          <!--                      <small>xxx</small>-->
          <!--                    </div>-->
          <!--                  </div>-->
          <!--                  <span>-->
          <!--                        <h1 style="color: black;font-size: 40px;margin-top:74px;"><b>5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;￥99</b></h1>-->
          <!--                      </span>-->
          <!--                </li>-->
          <!--              </ol>-->
          <!--            </li>-->
          <!--          </ul>-->
          <!--        </div>-->
          <div v-if="allOrders.length===0">
            <center>
<!--              <img src="../components/icon/pic30.png" style="width:90%;margin-top: 15px">-->
            </center>
            <div style="text-align: center;margin-top:5%">
              <span style="text-align: center">暂无需要处理售后的订单哦</span>
            </div>
          </div>
          <div class="container2" v-else>
            <ul :loading="loadings.table" >
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
              <el-button class="service"  @click="showPost(goods.orderId,goods.stmt)">售后处理</el-button>                    </span>
                    <div class="all" v-show="dialogVisible"></div>
                    <div class="post" v-show="dialogVisible">
                      <div style="height:15%;border-bottom: 1px solid #eee;">
                        <span style="float: left;margin: 2% -15% 3% 3%;font-size: 20px"><b>售后处理</b></span>
                        <img src="../components/icon/关闭.png" class="iconfont" @click="dialogVisible=!dialogVisible" style="margin-right: 3%;margin-top: 3%">
                      </div>
                      <div>
                        <div style="float:right">
                          <img class="agree" src="../components/icon/同意.png" v-if="post.stmt == 2">
                        </div>
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
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style  scoped lang="less">
  #HandsomeWu > * {
    border: 0;
  }
  .grid-content {
    cursor:pointer;
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
  .container2{
    width: 98%;
    margin: auto;
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
    ul {
      display: flex;
      flex-wrap: wrap;//默认不换行
      padding-bottom: 10px;
      padding-inline-start:0;
      /*margin-top: 0;*/
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

  .grid-content {
    border-radius: 8px;
    min-height: 36px;
    /*cursor:pointer;*/
  }
  .container-1{
    margin: auto;
    width: 90%;
    height: 180px;
    background-color: #F88E4E;
    border-radius: 5px;
    .faces{
      height: 60px;
      float: left;
      margin-left: 3%;
      margin-top: 1.5%;
      margin-right: 10px;
      border-radius: 30px;
    }
    .container-1-2{
      padding-top: 9%;
    }
  }


  .firstItems{
    background-color: #FBBF9B;
    .items{
      background-color: #FBBF9B;
      /*background-color: red;*/
      margin-left: 50px;
    }
  }
</style>

<script>

  import {agreePost, getPost, notagreePost, showOrders, showAllOrders} from "../api";

  export default {
    data() {
      return {
        loadings: {
          table: true,
        },
        allOrders:[],
        post:[],
        allOrder:[[]],
        Orders:[],
        dialogVisible:false,
        stmt2: 0,//待处理
        stmt3: 0,//待备货
        stmt4: 0,//待发货
        stmt5: 0,//已发货
        stmt67: 0,//交易完成
        stmt0102: 0,//交易失败
        acount:"",
      }
    },
    mounted() {
      this.init1();
      this.init2();
      console.log(this.$route.query.acount);
      var acount = this.$route.query.acount;
      this.acount = acount;
    },

    methods:{
      init1(){
        showOrders({
          // sellerId:parseInt(sessionStorage.getItem("userId")),
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
      init2(){
        showAllOrders({
          // sellerId:parseInt(sessionStorage.getItem("userId")),
          sellerId:parseInt(sessionStorage.getItem("userId")),
          contentType: "application/json",
        })
          .then((response)=> {
            this.Orders=response.data.data.orderList;
            console.log( this.Orders);
            let Ostmt2 = 0;//待处理
            let Ostmt3 = 0;//待备货
            let Ostmt4 = 0;//待发货
            let Ostmt5 = 0;//已发货
            let Ostmt67 = 0;//交易完成
            let Ostmt0102 = 0//交易失败
            this.Orders.forEach(function (item) {
              if(item.stmt === 2){
                Ostmt2++;
              }else if(item.stmt === 3){
                Ostmt3++;
              }else if(item.stmt === 4){
                Ostmt4++;
              }else if(item.stmt === 5){
                Ostmt5++;
              }else if(item.stmt >=6 && item.stmt <=7 ){
                Ostmt67++;
              }else{
                Ostmt0102++;
              }
            });
            this.stmt2 = Ostmt2;
            this.stmt3 = Ostmt3;
            this.stmt4 = Ostmt4;
            this.stmt5 = Ostmt5;
            this.stmt67 = Ostmt67;
            this.stmt0102 = Ostmt0102;

          })
      },
      toGoodDetail(orderId){
        this.$router.push({name:'GoodDetails',params:{bid:orderId}})
      },


      closeme(){
        // alert(this.showModal2)
        this.showModal=!this.showModal;
        // alert(this.showModal2)
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

      toChangePassword(){
        this.$router.push({name:'ChangePassword',})
      },
      toHistoryGoods(){
        this.$router.push({name:'HistoricalGoods',})
      },
      toReleaseGoods(){
        this.$router.push({name:'ReleaseGoods',})
      },
      toOrders(){
        this.$router.push({name:'StateOne',})
      },
      toBuyers(){
        this.$router.push({name:'CustomerInformation',})
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
      toStateFive(){
        this.$router.push({name:'StateFive',})
      },
      toStateSix(){
        this.$router.push({name:'StateSix',})
      },

    }
  };

</script>
