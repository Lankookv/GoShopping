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
        <el-form-item label="封面图片上传：" label-width="140px" >
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
            style="float: left;"
            :limit=1
            v-show="showModal"
          >
            <img src="../../components/icon/上传图片.png" class="iconfont">
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="90%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="详细介绍：" >
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="商品详情图片上传：" label-width="140px">
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
        <el-form-item label="商品详情视频上传：" label-width="140px">
          <input type="file" id="myfile" name="myfile" @change="handleFile" style="float:left;vertical-align:middle; line-height:40px;"/> <br />　　
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
  import {releaseGood} from "../../api";

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
        resource:['mp4'],
      };
    },
    methods: {
      async onSubmit() {
        //console.log("submit!");
        let _this = this;
        this.$refs.upload0.submit();
        this.$refs.upload.submit();
        if(this.fileForm) {
          let form_data = new FormData()
          form_data=this.fileList;
          let form_data0 = new FormData()
          form_data0=this.formdata0;
          const index = this.fileName0.lastIndexOf('.');
          const type=this.fileName0.substring(index+1);
          alert("type:"+type);
          console.log("form_data:"+form_data);
          console.log("form_data0:"+form_data0);
          if(this.resource.indexOf(type) > -1){
              releaseGood({
                sellerId: parseInt(sessionStorage.getItem("userId")),
                goodName: _this.form.name,
                goodPrice: _this.form.price,
                description: _this.form.description,
                img: form_data,
                file: form_data0,
                contentType: "application/json",
              })
                .then((response) => {
                  if (response.data.code === -1) {
                    this.$message.error('发布失败！');
                  } else
                    this.$message.success('发布成功！');
                })
          }
          else {
            his.$message.error('视频格式不正确！请上传mp4形式的视频');
          }
        }
      },
      handleFile(data) {
        //此时data为上传文件后返回的数据, data.target.files[0]为一个file流;
        this.fileBook0=data.target.files[0];
        this.fileName0=data.target.files[0].name;
        //此时new FormData()为new一个新的form表单对象，将拿到的file流通过append方法存进去
        this.formdata0 = new FormData();
        this.formdata0.append("resource_file", this.fileBook0) ;
        // this.formdata.append("miniMchId", this.storeDetail.miniMchId);
        // this.formdata.append("miniPayKey" , this.storeDetail. miniPayKey);
        // this.formdata.append("miniSecret", this.storeDetail. miniSecret);
      },
      handleRemove0(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview0(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      beforeUpload0(file) {
        var name = file.name;
        var fileName = name.substring(name.lastIndexOf(".")+1).toLowerCase();
        if(fileName !=="jpg" && fileName !=="jpeg" && fileName !=="png" && fileName !=="bmp"){
          this.$message.error('图片格式不正确！请上传jpg、jpeg、png、bmp形式的图片');
          this.fileForm=false;
          return false;
        }
        this.fileList.push(file);
        this.fileForm=true;
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
        var name = file.name;
        var fileName = name.substring(name.lastIndexOf(".")+1).toLowerCase();
        if(fileName !=="jpg" && fileName !=="jpeg" && fileName !=="png" && fileName !=="bmp"){
          this.$message.error('图片格式不正确！请上传jpg、jpeg、png、bmp形式的图片');
          this.fileForm=false;
          return false;
        }
        this.fileList.push(file);
        this.fileForm=true;
        return false;
      },
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
