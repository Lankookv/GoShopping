<template>
  <div style="white-space: nowrap;">
    <div>
      <div class="search">
        <input type="text" class="input-search" v-model="keyword" id="searchTxt" ref="searchTxt" placeholder="ipad" filterable  value="">
        <img src="../components/icon/搜索.png" class="iconfont" @click="search">
      </div>
      <div class="nvzhuangNav" style="margin-top: 1%;">
        <ul>
          <li id="phone" value="phone" @click="change('phone')">手机</li>
          <li id="computer" value="computer" @click="change('computer')">电脑</li>
          <li id="pad" value="pad" @click="change('pad')">平板</li>
          <li id="camera" value="camera" @click="change('camera')">相机</li>
          <li id="part" value="part" @click="change('part')">配件</li>
          <li id="else" value="else" @click="change('else')">其他</li>
        </ul>
      </div>
    </div>
    <div v-if="allDigitalGoods.length===0">
      暂无商品哦~
    </div>
    <div v-else class="goodShow">
      <ul :loading="loadings.table" id="allDigitalGood">
<!--        所有商品-->
        <router-link :class="good.type" v-for="(good,index) in allDigitalGoods" :to="{name:'GoodDetails',params:{bid:good.goodId}}" :key="index" tag="li" style="list-style:none;">
          <div class="container1-1" >
            <img :src="good.img">
            <div class="container1-2">
              <h3><b>{{good.goodName}}</b></h3>
              <h2><b>￥{{good.goodPrice}}</b></h2>
            </div>
          </div>
        </router-link>
      </ul>
      <ul :loading="loadings.table" id="phoneGood" style="display:none;">
<!--        手机产品-->
        <router-link class="phone" v-for="(good,index) in phoneGoods" :to="{name:'GoodDetails',params:{bid:good.goodId}}" :key="index" tag="li" style="list-style:none;">
          <div class="container1-1" >
            <img :src="good.img">
            <div class="container1-2">
              <h3><b>{{good.goodName}}</b></h3>
              <h2><b>￥{{good.goodPrice}}</b></h2>
            </div>
          </div>
        </router-link>
      </ul>
      <ul :loading="loadings.table" id="computerGood" style="display:none;">
<!--        电脑产品-->
        <router-link class="computer" v-for="(good,index) in computerGoods" :to="{name:'GoodDetails',params:{bid:good.goodId}}" :key="index" tag="li" style="list-style:none;">
        <div class="container1-1" >
          <img :src="good.img">
          <div class="container1-2">
            <h3><b>{{good.goodName}}</b></h3>
            <h2><b>￥{{good.goodPrice}}</b></h2>
          </div>
        </div>
        </router-link>
      </ul>
      <ul :loading="loadings.table" id="padGood" style="display:none;">
<!--        平板产品-->
        <router-link class="camera" v-for="(good,index) in padGoods" :to="{name:'GoodDetails',params:{bid:good.goodId}}" :key="index" tag="li" style="list-style:none;">
          <div class="container1-1" >
            <img :src="good.img">
            <div class="container1-2">
              <h3><b>{{good.goodName}}</b></h3>
              <h2><b>￥{{good.goodPrice}}</b></h2>
            </div>
          </div>
        </router-link>
      </ul>
      <ul :loading="loadings.table" id="cameraGood" style="display:none;">
<!--        相机产品-->
        <router-link class="camera" v-for="(good,index) in cameraGoods" :to="{name:'GoodDetails',params:{bid:good.goodId}}" :key="index" tag="li" style="list-style:none;">
          <div class="container1-1" >
            <img :src="good.img">
            <div class="container1-2">
              <h3><b>{{good.goodName}}</b></h3>
              <h2><b>￥{{good.goodPrice}}</b></h2>
            </div>
          </div>
        </router-link>
      </ul>
      <ul :loading="loadings.table" id="partGood" style="display:none;">
<!--        配件产品-->
        <router-link class="part" v-for="(good,index) in partGoods" :to="{name:'GoodDetails',params:{bid:good.goodId}}" :key="index" tag="li" style="list-style:none;">
          <div class="container1-1" >
            <img :src="good.img">
            <div class="container1-2">
              <h3><b>{{good.goodName}}</b></h3>
              <h2><b>￥{{good.goodPrice}}</b></h2>
            </div>
          </div>
        </router-link>
      </ul>
      <ul :loading="loadings.table" id="elseGood" style="display:none;">
<!--      其他产品-->
      <router-link class="else" v-for="(good,index) in elseGoods" :to="{name:'GoodDetails',params:{bid:good.goodId}}" :key="index" tag="li" style="list-style:none;">
        <div class="container1-1" >
          <img :src="good.img">
          <div class="container1-2">
            <h3><b>{{good.goodName}}</b></h3>
            <h2><b>￥{{good.goodPrice}}</b></h2>
          </div>
        </div>
      </router-link>
    </ul>
    </div>
  </div>
</template>

