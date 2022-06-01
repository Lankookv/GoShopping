<template>
  <div class="container">
    <div class="container1">
      <!--            {{a}}-->
      <img :src="good.img[0].imagine" alt="这里是封面">
      <div class="container2">
        <h1 class="goodName"><b>{{good.good.goodName}}</b></h1>
        <div class="like">
          <span class="iconfont" >
              <div @click="Collect(good.good.goodId)">
                <img src="../components/icon/未收藏.png" v-if = "collectionState == 0" >
                <img src="../components/icon/收藏.png" v-if = "collectionState == 1" >
              </div>
          </span>
        </div>
        <div style="overflow:hidden;width:95%;">
          <div class="info">
            <small v-html="good.good.description"></small>
          </div>
          <span style="vertical-align:middle; line-height:50px;float: right;margin-right: 50px;margin-top: 0.5%">
                        库存：{{good.good.storage}}
          </span>
        </div>
        <h1 class="goodPrice" style="color: red;font-size: 40px"><b>￥{{good.good.goodPrice}}</b></h1>
        <div>
          <span>
            <button  @click="addToCart()" v-if = "storage == 1">加入购物车</button>
            <addToCartInformation v-show="showModal1" v-on:closeme="closeme1" :goodId="good.good.goodId" style="z-index: 999;"></addToCartInformation>
            <button @click="tips()" v-if = "storage == 0" style="background-color: #aaaaaa">
            加入购物车
            </button>
         </span>
          <span>
            <button  @click="toBuy()" v-if = "storage == 1">立即购买</button>
            <purchaseInformation v-show="showModal2" v-on:closeme="closeme2" :goodId="good.good.goodId" style="z-index: 999;"></purchaseInformation>
            <button @click="tips()" v-if = "storage == 0" style="background-color: #aaaaaa">立即购买</button>
          </span>
        </div>
      </div>
      <div class="container4">
        <span>
          ———宝贝详情———
        </span>
        <div v-for="(img,index) in good.img.slice(1)" style="margin-top: 10px">
          <img :src="img.imagine">
        </div>
      </div>
    </div>
    <div class="container3">
      <card></card>
      <button style="width: 85%;margin-top: 20%;" @click="showModal3=!showModal3;">查看历史价格</button>
    </div>
    <showPricesModal v-show="showModal3" v-on:closeme="closeme3" :goodId="good.good.goodId"></showPricesModal>
  </div>
</template>

