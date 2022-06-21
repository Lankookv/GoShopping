<template>
  <div class="container">
    <div class="container0">
      <span class="title">
        <b>欢迎来到分享广场！</b>
      </span>
    </div>
    <div class="container1">
      <button class="create" @click="toReleasePosts" style="cursor: pointer;">创建</button>
    </div>
    <div class="container2">
      <div v-if="this.allPosts.length === 0 ">
        <center>
          <img src="../components/icon/pic30.png" style="margin-top: 15px">
        </center>
        <div style="text-align: center;">
          <span style="text-align: center">暂无任何帖子哦 /(ㄒoㄒ)/~~</span>
      </div>
      </div>
      <ul    :loading="loadings.table" >
        <router-link v-for="(post,index) in allPosts" :to="{name:'postDetails',params:{pid:post.forumId}}" :key="index" tag="li">
<!--          <div class="container2-1" style="overflow: hidden;margin-left: 40%">-->

<!--          </div>-->
          <div class="container2-2" style="overflow:hidden">
            <img :src="post.img[0].imagine" style="width: 20%;float: left;margin-left: 1%;margin-top: 1%;height: 160px">
            <div class="container2-3" style="float: left;width: 50%">
              <h2 style="text-align:left;font-size: 20px;margin-left: 5%"><b>{{post.name}}</b></h2>
              <span style="float:left;text-align: left;margin-left: 5%">{{post.description}}</span>
              <h3 style="text-align: left;margin-top: 23%;margin-left: 5%;color:#696969">{{post.postDate.substring(0,10)+"    "+post.postDate.substring(11,16)}}</h3>
           </div>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>

  import {getAllPosts,} from "../api";

  export default {
    name: "showSquare",
    components: {
    },
    data() {
      return {
        allPosts:[],
        loadings: {
          table: true,
        },
      }
    },
    mounted () {
      this.init();
    },
    methods: {
      init() {
        this.allPosts=[];
        getAllPosts({
        }).then((response) => {
          this.allPosts = response.data.data;
        })
      },
      toReleasePosts(){
        if(sessionStorage.getItem("buyerId") == null){
          this.$message.error("请先登录");
        }else {
          this.$router.push({name:'ReleasePosts',})
        }
      }
    },
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
    height: auto;
    min-height: 50px;
    overflow: hidden;
    .title {
      float: left;
      margin-top: 2%;
      margin-left: 35%;
      font-size: 32px;
    }
    .create{
      width: 7%;
      height: 35px;
      border-radius: 5px;
      background-color: #F88E4E;
      border: 1px solid black;
      margin-top: 2%;
      margin-left: 55%;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;//默认不换行
    padding-bottom: 10px;
    padding-inline-start:0;
    margin-top: 5px;
    margin-left: 15%;
    li{
      width: 80%;
      margin:2% 4% 0% 4%;
      padding-bottom: 2%;
      list-style: none;
      border-bottom: 2px solid #696969;
      .container1-2 {
        width: 50%;
        float:left;
        margin-left: 1%;
        text-align: left;
        h2{
          margin-left: 4%;
          margin-bottom: 0px;
        }
        p{
          margin-left: 3%;
          color: darkgray;
        }
        div{
          height: 140px;
          width: 101%;
          margin:1% 0% 0% 3%;
        }
      }
    }
  }
  .faces{
    float: left;
    margin-top: 5px;
    margin-right: 30px;
    border-radius: 30px;
  }
</style>
