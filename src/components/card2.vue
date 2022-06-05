<template>
  <div @click="toPosts">
    <el-card :body-style="{ padding: '1px'}">
      <br>
      <img src="./icon/posts.png" class="image">
      <div>
        <marquee>欢迎来到安利广场~</marquee >
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "card",
    data() {
      return {
        currentDate: new Date()
      };
    },
    methods:{
      toPosts(){
        this.$router.push({name:'showsquare',})
      }
    }
  }
</script>

<style scoped lang="less">
  .el-card{
    border-radius: 15px;
    overflow: hidden;
  }
  .image {
    width: 100%;
  }
</style>
