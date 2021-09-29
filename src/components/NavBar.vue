<template>
  <div id="header">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#F56E1C">
      <div class="logo" @click="toHome"><img src="./icon/logo.png"><span style="text-align: center;line-height:60px;">购小拼</span></div>

      <div class="login">
        <button class="btn1" @click="Login">
          登录
        </button>
        <button class="btn2" @click="Register">
          注册
        </button>
      </div>

<!--      <el-submenu index="1">-->
<!--        <template slot="title" class="mine">我的</template>-->
<!--        <el-menu-item index="2-1" @click="toSetting">我的设置</el-menu-item>-->
<!--        <el-menu-item index="2-2" @click="toChangePassword">修改密码</el-menu-item>-->
<!--        <el-menu-item index="2-3" @click="toHistoricalGoods">查看历史商品</el-menu-item>-->
<!--        <el-menu-item index="2-4" @click="toProspectiveBuyers">查看意向购买人</el-menu-item>-->
<!--        <hr>-->
<!--        <el-menu-item index="2-5" @click="logout">退出登录</el-menu-item>-->
<!--&lt;!&ndash;        <el-submenu index="2-4">&ndash;&gt;-->
<!--&lt;!&ndash;          <template slot="title">选项4</template>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-menu-item index="2-4-1">选项1</el-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-menu-item index="2-4-2">选项2</el-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-menu-item index="2-4-3">选项3</el-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-submenu>&ndash;&gt;-->
<!--      </el-submenu>-->
<!--      <img src="./icon/v.png" class="faces" height="50px">-->
<!--      <el-menu-item index="2"><img src="v.png"></el-menu-item>-->
<!--      <el-menu-item index="3" disabled>消息中心</el-menu-item>-->
<!--      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->


    </el-menu>
    <div class="login-wrap" :style="showModal===false?'display:none':'display:block'">
      <div class="ms-login" v-if="two">
        <div class="ms-title">欢迎来到购小拼<i class="iconfont" @click="close">&#xe650;</i></div>
        <el-form :model="loginParam" :rules="rules" ref="loginForm" label-width="0px" class="ms-content">
          <el-form-item prop="account">
            <el-input v-model="loginParam.account" placeholder="用户名" prefix-icon="el-icon-user">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginParam.password" prefix-icon="el-icon-lock">
            </el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button type="primary" @click="submitLoginForm('loginForm')">登录</el-button>
          </div>
          <el-link type="primary" @click="two = false" style="text-align:center;float:left">去注册 ></el-link>
          <el-link type="primary" @click="goFindPwd()" style="text-align:center;float:right">找回密码？</el-link>
        </el-form>
      </div>
      <div class="ms-login" v-else>
        <div class="ms-title">欢迎来到购小拼<i class="iconfont" @click="close">&#xe650;</i></div>
        <el-form :model="registerParam" :rules="rules" ref="registerForm" label-width="0px" class="ms-content">
          <el-form-item prop="username">
            <el-input v-model="registerParam.username" placeholder="用户名" prefix-icon="el-icon-user">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="registerParam.password" prefix-icon="el-icon-lock">
            </el-input>
          </el-form-item>
          <el-form-item prop="r_password">
            <el-input type="password" placeholder="确认密码" v-model="registerParam.r_password" prefix-icon="el-icon-lock">
            </el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="registerParam.email" placeholder="邮箱" prefix-icon="el-icon-message">
            </el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button type="primary" @click="submitRegisterForm('registerForm')">注册</el-button>
          </div>
          <el-link type="primary" @click="two = true" style="text-align: center;">去登陆 ></el-link>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '../api'

