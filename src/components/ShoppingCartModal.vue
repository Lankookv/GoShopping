<template>
  <div class="modal-backdrop" @click.stop>
    <div style="overflow:hidden">
      <div class="modal" >
        <div class="modal-header">
          <h2 style="margin-top: 0;margin-bottom: 0;margin-left: 1%;font-size: 25px">订单详情</h2>
          <img src="../components/icon/关闭.png" class="iconfont" @click="closeSelf" style="float: right;margin-right: 2%;margin-top: 1.5%;cursor: pointer;">
        </div>
        <div class="modal-body">
          <h3 style="margin:0 50% 1.5% 2%;float: left;font-size: 20px">收货地址：</h3>
          <li class="address" style="list-style:none; font-weight: bold">
              <span style="float: left;;margin-left: 2%">
                <input type="radio" name="address" value="address" id="defaultaddress" checked="checked" @click="getValue()" ></input>
                <label for="defaultaddress" class="chooseAddress">{{buyerAddress}} &nbsp;&nbsp; ({{buyerName}}&nbsp;收) &nbsp;&nbsp;{{buyerPhone}}&nbsp;</label>
                <span style="margin-left:10px">默认地址</span>
             </span>
            </li>
          <li v-for="(item) in isnDefaultArr" :key="index" style="list-style:none;">
            <span style="float: left;margin-left: 2%">
              <input type="radio" v-model='item.checked' name="address" value="address"  id="address" @click="getValue(item)" ></input>
              <label for="address" class="chooseAddress"> {{item.buyerAddress}} &nbsp;&nbsp; ({{item.buyerName}}&nbsp;收) &nbsp;&nbsp; {{item.buyerPhone}}</label>
           </span>
          </li>
        </div>
        <div  style="border-bottom:1px solid #eee">
          <h3 style="float: left;margin:1% 80% 0 3%;font-size: 20px">确认订单信息：</h3>
          <p>商品详情</p>
          <p>数量</p>
          <p>单价</p>
        </div>
        <li class="container_1" v-for="(good,index) in goodList" :key="index">
          <img :src="good.cartWithImg.goodImagine.imagine" style="width: 18%;float: left;margin-left: 1%;margin-top: 1%;">
          <div class="container1-2" style="width: 25%">
            <h2 style="float:left;margin-left: 10%;margin-top: 25%"><b style="font-size: 30px">{{good.cartWithImg.cart.goodName}}</b></h2>
          </div>
          <div class="box">
            <button class="minus" @click.stop @click="minus(good.cartWithImg.cart.number,good)">
              <img src="../components/icon/减.png" style="height: 37px">
            </button>
            <h1 style="float:left;color: black;margin: 4% 1% 1% 1%;font-size: 37px" ><b>{{good.cartWithImg.cart.number}}</b></h1>
            <button class="add" @click="add(good.cartWithImg.cart.number,good)">
              <img src="../components/icon/加.png" style="height: 37px">
            </button>
          </div>
          <span class="container1-3">
            <h1 style="color: black;font-size: 35px;margin-top: 4%;margin-right: 8%;float: right"><b>￥{{good.cartWithImg.cart.goodPrice}}</b></h1>
          </span>
         </li>
        <div class="btn">

          <button class="no" style="background-color: #00bf17;float: right" @click="Order()">确认</button>
          <button class="yes" style="background-color: #ff0000;" @click="closeSelf">取消</button>
          <p style="margin-right: 0;width: 20%;margin-top: 2.8%;margin-left: 40%"><b>合计：￥{{this.Sum}}</b></p>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {changecartnumber, OrderGoodsFromCart, showAddress,} from "../api";

  export default {
    name: 'ShoppingCartModal',
    props: {
      intentionList:{
        type: [Object, Array],
        default: []
      },
      goodList:{
        type: [Object, Array],
        default: []
      },
      Sum:[],
      Num:'',
    },
    data() {
      return {
        isnDefaultArr:[],
        AddId:0,
        items: [{checked: false}],
        addressid:'',
        goodIds:[],
        numberIds:[],
        cartIds:[],
       }
      },
    created() {
      this.getAddress();
    },

    methods: {

      closeSelf() {
        this.$emit("closeme");
      },

      getAddress(){
        showAddress({
          buyerId:parseInt(sessionStorage.getItem("buyerId")),
          contentType: "application/json"
        })
          .then((response)=> {
            this.address = response.data.data;
            this.myAddressData = this.address
            console.log(this.address);
            let noisDefaultArr = [];
            var index = this.address.findIndex(item =>{
              if(item.isDefault == 1){
                // alert("默认地址的id"+item.addressId)
                this.buyerAddress = item.buyerAddress;
                this.buyerName = item.buyerName;
                this.buyerPhone = item.buyerPhone
                this.purchasebuyerAddressId = item.addressId;
              }else{
                item.type = "noisDefault";
                noisDefaultArr.push(item);
                this.isnDefaultArr= noisDefaultArr;
              }
            })
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
          this.Sum -= good.cartWithImg.cart.goodPrice;
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
          this.Sum += good.cartWithImg.cart.goodPrice;
        changecartnumber({
          buyerId: good.cartWithImg.cart.buyerId,
          goodId: good.cartWithImg.goodImagine.goodId,
          number: good.cartWithImg.cart.number,
          contentType: "application/json",
        }).then((response)=> {
        })
      },

      //选择地址
      getValue(item){
        this.addressid = item.addressId;
      },


      //提交订单
      Order() {
        for (var i = 0; i < this.Num; i++) {
          this.goodIds.push(this.goodList[i].cartWithImg.goodImagine.goodId);
          this.numberIds.push(this.goodList[i].cartWithImg.cart.number);
          this.cartIds.push(this.goodList[i].cartWithImg.cart.cartId);
        }
        if (this.address == '') {
          this.$message.error('您还未选地址！');
        } else {
          OrderGoodsFromCart({
            buyerId: parseInt(sessionStorage.getItem("buyerId")),
            goodIds: this.goodIds,
            numbers: this.numberIds,
            addressId: this.addressid,
            cartIds: this.cartIds,
            contentType: "application/json",
          }).then((response) => {
            this.goodIds = [];
            this.numberIds = [];
            this.$emit("closeme");
            if(response.data.data === true) {
              this.$message.success('下单成功！');
            }else{
              this.$message.error('您未选择商品');
            }
          })
        }
      }
    },
  }
</script>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  .modal {
    background-color: #fff;
    box-shadow: 2px 2px 20px 1px;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    max-width: 900px;
    min-width: 900px;
    height:auto;
    min-height:500px;
    max-height:600px;
  }
  .modal-header {
    border-bottom: 1px solid #eee;
    color: #313131;
    justify-content: space-between;
    padding: 15px;
    display: flex;
  }
  .modal-body {
    position: relative;
    padding: 10px 10px;
  }
  .iconfont{
    font-family:"iconfont" !important;
    width:16px;
    height: 16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
  p{
    float: left;
    margin-left: 18%;
    margin-right: 7%;
    margin-top: 1.5%;
    font-size: 18px;
  }
  .container_1{
    cursor: pointer;
    padding:0px 0px 10px 10px;
    background-color: #e2e2e2;
    border-radius: 10px;
    height:auto;
    min-height:135px;
    overflow: hidden;
    margin:2% 4% 2% 4% ;
  }
  .container1-2 {
    float: left;
    margin-left: 1%;
    text-align: left;
  }
  .minus,.add{
    float: left;
    margin-top: 4.4%;
    background: transparent;
    border-width: 0px;
    outline: none;
    cursor:pointer;
  }
  .btn{
    min-height:70px;
    border-top:1px solid #eee;
  }
  .yes,.no{
    color: white;
    width: 15%;
    height: 36px;
    margin-right: 4%;
    margin-top: 1.8%;
    cursor:Pointer;
    border-radius: 10px;
    border: 1px solid black;
  }
</style>
