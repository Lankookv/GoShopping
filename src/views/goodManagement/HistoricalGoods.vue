<template>
  <div class="container">
    <div class="container0">
      <span class="title">
        <b>查看历史商品</b>
      </span>
      <!--      <div class="search">-->
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
      <!--      </div>-->
<!--      <select name="classify" onchange="cll(this.options[this.options.selectedIndex].value)">-->
<!--        <option value="all" selected>全部</option>-->
<!--        <option value ="sold">已售空</option>-->
<!--        <option value ="onSale">在售</option>-->
<!--        <option value="frozen">冻结</option>-->
<!--      </select>-->
    </div>
    <div class="container1-1">
      <input type="checkbox" v-model='allChecked' @change='chooseAll' style="zoom:170%;float: left">
      <P>全选</P>
    </div>
    <div class="container1">
      <div v-if="allGoods.length===0">
        <center>
          <img src="../../components/icon/pic30.png" style="width:90%;margin-top: 15px">
        </center>
        <div style="text-align: center;">
          <span style="text-align: center">暂无任何商品哦 /(ㄒoㄒ)/~~</span>
        </div>
      </div>
      <div v-else>
        <ul :loading="loadings.table" id="allGood">
          <router-link :class="good.type" v-for="(good,index) in allGoods" :to="{name:good.toRouter,params:{bid:good.goodId}}" :key="index" tag="li">
            <input type="checkbox" v-model='good.checked' @click.stop @change='chooseOne(good)' style="float:left;width:15px;height: 15px;margin-top: 8%"></input>
            <img :src="good.img" style="width: 18%;height:93%;float: left;margin-left: 1%;margin-top: 1%;">
            <div class="container1-2" style="overflow:hidden;">
              <h2><b>{{good.goodName}}</b></h2>
              <div style="overflow-y: scroll;overflow-x: hidden;white-space: pre-line;">
                <small v-html="good.description"></small>
              </div>
            </div>
            <span class="container1-3" v-if="good.type==='sold'">
              <img src="../../components/icon/已卖出.png" style="width: 10%;float: right">
              <h1 style="color: black;font-size: 40px;margin-top: 10%;margin-right: 3%"><b>￥{{good.goodPrice}}</b></h1>
            </span>
            <span class="container1-3" v-else-if="good.type==='frozen'">
              <img src="../../components/icon/冻结.png" style="width: 13%;float: right">
              <h1 style="color: black;font-size: 40px;margin-top: 10%;margin-right: 3%"><b>￥{{good.goodPrice}}</b></h1>
            </span>
            <span class="container1-3" v-else>
              <h1 style="color: black;font-size: 40px;margin-top: 8%;margin-right: 3%"><b>￥{{good.goodPrice}}</b></h1>
            </span>
          </router-link>
        </ul>
        <ul :loading="loadings.table" id="frozenGood" style="display:none;">
          <router-link class="frozen" v-for="(good,index) in frozenGoods" :to="{name:good.toRouter,params:{bid:good.goodId}}" :key="index" tag="li">
            <img :src="good.img" style="width: 18%;float: left;margin-left: 1%;margin-top: 1%;">
            <div class="container1-2" style="overflow:hidden;">
              <h2><b>{{good.goodName}}</b></h2>
              <div style="overflow-y: scroll;overflow-x: hidden;white-space: pre-line;">
                <small v-html="good.description"></small>
              </div>
            </div>
            <span class="container1-3">
              <img src="../../components/icon/冻结.png" style="width: 13%;float: right">
              <h1 style="color: black;font-size: 40px;margin-top: 10%;margin-right: 3%"><b>￥{{good.goodPrice}}</b></h1>
            </span>
          </router-link>
        </ul>
        <ul :loading="loadings.table" id="soldGood" style="display:none;">
          <router-link class="sold" v-for="(good,index) in soldGoods" :to="{name:good.toRouter,params:{bid:good.goodId}}" :key="index" tag="li">
            <img :src="good.img" style="width: 18%;float: left;margin-left: 1%;margin-top: 1%;">
            <div class="container1-2" style="overflow:hidden;">
              <h2><b>{{good.goodName}}</b></h2>
              <div style="overflow-y: scroll;overflow-x: hidden;white-space: pre-line;">
                <small v-html="good.description"></small>
              </div>
            </div>
            <span class="container1-3">
              <img src="../../components/icon/已卖出.png" style="width: 10%;float: right">
              <h1 style="color: black;font-size: 40px;margin-top: 10%;margin-right: 3%"><b>￥{{good.goodPrice}}</b></h1>
            </span>
          </router-link>
        </ul>
        <ul :loading="loadings.table" id="onSaleGood" style="display:none;">
          <router-link class="onSale" v-for="(good,index) in onSaleGoods" :to="{name:good.toRouter,params:{bid:good.goodId}}" :key="index" tag="li">
            <img :src="good.img" style="width: 18%;float: left;margin-left: 1%;margin-top: 1%;">
            <div class="container1-2" style="overflow:hidden;">
              <h2><b>{{good.goodName}}</b></h2>
              <div style="overflow-y: scroll;overflow-x: hidden;white-space: pre-line;">
                <small v-html="good.description"></small>
              </div>
            </div>
            <span class="container1-3">
              <h1 style="color: black;font-size: 40px;margin-top: 8%;margin-right: 3%"><b>￥{{good.goodPrice}}</b></h1>
            </span>
          </router-link>
        </ul>
      </div>
      <div class="footer">
        <button id="deleteChooseGoods" @click="handleDelete()">删除所选商品</button>
      </div>
    </div>
    <!--    <Pagination :total="total"-->
    <!--                :page-size.sync="limit"-->
    <!--                :current.sync="query.page"-->
    <!--                @on-change="pushRouter">-->
    <!--    </Pagination>-->
  </div>
