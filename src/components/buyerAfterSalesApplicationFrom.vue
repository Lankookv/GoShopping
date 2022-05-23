<template>
  <div class="modal-backdrop">
    <!--    {{a}}-->
    <div style="overflow:hidden;width:40%;">
      <div class="modal" >
        <div class="modal-header">
          <h2 style="margin-top: 0;margin-bottom: 0">申请单</h2>
          <img src="../components/icon/关闭.png" class="iconfont" @click="closeSelf()" style="float: right;margin-right: 3%;cursor: pointer;">
        </div>
        <div class="modal-body" @click.stop v-if= "isApplication === 1">
          <span style="float: right;position: absolute;right: 0">
            <img src="../components/icon/待处理.png" style="width: 55%;transform:rotate(330deg);" v-if="applicationContent.stmt===1">
            <img src="../components/icon/同意.png" style="width: 55%;transform:rotate(330deg);" v-if="applicationContent.stmt===2">
            <img src="../components/icon/拒绝.png" style="width: 55%;transform:rotate(330deg);" v-if="applicationContent.stmt===3">
          </span>
          <el-form ref="form" :model="form" label-width="140px" class="form" style="position: relative">
            <el-form-item label="售后内容：" prop="type"><span style="float: left">{{applicationContentName}}</span></el-form-item>
            <el-form-item label="具体原因描述：" prop="description" style="width: 500px;"><span  style="float: left">{{applicationContent.reasons}}</span></el-form-item>
            <el-form-item label="图片：" label-width="140px">
