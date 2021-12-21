<template>
  <div style="font-weight: bold;">
    <h1 style=" width: 100%;text-align: left;margin-left: 5%;">编辑信息</h1>
    <div style="width: 60%; margin-top: 10px;margin-left: 20%;">
      <el-form ref="form" :model="form" label-width="140px" class="form" :rules="rules">
        <el-form-item prop="name" label="姓名：">
          <el-input type="text" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="电话号码：">
          <el-input type="text" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item prop="address" label="默认地址：" >
          <el-input type="textarea" v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item style="margin-right: 140px;">
          <el-button type="primary" @click="onSubmit('form')">修改</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

  import {editInformation} from "../../api";

  export default {
    data:function() {
        var phoneCheck = (rule, value, callback) => {
        var re=/[1][345789]\d{9}$/;
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
          address:''
        },
        rules: {
          name: [
            { required: true, message: '请输入名字',trigger: 'blur'},
            {min: 3, max: 15, message: '请输入3-15位字符', trigger: 'blur'}
          ],
          phone: [
            { required: true, message: '请输入电话号码',trigger: 'blur'},
            {validator: phoneCheck, trigger: 'blur',}
          ],
          address: [
            { required: true, message: '请输入地址',trigger: 'blur'},
            {trigger: 'blur'}
          ]
        }
      }

    },
    methods: {
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            editInformation({
              buyerId:parseInt(sessionStorage.getItem("buyerId")),
              buyerName:this.form.name,
              buyerPhone:this.form.phone,
              buyerLocation:this.form.address,
              contentType: "application/json"
            })
              .then((response) => {
                if(response.data.code !== -1){
                  this.$message.success('修改成功！');
                  this.$router.push('/');
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
