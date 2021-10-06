<template>
  <div class="container">
    <div class="container0">
      <span class="title">
      <b>查看历史商品</b>
    </span>
      <div >
        <Input  v-model="query.keywords"
                @on-enter="filterByKeyword"
                @on-click="filterByKeyword"
                placeholder="BTS周边"
                class="search"
                icon="ios-search-strong"/>
      </div>
      <select >
        <option value="" disabled selected hidden>分类</option>
        <option value ="soldOut">已售空</option>
        <option value ="onSale">在售</option>
        <option value="frozen">冻结</option>
      </select>
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
<!--      <div v-else-if="allGoods.length==0&&No_good==true">-->
<!--      <div >-->
<!--        <center>-->
<!--          <img  src="../components/icon/pic30.png" style="width:90%;margin-top: 15px">-->
<!--        </center>-->
<!--        <div style="text-align: center;">-->
<!--          <span style="text-align: center">没有搜索到任何商品哦 /(ㄒoㄒ)/~~</span>-->
<!--        </div>-->
<!--      </div>-->
      <ul    :loading="loadings.table" >
<!--        <router-link class="container_1" v-for="(good,index) in allGoods" :to="{name:'HistoricalGoodsDetail',params:{bid:good.goodId}}" :key="index" tag="li" >-->
<!--          <div class="container1-1" >-->
<!--            <img :src="good.goodCover">-->
<!--            <div class="container1-2">-->
<!--              <h3><b>{{good.goodName}}</b></h3>-->
<!--              <div style="overflow-y: scroll;">-->
<!--                <small>{{good.goodDescription}}</small>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="container1-3">-->
<!--              <h1 style="color: red;font-size: 40px"><b>￥150</b></h1>-->
<!--            </div>-->
<!--          </div>-->
<!--        </router-link>-->
        <router-link class="container_1" v-for="(good,index) in allGoods" :to="{name:'HistoricalGoodsDetail',params:{bid:good.goodId}}" :key="index" tag="li" >
            <img :src="good.goodCover" style="width: 200px;margin-left: 1%;margin-top: 1%">
            <div class="container1-2" style="overflow:hidden;">
              <h2><b>{{good.goodName}}</b></h2>
              <div style="overflow-y: scroll;overflow-x: hidden;white-space: pre-line;">
                <small>{{good.goodDescription}}</small>
              </div>
            </div>
            <span class="container1-3">
<!--              <img src="../components/icon/冻结.png" style="width: 15%;float: right">-->
              <img src="../components/icon/已卖出.png" style="width: 9%;float: right">
              <h1 style="color: black;font-size: 40px;margin-top: 80px;margin-right: 4%"><b>￥150</b></h1>
            </span>
        </router-link>
      </ul>
    </div>
    <Pagination :total="total"
                :page-size.sync="limit"
                :current.sync="query.page"
                @on-change="pushRouter"
    ></Pagination>
  </div>
</template>

