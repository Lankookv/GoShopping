<template>
  <div class="changepassword">
    <el-form ref="changePwdForm" class="changeForm" :model="changePwdParam" :rules="rules" >
      <h1>修改密码</h1>
      <h2 style="margin-right: 18%">请输入原密码：</h2>
      <el-form-item  prop="oldPassword">
        <el-input type="password" id="oldpwd" @change="getOldPassword(changePwdParam.oldPassword)" v-model="changePwdParam.oldPassword" style="width:400px"></el-input>
        <img src="../../components/icon/icon_通用_对错_对.png" class="iconfont" style="color: green" v-if="oldPwdFlag == 1">
        <img src="../../components/icon/icon_通用_对错_错.png" class="iconfont" style="color: red" v-else-if="oldPwdFlag == 2">
      </el-form-item >
      <h2 style="margin-right: 18%">请输入新密码：</h2>
      <el-form-item  prop="newPassword">
        <el-input type="password" v-model="changePwdParam.newPassword" style="width:400px"></el-input>
        <img src="../../components/icon/icon_通用_对错_对.png" class="iconfont" style="color: green" v-if="newPwdFlag == 1">
        <img src="../../components/icon/icon_通用_对错_错.png" class="iconfont" style="color: red" v-else-if="newPwdFlag == 2">
      </el-form-item >
      <h2 style="margin-right: 18%">请确认新密码：</h2>
      <el-form-item  prop="r_newPassword">
        <el-input type="password" v-model="changePwdParam.r_newPassword" style="width:400px"></el-input>
        <img src="../../components/icon/icon_通用_对错_对.png" class="iconfont" style="color: green" v-if="againPwdFlag == 1">
        <img src="../../components/icon/icon_通用_对错_错.png" class="iconfont" style="color: red" v-else-if="againPwdFlag == 2">
      </el-form-item >
      <button type="primary" @click="handleSubmit('changePwdForm')"> 确认修改</button>
    </el-form>
  </div>
</template>

