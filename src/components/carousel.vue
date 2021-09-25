<template>
  <el-carousel :interval="2000" type="card" height="200px">
    <el-carousel-item v-for="item in 3" :key="item">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default {
    name: "carousel",
    data(){
      return {

      };
    },
  }
</script>

<style scoped>
  .el-carousel{
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item:nth-child(3n) {
    background-image: url(./icon/首页1.jpg);
    background-size: 100% 100%;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  .el-carousel__item:nth-child(3n+1) {
    background-image: url(./icon/首页2.jpg);
    background-size: 100% 100%;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  .el-carousel__item:nth-child(3n+2) {
    background-image: url(./icon/首页3.jpg);
    background-size: 100% 100%;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
</style>
