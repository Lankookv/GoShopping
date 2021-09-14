<template>
  <div id="header">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#F56E1C">
      <div class="logo"><span><img src="icon/v.png"></span><span>购小拼</span></div>
      <el-submenu index="1">
        <template slot="title" class="mine">我的</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
<!--        <el-submenu index="2-4">-->
<!--          <template slot="title">选项4</template>-->
<!--          <el-menu-item index="2-4-1">选项1</el-menu-item>-->
<!--          <el-menu-item index="2-4-2">选项2</el-menu-item>-->
<!--          <el-menu-item index="2-4-3">选项3</el-menu-item>-->
<!--        </el-submenu>-->
      </el-submenu>
      <img src="icon/v.png" class="faces">
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
    }
  },
}
</script>

<style lang="less" scoped>
  .el-menu-demo{
    margin-top: auto;
    .logo{
      float: left;
      margin-top: 5px;
      margin-left: 20px;
      font-size: 35px;
    }
    li{
      float: right;
    }

    .faces{
      float: right;
      margin-right: 10px;
    }
  }

</style>