<script>
  import {changeBuyerPassword, changeSellerPassword, checkSellerOldPassword,checkBuyerOldPassword} from '../../api'
  export default {
    name: "ChangePassword",
    data: function () {
      //旧密码验证
      var oldPasswordcheck = (rule, value, callback) => {
        var str = '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0';
        if (value.length === 0) {
          this.oldPwdFlag=2;
          return callback(new Error(str+'新密码不能为空！'));
        }else {
          callback();
        }
      }

      // 新密码验证
      var newPasswordcheck = (rule, value, callback) => {
        var str = '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0';
        if(value == this.oldPassword){
          this.newPwdFlag=2;
          return callback(new Error(str+'新密码不能与旧密码相同！'));
        } else if (value.length == 0) {
          this.newPwdFlag=2;
          return callback(new Error(str+'新密码不能为空！'));
        } else if (value.length < 6) {
          this.newPwdFlag=2;
          return callback(new Error(str+'新密码不能少于6位！'));
        } else if (value.length > 12) {
          this.newPwdFlag=2;
          return callback(new Error(str+'密码最长不能超过12位！'));
        } else {
          this.newPwdFlag=1;
          callback();
        }
      }
      // 重复密码验证
      var r_newPasswordcheck = (rule, value, callback) => {
        var str = '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0';
        if (value.length === 0) {
          this.againPwdFlag=2;
          return callback(new Error(str+'重复密码不能为空！'));
        } else if (value !== this.changePwdParam.newPassword) {
          this.againPwdFlag=2;
          return callback(new Error(str+'两次输入密码不一致！'));
        } else {
          this.againPwdFlag=1;
          callback();
        }
      };
      return {
        oldPwdFlag: 0,
        newPwdFlag: 0,
        againPwdFlag: 0,
        changePwdParam: {
          oldPassword: "",
          newPassword: "",
          r_newPassword: ""
        },
        rules: {
          oldPassword: [
            {trigger: 'blur'},
            {validator:oldPasswordcheck,trigger: 'blur'}
          ],
          newPassword: [
            {trigger: 'blur'},
            {validator: newPasswordcheck, trigger: 'blur',}
          ],
          r_newPassword: [
            {trigger: 'blur'},
            {validator: r_newPasswordcheck, trigger: 'blur'}
          ]
        },
        a:{},
        oldPassword:'',
      }
    },
    methods: {
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert("JSON.parse(sessionStorage.getItem(\"userId\")):"+JSON.parse(sessionStorage.getItem("userId")))
            // alert("JSON.parse(sessionStorage.getItem(\"buyerId\")):"+JSON.parse(sessionStorage.getItem("buyerId")))
            if(JSON.parse(sessionStorage.getItem("userId"))!=null){
              // alert("a")
              changeSellerPassword({
                userId: parseInt(sessionStorage.getItem("userId")),
                password:  this.changePwdParam.oldPassword,
                newPassword: this.changePwdParam.newPassword,
                contentType: "application/json"
              })
                .then((response) => {
                  this.a=response;
                  if(response.data.code !== -1){
                    this.$message.success('修改成功！');
                    this.$router.push('/');
                  }else {
                    this.$message.error('修改失败！');
                  }
                })
            }
            else {
              // alert("b")
              changeBuyerPassword({
                userId: parseInt(sessionStorage.getItem("buyerId")),
                password:  this.changePwdParam.oldPassword,
                newPassword: this.changePwdParam.newPassword,
                contentType: "application/json"
              })
                .then((response) => {
                  this.a=response;
                  if(response.data.code !== -1){
                    this.$message.success('修改成功！');
                    this.$router.push('/');
                  }else {
                    this.$message.error('修改失败！');
                  }
                })
            }
          } else {
            this.$message.error('修改失败！');
          }
        })
      },

      getOldPassword(oldpwd) {//验证旧密码
        this.oldPassword = oldpwd;
        var str = '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0';
        if(JSON.parse(sessionStorage.getItem("userId"))!=null) {
          // alert("a1")
          checkSellerOldPassword({
            userId: parseInt(sessionStorage.getItem("userId")),
            password: (oldpwd)
          })
            .then((response) => {
              if (response.data.code !== -1) {
                this.oldPwdFlag = 1;
              } else {
                // alert("旧密码错误")
                this.oldPwdFlag = 2;
                return callback(new Error(str + "旧密码错误"));
              }
            })
        }
        else {
          // alert("b1")
          this.oldPassword = oldpwd;
          checkBuyerOldPassword({
            userId:parseInt(sessionStorage.getItem("buyerId")),
            password:(oldpwd)})
            .then((response) => {
              if (response.data.code !== -1) {
                this.oldPwdFlag=1;
              } else {
                // alert("旧密码错误")
                this.oldPwdFlag=2;
                return callback(new Error(str+"旧密码错误"));
              }
            })
        }

      }
    }
  }
</script>
<style scoped lang="less">
  .iconfont{
    font-family:"iconfont" !important;
    width:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.4px;
    -moz-osx-font-smoothing: grayscale;
  }
  h1{
    width: 100%;
    text-align: left;
    margin-left: 5%;
  }
  h2{
    margin-top: 0%;
  }
  el-input{
    padding:8px;
    width: 25%;
    border: 1px solid;
    border-radius: 10px;
  }
  button{
    width: 15%;
    height: 40px;
    margin-top: 3%;
    margin-right: 1.5%;
    font-size: 20px;
    background-color: #F56E1C;
    border: 1px solid;
    border-radius: 10px;
  }
  button:hover{
    width: 15%;
    height: 40px;
    margin-top: 3%;
    font-size: 20px;
    background-color: #F56E1C;
    border: 1px solid #cccccc;
    border-radius: 10px;
  }
</style>
