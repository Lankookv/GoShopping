<template>
  <el-row>
    <el-col :span="24" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 1 : 0">
      <el-card :body-style="{ padding: '1px'}">
        <br>
        <img src="./icon/posts.png" class="image">
<!--        <div style="padding: 40px;">-->
        <div>
          <marquee>欢迎来到安利广场~</marquee >
          <!--          <div class="bottom clearfix">-->
          <!--            <time class="time">{{ currentDate }}</time>-->
          <!--            <el-button type="text" class="button">操作按钮</el-button>-->
          <!--          </div>-->
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "card",
    data() {
      return {
        currentDate: new Date()
      };
    }
  }
</script>

<style scoped lang="less">
  .el-card{
    //background-color: antiquewhite;
  }
  .el-card, .el-message {
    border-radius: 15px;
    overflow: hidden;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
    margin-bottom: 10px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
