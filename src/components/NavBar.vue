<template>
  <div id="header">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#F56E1C">
      <div class="logo"><img src="./icon/logo.png"><span style="text-align: center;line-height:60px;">购小拼</span></div>
      <el-submenu index="1">
        <template slot="title" class="mine">我的</template>
        <el-menu-item index="2-1" @click="toHistoricalGoods">查看历史商品</el-menu-item>
        <el-menu-item index="2-2" @click="toChangePassword">修改密码</el-menu-item>
<!--        <el-menu-item index="2-3">选项3</el-menu-item>-->
<!--        <el-submenu index="2-4">-->
<!--          <template slot="title">选项4</template>-->
<!--          <el-menu-item index="2-4-1">选项1</el-menu-item>-->
<!--          <el-menu-item index="2-4-2">选项2</el-menu-item>-->
<!--          <el-menu-item index="2-4-3">选项3</el-menu-item>-->
<!--        </el-submenu>-->
      </el-submenu>
      <img src="./icon/v.png" class="faces" height="50px">
<!--      <el-menu-item index="2"><img src="v.png"></el-menu-item>-->
<!--      <el-menu-item index="3" disabled>消息中心</el-menu-item>-->
<!--      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
    </el-menu>
  </div>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  mounted () {

  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toHistoricalGoods(){
      this.$router.push({name:'HistoricalGoods',});
    },
    toChangePassword(){
      this.$router.push({name:'ChangePassword',})
    },
  },
}
</script>

<style lang="less" scoped>
  .el-menu-demo{
    margin-top: auto;
    .logo{
      float: left;
      margin-left: 20px;
      font-size: 35px;
      display: flex;
      align-items: center;
      img{
        width: 50px;
        height: 50px;
      }
      //span{
      //  line-height:64.86px;
      //}
    }
    li{
      float: right;
    }

    .faces{
      float: right;
      margin-top: 5px;
      margin-right: 10px;
      border-radius: 30px;
    }
  }

</style>
