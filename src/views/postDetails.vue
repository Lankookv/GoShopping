<template>
  <div class="container">
    <div class="container1">
      <div class="banner">
        <div>
          <img src="../components/icon/左滑.png" class="left" @click="pre()" >
        </div>
        <img :src="imgArr[index].imagine" id="pic1">
        <div>
          <img src="../components/icon/右滑.png" class="right" @click="next()">
        </div>
      </div>
      <div class="container2">
        <h1 class="goodName"><b>{{good.name}}</b></h1>
        <div style="overflow:hidden;width:95%;">
          <div class="info">
            <small v-html="good.description"></small>
          </div>
        </div>
        <div>
          <h2 style="text-align: right;margin-top:12%;margin-right: 10%;color:#696969">{{good.postDate.substring(0,10)+"    "+good.postDate.substring(11,16)}}</h2>
        </div>
      </div>
      <div class="container4">
        ————————————————————————————————————————————————————————————————————
        <div>
          <h2>关联链接</h2>
        </div>
        <ul class="goodShow">
          <router-link v-for="(good,index) in allGoods" :to="{name:'GoodDetails',params:{bid:good.good.goodId}}" :key="index" tag="li" style="list-style:none;">
            <div class="container1-1" >
              <img :src="good.img[0].imagine" class="img" style="height: 120px;">
              <div class="container1-2" style="overflow:hidden;margin-right: 30px;">
                <div :title=good.good.goodName class="goodName"><h3><b>{{good.good.goodName}}</b></h3></div>
                <h2 style="margin-top: 0;"><b>￥{{good.good.goodPrice}}</b></h2>
              </div>
            </div>
          </router-link>
        </ul>
      </div>
    </div>
    <div class="container3">
      <card></card>
    </div>
  </div>
</template>

<script>
  import card from "../components/card";
  import {getPostDetail} from '../api';
  export default {
    name: "postDetails",
    components: {
      card,
    },
    data() {
      return {
        good:{},
        isCollected:false,
        storage:0,
        allGoods:[],
        imgArr: [],//存图片
        index: 0,
      }
    },
    created() {
      this.init();
    },
    methods:{
      init(){
        getPostDetail({
          forumId:this.$route.params.pid,
          contentType: "application/json"
        })
          .then((response)=> {
            this.good=response.data.data;
            this.imgArr=this.good.img;
            this.allGoods = this.good.goodList;
          })
      },
      pre(){
        if(this.index>0){
          this.index--;
        }
        else if(this.index==0){
          this.index=this.imgArr.length-1;
        }
      },
      next(){
        if(this.index<this.imgArr.length-1){
          this.index++;
        }
        else if(this.index==this.imgArr.length-1){
          this.index=0;
        }
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
      #pic1{
        width: 35%;
        float: left;
        margin-top: 4%;
        height:300px;
      }
      .container2 {
        width: 60%;
        height: 85%;
        float:right;
        .goodName{
          margin-left: 5%;
          margin-bottom: 2%;
          float: left;
          display: inline;
          margin-top: 5%;
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
        margin-top: 30%;
        margin-right: 1%;
        border-radius: 10px;
        span{
          width: 100%;
          font-size: 20px;
          color: #7b7b7b;
        }
      }
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
  .left{
    position: absolute;
    background-color: white;
    width:40px ;
    left: 8.1%;
    top: 45%;
    cursor: pointer;
  }
  .right{
    position: absolute;
    background-color: white;
    width:40px ;
    left: 34%;
    top: 45%;
    cursor: pointer;
  }
  /*#left{*/
  /*  z-index: 1;*/
  /*  position: absolute;*/
  /*  left: 130px;*/
  /*  bottom: 430px;*/
  /*  width: 40px;*/
  /*  height: 400px;*/
  /*  cursor: pointer;*/
  /*  background-color: white;*/
  /*}*/
  /*#right{*/
  /*  z-index: 1;*/
  /*  position: absolute;*/
  /*  right: 920px;*/
  /*  bottom: 430px;*/
  /*  width: 40px;*/
  /*  height: 40px;*/
  /*  cursor: pointer;*/
  /*  background-color: white;*/
  /*}*/
  .goodShow {
    display: flex;
    flex-wrap: wrap; //默认不换行
    padding-left: 0;
    li {
      width: 23%;
      background-color: #F88E4E;
      border-radius: 10px;
      margin-left: 2%; //2.5%
      margin-right: 1%;
      border: 1px solid #ccc;
      font-size: 14px;
      font-family: "Microsoft soft";
      margin-bottom: 20px;
      h3 {
        float: left;
        margin-left: 20px;
      }
      h2 {
        float: right;
        margin-right: 20px;
      }
      .img{
        width: 75%;
        margin-top: 10%;
      }
    }
    z-index: 3;
  }
</style>
