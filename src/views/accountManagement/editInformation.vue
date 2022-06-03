<template>
  <div style="font-weight: bold;">
    <h1 style=" width: 100%;text-align: left;margin-left: 5%;">编辑信息</h1>
    <div style="width: 60%; margin-top: 10px;margin-left: 20%;">
      <el-form ref="form" :model="form" label-width="140px" class="form" :rules="rules">
        <el-form-item prop="name" label="姓名：">
          <el-input type="text" v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="电话号码：">
          <el-input type="text" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item prop="location" label="交易地址：" >
          <el-input type="textarea" v-model="form.location"></el-input>
        </el-form-item>
        <el-form-item style="margin-right: 140px;">
          <el-button type="primary" @click="onSubmit('form')">修改</el-button>
          <el-button @click="toMycenter">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

  import {editSellerInformation,showSellerInfo} from "../../api";

  export default {
    data:function() {
        var phoneCheck = (rule, value, callback) => {
        var re=/[1][3456789]\d{9}$/;
       if (value.length !== 11) {
          return callback(new Error('电话号码只能是11位'));
        } else if (!re.test(value)) {
          return callback(new Error('请输入正确的电话号码'));
        } else {
          callback();
        }
      };

      return {
        form: {
          name:'',
          phone:'',
          location:''
        },
        rules: {
          name: [
            {required: true, trigger: 'blur'},
            {min: 3, max: 15, message: '请输入3-15位字符', trigger: 'blur'}
          ],
          phone: [
            { required: true, trigger: 'blur'},
            {validator: phoneCheck, trigger: 'blur',}
          ],
          address: [
            { required: true, message: '请输入地址',trigger: 'blur'},
            {trigger: 'blur'}
          ]
        },
        sellerInfo:[],
      }

    },
    mounted() {
      this.init()
    },

    methods: {
      init(){
        if(JSON.parse(sessionStorage.getItem("userId"))!=null){
          showSellerInfo({
            sellerId:parseInt(sessionStorage.getItem("userId")),
            contentType: "application/json"
          })
            .then((response) => {
              this.sellerInfo=response.data.data;
              console.log(this.sellerInfo);
              this.$set(this.form, 'name',this.sellerInfo.name);
              this.$set(this.form, 'phone',this.sellerInfo.phone);
              this.$set(this.form, 'location',this.sellerInfo.location);
            })
        }

      },
      toMycenter(){
        this.$router.push('sellerCentral');
      },
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            editSellerInformation({
              sellerId:parseInt(sessionStorage.getItem("userId")),
              name:this.form.name,
              phone:this.form.phone,
              location:this.form.location,
              contentType: "application/json"
            })
              .then((response) => {
                if(response.data.code !== -1){
                  this.$message.success('修改成功！');
                  this.$router.push('sellerCentral');
                  this.init()
                }else {
                  this.$message.error('修改失败！');
                }
              })
          } else {
            this.$message.error('修改失败！');
          }
        })
      }
    },
  };
</script>

<style scoped lang="less">
  .form .el-form-item__label{
    font-size: 1.5em;
    color: #2c3e50;
  }
  .el-textarea__inner {
    resize: none;
    height: 140px;
  }
  .el-upload--picture-card{
    cursor: pointer;
    width: 138px;
    height: 138px;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    width: 138px;
    height: 138px;
  }
  .iconfont{
    font-family:"iconfont" !important;
    width:60px;
    margin-top: 35px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
</style>
