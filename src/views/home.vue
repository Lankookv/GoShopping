<template>
  <div style="white-space: nowrap;">
    <div>
      <carousel style="float:left;width: 80%;"></carousel>
      <card2 style="float:right;width: 12%;margin-right: 3%;margin-top: 2%;cursor: pointer;" @click="toPosts"></card2>
      <div class="search">
        <input type="text" class="input-search" v-model="keyword" id="searchTxt" ref="searchTxt" placeholder="bts周边" filterable  value="">
        <img src="../components/icon/搜索.png" class="iconfont" @click="search">
      </div>
      <div style="z-index: auto"><goods-type></goods-type></div>
      <div style="margin-top: -387px;margin-left: 23%;z-index: auto"><banner></banner></div>
      <div v-if="allGoods.length===0">
        <center>
          <img  src="../components/icon/pic30.png" style="margin-top: 15px">
        </center>
        <div style="text-align: center;">
          <span style="text-align: center">暂无任何商品哦 /(ㄒoㄒ)/~~</span>
        </div>
      </div>
      <ul class="goodShow" v-else>
        <router-link v-for="(good,index) in allGoods" :to="{name:'GoodDetails',params:{bid:good.goodId}}" :key="index" tag="li" style="list-style:none;">
          <div class="container1-1" >
            <img :src="good.img">
            <div class="container1-2" style="overflow:hidden;margin-right: 30px;">
              <div :title=good.goodName class="goodName"><h3><b>{{good.goodName}}</b></h3></div>
              <h2 style="margin-top: 0;"><b>￥{{good.goodPrice}}</b></h2>
            </div>
          </div>
        </router-link>
        <!--        <li>-->
        <!--        <div class="container1-1" >-->
        <!--          <img src="../components/icon/1.png">-->
        <!--          <div class="container1-2">-->
        <!--            <h3><b>xxx</b></h3>-->
        <!--            <h2><b>￥{{123}}</b></h2>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        </li>-->
      </ul>
    </div>
  </div>
</template>

<script>
  import carousel from "../components/carousel";
  import card2 from "../components/card2";
  import goodsType from "../components/goodsType";
  import banner from "../components/banner";
  import {showAllGoods,search} from '../api';

  export default {
    name: "home",
    components: {
      carousel,
      card2,
      goodsType,
      banner,
    },
    data() {
      return {
        // allGoods:[{GoodId:1,Price:77.77,Name:"bts周边",img:"https://img2.baidu.com/it/u=2612970998,458336255&fm=26&fmt=auto"},{GoodId:2,Price:1177.77,Name:"ipad",img:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fqny.smzdm.com%2F202104%2F19%2F607d44a9379f99175.png_d250.jpg&refer=http%3A%2F%2Fqny.smzdm.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636251195&t=6a8585aa583f80127279991d23995a53"},{GoodId:3,Price:77.77,Name:"bts周边",img:"https://img2.baidu.com/it/u=2612970998,458336255&fm=26&fmt=auto"},{GoodId:4,Price:1177.77,Name:"ipad",img:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fqny.smzdm.com%2F202104%2F19%2F607d44a9379f99175.png_d250.jpg&refer=http%3A%2F%2Fqny.smzdm.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636251195&t=6a8585aa583f80127279991d23995a53"}],
        allGoods:[],
        keyword:"",
      }
    },
    mounted() {
      this.getAllGoods();
    },
    methods: {
      getAllGoods() {
        showAllGoods()
          .then((response)=> {
            this.allGoods=response.data.data.goodlist;
          })
      },
      search(){
        this.keyword=document.getElementById('searchTxt').value;
        search({
          keyword:this.keyword,
          contentType: "application/json;charset=UTF-8",
        }).then((response)=> {
          this.allGoods=response.data.data.goodlist;
        })
      },
      toPosts(){

      }
    },
  }
</script>

<style scoped lang="less">
  .goodName {
    width: 200px;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
  .search{
    display:flex;
    border: 1px solid #ccc;
    border-radius: 20px;
    width: 400px;
    margin:0 auto;
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
    width: 340px;
    font-size: 14px;
    font-weight: 700;
    font-family: "Microsoft soft";
    padding: 8px 8px;
    margin-left: 10px;
    background-color:transparent;
    outline:none;
  }
  .iconfont {
    align-self:center;
    font-family: "iconfont" !important;
    width: 20px;
    //font-size: 10px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .iconfont:hover{
    cursor:Pointer;
  }
  .goodShow {
    display: flex;
    flex-wrap: wrap; //默认不换行
    li {
      width: 17.3%;
      background-color: #F88E4E;
      border-radius: 10px;
      margin-left: 1%; //2.5%
      margin-right: 1%;
      border: 1px solid #ccc;
      font-size: 14px;
      font-family: "Microsoft soft";
      margin-bottom: 20px;
      img {
        width: 80%;
        height: 150px;
        margin-top: 20px;
      }
      h3 {
        float: left;
        margin-left: 30px;
        margin-right: 30px;
      }
      h2 {
        float: right;
      }
    }
    z-index: 3;
  }
</style>
