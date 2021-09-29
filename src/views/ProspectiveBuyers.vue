<template>
  <div>
    <div class="container1">
      <span>
        <b>查看意向购买人</b>
      </span>
      <search class="search"></search>
    </div>
    <div class="container2">
      <router-link :to="{name:'GoodDetails-seller',params:{bid:1}}">
        <img src="../components/icon/1.png">
        <div class="container2-2" >
          <h3><b>bts周边</b></h3>
          <h2><b>￥150</b></h2>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import Search from "../components/search";

  export default {
    name: "ProspectiveBuyers",
    components: {
      Search,
    },
  }
</script>

<style scoped lang="less">
  .container1{
    width: 100%;
    height:auto;
    min-height:50px;
    overflow: hidden;
    span{
      width: 20%;
      float: left;
      margin-top: 1%;
      margin-left: 4%;
      font-size: 32px;
    }
    .search{
      width: 35%;
      float: right;
      margin-top: 1.3%;
      margin-right: 2%;
    }
  }
  .container2{
    margin-top: 10px;
    background-color: #F56E1C;
    width: 90%;
    height: 30%;
    float: left;
    border-radius: 10px;
    margin-left: 5%;
    outline-style: none ;
    border: 1px solid black;
    font-size: 14px;
    font-family: "Microsoft soft";
    margin-bottom: 5%;
    img{
      margin-top: 1%;
      margin-bottom: 1%;
      width: 20%;
      float: left;
      margin-left: 3%;
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
  .container2:focus{
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
  }
</style>
