<template>
  <div id="header">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#F6792E" text-color="#2c3e50">
      <div class="logo" @click="toHome"><img src="./icon/logo.png"><span style="text-align: center;line-height:60px;">购小拼</span></div>
      <div class="login" v-if="!isLogin">
        <button class="btn1" @click="Login">
          登录
        </button>
        <button class="btn2" @click="Register">
          注册
        </button>
      </div>
      <div v-else class="hasLogin">
        <el-submenu index="1" v-if="!isSeller">
          <template slot="title" class="mine">我的</template>
          <el-submenu index="2-1" :popper-append-to-body="true">
            <template slot="title">账号管理</template>
            <el-menu-item index="2-1-1" @click="toChangePassword">修改密码</el-menu-item>
            <el-menu-item index="2-1-2" @click="toEditInformation">编辑信息</el-menu-item>
          </el-submenu>
          <el-submenu index="2-4" :popper-append-to-body="true">
            <template slot="title">订单管理</template>
            <el-menu-item index="2-3-1" @click="toPurchaseRecords">查看历史下单记录</el-menu-item>
          </el-submenu>
          <hr>
          <el-menu-item index="2-6" @click="buyerLogout">退出登录</el-menu-item>
        </el-submenu>
        <el-submenu index="1" v-else>
          <template slot="title" class="mine">我的</template>
          <el-submenu index="2-1" :popper-append-to-body="true">
            <template slot="title">账号管理</template>
            <el-menu-item index="2-1-1" @click="toChangePassword">修改密码</el-menu-item>
