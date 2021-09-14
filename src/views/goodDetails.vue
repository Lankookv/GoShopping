<template>
  <div class="container">
    <div class="container1">
      <img src="../components/icon/v.png" alt="这里是封面">
      <div class="container2">
        <h2><b>Course.courseName</b></h2>
        <div style="overflow-y: scroll" class="Cinfo">
          <small>Course.courseInfo</small>
        </div>
      </div>
    </div>
<!--    <div class="container1">-->
<!--      <img :src="Course.courseCover" alt="这里是封面">-->
<!--      <div class="container2">-->
<!--        <h2><b>{{Course.courseName}}</b></h2>-->
<!--        <div style="overflow-y: scroll" class="Cinfo">-->
<!--          <small>{{Course.courseInfo}}</small>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
  export default {
    name: "goodDetails",
  }
</script>

<style scoped lang="less">
  .container {
    width: 75%;
    padding: 20px 2px 5px 5%; //上右下左
    margin: 0 auto;
    float: left;
    font-size: 15px;
    .container1{
      height:250px;
      margin:0 2%;
      img{
        width: 300px;
        height: 300px;
        float: left;
        margin:auto;
      }
      .container2 {
        width: 60%;
        height: 85%;
        float:right;
        h2{
          margin-left: 5%;
          margin-bottom: 2%;
        }
        div{
          width:95%;
          height: 75%;
          margin:1px 0px 1px 5%;
        }
      }
    }
  }
</style>
