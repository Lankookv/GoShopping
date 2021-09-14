<template>
  <div>
    <carousel></carousel>
    <search></search>
    <div class="container1-1">
      <router-link :to="{name:'GoodDetails',params:{bid:1}}">
        <img src="../components/icon/v.png">
        <div class="container1-2" >
          <h3><b>bts周边</b></h3>
          <h2><b>￥50</b></h2>
        </div>
      </router-link>
    </div>
<!--    <router-link class="container_1" v-for="(course,index) in allCourses" :to="{name:'the_platform_course',params:{cid:course.courseId}}" :key="index" tag="li" >-->
<!--      <div class="container1-1" >-->
<!--        <img :src="course.courseCover">-->
<!--        <div class="container1-2">-->
<!--          <h3><b>{{course.courseName}}</b></h3>-->
<!--          <p><small>{{course.courseUniversity}}&emsp;&emsp;&emsp;{{course.courseAuthor}}</small></p>-->
<!--          <div style="overflow-y: scroll;">-->
<!--            <small>{{course.courseDescription}}</small>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </router-link>-->
  </div>
</template>

<script>
  import carousel from "../components/carousel";
  import search from "../components/search";

  export default {
    name: "home",
    components: {
      carousel,
      search
    },
  }
</script>

<style scoped lang="less">
  .container1-1{
    margin-top: 10px;
    background-color: #F56E1C;
    width: 300px;
    height: 330px;
    border-radius: 10px;
    margin-left: 2%;
    outline-style: none ;
    border: 1px solid #ccc;
    font-size: 14px;
    font-family: "Microsoft soft";
    margin-bottom: 5%;
    img{
      margin-top: 20px;
      width: 250px;
      height: 250px;
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
  .container1-1:focus{
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
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
