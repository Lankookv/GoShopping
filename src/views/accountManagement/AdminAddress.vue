<template>
  <div>
    <h1>管理地址</h1>
    <button class="address" @click="showPurchaseRecords()">添加收货地址</button>
    <el-table :data="isnDefaultArr"
              border stripe style="margin:4% 8%;width: auto;background-color:#F4E5DC;width: 85%">
      <el-table-column prop="buyerName" label="收货人" fixed width="200" align="center"></el-table-column>
      <el-table-column prop="buyerAddress" label="详细地址" width="500" align="center"></el-table-column>
      <el-table-column prop="buyerPhone" label="联系方式" width="250" align="center"></el-table-column>
      <el-table-column fixed="right" width="200" label="操作" align="center" >
        <template   slot-scope="scope">
          <el-button @click="deleteAddress(scope.row)" style="padding: 5px;border-style:none">删除</el-button>|
          <b style="padding: 5px;border-style:none;margin-left: 0" v-if="scope.row.isDefault == 1">默认地址</b>
          <el-button @click="isdefault(scope.row)" style="padding: 5px;border-style:none;margin-left: 0"
                     v-if="scope.row.isDefault == 0">设为默认地址</el-button>
        </template>
      </el-table-column>
    </el-table>
   <div class="all" v-show="dialogVisible"></div>
   <div class="addaddress" v-show="dialogVisible">
     <div>
       <span style="float: left;margin-top: 3%;margin-left: 3%;font-size: 20px"><b>添加收货地址</b></span>
       <img src="../../components/icon/关闭.png" class="iconfont" @click="dialogVisible=!dialogVisible" style="margin-right: 3%;margin-top: 3%">
     </div>
     <div style="width: 60%; margin-top: 13%;margin-left: 13%;">
       <el-form ref="form" :model="form" label-width="140px" class="form" :rules="rules">
         <el-form-item prop="name" label="收货人：">
           <el-input type="text" v-model="form.name"></el-input>
         </el-form-item>
         <el-form-item prop="phone" label="电话号码：">
           <el-input type="text" v-model="form.phone"></el-input>
         </el-form-item>
         <el-form-item prop="address" label="默认地址：" >
           <el-input type="textarea" v-model="form.address"></el-input>
         </el-form-item>
         <el-form-item style="margin-right: 10%;">
           <el-button @click="dialogVisible=!dialogVisible">取消</el-button>
           <el-button type="primary" @click="onSubmit('form')" style="margin-left: 25%;margin-top: 5%">确认</el-button>
         </el-form-item>
       </el-form>
     </div>
   </div>
  </div>
</template>


<script>
  import {showAddress, addAddress, alterdefault, deleteAddress} from "../../api";



  export default {
    name: "AdminAddress",
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
        address:[],
        total: 0,
        dialogVisible:false,
        pagesize:10,
        currentPage:1,
        isnDefaultArr:[],
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
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.isnDefaultArr=[],
        showAddress({
          buyerId: parseInt(sessionStorage.getItem("buyerId")),
          contentType: "application/json",
        }).then((response) => {
          this.address = response.data.data;
          let noisDefaultArr = [];
          for(var i=0;i<this.address.length;i++){
             if(this.address[i].isDefault == 1){
               noisDefaultArr.push(this.address[i]);
               this.isnDefaultArr=noisDefaultArr;
               this.address.splice(i,1);
             }
          }
            this.address.findIndex(item => {
                noisDefaultArr.push(item);
                this.isnDefaultArr = noisDefaultArr;
            })
        })
      },
      deleteAddress(val) {
        deleteAddress({
          addressId:val.addressId,
          contentType: "application/json"
        }).then((response) =>{
            if (response.data.data === true) {
                this.$message.success('删除成功！');
                this.init();
              }
          })
      },
      isdefault(val){
        alterdefault({
          addressId:val.addressId,
          buyerId:val.buyerId,
          buyerName: val.buyerName,
          buyerAddress: val.buyerAddress,
          buyerPhone: val.buyerPhone,
          isDefault:val.isDefault,
          contentType: "application/json"
        })
          .then((response) =>{
            if (response.data.data === true) {
              this.$message.success('设置成功！');
              this.init();
            }
          })
      },
      showPurchaseRecords() {
        this.dialogVisible = !this.dialogVisible;
      },
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addAddress({
              buyerId:parseInt(sessionStorage.getItem("buyerId")),
              buyerName:this.form.name,
              buyerPhone:this.form.phone,
              buyerAddress:this.form.address,
              isDefault:0,
              contentType: "application/json"
            })
              .then((response) => {
                if(response.data.data === true){
                  this.$message.success('添加成功！');
                  this.dialogVisible = !this.dialogVisible;
                  this.init();
                }else {
                  this.$message.error('添加失败！');
                }
              })
          } else {
            this.$message.error('添加失败！');
          }
        })
      }
    },
  }
</script>

<style lang="less" scoped>
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
  h1{
    width: 100%;
    text-align: left;
    margin-left: 5%;
    margin-bottom: 0%;
  }
  .address{
    float: right;
    margin-right: 4%;
    background-color: rgb(246, 121, 46);
    border: 1px solid black;
    cursor:Pointer;
    width: 8%;
    height: 32px;
  }
  .all{
    position:fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background-color:#000;
    opacity:0.5;
    filter:alpha(opacity=5);
    z-index:99;
  }
  .addaddress{
    position:fixed;
    top:0;right:0;
    bottom:0;
    left:0;
    width: 50%;
    height:400px;
    margin:auto;
    background-color:#fff;
    overflow:auto;
    z-index:100;
  }
</style>
