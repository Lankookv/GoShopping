<template>
  <div class="container">
    <div class="container0">
      <span class="title">
        <b>查看意向购买人</b>
      </span>
      <div class="search">
        <!--        <Input  v-model="query.keywords"-->
        <!--                @on-enter="filterByKeyword"-->
        <!--                @on-click="filterByKeyword"-->
        <!--                placeholder="BTS专辑"-->
        <!--                class="input-search"/>-->
        <!--        <span slot="append">-->
        <!--          <Button type="primary" style="background-color:transparent;border: none">-->
        <!--            <i class="iconfont" @click.prevent="filterByKeyword">&#xe635;</i>-->
        <!--          </Button>-->
        <!--        </span>-->
      </div>
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
        <li class="container_1" v-for="(good,index) in allGoods" @click="toGoodDetailOnSale(good.goodId)" :key="index">
          <img :src="good.img" style="width: 18%;float: left;margin-left: 1%;margin-top: 1%;">
          <div class="container1-2" style="overflow:hidden;">
            <h2><b>{{good.goodName}}</b></h2>
            <div style="overflow-y: scroll;overflow-x: hidden;white-space: pre-line;">
              <small v-html="good.description"></small>
            </div>
          </div>
          <span class="container1-3">
            <h1 style="color: black;font-size: 40px;margin-top: 4%;margin-right: 3%"><b>￥{{good.goodPrice}}</b></h1>
            <button @click.stop @click="getIntentionListByGoodId(good.goodId)">查看意向购买人</button>
             <ProspectiveBuyersModal @click.stop v-show="showModal" v-on:closeme="closeme" :intentionList="intentionList"></ProspectiveBuyersModal>
          </span>
        </li>
      </ul>
    </div>
    <!--    <Pagination :total="total"-->
    <!--                :page-size.sync="limit"-->
    <!--                :current.sync="query.page"-->
    <!--                @on-change="pushRouter">-->
    <!--    </Pagination>-->
  </div>
</template>

<script>
  import Pagination from '../components/Pagination'
  import {showAllGoodsOfInterestedBuyers, showIntentionListByGoodId} from '../api';
  import ProspectiveBuyersModal from "../views/ProspectiveBuyersModal"

  export default {
    name: "ProspectiveBuyers",
    components: {
      Pagination,
      ProspectiveBuyersModal,
    },
    data() {
      return {
        total: 0,
        page: 1,
        showModal:0,
        loadings: {
          table: true,
        },
        No_good:false,
        // allGoods: [{goodId:1,img: "http://t13.baidu.com/it/u=2612970998,458336255&fm=224&app=112&f=JPEG?w=500&h=500&s=B8362E9A42E746AC8A0DD5F503009029",name:"bts专辑",description:"ncdsjknsjcn",goodPrice:77.77,},],
        allGoods:[],
        intentionList:[],
        limit: 2,
        routeName: '',
        query: {
          keywords: '',
          page: 1,
        },
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init(){
        showAllGoodsOfInterestedBuyers({
          sellerId:parseInt(sessionStorage.getItem("userId")),
          contentType: "application/json",
        })
          .then((response)=> {
            this.allGoods=response.data.data.goodlist;
          })
      },
      toGoodDetailOnSale(goodId){
        this.$router.push({name:'goodDetail-onSale',params:{bid:goodId}})
      },
      getIntentionListByGoodId(goodId){
        this.showModal=!this.showModal;
        showIntentionListByGoodId({
          goodId:JSON.stringify(goodId),
          contentType: "application/json"
        })
          .then((response)=> {
            this.intentionList=response.data.data.intentionList;
          })
      },
      closeme(){
        this.showModal=!this.showModal;
      },
      // init() {
      //   this.routeName = this.$route.name
      //   let query = this.$route.query
      //   this.query.keywords = query.keywords || ''
      //   this.query.page = parseInt(query.page) || 1
      //   if (this.query.page < 1) {
      //     this.query.page = 1
      //   }
      //   this.getAllGoods()
      // },
      // pushRouter() {
      //   this.$router.push(
      //     {name: 'platform_good', query: this.query}
      //   )
      // },
      // sortBy (sort) {
      //   this.query.sort = sort
      //   this.query.page = 1
      //   this.pushRouter()
      // },
      // filterByKeyword () {
      //   this.query.page = 1
      //   this.pushRouter()
      // },
      // getAllGoods() {
      //   let offset = (this.query.page - 1) * this.limit
      //   this.loadings.table = true
      //   api.getPlatform_Goods(offset, this.limit, this.query).then(res => {
      //       // this.loadings.table = false
      //       this.allGoods = res.data.data.results;
      //       this.total=res.data.data.total;
      //       //alert(this.total);
      //       if(this.total==0)
      //       {
      //         this.No_good=true;
      //       }
      //       else
      //       {
      //         this.No_good=false;
      //       }
      //     },
      //     res => {
      //       this.loadings.table = false
      //     })
      // },
      // onReset () {
      //   this.$router.push({name: 'platform_good'})
      //   parent.location.reload();
      // },
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
  @font-face {
    font-family: 'iconfont';  /* Project id 2810508 */
    src: url('//at.alicdn.com/t/font_2810508_kqxwrf1giz.woff2?t=1631580008886') format('woff2'),
    url('//at.alicdn.com/t/font_2810508_kqxwrf1giz.woff?t=1631580008886') format('woff'),
    url('//at.alicdn.com/t/font_2810508_kqxwrf1giz.ttf?t=1631580008886') format('truetype');
  }
  .iconfont {
    font-family: "iconfont" !important;
    font-size: 20px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-right: 10px;
  }
  .iconfont:hover{
    cursor:Pointer;
  }
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
      cursor: pointer;
      padding:0px 0px 10px 10px;
      background-color:  #F88E4E;
      border-radius: 10px;
      border: 1px solid black;
      height:auto;
      min-height:200px;
      overflow: hidden;
      button{
        width: 18%;
        height: 50px;
        float: right;
        margin-top: 1%;
        margin-right: 4%;
        font-size: 20px;
        background-color: #F56E1C;
        border: 1px solid black;
        border-radius: 10px;
      }
      button:hover{
        width: 18%;
        height: 50px;
        float: right;
        margin-top: 1%;
        margin-right: 4%;
        font-size: 20px;
        background-color: #F56E1C;
        border: 1px solid #cccccc;
        border-radius: 10px;
        cursor: pointer;
      }
    }
    .container_1:hover{
      cursor: default;
      padding:0px 0px 10px 10px;
      background-color:  #F88E4E;
      border-radius: 10px;
      border: 1px solid #cccccc;
      height:auto;
      min-height:200px;
      overflow: hidden;
    }
    .container1 {
      width: 100%;
      display: inline-block;
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
          .container1-2 {
            width: 55%;
            float:left;
            margin-left: 1%;
            text-align: left;
            h2{
              margin-bottom: 1%;
              margin-top: 2%;
              margin-left: 4%;
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
