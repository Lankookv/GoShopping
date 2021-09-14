<template>
  <div class="search">
    <input type="text" class="input-search" v-model="keyword" id="searchTxt" ref="searchTxt" placeholder="bts周边" filterable  value="">
<!--    <link rel="preload" href="//at.alicdn.com/t/font_2810508_kqxwrf1giz.woff2" as="font" type="font/woff2" crossorigin="anonymous">-->
    <span class="iconfont">&#xe635;</span>
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
  export default {
    name: "search"
  }
</script>

<style scoped lang="less">
.search{
  margin-top: 5px;
}
input{
  outline-style: none ;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 8px 8px;
  width: 350px;
  font-size: 14px;
  font-weight: 700;
  font-family: "Microsoft soft";
}
input:focus{
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
}

@font-face {
  font-family: 'iconfont';  /* Project id 2810508 */
  src: url('//at.alicdn.com/t/font_2810508_kqxwrf1giz.woff2?t=1631580008886') format('woff2'),
  url('//at.alicdn.com/t/font_2810508_kqxwrf1giz.woff?t=1631580008886') format('woff'),
  url('//at.alicdn.com/t/font_2810508_kqxwrf1giz.ttf?t=1631580008886') format('truetype');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 20px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
