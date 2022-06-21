<template>
  <div class="container">
    <div class="container0">
      <span class="title">
        <b>购物车</b>
      </span>
      <button class="cutoff" @click="isbuy=!isbuy"><img src="../components/icon/删除.png" style="height: 35px"></button>
    </div>
    <div class="container1">
      <div v-if="allGoods.length===0">
        <center>
          <img src="../components/icon/pic30.png" style="margin-top: 15px">
        </center>
        <div style="text-align: center;">
          <span style="text-align: center">暂无任何商品哦 /(ㄒoㄒ)/~~</span>
        </div>
      </div>
      <ul    :loading="loadings.table" >
        <li class="container_1" v-for="(good,index) in allGoods"
                     @click="shoppingCart(good.cartWithImg.cart.goodId)" :key="index" >
          <input type="checkbox" v-model='good.checked' @click.stop @change='chooseOne(good)' style="float:left;width:15px;height: 15px;margin-top: 8%"></input>
          <img :src="good.cartWithImg.goodImagine.imagine" style="width: 18%;height:180px;float: left;margin-left: 1%;margin-top: 1%;">
          <div class="container1-2" style="overflow:hidden;width: 35%">
            <h2 style="float:left"><b>{{good.cartWithImg.cart.goodName}}</b></h2>
            <div style="overflow-y: scroll;overflow-x: hidden;white-space: pre-line;width: 102%;">
              <small v-html="good.cartWithImg.cart.description"></small>
            </div>
<!--            <div style="overflow-y: scroll;overflow-x: hidden;white-space: pre-line;float: left">-->
<!--            </div>-->
          </div>
          <div class="box">
            <button class="minus" style="margin-left: 7%" @click.stop @click="minus(good.cartWithImg.cart.number,good)">
              <img src="../components/icon/减.png" style="height: 40px">
            </button>
            <h1 style="float:left;color: black;margin: 8% 1% 1% 1%;font-size: 40px" ><b>{{good.cartWithImg.cart.number}}</b></h1>
            <button class="add" @click="add(good.cartWithImg.cart.number,good)">
              <img src="../components/icon/加.png" style="height: 40px">
            </button>
    </div>
          <span class="container1-3">
            <h1 style="color: black;font-size: 40px;margin-top: 7%;margin-right: 5%;float: right"><b>￥{{good.cartWithImg.cart.goodPrice}}</b></h1>
          </span>

        </li>
      </ul>
      <div class="footer">
        <div class="container1-1">
          <input type="checkbox" v-model='allChecked' @change='chooseAll' style="zoom:170%;float: left;">
          <P>全选</P>
        </div>
        <div v-if="isbuy">
        <button id="buyGoods" @click="BuyGoods()">结算</button>
          <ShoppingCartModal @click.stop v-show="showModal" v-on:closeme="closeme" :intentionList="intentionList":goodList="goodList":Sum="Sum":Num="Num"></ShoppingCartModal>
        <button id="collectGoods" @click="handleCollection">收藏</button>
        <p style="float: right;margin-top: 1.8%;margin-right: 2%">合计:￥{{this.sum}}</p>
          <p style="float: right;margin-top: 1.8%;margin-right: 2%">已选中{{this.num}}件</p>
        </div>
        <div v-else>
            <button id="delete" @click="deleteCartGood">删除</button>
           <p style="float: right;margin-top: 1.8%;margin-right: 2%">已选中{{this.num}}件</p>
        </div>
      </div>
    </div>
  </div>



</template>

