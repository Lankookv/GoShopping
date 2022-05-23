<template>
  <div style="font-weight: bold;">
    <h1 style=" width: 100%;text-align: left;margin-left: 5%;">发布新商品</h1>
    <div style="width: 60%; margin-top: 10px;margin-left: 20%;">
      <el-form ref="form" :rules="rules" :model="form" label-width="140px" class="form">
        <el-form-item label="商品名称：" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格：" prop="price">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="商品库存：" prop="storage">
          <el-input v-model="form.storage"></el-input>
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
        <el-form-item label="详细介绍：" prop="description">
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
        <el-form-item label="商品类别：" >
          <el-select v-model="class1" @change="selectGoodClass1($event)" clearable @clear="flag=0" filterable style="float: left">
            <el-option
              v-for="(item,index) in class1List"
              :key="index"
              :label="item.class1Name"
              :value="index">
            </el-option>
          </el-select>
          <img src="../../components/icon/箭头.png" style="float: left;margin-top: 10px">
          <el-select v-model="class2" @change="selectGoodClass2($event)" clearable @clear="flag=1" filterable style="float: left">
            <el-option
              v-for="(item,index) in class2List"
              :key="index"
              :label="item.class2Name"
              :value="index">
            </el-option>
          </el-select>
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
  import {releaseGood, showGoodClass1, showGoodClass2} from "../../api";
  import { uploadImgToBase64 } from '../../utils/utils'

  export default {
    data() {
      return {
        dialogImageUrl: "",
        dialogVisible: false,
        showModal:true,
        form: {
          name: "",
          price: 1.0,
          description: "",
          storage:1,
        },
        rules: {
          name: [{ required: true, message: '请输入商品名', trigger: 'blur' },
            { min: 1, max: 15, message: '请输入0-15位字符', trigger: 'blur'}],
          price: [{ required: true, message: '请输入价格', trigger: 'blur'},
            { type: 'number', message: '价格必须为数字值', trigger: 'blur',transform:(value)=>Number(value)},
            {pattern:/^(([1-9]\d{0,9})|([1-9]\d{0,9}.\d?[1-9]{1}))$/,message: '请输入数字0.01-9999999999.99(保留两位小数)', trigger: 'blur'}],
          storage: [{ required: true, message: '请输入库存', trigger: 'blur' },
            { type: 'number', message: '库存必须为数字值', trigger: 'blur',transform:(value)=>Number(value)},
            {pattern:/^(([1-9]\d{0,3})|10000)$/,message: '请输入整数1-10000', trigger: 'blur'}],
        },
        fileList: [],
        SignBase64:[],
        fileForm:true,
        class1:"",
        class1Id:0,
        class2:"",
        class2Id:0,
        class1List:[],
        class2List:[],
        flag:0,
      };
    },
    mounted() {
      showGoodClass1().then((response)=> {
          this.class1List=response.data.data;
        })
    },
    methods: {
      async onSubmit() {
        //console.log("submit!");
        if(this.form.name.length>15||this.form.name==="") {
          this.$message.error('商品名错误！');
          return false;
        }
        var regu2 = /^(([1-9]\d{0,9})|([1-9]\d{0,9}.\d?[1-9]{1}))$/;
        var regu3 = /^(([1-9]\d{0,3})|10000)$/;
        if (!regu2.test(this.form.price)||this.form.price==="") {
          this.$message.error('价格错误！');
          return false;
        }
        if (!regu3.test(this.form.storage)||this.form.storage==="") {
          this.$message.error('库存错误！');
          return false;
        }
        let _this = this;
        this.$refs.upload0.submit();
        this.$refs.upload.submit();
        if(this.fileList.length===0) {
          this.$message.error('请上传封面图片！');
          return false;
        }
        if(this.flag===0) {
          this.$message.error('请选择商品分类！');
          return false;
        }
        if(this.flag===1) {
          this.$message.error('请重新选择商品二级分类！');
          return false;
        }
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
            storage:_this.form.storage,
            class2:this.class2Id,
            img: this.SignBase64,
            contentType: "application/json",
          }).then((response) => {
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
      selectGoodClass1(val){//根据设备组id获取相应的商品
        this.flag=1;
        if(val != null && val !== '' && val !== undefined){
          this.class1=this.class1List[val].class1Name;
          this.class1Id=this.class1List[val].class1;
          showGoodClass2({
            class1: this.class1Id,
            contentType: "application/json",
          }).then((response) => {
            if (response.data.code === -1) {
              this.$message.error('出现错误！');
            } else{
              this.class2List=response.data.data;
            }
          })
        }
      },
      selectGoodClass2(val){
        this.class2=this.class2List[val].class2Name;
        this.class2Id=this.class2List[val].class2;
        this.flag=2;
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
