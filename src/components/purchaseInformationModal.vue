<template>
  <div class="modal-backdrop">
    <div style="overflow:hidden;width:55%;">
      <div class="modal" >
        <div class="modal-header">
          <h2 style="margin-top: 0;margin-bottom: 0;" >订单详情</h2>
          <img src="../components/icon/关闭.png" class="iconfont" @click="closeSelf()" style="float: right;margin-right: 3%;cursor: pointer;">
        </div>
        <li class="modal-header">
          <h4 style="margin-top: 0;margin-bottom: 0;">收货信息</h4>
        <li class="address" style="list-style:none; font-weight: bold">
<span style="float: left;margin-left: 2%">
  <input type="radio" name="address" value="address" id="defaultaddress" checked="checked" @click="getValue()" ></input>
  <label class="chooseAddress">{{buyerAddress}} &nbsp;&nbsp; ({{buyerName}}&nbsp;收) &nbsp;&nbsp;{{buyerPhone}}</label>
  <span style="margin-left:10px">默认地址</span>
</span>
        </li>
        <li v-for="(item) in isnDefaultArr" :key="index" style="list-style:none;">
    <span style="float: left;margin-left: 2%">
      <input type="radio" v-model='item.checked' name="address" value="address"  :id="index" @click="getValue(item)" ></input>
      <label :for="index" class="chooseAddress"> {{item.buyerAddress}} &nbsp;&nbsp; ({{item.buyerName}}&nbsp;收) &nbsp;&nbsp; {{item.buyerPhone}}</label>
    </span>
        </li>
        <div class="modal-body">
          <el-table
            :data="addToCartList"
            style="width: 100%">
            <el-table-column
              prop="img[0].imagine"
              label="商品图片"
              width="180">
              <template   slot-scope="scope">
                <img :src="scope.row.img[0].imagine"  min-width="100" height="100" />
              </template>
            </el-table-column>
            <el-table-column
              prop="good.goodName"
              label="商品名字"
              width="180">
            </el-table-column>
            <el-table-column
              prop="num"
              label="商品数量"
              width="250">
              <template slot-scope="scope">
                <el-button @click.stop @click="toBuyNumber(scope.$index, scope.row, -1)" size="small">-</el-button>
                <el-input  @click.stop v-model="scope.row.num" onfocus=this.blur() style="width: 30%"></el-input>
                <el-button @click.stop  @click="toBuyNumber(scope.$index, scope.row, 1)"  size="small">+</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="total"
              label="小计">
                <span>{{total}}</span>
            </el-table-column>
          </el-table>
          <div class="modal-footer">
            <el-button class="model-footer-order" @click="closeSelf()" style="color: deepskyblue;background-color: white;float: right;width: 15%;height: 36px;margin-right: 4%;margin-top: 1.8%;border: 1px solid black;cursor:Pointer;border-radius: 10px;">
              取消
            </el-button>
            <el-button class="model-footer-order" @click="handlePurchase()" style="color: white;background-color: #F88E4E;float: right;width: 15%;height: 36px;margin-right: 4%;margin-top: 1.8%;border: 1px solid black;cursor:Pointer;border-radius: 10px;">
              下单
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {showGoodDetail,showAddress,purchaseInfo} from '../api';

  export default {
    name: 'addToCartInformation',
    components:{
    },
    props: {
      // data:{
      //   type: [Object, Array],
      //   default: []
      // },
      goodId:{
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        a:{},
        addToCartList:[],
        tableData: [],
        myAddressData:[],
        isnDefaultArr:[],
        price:0,
        total:0,
        totleNum: 0,
        purchaseNumber:1,
        address:{},
        buyerName:'',
        buyerPhone:'',
        buyerAddress:'',
        buyerAddressId:'',
        purchasebuyerName:'',
        purchasebuyerPhone:'',
        purchasebuyerAddress:'',
        purchasebuyerAddressId:'',
      }
    },
    created() {
      this.getGoodDetail();
      this.getAddress();
    },
    mounted() {
    },

    methods: {
      getGoodDetail(){
        showGoodDetail({
          goodId:this.goodId,
          contentType: "application/json"
        })
          .then((response)=> {
            //alert(JSON.stringify(this.$route.params.bid))
            // alert("model2");
            this.addToCartList=[response.data.data];
            this.myData = response.data.data;
            this.price = this.myData.good.goodPrice;
            this.addToCartList.forEach((item, index) => {
              this.$set(item, 'num', index+1)  // 这是新添加得属性，后期如果要修改一定要使用this.$set添加；
              // this.$set(item,'total',this.price)
              this.total = this.price;
            })
            // console.log(this.addToCartList);
            // console.log(this.myData)
            // console.log(this.myData.good.goodPrice)
          })
      },

      getAddress(){
        showAddress({
          buyerId:parseInt(sessionStorage.getItem("buyerId")),
          contentType: "application/json"
        })
          .then((response)=> {
            this.address = response.data.data;
            this.myAddressData = this.address
            console.log(this.address);
            let noisDefaultArr = [];
            var index = this.address.findIndex(item =>{
              if(item.isDefault == 1){
                // alert("默认地址的id"+item.addressId)
                this.buyerAddress = item.buyerAddress;
                this.buyerName = item.buyerName;
                this.buyerPhone = item.buyerPhone
                this.purchasebuyerAddressId = item.addressId;
              }else{
                item.type = "noisDefault";
                noisDefaultArr.push(item);
                this.isnDefaultArr= noisDefaultArr;
              }
            })
          })
      },

      toBuyNumber(index, row, type) {
        if (type === -1) {
          if (row.num >= 2) {
            row.num--;
            this.$set(this.addToCartList[index],'num', row.num )
            this.purchaseNumber = row.num;
            this.total = this.purchaseNumber * this.price
            console.log(this.purchaseNumber);
          } else {
            this.$set(this.addToCartList[index],'num', 1 )
            this.purchaseNumber = row.num;
            this.total = this.purchaseNumber * this.price
            console.log(this.purchaseNumber);
          }
        } else if (type === 1) {
          if(row.num < this.myData.good.storage){
            row.num++;
            this.$set(this.addToCartList[index],'num', row.num )
            this.purchaseNumber = row.num;
            this.total = this.purchaseNumber * this.price
            console.log(this.purchaseNumber);
          }else{
            this.$message("已经是最大库存了哦~");
          }
        }
      },

      handlePurchase(){
        purchaseInfo({
          buyerId:parseInt(sessionStorage.getItem("buyerId")),
          goodId:this.myData.good.goodId,
          number:this.purchaseNumber,
          phone:this.purchasebuyerPhone,
          addressId:this.purchasebuyerAddressId,
          contentType: "application/json",
        })
          .then((response) => {
            // alert("给后端了");
            console.log(response);
            if(response.data.code == -1){
              this.$message.error("下单失败");
            }else{
              this.$message.success("下单成功");
              this.closeSelf();
              this.getGoodDetail()
            }
          })
      },

      getValue(item){
        this.purchasebuyerName = item.buyerName;
        alert(this.purchasebuyerName)
        this.purchasebuyerPhone = item.buyerPhone;
        this.purchasebuyerAddress = item.buyerAddress;
        this.purchasebuyerAddressId = item.addressId;
        // alert(this.purchasebuyerAddress)
      },
      closeSelf() {
        this.$emit("closeme");
      },
      tableRowClassName({row, rowIndex}) {
        row.index = rowIndex;
      },

    },
  }
</script>

<style scoped lang="less">
  .modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,.3);
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
    max-height:400px;
  }
  .modal-header {
    border-bottom: 1px solid #eee;
    color: #cccccc;
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
