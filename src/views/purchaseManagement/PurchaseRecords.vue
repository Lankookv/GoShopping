<template>
  <div class="container">
    <div class="container0">
      <span class="title">
        <b>历史订单信息</b>
      </span>
    </div>
    <div style="height: 30px;font-size: 20px;">
      <b style="width: 100px;margin-left: 10%">商品名字</b>
      <b style="width: 100px;margin-left: 7%">商品价格</b>
      <b style="width: 100px;margin-left: 6%">商品数量</b>
      <b style="width: 100px;margin-left: 15%">交易时间</b>
    </div>
    <div class="container1">
      <div v-if="purchaseRecords.length===0">
        <center>
          <img src="../../components/icon/pic30.png" style="width:90%;margin-top: 15px">
        </center>
        <div style="text-align: center;">
          <span style="text-align: center">暂无任何商品哦 /(ㄒoㄒ)/~~</span>
        </div>
      </div>
      <ul    :loading="loadings.table" >
        <router-link class="container_1" v-for="(good,index) in purchaseRecords" :to="{name:'GoodDetails',params:{bid:good.goodId}}" @click="showallPurchaseRecords(good.goodId)" :key="index" tag="li">
          <img :src="good.img" style="width: 18%;float: left;margin-left: 1%;transform: scale(0.6);margin-top: -20px">
          <div class="container1-1">
            <div style="width: 30%;float: left">
              <b>{{good.goodName}}</b>
            </div>
            <div style="float: left;width: 25%">
              <b>￥{{good.goodPrice}}</b>
            </div>
            <div style="float: left;width: 10%">
              <b>{{good.number}}</b>
            </div>
          </div>
          <span class="container1-3">
              <h1 style="color: black;font-size: 30px;margin-top:6%;margin-right: 3%;margin-bottom: 0px"><b>{{good.date}}</b></h1>
          </span>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
  import {showallPurchaseRecords} from "../../api";
  export default {
    name: "PurchaseRecords",
    data() {
      return {
        total: 0,
        page: 1,
        showModal:0,
        loadings: {
          table: true,
        },
        No_good:false,
        purchaseRecords:[],
        limit: 2,
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init(){
        showallPurchaseRecords({
          buyerId: 1,
          contentType: "application/json",
        }).then((response)=> {
          console.log(response)
          this.purchaseRecords=response.data.data.historyList;
        })
      },
      showallPurchaseRecords(goodId){
        this.$router.push({name:'goodDetail-onSale',params:{bid:goodId}})
      },
    },
    watch: {
      '$route'(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.init(true)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .container0{
    height:auto;
    min-height:30px;
    overflow: hidden;
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
    .container_1{
      cursor: pointer;
      padding:0px 0px 10px 10px;
      background-color:  #F88E4E;
      border-radius: 10px;
      border: 1px solid black;
      height:165px;
      min-height:100px;
      overflow: hidden;
    }
    .container_1:hover{
      cursor: pointer;
      padding:0px 0px 10px 10px;
      background-color:  #F88E4E;
      border-radius: 10px;
      border: 1px solid #cccccc;
      height:165px;
      min-height:100px;
      overflow: hidden;
    }
    .container1 {
      width: 100%;
      display: inline-block;
      font-size: 30px;
      color: black;
      ul {
        display: flex;
        flex-wrap: wrap;//默认不换行
        padding-bottom: 10px;
        padding-inline-start:0;
        margin-top: 5px;
        li{
          width: 100%;
          margin:1% 4%;
          list-style: none;
          .container1-1 {
            width: 50%;
            float:left;
            margin-left: 1%;
            text-align: left;
            overflow:hidden;
            div{
              height: 50px;
              width: 100%;
              margin:12% 5% 0px 3%;
            }
          }
          .container1-2{
            overflow-y: scroll;
            overflow-x: hidden;
            white-space: pre-line;
            font-size: 250%;
            b{
              margin-left: 45%;
            }
          }
        }
      }
    }
  }

</style>
