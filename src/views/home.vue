<template>
  <div style="white-space: nowrap;">
    <carousel></carousel>
    <search></search>
<!--    <div class="container1-1">-->
<!--      <router-link :to="{name:'GoodDetails',params:{bid:1}}">-->
<!--        <img src="../components/icon/1.png">-->
<!--        <div class="container1-2" >-->
<!--          <h3><b>bts周边</b></h3>-->
<!--          <h2><b>￥150</b></h2>-->
<!--        </div>-->
<!--      </router-link>-->
<!--    </div>-->
    <ul>
      <router-link v-for="(good,index) in allGoods" :to="{name:'GoodDetails',params:{bid:good.goodId}}" :key="index" tag="li" style="list-style:none;">
        <div class="container1-1" >
          <img :src="good.img">
          <div class="container1-2">
            <h3><b>{{good.name}}</b></h3>
            <h2><b>￥{{good.price}}</b></h2>
          </div>
        </div>
      </router-link>
    </ul>
<!--    <router-link v-for="(good,index) in allGoods" :to="{name:'GoodDetails',params:{cid:good.GoodId}}" :key="index" tag="li" >-->
<!--      <div class="container1-1" >-->
<!--        <img :src="good.goodimg">-->
<!--        <div class="container1-2">-->
<!--          <h3><b>{{good.goodName}}</b></h3>-->
<!--          <h2><b>{{good.goodPrice}}</b></h2>-->
<!--        </div>-->

<!--      </div>-->
<!--    </router-link>-->
  </div>
</template>

<script>
  import carousel from "../components/carousel";
  import search from "../components/search";
  import {showAllGoods} from '../api';

  export default {
    name: "home",
    components: {
      carousel,
      search
    },
    data() {
      return {
        // allGoods:[{GoodId:1,Price:77.77,Name:"bts周边",img:"https://img2.baidu.com/it/u=2612970998,458336255&fm=26&fmt=auto"},{GoodId:2,Price:1177.77,Name:"ipad",img:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fqny.smzdm.com%2F202104%2F19%2F607d44a9379f99175.png_d250.jpg&refer=http%3A%2F%2Fqny.smzdm.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636251195&t=6a8585aa583f80127279991d23995a53"},{GoodId:3,Price:77.77,Name:"bts周边",img:"https://img2.baidu.com/it/u=2612970998,458336255&fm=26&fmt=auto"},{GoodId:4,Price:1177.77,Name:"ipad",img:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fqny.smzdm.com%2F202104%2F19%2F607d44a9379f99175.png_d250.jpg&refer=http%3A%2F%2Fqny.smzdm.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636251195&t=6a8585aa583f80127279991d23995a53"}],
        allGoods:[],
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
    },
  }
</script>

<style scoped lang="less">
  ul{
    display: flex;
    flex-wrap: wrap; //默认不换行
    li{
      width: 30%;
      background-color: #F88E4E;
      border-radius: 10px;
      margin-left: 1%;//2.5%
      margin-right: 1%;
      border: 1px solid #ccc;
      font-size: 14px;
      font-family: "Microsoft soft";
      margin-bottom: 20px;
      img{
        width: 80%;
        margin-top: 20px;
      }
      h3{
        float: left;
        margin-left: 30px;
      }
      h2{
        float: right;
        margin-right: 30px;
      }
    }
    //.container1-1{
    //  margin-top: 10px;
    //  background-color: #F56E1C;
    //  width: 30%;
    //  height: 330px;
    //  border-radius: 10px;
    //  margin-left: 2%;//2.5%
    //  outline-style: none ;
    //  border: 1px solid #ccc;
    //  font-size: 14px;
    //  font-family: "Microsoft soft";
    //  margin-bottom: 5%;
    //  img{
    //    margin-top: 20px;
    //    width: 250px;
    //    height: 250px;
    //  }
    //  h3{
    //    float: left;
    //    margin-left: 30px;
    //  }
    //  h2{
    //    float: right;
    //    margin-right: 30px;
    //  }
    //}
    //.container1-1:focus{
    //  border-color: #66afe9;
    //  outline: 0;
    //  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
    //  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
    //}
  }


  //.container1 {
  //  border-radius: 5px;
  //  background-color: #ffffff;
  //  width: 100%;
  //
  //  ul {
  //    display: flex;
  //    flex-wrap: wrap; //默认不换行
  //    padding-bottom: 10px;
  //
  //    li {
  //      width: 30.5%;
  //      img {
  //        width: 100%;
  //      }
  //      p {
  //        margin: 1px 0;
  //      }
  //
  //      text-align: left;
  //      font-size: 10px;
  //      margin: 5px 10px;
  //      list-style: none
  //    }
  //  }
  //}
</style>