<!--            <el-menu-item index="2-1-2" @click="toEditInformation">编辑信息</el-menu-item>-->
          </el-submenu>
          <el-submenu index="2-2" :popper-append-to-body="true">
            <template slot="title">商品管理</template>
            <el-menu-item index="2-2-1" @click="toReleaseGoods">发布商品</el-menu-item>
            <el-menu-item index="2-2-2" @click="toHistoricalGoods">查看历史商品</el-menu-item>
          </el-submenu>
          <el-submenu index="2-3" :popper-append-to-body="true">
            <template slot="title">交易管理</template>
            <el-menu-item index="2-3-1" @click="toProspectiveBuyers">查看意向购买人</el-menu-item>
          </el-submenu>
          <el-submenu index="2-4" :popper-append-to-body="true">
            <template slot="title">客户管理</template>
            <el-menu-item index="2-3-1" @click="toCustomerInformation">查看客户信息</el-menu-item>
          </el-submenu>
          <hr>
          <el-menu-item index="2-6" @click="sellerLogout">退出登录</el-menu-item>
        </el-submenu>
        <img src="./icon/v.png" class="faces" height="50px">
      </div>
    </el-menu>
    <div class="login-wrap" :style="showModal===false?'display:none':'display:block'" style="padding: 30px 30px 10px 30px">
      <div class="ms-login" v-if="two">
        <div class="ms-title">欢迎来到购小拼<img src="./icon/关闭.png" class="iconfont" @click="close"></div>
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
        <div class="ms-title">欢迎来到购小拼<img src="./icon/关闭.png" class="iconfont" @click="close"></div>
        <el-form :model="registerParam" :rules="rules" ref="registerForm" label-width="0px" class="ms-content" style="padding: 30px 30px 10px 30px">
          <el-form-item prop="account">
            <el-input v-model="registerParam.account" placeholder="用户名" prefix-icon="el-icon-user">
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
          <el-form-item prop="phone" style="margin-bottom: 15px;">
            <el-input v-model="registerParam.phone" placeholder="手机号码" prefix-icon="el-icon-message">
            </el-input>
          </el-form-item>
          <div style="margin-bottom: 15px;text-align:left;color: #606266;font-size: 14px;">身份选择：
            <el-radio v-model="registerParam.authority" label="2">买家</el-radio>
            <el-radio v-model="registerParam.authority" label="1">卖家</el-radio>
          </div>
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
      isLogin:false,
      isSeller:false,
      two: true,
      showModal:false,
      loginParam: {},
      registerParam: {authority:"2",},
      rules: {
        account: [{ required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '请输入3-15位字符', trigger: 'blur'}],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '请输入6-12位字符', trigger: 'blur'}],
        r_password: [{ required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的11位手机号码', trigger: 'blur' }],
        authority: [{ required: true, message: '请选择身份', trigger: 'blur' },
          { trigger: 'blur' }],
      },
    };
  },
  created () {
    this.init();
  },
  methods: {
    init(){
      //alert("userId:"+sessionStorage.getItem("userId")+"buyerId:"+sessionStorage.getItem("buyerId")+"isSeller:"+sessionStorage.getItem("isSeller"))
      if(sessionStorage.getItem("userId")==null&&sessionStorage.getItem("buyerId")==null){
        this.isLogin=false;
      }else {
        this.isLogin=true;
      }
      if(sessionStorage.getItem("isSeller")==="false"){
        this.isSeller=false;
      }else {
        this.isSeller=true;
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toHome(){
      this.$router.push({name:'Home',});
    },
    toReleaseGoods(){
      this.$router.push({name:'ReleaseGoods',});
    },
    toHistoricalGoods(){
      this.$router.push({name:'HistoricalGoods',});
    },
    toChangePassword(){
      this.$router.push({name:'ChangePassword',})
    },
    toEditInformation(){
      this.$router.push({name:'editInformation',})
    },
    toProspectiveBuyers(){
      this.$router.push({name:'ProspectiveBuyers',})
    },
    toCustomerInformation(){
      this.$router.push({name:'CustomerInformation',})
    },
    Login(){
      this.two=true;
      sessionStorage.removeItem('buyerId');
      sessionStorage.removeItem('userId');
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
              // sessionStorage.clear();
              // sessionStorage.setItem('token', response.data.details.token);
              // sessionStorage.setItem('token', response.data.details.token);
              // sessionStorage.setItem('id', response.data.details.id);
              // sessionStorage.setItem('account',response.data.details.account);
              if(response.data.code===-1){
                this.$message.error('用户名或密码错误');
              }
              else{
                if(response.data.data>0){
                  sessionStorage.setItem('isSeller', true);
                  this.isSeller=true;
                  sessionStorage.setItem('userId', response.data.data);
                }else {
                  sessionStorage.setItem('isSeller', false);
                  this.isSeller=false;
                  sessionStorage.setItem('buyerId', -response.data.data);
                }
                this.isLogin=!this.isLogin;
                this.$message.success('登录成功');
                this.showModal=!this.showModal;
                this.$router.push('/');
              }
            })
        } else {
          this.$message.error('请输入账号和密码');
          return false;
        }
      });
    },
    buyerLogout(){
      sessionStorage.removeItem('buyerId');
      sessionStorage.removeItem('isSeller');
      this.isLogin=!this.isLogin;
      this.$message.success('退出登录成功');
      this.$router.push('/');
    },
    sellerLogout(){
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('isSeller');
      this.isLogin=!this.isLogin;
      this.$message.success('退出登录成功');
      this.$router.push('/');
    },
    submitRegisterForm(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          register(this.registerParam)
            .then((response)=> {
              if(response.data.code===-1){
                this.$message.error('注册失败！');
              }else {
                this.$message.success('注册成功');
                this.loginParam.account = this.registerParam.account
                this.loginParam.password = this.registerParam.password
                this.showModal=!this.showModal;
              }
            })
        } else {
          this.$message.error('请根据提示输入必填项');
          return false;
        }
      });
    },
    goFindPwd(){
      this.$message.error('重新注册吧');
    },
  },
}
</script>

<style lang="less" scoped>
  //.el-menu--collapse .el-menu .el-submenu, .el-menu--popup {
  //  min-width:140px !important;
  //}
  .iconfont{
    float: right;
    margin-top: 10px;
    margin-right: 10px;
    font-family:"iconfont" !important;
    width:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
  .iconfont:hover{
    float: right;
    margin-top: 10px;
    margin-right: 10px;
    font-family:"iconfont" !important;
    width:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    cursor:Pointer;
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