export default {
  components: {

  },
  data:function() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerParam.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      activeIndex: '1',
      activeIndex2: '1',
      two: true,
      showModal:false,
      loginParam: {},
      registerParam: {},
      rules: {
        account: [{ required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 32, message: '请输入2-20位字符', trigger: 'blur'}],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 0, max: 32, message: '请输入6-32位字符', trigger: 'blur'}],
        r_password: [{ required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: "email", message: '请输入正确电子邮件地址', trigger: 'blur' }]
      },
    };
  },
  mounted () {

  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toHome(){
      this.$router.push({name:'Home',});
    },
    toHistoricalGoods(){
      this.$router.push({name:'HistoricalGoods',});
    },
    toChangePassword(){
      this.$router.push({name:'ChangePassword',})
    },
    toProspectiveBuyers(){
      this.$router.push({name:'ProspectiveBuyers',})
    },
    Login(){
      this.two=true;
      this.showModal=!this.showModal;
    },
    Register(){
      this.two=false;
      this.showModal=!this.showModal;
    },
    close(){
      this.showModal=!this.showModal;
    },
    submitLoginForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.loginParam)
            .then((response)=> {
              console.log(response);
              alert("this.loginParam:"+this.loginParam);
              sessionStorage.clear();
              sessionStorage.setItem('token', response.data.details.token);
              localStorage.setItem('token', response.data.details.token);
              localStorage.setItem('id', response.data.details.id);
              localStorage.setItem('account',response.data.details.account);
              this.$message.success('登录成功');
              this.$router.push('/home');
            })
            .catch(error => {
              this.$message.error('用户名或密码错误');
            });
        } else {
          this.$message.error('请输入账号和密码');
          return false;
        }
      });
    },
    submitRegisterForm(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          register(this.registerParam)
            .then((response)=> {
              this.$message.success('注册成功');
              this.loginParam.username = this.registerParam.username
              this.loginParam.password = this.registerParam.password
              this.two = true
            })
            .catch((error)=> {
              var key = Object.keys(error.response.data.details)[0]
              this.$message.error(error.response.data.details[key][0]);
            });
        } else {
          this.$message.error('请根据提示输入必填项');
          return false;
        }
      });
    },
    goFindPwd(){
      this.$message.error('找个锤子。');
    },
  },
}
</script>

<style lang="less" scoped>
  @font-face {
    font-family: 'iconfont';  /* Project id 2810508 */
    src: url('//at.alicdn.com/t/font_2810508_q2uw1cggabk.woff2?t=1632579523926') format('woff2'),
    url('//at.alicdn.com/t/font_2810508_q2uw1cggabk.woff?t=1632579523926') format('woff'),
    url('//at.alicdn.com/t/font_2810508_q2uw1cggabk.ttf?t=1632579523926') format('truetype');
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
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

    .login{
      float: right;
      width: 13%;
      height: 100%;
      .btn1{
        border-radius: 15px;
        background-color: transparent;
        height: 32px;
        width: 56px;
        margin-top: 9%;
      }
      .btn1:hover{
        border-radius: 15px;
        background-color: transparent;
        color: #FBBF9B;
        border: #FBBF9B 2px;
        border-style: outset;
        height: 32px;
        width: 56px;
        margin-top: 9%;
        cursor:Pointer;
      }
      .btn2{
        border-radius: 15px;
        background-color: transparent;
        height: 32px;
        width: 56px;
        margin-left: 10px;
      }
      .btn2:hover{
        border-radius: 15px;
        background-color: transparent;
        color: #FBBF9B;
        border: #FBBF9B 2px;
        border-style: outset;
        height: 32px;
        width: 56px;
        margin-left: 10px;
        cursor:Pointer;
      }
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
  .login-wrap {
    z-index:9999;
    position: absolute;
    width: 89%;
    height: 100%;
    background-size: 100%;
  }
  .ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #2d333f;
    border-bottom: 1px solid #ddd;
    i{
      float: right;
      margin-right: 15px;
      cursor:Pointer;
    }
  }
  .ms-login {
    position: absolute;
    left: 50%;
    top: 40%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: white;
    overflow: hidden;
  }
  .ms-content {
    padding: 30px 30px;
  }
  .login-btn {
    text-align: center;
  }
  .login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
  }
</style>