<script>
  import {showAllDigitalGoods,search} from "../api";

  export default {
    name: "home",
    components: {
    },
    data() {
      return {
        total: 0,
        page: 1,
        loadings: {
          table: true,
        },
        No_good: false,
        a:[],
        allDigitalGoods: [],
        phoneGoods: [],
        computerGoods: [],
        padGoods:[],
        cameraGoods: [],
        partGoods:[],
        elseGoods:[],
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
      init() {
        showAllDigitalGoods({
          class1: parseInt(1),
          frozen:parseInt(0),
          sold:parseInt(0),
          removed:parseInt(0),
          wanted:parseInt(0),
          contentType: "application/json"
        })
          .then((response) => {
            this.a = response;
            let phoneArr = [];
            let computerArr = [];
            let padArr = [];
            let cameraArr = [];
            let partArr = [];
            let elseArr = [];
            this.allDigitalGoods = response.data.data.goodlist;
            this.allDigitalGoods.forEach(function (item) {
              if (item.class2 === 1) {
                item.type = "phone";
                phoneArr.push(item);
              } else if (item.class2 === 2) {
                item.type = "computer";
                computerArr.push(item);
              } else if(item.class2 === 3) {
                item.type = "pad";
                padArr.push(item);
              }else if(item.class2 === 4){
                item.type = "camera";
                cameraArr.push(item);
              }else if(item.class2 === 5){
                item.type = "part";
                partArr.push(item);
              }else{
                item.type = "else";
                elseArr.push(item);
              }
            });
            this.phoneGoods= phoneArr;
            this.computerGoods = computerArr;
            this.padGoods = padArr;
            this.cameraGoods = cameraArr;
            this.partGoods = partArr;
            this.elseGoods = elseArr;
          })
      },
      search(){
        this.keyword=document.getElementById('searchTxt').value;
        search({
          keyword:this.keyword,
          contentType: "application/json;charset=UTF-8",
        }).then((response)=> {
          this.allDigitalGoods=response.data.data.goodlist;
        })
      },
      change(name){
        // alert(name);
        if (name === 'phone') {
          eval("phoneGood.style.display=\"\";");
          eval("allDigitalGood.style.display=\"none\";");
          eval("computerGood.style.display=\"none\";");
          eval("padGood.style.display=\"none\";");
          eval("cameraGood.style.display=\"none\";");
          eval("partGood.style.display=\"none\";");
          eval("elseGood.style.display=\"none\";");
        } else if (name === 'computer') {
          eval("computerGood.style.display=\"\";");
          eval("allDigitalGood.style.display=\"none\";");
          eval("phoneGood.style.display=\"none\";");
          eval("padGood.style.display=\"none\";");
          eval("cameraGood.style.display=\"none\";");
          eval("partGood.style.display=\"none\";");
          eval("elseGood.style.display=\"none\";");
        } else if(name === 'pad'){
          eval("padGood.style.display=\"\";");
          eval("allDigitalGood.style.display=\"none\";");
          eval("phoneGood.style.display=\"none\";");
          eval("computerGood.style.display=\"none\";");
          eval("cameraGood.style.display=\"none\";");
          eval("partGood.style.display=\"none\";");
          eval("elseGood.style.display=\"none\";");
        }else if (name === 'camera') {
          eval("cameraGood.style.display=\"\";");
          eval("allDigitalGood.style.display=\"none\";");
          eval("phoneGood.style.display=\"none\";");
          eval("computerGood.style.display=\"none\";");
          eval("padGood.style.display=\"none\";");
          eval("partGood.style.display=\"none\";");
          eval("elseGood.style.display=\"none\";");
        } else if(name === 'part'){
          eval("partGood.style.display=\"\";");
          eval("allDigitalGood.style.display=\"none\";");
          eval("phoneGood.style.display=\"none\";");
          eval("computerGood.style.display=\"none\";");
          eval("padGood.style.display=\"none\";");
          eval("cameraGood.style.display=\"none\";");
          eval("elseGood.style.display=\"none\";");
        }else if(name === 'else'){
          eval("elseGood.style.display=\"\";");
          eval("allDigitalGood.style.display=\"none\";");
          eval("phoneGood.style.display=\"none\";");
          eval("computerGood.style.display=\"none\";");
          eval("padGood.style.display=\"none\";");
          eval("cameraGood.style.display=\"none\";");
          eval("partGood.style.display=\"none\";");
        }else{
          eval("allDigitalGood.style.display=\"\";");
          eval("phoneGood.style.display=\"none\";");
          eval("computerGood.style.display=\"none\";");
          eval("padGood.style.display=\"none\";");
          eval("cameraGood.style.display=\"none\";");
          eval("partGood.style.display=\"none\";");
          eval("elseGood.style.display=\"none\";");
        }
      }
    },
  }
</script>

<style scoped lang="less">
  .search{
    display:flex;
    border: 1px solid #ccc;
    border-radius: 20px;
    width: 400px;
    margin:0 auto;
    background-color: white;
    margin-top: 10px;
  }
  .search:focus{
    margin-top: 10px;
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
    ul {
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
          margin-top: 20px;
        }

        h3 {
          float: left;
          margin-left: 30px;
        }

        h2 {
          float: right;
          margin-right: 30px;
        }
      }
    }
  }
  .nvzhuangNav{
    ul{
      list-style: none;
      height: 50px;
      li{
        font-weight: bold;
        width: 100px;
        font-size: 16px;
        margin-top: 0.5%;
        margin-bottom: 0.5%;
        display: inline-block;
        padding-top: 5px;
        padding-bottom: 5px;
        color:white;
        cursor: pointer;
      }
      li:hover{
        font-weight: bold;
        width: 100px;
        font-size: 16px;
        margin-top: 0.5%;
        margin-bottom: 0.5%;
        display: inline-block;
        padding-top: 5px;
        padding-bottom: 5px;
        color:red;
        background-color: white;
        cursor: pointer
      }
    }

  }
</style>
