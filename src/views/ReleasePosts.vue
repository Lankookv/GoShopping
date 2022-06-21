<template>
  <div style="font-weight: bold;">
    <h1 style=" width: 100%;text-align: left;margin-left: 5%;">发布新帖子</h1>
    <div style="width: 60%; margin-top: 10px;margin-left: 20%;">
      <el-form ref="post" :rules="rules" :model="post" label-width="140px" class="post">
        <el-form-item label="帖子名称：" prop="name">
          <el-input v-model="post.name"></el-input>
        </el-form-item>
        <el-form-item label="详细介绍：" prop="description">
          <el-input type="textarea" v-model="post.description" style="line-height: 4;"></el-input>
        </el-form-item>
        <el-form-item label="详情图片上传：" label-width="140px">
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
            <img width="50%" :src="dialogImageUrl1" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="选择相关商品：">
          <el-select placeholder="请选择相关商品" clearable size="small" filterable style="float:left;width: 100%">
            <el-option
              v-for="good in allGoods"
              :key="good.goodId"
              :label="good.goodName"
              :value="good.goodName"
              @click.native="change(good)"/>
          </el-select>
        </el-form-item>
        <el-form-item label="已选相关商品：">
          <ul v-if="relatedGoods.length>0" style="list-sytle:none;display: flex;
    flex-wrap: wrap;border: 1px solid black;">
            <li v-for="(item, index) in relatedGoods" :key="index" style="list-sytle:none;width: 33%;margin-bottom:5px;margin-top:5px; ">
              <img :src="item.img" style="width: 30%;height: 55px;float: left;">
              <span style="float: left;">{{item.goodName}}</span>
            </li>
          </ul>
          <div v-else style="float:left;">暂未选择相关商品</div>
        </el-form-item>
        <el-form-item style="margin-right: 140px;">
          <el-button type="primary" @click="onSubmit">立即发布</el-button>
          <el-button @click="exit">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {showAllGoods,releasePost} from "../api";
  import { uploadImgToBase64 } from '../utils/utils'

  export default {
    data() {
      return {
        dialogImageUrl: "",
        dialogVisible: false,
        post: {
          name: "",
          description: "",
        },
        rules: {
          name: [{ required: true, message: '请输入帖子名', trigger: 'blur' },
            { min: 1, max: 20, message: '请输入0-20位字符', trigger: 'blur'}],
        },
        fileList: [],
        SignBase64:[],
        fileForm:true,
        keyword:"",
        relatedGoods:[],
        idLi:[],
        allGoods:[],
      };
    },
    mounted() {
      this.getAllGoods();
    },
    methods: {
      getAllGoods() {
        showAllGoods()
          .then((response)=> {
            this.allGoods=response.data.data.goodlist;
          })
      },
      async onSubmit() {
        //console.log("submit!");
        if(this.post.name.length>20||this.post.name==="") {
          this.$message.error('帖子名错误！');
          return false;
        }
        let _this = this;
        this.$refs.upload.submit();
        if(this.fileList.length===0) {
          this.$message.error('请上传详情图片！');
          return false;
        }
        const imgBroadcastListBase64 = []
        // if (this.IsReupload) {
        // 并发 转码轮播图片list => base64
        const filePromises = this.fileList.map(async file => {
          var name = file.name;
          var fileName = name.substring(name.lastIndexOf(".")+1).toLowerCase();
          if(fileName !=="jpg" && fileName !=="jpeg" && fileName !=="png" && fileName !=="bmp"){
            this.$message.error('图片格式不正确！请上传jpg、jpeg、png、bmp形式的图片'+fileName);
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
          releasePost({
            // Good:this.param,
            buyerId:parseInt(sessionStorage.getItem("buyerId")),
            name: _this.post.name,
            description: _this.post.description,
            img: this.SignBase64,
            idLi:this.idLi,
            contentType: "application/json",
          }).then((response) => {
            if (response.data.code === -1) {
              this.$message.error('发布失败！');
            } else
              this.$message.success('发布成功！');
              this.$router.push({name:'showsquare'});
          })
        }
      },
      exit(){
        this.$router.push({name:'Home',})
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
      change(good){
        this.relatedGoods.push(good);
        this.idLi.push(good.goodId);
      }
    },
  };
</script>

<style scoped lang="less">
  .post .el-form-item__label{
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
    width:30px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    cursor:pointer;
  }
</style>
