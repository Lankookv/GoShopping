<template>
  <div>
    <el-table :data="customers.slice((currentPage-1)*pagesize,currentPage*pagesize)" border stripe style="margin:1% 4%;width: auto;background-color:#F4E5DC;">
      <el-table-column prop="buyerId" label="ID" fixed width="200" align="center"></el-table-column>
      <el-table-column prop="buyerName" label="姓名" width="200" align="center"></el-table-column>
      <el-table-column prop="buyerPhone" label="联系方式" width="200" align="center"></el-table-column>
      <el-table-column prop="buyerLocation" label="交易地点" width="200" align="center"></el-table-column>
      <el-table-column
        fixed="right"
        width="200"
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button @click="showPurchaseRecords(scope.row)" style="padding: 5px">查看购买记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex;justify-content: flex-end">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[1,10,20, 50, 100,]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin-right: 20px">
      </el-pagination>
    </div>
    <div class="all" v-show="dialogVisible"></div>
    <div class="PurchaseRecords" v-show="dialogVisible">
      <div><span style="float: left;margin-top: 10px;margin-left: 10px;font-size: 20px"><b>购买记录</b></span><img src="../../components/icon/关闭.png" class="iconfont" @click="dialogVisible=!dialogVisible"></div>
      <el-table
          :data="customerPurchaseRecords"
          style="z-index: 999;">
          <el-table-column prop="buyerName" label="姓名" width="170" align="center"></el-table-column>
        <el-table-column prop="goodName" label="商品名" width="170" align="center"></el-table-column>
          <el-table-column prop="date" label="购买时间" width="" align="center"></el-table-column>
<!--          <el-table-column prop="buyerLocation" label="交易地点" align="center"></el-table-column>-->
      </el-table>
    </div>
  </div>
</template>

<script>
  import {showAllBuyerInfo,showPurchaseRecords} from "../../api";

  export default {
    name: "CustomerInformation",
    data() {
      return {
        customers:[],
        total: 0,
        dialogVisible:false,
        customerPurchaseRecords: [],
        pagesize:10,
        currentPage:1
      }
    },
    mounted() {
      this.initCustomers();
    },
    methods:{
      initCustomers(){
        showAllBuyerInfo()
          .then((response) => {
            if (response.data.code === -1) {
              this.$message.error('查看失败！');
            } else{
              this.customers=response.data.data.buyerList;
              this.total=this.customers.length
            }
          })
      },
      showPurchaseRecords(val){
        showPurchaseRecords({
          buyerId: val.buyerId,
          contentType: "application/json"
        }).then((response) => {
            if (response.data.code === -1) {
              this.$message.error('查看失败！');
            } else{
              this.customerPurchaseRecords=response.data.data.historyList;
            }
          })
        this.dialogVisible=!this.dialogVisible;
      },
      handleSizeChange(val) {
        this.pagesize=val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      }
    },
  }
</script>

<style lang="less" scoped>
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
  .PurchaseRecords{
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
</style>