<script>
  import card from "../components/card";
  import {showGoodDetail, showCollectionState,collectGoods} from '../api';
  import addToCartInformation from "../components/addToCartInformationModal";
  import purchaseInformation from "../components/purchaseInformationModal";
  import showPricesModal from "../components/showPricesModal";

  export default {
    name: "goodDetails",
    components: {
      card,
      addToCartInformation,
      purchaseInformation,
      showPricesModal
    },
    data() {
      return {
        good:{},
        collectionState:0,
        b:{},
        isCollected:false,
        showModal1:false,
        showModal2:false,
        storage:0,
        showModal3:false,
      }
    },
    created() {
      this.getGoodDetail();
      this.getCollectionState();
    },
    methods:{
      getGoodDetail(){
        showGoodDetail({
          goodId:this.$route.params.bid,
          contentType: "application/json"
        })
          .then((response)=> {
            this.good=response.data.data;
            this.a = response;
            if(this.good.good.storage === 0){
              this.storage = 0;
            }else{
              this.storage = 1;
            }
          })
      },

      getCollectionState(){//获取收藏状态
        // alert(this.$route.params.bid);
        showCollectionState({
          buyerId:parseInt(sessionStorage.getItem("buyerId")),
          goodId:this.goodId,
        }).then((response)=> {
          // this.a = response.data;
          if(response.data.data == true){
            this.collectionState = 1;//显示收藏
            // alert("初始显示已收藏该商品"+this.collectionState);
          }else{
            this.collectionState = 0;//显示未收藏
            // alert("初始显示未收藏该商品"+this.collectionState);
          }
        })
      },

      Collect(goodsId){
        if(sessionStorage.getItem("buyerId") == null){
          this.$message.error("请先登录");
        }else{
          if(this.collectionState == 1){
            alert(this.collectionState+"您已收藏该商品");
          }else{
            collectGoods({
              buyerId:parseInt(sessionStorage.getItem("buyerId")),
              goodId:parseInt(goodsId),
              contentType: "application/json"
            }).then((response)=> {
              // alert(response.data.data);
              if(response.data.data == "successful"){
                this.b = response.data.data;
                console.log(this.b);
                this.$message.success('收藏成功！');
                this.collectionState = 1;
              }else{
                // this.a = response.data.code;
                this.$message.error('收藏失败！');
                this.collectionState = 0;
              }
            })
          }
        }
      },

      addToCart(){
        if(sessionStorage.getItem("buyerId") == null){
          this.$message.error("请先登录");
        }else{
          this.showModal1=!this.showModal1;
        }

      },

      toBuy(){if(sessionStorage.getItem("buyerId") == null){
        this.$message.error("请先登录");
      }else {
        // alert(this.showModal2)
        this.showModal2 = !this.showModal2;
        // alert(this.showModal2)
      }
      },

      tips(){
        this.$message("宝贝没有库存了哦")
      },

      closeme1(){
        this.showModal1=!this.showModal1;
      },

      closeme2(){
        this.showModal2=!this.showModal2;
      },

      closeme3(){
        this.showModal3=!this.showModal3;
      },

    }
  }
</script>

<style scoped lang="less">
  .container {
    width: 90%;
    padding: 20px 2px 5px 5%; //上右下左
    margin: 0 auto;
    float: left;
    font-size: 15px;
    .container1{
      height:90%;
      width: 78%;
      margin:0 2%;
      float: left;
      border-right: 1px solid #7b7b7b;
      img{
        width: 40%;
        height: 100%;
        float: left;
        margin-top: 2%;
      }
      span{
        img{
          width: 6%;
          margin-left: 20%;
          margin-top: 4%;
          cursor:pointer;
        }
      }
      .container2 {
        width: 60%;
        height: 85%;
        float:right;
        .goodName{
          margin-left: 10%;
          margin-bottom: 2%;
          float: left;
          display: inline;
          margin-top: 4%;
        }
        .goodPrice{
          margin-left: 5%;
          margin-bottom: 2%;
          float: left;
          display: inline;
          margin-top: 4%;
        }
        .info{
          width:98.7%;
          margin-left: 5%;
          height: 200px;
          overflow-y: scroll;
          overflow-x: hidden;
          text-align:left;
        }
      }
      .container4{
        width: 99%;
        height: auto;
        min-height:100px;
        overflow: hidden;
        margin-top: 45%;
        margin-right: 1%;
        background-color: white;
        border-radius: 10px;
        span{
          width: 100%;
          font-size: 20px;
          color: #7b7b7b;
        }
        img{
          width: 100%;
          margin-top: 0px;
        }
      }
    }
    button{
      width: 25%;
      height: 45px;
      float: left;
      margin-left: 7%;
      margin-top: 5%;
      font-size: 20px;
      background-color: #F56E1C;
      border: 1px solid;
      border-radius: 10px;
    }
    button:hover{
      width: 25%;
      height: 45px;
      float: left;
      font-size: 20px;
      /*margin-right: 15%;*/
      background-color: #F56E1C;
      border: 1px solid #cccccc;
      border-radius: 10px;
    }
    .container3{
      width: 17%;
      float: right;
      margin-top: 20px;/*外边框的距离*/
      margin-bottom: 20px;/*外边框的距离*/
      .pic{
        width:100%
      }
      .nameq{
        font-size:15px;
      }
    }
  }
</style>
