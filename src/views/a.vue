<template>
<div>
  <li id="1">
    1
  </li>
  <li id="2">
    2
  </li>
</div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        sid:1
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        alert('' + this.sid);
        var domTheme = document.getElementById('' + this.sid);
        alert(domTheme);
        domTheme.className = "themeCls";
      },
    }
  }
</script>

<style scoped lang="less">
  .themeCls {
    cursor: default;
    color: #fff;
    background-color: #00CC7E;
  }
</style>
