<template>
  <div>
    <h1>
      修改密码
    </h1>
    <h2>
      请输入旧密码：
      <input type="text"></input>
    </h2>
    <h2>
      请输入新密码：
      <input type="text"></input>
    </h2>
    <h2>
      请确认新密码：
      <input type="text"></input>
    </h2>
    <button>
      确认修改
    </button>
  </div>
</template>

<script>
  export default {
    name: "ChangePassword"
  }
</script>

<style scoped lang="less">
h1{
  width: 100%;
  text-align: left;
  margin-left: 5%;
}
h2{
  margin-top: 4%;
}
input{
  padding:8px;
  width: 25%;
  border: 1px solid;
  border-radius: 10px;
}
button{
  width: 15%;
  height: 40px;
  margin-top: 8%;
  font-size: 20px;
  background-color: #F56E1C;
  border: 1px solid;
  border-radius: 10px;
}
button:hover{
  width: 15%;
  height: 40px;
  margin-top: 8%;
  font-size: 20px;
  background-color: #F56E1C;
  border: 1px solid #cccccc;
  border-radius: 10px;
}
</style>
