<template>
  <div id="app">
    <NavBar></NavBar>
    <div id="content">
      <transition name="fadeInUp" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>

<!--    <img src="./assets/logo.png">-->
<!--    <router-view/>-->
  </div>
</template>

<script>
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    NavBar,
  },
  created(){
    //在页面加载时读取localStorage里的状态信息
    localStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("userMsg"))));

    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload",()=>{
      localStorage.setItem("userMsg",JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style>
  .content{
    height: auto;
  }
#app {
  width: 90%;
  margin-left: 5%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #FBBF9B;
  /*background-color: #F3D7CA;*/
  height:auto;
  min-height:650px;
  overflow: hidden;
}
</style>
