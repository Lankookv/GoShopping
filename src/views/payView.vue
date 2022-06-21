<template>
  <div style="margin-top: 20%">
    <h1>支付成功~</h1>
    <a v-if="payWay==='1'" :href="'http://localhost:8080/#/goodDetails/'+goodId">返回商品详情</a>
    <a v-else-if="payWay==='2'" :href="'http://localhost:8080/#/buyerViewOrders/1'">返回历史下单记录</a>
    <a v-else-if="payWay==='3'" :href="'http://localhost:8080/#/ShoppingCart'">返回购物车</a>
  </div>
</template>

<script>
  import {finishOrder} from "../api";

  export default {
    name: "payView",
    data() {
      return {
        payWay:0,
        goodId:0,
        orderIds:[],
        orderId:0,
      }
    },
    created () {
      this.init();
    },
    methods:{
      init(){
        this.payWay=sessionStorage.getItem("payWay");
        this.goodId=sessionStorage.getItem("goodId");
        if(this.payWay===3){
          var userJsonStr = sessionStorage.getItem('orderIds');
          this.orderIds=JSON.parse(userJsonStr);
          // alert(this.payWay)
          for(i in this.orderIds) {
            // alert(i);
            finishOrder({
              buyerId: parseInt(sessionStorage.getItem("buyerId")),
              orderId: parseInt(i),
              contentType: "application/json",
            }).then((response) => {
              //this.$message.success('付款成功！');
            })
          }
        }
        else {
          this.orderId=sessionStorage.getItem('orderId');
          finishOrder({
            buyerId: parseInt(sessionStorage.getItem("buyerId")),
            orderId: parseInt(this.orderId),
            contentType: "application/json",
          }).then((response) => {
            //this.$message.success('付款成功！');
          })
        }
      },
    }
  }
</script>

<style scoped lang="less">

</style>