<script>
  import {shoppingCart, changecartnumber, collectGoodsFromCart, deleteCartgood,getAddressByBuyer} from '../api';
  import ShoppingCartModal from "../components/ShoppingCartModal"

  export default {
    name: "ShoppingCart",
    components: {
      ShoppingCartModal,
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
        isbuy:false,
        Id:[],
        allChecked: false,
        goodIdArr: [],//存放要删除商品id的数组
        goodAllInformation:[],//结算选中的商品信息
        sum:0,
        num:0,
        showModal:0,
        intentionList:[],//储存地址
        goodList:[],//选中商品全部信息传送
        goods:[],//储存选中的商品的全部信息
        Num:[],//选中商品数量
        Sum:'',//价格
        query: {
          keywords: '',
          page: 1,
        },
      }
    },
    created () {
      this.init1();
    },
    mounted() {
      this.init()
    },
    methods: {
      init1(){
        if(sessionStorage.getItem("isbuy")==="false"){
          this.isbuy=false;
        }else {
          this.isbuy=true;
        }
      },
      init() {
        shoppingCart({
          buyerId: parseInt(sessionStorage.getItem("buyerId")),
          contentType: "application/json",
        }).then((response) => {
          console.log(response)
          this.allGoods = response.data.data;
          // console.log(this.allGoods)
        })
          // var i=0;
          // this.allGoods = this.allGoods.filter((good) => {
          //   if (good.checked === true) {
          //     this.goods[i] = good;
          //     i++;
          //     good.checked=false;
          //   }
          // })
          // this.showModal=!this.showModal;
          getAddressByBuyer({
            buyerId: parseInt(sessionStorage.getItem("buyerId")),
            contentType: "application/json",
          }).then((response)=> {
            this.intentionList=response.data.data;
          })
       },
      // shoppingCart(goodId){
      //   this.$router.push({name:'CartWithImg',params:{bid:goodId}})
      // },
      //单选
      choosetrue(good){
        good.checked = true;
        // console.log(good.cartWithImg.cart.goodId);
        this.sum = this.sum + good.cartWithImg.cart.number * good.cartWithImg.cart.goodPrice ;
        this.num += 1;
        if(this.num==this.allGoods.length){
          this.allChecked=true;
        }
      },

      choosefalse(good){
        good.checked=false;
        this.sum = this.sum - good.cartWithImg.cart.number * good.cartWithImg.cart.goodPrice ;
        this.num -= 1;
        this.allChecked=false;
      },
      chooseOne(good) {
        !good.checked?this.choosefalse(good):this.choosetrue(good)
      },

//全选
      chooseAll() {
        this.sum=0;
        this.num=0;
        this.allGoods.forEach((good) => {
          good.checked = this.allChecked;
        })
        let all1 = [];
        all1 = this.allGoods;
        all1 = all1.filter((good) => {
          if (good.checked == true) {
            this.sum += good.cartWithImg.cart.number * good.cartWithImg.cart.goodPrice;
            this.num += 1;
          }else{
            this.sum=0;
            this.num=0;
          }
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

      //收藏提示
      collectionDelConfirm() {
        return this.$confirm(`是否收藏所选商品？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      },


      //减少购物车数量
      minus(num,good){
        if(num==1){
          this.$message.error('该宝贝不能再减少了哟~');
        }else{
          num-=1;
          good.cartWithImg.cart.number=num;
        }
        if(good.checked==true){
          this.sum -= good.cartWithImg.cart.goodPrice;
        }
        changecartnumber({
          buyerId: good.cartWithImg.cart.buyerId,
          goodId: good.cartWithImg.goodImagine.goodId,
          number: good.cartWithImg.cart.number,
          contentType: "application/json",
        }).then((response)=> {
        })
      },


      //加购物车数量
      add(num,good){
        if(num==good.storage){
          this.$message.error('该宝贝不能再加了哟~');
        }else {
          num +=1;
          good.cartWithImg.cart.number = num;
        }
        if(good.checked==true){
          this.sum += good.cartWithImg.cart.goodPrice;
        }

        changecartnumber({
          buyerId: good.cartWithImg.cart.buyerId,
          goodId: good.cartWithImg.goodImagine.goodId,
          number: good.cartWithImg.cart.number,
          contentType: "application/json",
        }).then((response)=> {
        })
      },

      //购物车收藏
      handleCollection() {
        var i = 0;
        let temporary = [];
        temporary = this.allGoods;
        temporary = temporary.forEach((good) => {
          if (good.checked === true) {
            this.goodIdArr[i] = good.cartWithImg.cart.cartId;
            i++;
          }
        });
        if (this.goodIdArr.length > 0) {
          this.collectionDelConfirm().then(() => {
            collectGoodsFromCart({
              cartIds: this.goodIdArr,
              contentType: "application/json"
            })
              .then((response) => {
                if (response.data.data == true) {
                  this.$message.success('收藏成功');
                  this.init();
                } else {
                  this.$message.error('收藏失败');
                }
              })
          }).catch((err) => {
            this.goodIdArr = [];
          });
        } else {
          this.$message.warning("您还未选择要收藏的商品")
          this.init();
        }
      },

      //购物车结算
      BuyGoods(){
        var i = 0;
        this.allGoods = this.allGoods.filter((good) => {
          if (good.checked === true) {
            this.goods[i] = good;
            good.checked=false;
            i++;
          }
        })
        if(i == 0){
          this.$message.warning('您还未选择商品');
          this.init();
        }else {
          this.goodList = this.goods;
          this.Sum = this.sum;
          this.Num = this.num;
          this.goods = [];
          this.sum = 0;
          this.num = 0;
          this.allChecked = false;
          this.showModal = !this.showModal;
        }
      },

      //删除购物车商品
      deleteCartGood() {
        var i = 0;
        let temporary = [];
        temporary = this.allGoods;
        temporary = temporary.forEach((good) => {
          if (good.checked === true) {
            this.goodIdArr[i] = good.cartWithImg.cart.cartId;
            i++;
          }
        });
        if (this.goodIdArr.length > 0) {
          this.openDelConfirm().then(() => {
            deleteCartgood({
              cartIds: this.goodIdArr,
              contentType: "application/json"
            })
              .then((response) => {
                if (response.data.data == true) {
                  this.$message.success('删除成功');
                  this.init();
                } else {
                  this.$message.error('删除失败');
                }
              })
          }).catch((err) => {
            this.goodIdArr = [];
          });
        } else {
          this.$message.warning("您还未选择要删除的商品")
          this.init();
        }
      },
      closeme(){
        this.showModal=!this.showModal;
        this.init();
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
  .container0{
    height:auto;
    min-height:30px;
    overflow: hidden;
  }
  .container {
    width: 100%;
    height:auto;
    min-height:50px;
    overflow: hidden;
    .title{
      width: 10%;
      float: left;
      margin-top: 2%;
      margin-left: 3%;
      font-size: 32px;
    }
    .footer{
      position:fixed;
      bottom: 0px;
      width: 89%;
      height: 70px;
      background-color: #F88E4E;
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
            /*p{*/
            /*  margin-left: 3%;*/
            /*  color: darkgray;*/
            /*}*/
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
  #collectGoods,#buyGoods,#delete{
    color: white;
    float: right;
    width: 10%;
    height: 36px;
    margin-right: 3%;
    margin-top: 1.5%;
    background-color: orangered;
    border: 1px solid black;
    cursor:Pointer;
    border-radius: 10px;
  }
  .container1-1{
    float: left;
    margin-left: 50px;
    margin-top: 1.5%;
  }
  p{
    float: left;
    margin: 3px;
    font-size: 18px;
    font-weight: bold;
  }
  .cutoff{
    float: left;
    margin-top: 2.4%;
    background: transparent;
    border-width: 0px;
    outline: none;
    cursor:pointer;
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
  .minus,.add{
    float: left;
    margin-top: 8.2%;
    background: transparent;
    border-width: 0px;
    outline: none;
    cursor:pointer;
  }
  /*<!--.black_overlay{-->*/
  /*<!--  display: none;-->*/
  /*<!--  position: absolute;-->*/
  /*<!--  top: 0%;-->*/
  /*<!--  left: 0%;-->*/
  /*<!--  width: 100%;-->*/
  /*<!--  height: 100%;-->*/
  /*<!--  background-color: #696969;-->*/
  /*<!--  z-index:1001;-->*/
  /*<!--  -moz-opacity: 0.8;-->*/
  /*<!--  opacity:.80;-->*/
  /*<!--  filter: alpha(opacity=80);-->*/
  /*<!--}-->*/
  /*.white_content {*/
  /*  display: none;*/
  /*  position: absolute;*/
  /*  top: 10%;*/
  /*  left: 20%;*/
  /*  width: 60%;*/
  /*  height: 80%;*/
  /*  background-color: white;*/
  /*  z-index:1002;*/
  /*  overflow: auto;*/
  /*  border: 2px solid #2c2c2cc9;*/
  /*}*/
  .cutoffdeal,.adddeal{
    float: right;
    background: #b3d8ff;
    width: 15%;
    height: 36px;
    margin-right: 4%;
    margin-top: 2%;
    border: 1px solid black;
    border-radius: 5px;
  }
</style>
