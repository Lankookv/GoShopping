<template>
  <div class="container">
    <div class="container1">
      <img :src="good.img[0].imagine" alt="这里是封面">
      <div class="container2">
        <h1><b>{{good.good.name}}</b></h1>
        <div style="overflow:hidden;width:95%;">
          <div class="info">
            <small v-html="good.good.description"></small>
          </div>
        </div>
        <h1 style="color: red;font-size: 40px"><b>￥{{good.good.price}}</b></h1>
        <button @click="toWriteBuyerInfo">
          需要购买
        </button>
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
    </div>
  </div>
</template>

<script>
  import card from "../components/card";
  import {showGoodDetail} from '../api';

  export default {
    name: "goodDetails",
    components: {
      card
    },
    data() {
      return {
        good:{},
      }
    },
    created() {
      this.getGoodDetail();
    },
    methods:{
      getGoodDetail(){
        showGoodDetail({
          goodId:JSON.stringify(this.$route.params.bid),
          contentType: "application/json"
      })
          .then((response)=> {
            //alert(JSON.stringify(this.$route.params.bid))
            this.good=response.data.data;
          })
      },
      toWriteBuyerInfo(){
        this.$router.push({name:'buyerDetails',params:{bid:this.$route.params.bid}});
      }
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
      .container2 {
        width: 60%;
        height: 85%;
        float:right;
        h1{
          margin-left: 10%;
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
      height: 50px;
      float: right;
      margin-top: 5%;
      margin-right: 15%;
      font-size: 20px;
      background-color: #F56E1C;
      border: 1px solid;
      border-radius: 10px;
    }
    button:hover{
      width: 25%;
      height: 50px;
      float: right;
      margin-top: 5%;
      font-size: 20px;
      margin-right: 15%;
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
