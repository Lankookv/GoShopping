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
  created() {
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
  height:auto;
  min-height:650px;
  overflow: hidden;
}
</style>
