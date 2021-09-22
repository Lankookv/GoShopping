<template>
  <div class="container">
    <div class="container1">
      <img src="../components/icon/1.png" alt="这里是封面">
      <div class="container2">
        <h1><b>bts专辑</b></h1>
        <div style="overflow-y: scroll" class="Cinfo">
          <small>防弹少年团（BTS）是BigHit Entertainment于2013年6月13日推出的韩国男子演唱组合，由金南俊、金硕珍、闵玧其、郑号锡、朴智旻、金泰亨、田柾国7位成员组成。<br>2013年6月，发行首张单曲专辑《2 COOL 4 SKOOL》 [1]  ，并在Mnet音乐节目《M! Countdown》中正式出道 [2]  ；同年，推出首张迷你专辑《O!RUL8,2?》 [3]  ，获得第5届Melon音乐盛典最佳新人奖 [4]  。2014年6月，推出首张日文单曲辑《NO MORE DREAM -Japanese Ver.-》，在日本正式出道 [5]  ；8月，推出首张正规专辑《DARK & WILD》 [6]  。2015年4月，凭借歌曲《I NEED U》获得了出道后首个韩国音乐节目的一位 [7]  ；同年，获得了第22届MTV欧洲音乐大奖最佳韩国艺人奖 [8]  。2016年10月，发行第二张正规专辑《WINGS》 [9]  。2017年9月，发行第三张迷你专辑《LOVE YOURSELF 承 'Her'》 [10]  ；11月，获得了“全世界在推特被提及次数最多的音乐组合”吉尼斯世界纪录的认证 [11]  。2018年5月，推出第三张正规专辑《LOVE YOURSELF 转 'Tear'》 [12]  ；同月，受邀出席美国第25届公告牌音乐奖典礼并获得“最佳社交艺人”奖 [13]  。2019福布斯100名人榜排名第43位 [14]  。<br>2019年11月3日，MTVEMA获奖名单揭晓，BTS防弹少年团获最佳现场和最强粉丝团奖项。 [15]<br>2020年 [16]  10月，BTS在获奖感言中提及朝鲜战争，表示“会永远铭记两国（韩美）共同经历的苦难历史”。因而引发中国网友和粉丝不满； [17-18]  10月12日，外交部发言人赵立坚回应</small>
        </div>
      </div>
<!--      <h1 class="container3"><b>￥150</b></h1>-->
    </div>
<!--    <h1 class="container3"><b>￥150</b></h1>-->
    <button>
      需要购买
    </button>
  </div>
</template>

<script>
  export default {
    name: "goodDetails",
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
      height:250px;
      width: 75%;
      margin:0 2%;
      img{
        width: 300px;
        height: 300px;
        float: left;
        margin:auto;
      }
      .container2 {
        width: 60%;
        height: 85%;
        float:right;
        h1{
          margin-left: 5%;
          margin-bottom: 2%;
          float: left;
        }
        div{
          width:95%;
          height: 75%;
        }
      }
      .container3{
        //float: right;
        width: 10%;
        float: left;
      }
    }
    button{
      width: 15%;
      height: 40px;
      margin-top: 1%;
      font-size: 20px;
      background-color: #F56E1C;
      border: 1px solid;
      border-radius: 10px;
    }
    button:hover{
      width: 15%;
      height: 40px;
      margin-top: 1%;
      font-size: 20px;
      background-color: #F56E1C;
      border: 1px solid #cccccc;
      border-radius: 10px;
    }
  }
</style>
