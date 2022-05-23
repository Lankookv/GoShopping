<template>
  <div style="margin-top: 20%">
    <h1>支付成功~</h1>
    <a v-if="payWay===1" :href="'http://localhost:8080/#/goodDetails/'+goodId">返回商品详情</a>
    <a v-else-if="payWay===2" :href="'http://localhost:8080/#/buyerViewOrders/1'">返回历史下单记录</a>
  </div>
</template>

<script>
  import {finishOrder} from "../api";

  export default {
    name: "payView",
    data() {
      return {
        payWay:sessionStorage.getItem("payWay"),
        goodId:sessionStorage.getItem("goodId"),
        orderId:sessionStorage.getItem("orderId"),
      }
    },
    created () {
      this.init();
    },
    methods:{
      init(){
        finishOrder({
          buyerId: parseInt(sessionStorage.getItem("buyerId")),
          orderId:parseInt(this.orderId),
          contentType: "application/json",
        }).then((response) => {
          //this.$message.success('付款成功！');
        })
      },
    }
  }
</script>

<style scoped lang="less">

</style>
