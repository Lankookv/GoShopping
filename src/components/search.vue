<template>
  <div class="search">
    <input type="text" class="input-search" v-model="keyword" id="searchTxt" ref="searchTxt" placeholder="bts周边" filterable  value="">
<!--    <link rel="preload" href="//at.alicdn.com/t/font_2810508_kqxwrf1giz.woff2" as="font" type="font/woff2" crossorigin="anonymous">-->
    <img src="./icon/搜索.png" class="iconfont" @click="search">
<!--    <header class="page-header">-->
<!--      <div class="searchwrap border-bottom">-->
<!--        <div class="searchbox">-->
<!--          <span class="icon-search"><img :src="images.searchpng" alt=""></span>-->
<!--          <input type="text" class="input-search" v-model="keyword" id="searchTxt" ref="searchTxt" placeholder="请输入楼盘名称" filterable  value="">-->
<!--          <span class="search-x"><img :src="images.searchxpng" alt="" @click="clearInput"></span>-->
<!--        </div>-->
<!--        <span class="quxiao" style="display:block;" @click="cancel">取消</span>-->
<!--      </div>-->
<!--    </header>-->

<!--    <div class="page-container mt44">-->
<!--      <div class="stafflist" >-->
<!--        <ul>-->
<!--          <li class="clearfix" v-for="(project,index) in searchData" :key="index" @click="selectProject(project)">-->
<!--            <div class="staffinfo">-->
<!--              <div class="s-desc">-->
<!--                <h2>{{project.projname}} <span v-if="project.aliasprojname!=''" class="f13">({{project.aliasprojname}})</span></h2>-->
<!--                <p>{{project.district}} {{project.comarea}}</p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="mask" style="display:none"></div>-->
  </div>
</template>

<script>
  import {search} from "../api";

  export default {
    name: "search",
    data() {
      return {
        goods:[],
      }
    },
    methods:{
      search(){
        search({
          q:JSON.stringify(document.getElementById('searchTxt').value),
          contentType: "application/json"
        }).then((response)=> {
          //this.goods=response;
        })
      },
    }
  }
</script>

<style scoped lang="less">
.search{
  display:flex;
  border: 1px solid #ccc;
  border-radius: 20px;
  width: 400px;
  margin:0 auto;
  background-color: white;
}
.search:focus{
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
}
//input:focus{
//  border-color: #66afe9;
//  outline: 0;
//  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
//  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
//}
.input-search{
  border:none;
  width: 340px;
  font-size: 14px;
  font-weight: 700;
  font-family: "Microsoft soft";
  padding: 8px 8px;
  margin-left: 10px;
  background-color:transparent;
  outline:none;
}
.iconfont {
  align-self:center;
  font-family: "iconfont" !important;
  width: 20px;
  //font-size: 10px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.iconfont:hover{
  cursor:Pointer;
}

</style>
