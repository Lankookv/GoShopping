<template>
  <div style="font-weight: bold;">
    <h1 style=" width: 100%;text-align: left;margin-left: 5%;">发布新商品</h1>
    <div style="width: 60%; margin-top: 10px;margin-left: 20%;">
      <el-form ref="form" :model="form" label-width="140px" class="form">
        <el-form-item label="商品名称：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格：">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="封面图片上传：" label-width="190px" >
<!--                    //action 如果是手动上传 action随便填一下就好了，自动上传填接口地址就行-->
          <span style="float: left">请上传一张jpg、jpeg、png、bmp形式的图片</span><br>
          <el-upload
            action="#"
            ref="upload0"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview0"
            :before-upload="beforeUpload0"
            :on-remove="handleRemove0"
            :auto-upload="false"
            :multiple="true"
            style="float: left"
            :limit=1
            v-show="showModal"
          >
            <img src="../components/icon/上传图片.png" class="iconfont">
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="90%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="详细介绍：" >
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="商品详情图片上传：" label-width="235px">
          <!--          //action 如果是手动上传 action随便填一下就好了，自动上传填接口地址就行-->
          <span style="float: left">请上传jpg、jpeg、png、bmp形式的图片</span><br>
          <el-upload
            action="#"
            ref="upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :auto-upload="false"
            :multiple="true"
            style="float: left"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="90%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item style="margin-right: 140px;">
          <el-button type="primary" @click="onSubmit">立即发布</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {releaseGood} from "../api";
  import { uploadImgToBase64 } from '../utils/utils'

  export default {
    data() {
      return {
        dialogImageUrl: "",
        dialogVisible: false,
        showModal:true,
        form: {
          name: "",
          price: "",
          description: "",
        },
        fileList: [],
        SignBase64:[],
        fileForm:true,
      };
    },
    methods: {
      async onSubmit() {
        //console.log("submit!");
        let _this = this;
        this.$refs.upload0.submit();
        this.$refs.upload.submit();
        const imgBroadcastListBase64 = []
        // if (this.IsReupload) {
        // 并发 转码轮播图片list => base64
        const filePromises = this.fileList.map(async file => {
          var name = file.name;
          var fileName = name.substring(name.lastIndexOf(".")+1).toLowerCase();
          if(fileName !=="jpg" && fileName !=="jpeg" && fileName !=="png" && fileName !=="bmp"){
            this.$message.error('图片格式不正确！请上传jpg、jpeg、png、bmp形式的图片');
            this.fileForm=false;
            return false;
          }
          const response = await uploadImgToBase64(file)
          return response.result;
          // return response.result.replace(/.*;base64,/, '') // 去掉data:image/jpeg;base64,
        })
        if(this.fileForm) {
          // 按次序输出 base64图片
          for (const textPromise of filePromises) {
            imgBroadcastListBase64.push(await textPromise)
          }
          this.SignBase64 = imgBroadcastListBase64;
          // this.SignBase64 = imgBroadcastListBase64.join()
          //到这里，已经转换为base64编码了，此时直接调用后台接口，把参数传过去，后台进行保存即可
          // this.SignBase64 即为所需上传图片的编码

          releaseGood({
            // Good:this.param,
            sellerId: parseInt(sessionStorage.getItem("userId")),
            goodName: _this.form.name,
            goodPrice: _this.form.price,
            description: _this.form.description,
            img: this.SignBase64,
            contentType: "application/json",
          })
            .then((response) => {
              if (response.data.code === -1) {
                this.$message.error('发布失败！');
              } else
                this.$message.success('发布成功！');
            })
        }
      },
      handleRemove0(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview0(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      beforeUpload0(file) {
        this.fileList.push(file);
        return false;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      beforeUpload(file) {
        this.fileList.push(file);
        this.fileForm=true;
        return false;
      },
    },
  };
</script>

<style lang="less">
  .form .el-form-item__label{
    font-size: 1.5em;
    color: #2c3e50;
  }
  .el-textarea__inner{
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
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
</style>
