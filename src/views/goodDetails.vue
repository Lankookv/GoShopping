<template>
  <div class="container">
    <div class="container1">

<!--      <img src="../components/icon/1.png" alt="这里是封面">-->
<!--      <div class="container2">-->
<!--        <h1><b>bts专辑</b></h1>-->
<!--        <div style="overflow:hidden;width:95%;">-->
<!--          <div class="info">-->
<!--            <small>防弹少年团（BTS）是BigHit Entertainment于2013年6月13日推出的韩国男子演唱组合，由金南俊、金硕珍、闵玧其、郑号锡、朴智旻、金泰亨、田柾国7位成员组成。<br>2013年6月，发行首张单曲专辑《2 COOL 4 SKOOL》 [1]  ，并在Mnet音乐节目《M! Countdown》中正式出道 [2]  ；同年，推出首张迷你专辑《O!RUL8,2?》 [3]  ，获得第5届Melon音乐盛典最佳新人奖 [4]  。2014年6月，推出首张日文单曲辑《NO MORE DREAM -Japanese Ver.-》，在日本正式出道 [5]  ；8月，推出首张正规专辑《DARK & WILD》 [6]  。2015年4月，凭借歌曲《I NEED U》获得了出道后首个韩国音乐节目的一位 [7]  ；同年，获得了第22届MTV欧洲音乐大奖最佳韩国艺人奖 [8]  。2016年10月，发行第二张正规专辑《WINGS》 [9]  。2017年9月，发行第三张迷你专辑《LOVE YOURSELF 承 'Her'》 [10]  ；11月，获得了“全世界在推特被提及次数最多的音乐组合”吉尼斯世界纪录的认证 [11]  。2018年5月，推出第三张正规专辑《LOVE YOURSELF 转 'Tear'》 [12]  ；同月，受邀出席美国第25届公告牌音乐奖典礼并获得“最佳社交艺人”奖 [13]  。2019福布斯100名人榜排名第43位 [14]  。<br>2019年11月3日，MTVEMA获奖名单揭晓，BTS防弹少年团获最佳现场和最强粉丝团奖项。 [15]</small>-->
<!--          </div>-->
<!--        </div>-->
<!--        <h1 style="color: red;font-size: 40px"><b>￥150</b></h1>-->
<!--        <button>-->
<!--          需要购买-->
<!--        </button>-->
<!--      </div>-->
<!--      <div class="container4">-->
<!--        <span>-->
<!--          ———宝贝详情———-->
<!--        </span>-->
<!--        <div style="margin-top: 10px">-->
<!--          <img src="../components/icon/ipad1.png">-->
<!--          <img src="../components/icon/ipad2.png">-->
<!--        </div>-->
<!--      </div>-->

      <img :src="good.img" alt="这里是封面">
      <div class="container2">
        <h1><b>{{good.good.name}}</b></h1>
        <div style="overflow:hidden;width:95%;">
          <div class="info">
            <small>{{good.good.description}}</small>
          </div>
        </div>
        <h1 style="color: red;font-size: 40px"><b>￥{{good.good.price}}</b></h1>
        <button>
          需要购买
        </button>
      </div>
      <div class="container4">
        <span>
          ———宝贝详情———
        </span>
        <div v-for="(img,index) in good.img" style="margin-top: 10px">
          <img :src="img">
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
        }
        .info{
          width:98.7%;
          margin-left: 5%;
          height: 200px;
          overflow-y: scroll;
          overflow-x: hidden;
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
      margin-top: 6%;
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
      margin-top: 6%;
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