<!--              <img src="../components/icon/ipad-2021.png" style="float:left;width: 120px;">-->
              <div v-for="(img) in applicationContent.images">
                <img :src="img" style="float:left;width: 130px;height:100px; padding-right: 10px">
              </div>
            </el-form-item>
          </el-form>
          <div class="modal-footer">
            <span></span>
            <el-button class="model-footer-order" @click="closeSelf()" v-if="applicationContent.stmt==1" style="color: deepskyblue;background-color: white;float: right;width: 15%;height: 36px;margin-right: 4%;margin-top: 1.8%;">
              取消
            </el-button>
            <el-button  @click="handlecancel" v-if="applicationContent.stmt==1" style="color: white;background-color: red;float: right;width: 15%;height: 36px;margin-right: 4%;margin-top: 1.8%;border: 1px solid black;cursor:Pointer;border-radius: 10px;">
              撤销
            </el-button>
            <el-button class="model-footer-order" @click="closeSelf()" v-if="applicationContent.stmt==2||applicationContent.stmt==3" style="color: deepskyblue;background-color: white;float: right;width: 15%;height: 36px;margin-right: 4%;margin-top: 1.8%;">
              返回
            </el-button>
          </div>
        </div>
        <div class="modal-body" @click.stop v-if= "isApplication === 0">
          <el-form ref="form" :rules="rules" :model="form" label-width="140px" class="form">
            <el-form-item label="售后内容" prop="content">
              <el-select v-model="form.content"   @change="chooseContent($event)" style="float: left">
                <el-option
                  v-for="(item,index) in afterSalesContent"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                 >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="具体描述" prop="description" style="width: 500px;">
              <el-input type="textarea"  :rows="5"  resize="none" v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="图片上传" label-width="140px">
              <!--          //action 如果是手动上传 action随便填一下就好了，自动上传填接口地址就行-->
              <span style="float: left">请上传三张以内的jpg、jpeg、png、bmp形式的图片</span><br>
              <el-upload
                action="#"
                ref="upload"
                list-type="picture-card"
                :limit="3"
                :on-preview="handlePictureCardPreview"
                :before-upload="beforeUpload"
                :on-remove="handleRemove"
                :on-exceed="masterFileMax"
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
          </el-form>
          <div class="modal-footer">
            <el-button class="model-footer-order" @click="closeSelf()" style="color: deepskyblue;background-color: white;float: right;width: 15%;height: 36px;margin-right: 4%;margin-top: 1.8%;">
              取消
            </el-button>
            <el-button  @click="handlApplicationForm()" style="color: white;background-color: #F88E4E;float: right;width: 15%;height: 36px;margin-right: 4%;margin-top: 1.8%;border: 1px solid black;cursor:Pointer;border-radius: 10px;">
              提交
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {submitApplication, cancelApplication} from '../api';
  import {uploadImgToBase64} from "../utils/utils";

  export default {
    name: 'buyerAfterSalesApplicationFrom',
    components:{
    },
  //   props: {
  //   orderId: {
  //     type: Number,
  //     default: 0
  //   },
  //     goodId: {
  //       type: Number,
  //       default: 0
  //     },
  //     isApplication: {
  //       type: Number,
  //       default: 0
  //     },
  // },

    props:["orderId","goodId","isApplication","applicationContent","applicationContentName"],
    data() {
      return {
        dialogImageUrl: "",
        dialogVisible:false,
        a:{},
        contentFlag:0,
        contentId:0,
        fileForm:true,
        fileList: [],
        applicationState:0,
        form: {
          description: "",
        },
        afterSalesContent:[
          {
            lable:'选项一',
            value:'换货',
            id:1,
          },
          {
            lable:'选项二',
            value:'退货退款',
            id:2,
          },
          {
            lable:'选项三',
            value:'退款',
            id:3,
          }
        ],
        value:'',
        rules: {
          content: [{ required: true, trigger: 'blur' },],
          description: [{ required: true, message: '具体原因描述', trigger: 'blur'},],
        },
      }
    },
    created() {

    },

    mounted() {
    },

    methods: {
      closeSelf() {
        this.$emit("closeme");
      },

      //删除
      handleRemove(file, fileList) {
        console.log(file, fileList);
        console.log("1")
      },

      //放大
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log("2")
      },

      beforeUpload(file) {
        this.fileList.push(file);
        this.fileForm=true;
        console.log("3")
        return false;
      },

      masterFileMax(files, fileList) {
        console.log(files, fileList);
        this.$message.warning("请最多上传3张图片");
      },

      //选择售后内容
      chooseContent(val){
        // console.log("123456",val);
        // console.log(this.order)
        for(let i in this.afterSalesContent){
          if(this.afterSalesContent[i].value===val){
            this.contentId = this.afterSalesContent[i].id;
            // console.log(this.afterSalesContent[i].id)
            // alert(this.orderId);
            // alert(this.goodId);
            // alert(this.isApplication)
          }
        }
        this.contentFlag = 1;
      },
      //提交售后单
      async handlApplicationForm(){
        let _this = this;
        this.$refs.upload.submit();
        if(this.contentFlag == 0){
          this.$message.error('请选择售后内容！');
          return false;
        }
        if( _this.form.description.length == 0){
          this.$message.error('请填写具体描述！');
          return false;
        }

        const imgBroadcastListBase64 = [];
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
          submitApplication({
            // Good:this.param,
            postSaleType: parseInt(this.contentId),
            reasons: _this.form.description,
            orderId:this.orderId,
            goodId:this.goodId,
            buyerId:parseInt(sessionStorage.getItem("buyerId")),
            images: this.SignBase64,
            contentType: "application/json",
          }).then((response) => {
            if (response.data.code === -1) {
              this.$message.error('提交失败！');
            } else
              this.$message.success('提交成功！');
              this.closeSelf();

          })
        }
      },

      handlecancel(){
        cancelApplication({
          orderId:this.orderId,
          postSaleId:this.applicationContent.postSaleId,
        }).then((response) => {
          if (response.data.data === true) {
            this.$message.success('撤销成功！');
            this.closeSelf();
          } else
            this.$message.error('撤销失败！');
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  .modal {
    background-color: #fff;
    box-shadow: 2px 2px 20px 1px;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    width: 105%;
    height:auto;
    min-height:300px;
    max-height:560px;
  }
  .modal-header {
    border-bottom: 1px solid #eee;
    color: #313131;
    justify-content: space-between;
    padding: 8px;
    display: flex;
  }
  .modal-footer {
    border-top: 1px solid #eee;
    justify-content: flex-end;
    padding: 15px;
    display: flex;
  }
  .modal-body {
    position: relative;
    padding: 10px 10px;
    input{
      font-size: 15px;
    }
  }
  .btn-close, .btn-confirm {
    border-radius: 8px;
    margin-left:16px;
    width:56px;
    height: 36px;
    border:none;
    cursor: pointer;
  }
  .btn-close {
    color: #313131;
    background-color:transparent;
  }
  .btn-confirm {
    color: #fff;
    background-color: #2d8cf0;
  }
  .el-table .el-table__cell{
    padding: 6px 0;
    display:inline
  }
  .el-table .cell{
    line-height: 0px;
    display: inline;

  }
  .el-button {
    padding: 5px 20px;
    display:inline
  }
  .iconfont{
    font-family:"iconfont" !important;
    width:16px;
    height: 16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

</style>