<script>
  //import api from '../api'
  import Pagination from '../components/Pagination'

  export default {
    name: "platform_good",
    components: {
      Pagination
    },
    data() {
      return {
        total: 0,
        page: 1,
        loadings: {
          table: true,
        },
        No_good:false,
        allGoods: [{goodId:1,goodCover:"https://img2.baidu.com/it/u=2612970998,458336255&fm=26&fmt=auto",goodName:"BTS专辑",goodDescription:"防弹少年团（BTS）是BigHit Entertainment于2013年6月13日推出的韩国男子演唱组合，由金南俊、金硕珍、闵玧其、郑号锡、朴智旻、金泰亨、田柾国7位成员组成。\n2013年6月，发行首张单曲专辑《2 COOL 4 SKOOL》 [1]  ，并在Mnet音乐节目《M! Countdown》中正式出道 [2]  ；同年，推出首张迷你专辑《O!RUL8,2?》 [3]  ，获得第5届Melon音乐盛典最佳新人奖 [4]  。2014年6月，推出首张日文单曲辑《NO MORE DREAM -Japanese Ver.-》，在日本正式出道 [5]  ；8月，推出首张正规专辑《DARK & WILD》 [6]  。2015年4月，凭借歌曲《I NEED U》获得了出道后首个韩国音乐节目的一位 [7]  ；同年，获得了第22届MTV欧洲音乐大奖最佳韩国艺人奖 [8]  。2016年10月，发行第二张正规专辑《WINGS》 [9]  。2017年9月，发行第三张迷你专辑《LOVE YOURSELF 承 'Her'》 [10]  ；11月，获得了“全世界在推特被提及次数最多的音乐组合”吉尼斯世界纪录的认证 [11]  。2018年5月，推出第三张正规专辑《LOVE YOURSELF 转 'Tear'》 [12]  ；同月，受邀出席美国第25届公告牌音乐奖典礼并获得“最佳社交艺人”奖 [13]  。2019福布斯100名人榜排名第43位 [14]  。\n2019年11月3日，MTVEMA获奖名单揭晓，BTS防弹少年团获最佳现场和最强粉丝团奖项。 [15]",},{goodId:2,goodCover:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fqny.smzdm.com%2F202104%2F19%2F607d44a9379f99175.png_d250.jpg&refer=http%3A%2F%2Fqny.smzdm.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635507201&t=6930bef51f77c6a9b8b77c384e88834e",goodName:"ipad",goodDescription:"10.2 英寸\n采用原彩显示技术的视网膜显示屏\nA13 仿生芯片\n拥有神经网络引擎\n兼容：\nApple Pencil (第一代)\n智能键盘",},{goodId:3,goodCover:"https://img2.baidu.com/it/u=2612970998,458336255&fm=26&fmt=auto",goodName:"BTS专辑",goodDescription:"防弹少年团（BTS）是BigHit Entertainment于2013年6月13日推出的韩国男子演唱组合，由金南俊、金硕珍、闵玧其、郑号锡、朴智旻、金泰亨、田柾国7位成员组成。\n2013年6月，发行首张单曲专辑《2 COOL 4 SKOOL》 [1]  ，并在Mnet音乐节目《M! Countdown》中正式出道 [2]  ；同年，推出首张迷你专辑《O!RUL8,2?》 [3]  ，获得第5届Melon音乐盛典最佳新人奖 [4]  。2014年6月，推出首张日文单曲辑《NO MORE DREAM -Japanese Ver.-》，在日本正式出道 [5]  ；8月，推出首张正规专辑《DARK & WILD》 [6]  。2015年4月，凭借歌曲《I NEED U》获得了出道后首个韩国音乐节目的一位 [7]  ；同年，获得了第22届MTV欧洲音乐大奖最佳韩国艺人奖 [8]  。2016年10月，发行第二张正规专辑《WINGS》 [9]  。2017年9月，发行第三张迷你专辑《LOVE YOURSELF 承 'Her'》 [10]  ；11月，获得了“全世界在推特被提及次数最多的音乐组合”吉尼斯世界纪录的认证 [11]  。2018年5月，推出第三张正规专辑《LOVE YOURSELF 转 'Tear'》 [12]  ；同月，受邀出席美国第25届公告牌音乐奖典礼并获得“最佳社交艺人”奖 [13]  。2019福布斯100名人榜排名第43位 [14]  。\n2019年11月3日，MTVEMA获奖名单揭晓，BTS防弹少年团获最佳现场和最强粉丝团奖项。 [15]",}],
        goods: [],
        limit: 2,
        routeName: '',
        query: {
          keywords: '',
          page: 1,
        }
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.routeName = this.$route.name
        let query = this.$route.query
        this.query.keywords = query.keywords || ''
        this.query.page = parseInt(query.page) || 1
        if (this.query.page < 1) {
          this.query.page = 1
        }
        this.getAllGoods()
      },
      pushRouter() {
        this.$router.push(
          {name: 'platform_good', query: this.query}
        )
      },
      sortBy (sort) {
        this.query.sort = sort
        this.query.page = 1
        this.pushRouter()
      },
      filterByKeyword () {
        this.query.page = 1
        this.pushRouter()
      },
      getAllGoods() {
        let offset = (this.query.page - 1) * this.limit
        this.loadings.table = true
        api.getPlatform_Goods(offset, this.limit, this.query).then(res => {
            // this.loadings.table = false
            this.allGoods = res.data.data.results;
            this.total=res.data.data.total;
            //alert(this.total);
            if(this.total==0)
            {
              this.No_good=true;
            }
            else
            {
              this.No_good=false;
            }
          },
          res => {
            this.loadings.table = false
          })
      },
      onReset () {
        this.$router.push({name: 'platform_good'})
        parent.location.reload();
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
  .btn1 {
    box-shadow: 2px 2px 2px #aaaaaa;
    width: 170px;
    height: 50px;
    border: none;
    border-radius: 10px;
    background-color: #84C1FF;
    text-align: center;
    color: #ffffff;
    font-size: 15px;
    letter-spacing: 2px;
    margin-top: 10px; /*外边框的距离*/
    margin-right: 20px; /*外边框的距离*/
    margin-bottom: 20px; /*外边框的距离*/
    margin-left: 20px; /*外边框的距离*/
  }
  .btn2:hover {
    box-shadow: 5px 5px 5px #aaaaaa;
    cursor:pointer;
    width: 170px;
    height: 50px;
    border: none;
    border-radius: 10px;
    background-color: #ffffff;
    text-align: center;
    color: #2894FF;
    font-size: 15px;
    letter-spacing: 2px;
    margin-top: 10px; /*外边框的距离*/
    margin-right: 20px; /*外边框的距离*/
    margin-bottom: 20px; /*外边框的距离*/
    margin-left: 20px; /*外边框的距离*/
    border: 1px solid #2894FF;
  }
  .btn2 {
    box-shadow: 2px 2px 2px #aaaaaa;
    width: 170px;
    height: 50px;
    border: none;
    border-radius: 10px;
    background-color: #ffffff;
    text-align: center;
    color: #999999;
    font-size: 15px;
    letter-spacing: 2px;
    margin-top: 10px; /*外边框的距离*/
    margin-right: 20px; /*外边框的距离*/
    margin-bottom: 20px; /*外边框的距离*/
    margin-left: 20px; /*外边框的距离*/
  }
  .good_title{
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all; /* 追加这一行代码 */
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
    select{
      float: right;
      width: 6%;
      height: 36px;
      margin-top: 1.35%;
      background-color: #F56E1C;
      border: 1px solid black ;
    }
    select:hover{
      float: right;
      width: 6%;
      height: 36px;
      margin-top: 1.35%;
      background-color: #F56E1C;
      border: 1px solid #cccccc ;
      cursor:Pointer;
    }
    .search{
      width: 30%;
      float: right;
      margin-top: 1.5%;
      margin-right: 2%;
      border: 1px solid #ccc;
      border-radius: 20px;
      padding: 8px 8px;
      margin-left: 10px;
    }
    .container_1{
      cursor: pointer;
      padding:0px 0px 10px 10px;
      background-color:  #F56E1C;
      border-radius: 10px;
      border: 1px solid black;
      height:auto;
      min-height:200px;
      overflow: hidden;
    }
    .container_1:hover{
      cursor: pointer;
      padding:0px 0px 10px 10px;
      background-color:  #F56E1C;
      border-radius: 10px;
      border: 1px solid #cccccc;
      height:auto;
      min-height:200px;
      overflow: hidden;
    }
    .container1 {
      border-radius: 5px;
      width: 100%;
      ul {
        display: flex;
        flex-wrap: wrap;//默认不换行
        padding-bottom: 10px;
        li{
          width: 100%;
          margin:1% 4%;
          list-style: none;
          img{
            width: 30%;
            float: left;
            margin:auto;
          }
          .container1-2 {
            width: 60%;
            float:left;
            margin-left: 2%;
            text-align: left;
            h2{
              margin-bottom: 1%;
              margin-top: 2%;
              margin-left: 5%;
            }
            p{
              margin-left: 3%;
              color: darkgray;
            }
            div{
              height: 140px;
              width: 100%;
              margin:1% 5% 0px 3%;
            }
          }
        }
      }
    }
  }
  .pic2 {
    width: 50px;
    height: 270px;
    cursor: pointer;
  }

</style>
