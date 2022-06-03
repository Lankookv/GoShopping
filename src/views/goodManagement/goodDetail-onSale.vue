<template>
  <div class="container">
    <div class="container1">
      <img :src="good.img[0].imagine" alt="这里是封面">
      <div class="container2">
        <h1 style="float: left;"><b>{{good.good.goodName}}</b></h1>
        <div style="overflow:hidden;width:95%;">
          <div class="info">
            <small v-html="good.good.description"></small>
          </div>
        </div>
        <button class="price" @click="changeprice">修改价格</button>
        <h1 style="color: red;font-size: 40px;margin-right:5%"><b>￥{{good.good.goodPrice}}</b></h1>
        <p style="margin-top: 5%">
          <span style="vertical-align:middle; line-height:50px;float: left;margin-left: 10%;font-size: 30px">
            库存：{{good.good.storage}}
          </span>
        </p>
      </div>
      <div class="container4">
        <span>
          ———宝贝详情———
        </span>
        <div v-for="(img,index) in good.img.slice(1)" style="margin-top: 10px">
          <img :src="img.imagine">
        </div>
      </div>
      <div class="all" v-show="dialogVisible"></div>
      <div class="post" v-show="dialogVisible">
        <div style="height:24%;border-bottom: 1px solid #eee;">
          <span style="float: left;margin: 2% -15% 3% 3%;font-size: 20px"><b>修改价格</b></span>
          <img src="../../components/icon/关闭.png" @click="dialogVisible=!dialogVisible" style="margin-right: 2%;float: right;width: 5%;height: 60%">
        </div>
        <div>
          <input id="text" style="width: 90%;height: 40px;margin-top: 5%;background-color: #f1f1f1"></input>
        </div>
        <button class="change" @click="change">确认</button>
      </div>
    </div>
  </div>
<!--    <div class="container3">-->
<!--      <card></card>-->
<!--    </div>-->

</template>

<script>
  import card from "../../components/card";
  import {showGoodDetail,changePrice} from '../../api';

  export default {
    name: "goodDetail-onSale",
    components: {
      card,
    },
    data() {
      return {
        good:{},
        dialogVisible:false,
      }
    },
    created() {
      this.getGoodDetail();
    },
    mounted() {
      this.getGoodDetail();
    },
    methods:{
      getGoodDetail(){
        showGoodDetail({
          goodId:parseInt(this.$route.params.bid),
          contentType: "application/json"
        }).then((response)=> {
            //alert(JSON.stringify(this.$route.params.bid))
            this.good=response.data.data;
          })
      },
      changeprice(){
        this.dialogVisible = !this.dialogVisible;
      },
      change() {
        if (text.value.length === 0) {
          this.$message.error('您还未填价格');
        }else{
          changePrice({
            goodId: this.good.good.goodId,
            oldPrice: this.good.good.goodPrice,
            newPrice: text.value,
          }).then((response) => {
            this.$message.success('修改成功！');
            this.dialogVisible = !this.dialogVisible;
            this.getGoodDetail();
          })
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
      width: 90%;
      margin:0 5%;
      float: left;
      //border-right: 1px solid #7b7b7b;
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
          float: right;
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
        .price{
          float: right;
          margin-top: 5%;
          width: 25%;
          height: 45px;
          font-size: 20px;
          background-color: #F56E1C;
          border: 1px solid;
          border-radius: 10px;
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
    width: 40%;
    height:200px;
    margin:auto;
    background-color:#fff;
    overflow:auto;
    z-index:100;
  }
  .change{
    color: white;
    background-color: #F88E4E;
    float: right;
    width: 15%;
    height: 36px;
    margin-right: 42%;
    margin-top: 2%;
    border: 1px solid black;
    cursor:Pointer;
    border-radius: 10px;
  }
</style>