</template>

<script>
  import Pagination from '../../components/Pagination'
  import {showAllHistoricalGoods,deleteHistoricalGood } from '../../api';

  export default {
    name: "HistoricalGoods",
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
        No_good: false,
        allGoods: [{checked: false}],
        frozenGoods: [],
        soldGoods: [],
        onSaleGoods: [],
        limit: 2,
        routeName: '',
        allChecked: false,
        goodIdArr: [],//存放要删除商品id的数组
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
        alert("a")
        showAllHistoricalGoods({
          sellerId:parseInt(sessionStorage.getItem("userId")),
          contentType: "application/json",
        })
          .then((response) => {
            let arr1 = [];
            let arr2 = [];
            let arr3 = [];
            this.allGoods = response.data.data.goodlist;
            this.allGoods.forEach(function (item) {
              if (item.sold === true) {
                item.type = "sold";
                item.toRouter = "goodDetail-sold";
                arr1.push(item);
              } else if (item.frozen === true) {
                item.type = "frozen";
                item.toRouter = "goodDetail-frozen";
                arr2.push(item);
              } else {
                item.type = "onSale";
                item.toRouter = "goodDetail-onSale";
                arr3.push(item);
              }
            });
            this.soldGoods = arr1;
            this.frozenGoods = arr2;
            this.onSaleGoods = arr3;
          })
      },
      cll(id) {
        txt.value = id;
        document.all.sel.options[0].selected = true;
        // alert(id);
        if (id === 'sold') {
          eval("soldGood.style.display=\"\";");
          eval("allGood.style.display=\"none\";");
          eval("frozenGood.style.display=\"none\";");
          eval("onSaleGood.style.display=\"none\";");
        } else if (val === 'onSale') {
          eval("onSaleGood.style.display=\"\";");
          eval("allGood.style.display=\"none\";");
          eval("frozenGood.style.display=\"none\";");
          eval("soldGood.style.display=\"none\";");
        } else if (val === 'frozen') {
          eval("frozenGood.style.display=\"\";");
          eval("allGood.style.display=\"none\";");
          eval("onSaleGood.style.display=\"none\";");
          eval("soldGood.style.display=\"none\";");
        } else {
          eval("allGood.style.display=\"\";");
          eval("frozenGood.style.display=\"none\";");
          eval("onSaleGood.style.display=\"none\";");
          eval("soldGood.style.display=\"none\";");
        }
      },
      //单选
      chooseOne(good) {
          good.checked = true;
      },
      //全选
      chooseAll() {
        this.allGoods.forEach((good) => {
          good.checked = this.allChecked;
        })
      },

      //删除提示
      openDelConfirm() {
        return this.$confirm(`是否删除所选商品？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      },

      handleDelete() {
        this.openDelConfirm().then(() => {
          var i = 0;
          this.allGoods = this.allGoods.filter((good) => {
            if (good.checked === true) {
              this.goodIdArr[i] = good.goodId;
              i++;
            }
          })
          deleteHistoricalGood({
            goodIds: this.goodIdArr,
            contentType: "application/json"
          })
            .then((response) =>{
              if (response.data.code !== -1) {
                this.$message.success('删除成功');
                this.init();
              } else {
                this.$message.success('删除失败');
              }
            })
        })
      },

      watch: {
        '$route'(newVal, oldVal) {
          if (newVal !== oldVal) {
            this.init(true)
          }
        }
      },
    }
  }
</script>

<style scoped lang="less">
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
    select{
      float: left;
      width: 6%;
      height: 36px;
      margin-top: 1.35%;
      background-color: #F88E4E;
      border: 1px solid black ;
    }
    select:hover{
      float: left;
      width: 6%;
      height: 36px;
      margin-top: 1.35%;
      background-color: #F88E4E;
      border: 1px solid #cccccc ;
      cursor:Pointer;
    }
    .footer{
      position:fixed;
      bottom: 0px;
      width: 89%;
      height: 55px;
      background-color: #F88E4E;
    }
    #deleteChooseGoods{
      color: white;
      float: right;
      width: 10%;
      height: 36px;
      margin-right: 8%;
      margin-top: 10px;
      background-color: orangered;
      border: 1px solid black;
      cursor:Pointer;
      border-radius: 10px;

    }
    .search{
      width: 30%;
      float: left;
      margin-top: 1.3%;
      margin-right: 3%;
      border: 1px solid #ccc;
      border-radius: 30px;
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
    .onSale{
      cursor: pointer;
      padding:0px 0px 10px 10px;
      background-color:  #F88E4E;
      border-radius: 10px;
      border: 1px solid black;
      height:auto;
      min-height:200px;
      overflow: hidden;
    }
    .onSale:hover{
      cursor: pointer;
      padding:0px 0px 10px 10px;
      background-color:  #F88E4E;
      border-radius: 10px;
      border: 1px solid #cccccc;
      height:auto;
      min-height:200px;
      overflow: hidden;
    }
    .sold{
      cursor: pointer;
      padding:0px 0px 10px 10px;
      background-color:  #CBCBCB;
      border-radius: 10px;
      border: 1px solid black;
      height:auto;
      min-height:200px;
      overflow: hidden;
    }
    .sold:hover{
      cursor: pointer;
      padding:0px 0px 10px 10px;
      background-color:  #CBCBCB;
      border-radius: 10px;
      border: 1px solid #cccccc;
      height:auto;
      min-height:200px;
      overflow: hidden;
    }
    .frozen{
      cursor: pointer;
      padding:0px 0px 10px 10px;
      background-color:  #F4E5DC;
      border-radius: 10px;
      border: 1px solid black;
      height:auto;
      min-height:200px;
      overflow: hidden;
    }
    .frozen:hover{
      cursor: pointer;
      padding:0px 0px 10px 10px;
      background-color:  #F4E5DC;
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
          margin:0% 4% 2% 4%;
          list-style: none;
          .container1-2 {
            width: 50%;
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
              width: 101%;
              margin:1% 0% 0px 3%;
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
  .container1-1{
    float: left;
    margin-left: 50px;
    margin-top: 1%;
  }
  p{
    float: left;
    margin: 3px;
    font-size: 18px;
    font-weight: bold;
  }
</style>
