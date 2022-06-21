<template>
  <div id="banner">
    <img :src="imgArr[index]" id="pic">
<!--    <img src="../components/icon/左滑.png" id="left" @click="pre()" >-->
<!--    <img src="../components/icon/右滑.png" id="right" @click="next()">-->
  </div>
</template>

<style>
  #banner{
    width: 1000px;
    height: 300px;
    position: relative;
    /*z-index: 0;*/
  }
  #pic{
    z-index: 0;
    width: 750px;
    height: 278px;
    float: left;
  }
  #left{
    z-index: 1;
    position: absolute;
    left: 10px;
    bottom: 200px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    background-color: white;
  }
  #right{
    z-index: 1;
    position: absolute;
    right: 2px;
    bottom: 200px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    background-color: white;
  }

</style>

<script>

  export default {
    data(){
      return{
        selected: 0, // 当前展示的图片
        flag: true, // 节流阀，防止连续点击切换
        index: 0,
        imgArr: [	// 图片数组
          require("../components/icon/bannerPic1.png"),]
          // require("../components/icon/2.jpg"),
          // require("../components/icon/3.jpg"),]
      }
    },
    methods:{
      pre(){
        if(this.index>0){
          this.index--;
        }
        else if(this.index==0){
          this.index=2;
        }
      },
      next(){
        if(this.index<2){
          this.index++;
        }
        else if(this.index==2){
          this.index=0;
        }
      },
    }

  }

</script>
