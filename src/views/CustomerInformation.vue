<template>
  <div>
    <el-table :data="customers" border stripe style="margin:1% 4%;width: auto;background-color:#F4E5DC;">
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
          <el-button @click="showPurchaseRecords(scope.row)" style="padding: 3px">查看购买记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex;justify-content: flex-end">
      <el-pagination
        background
        @size-change="sizeChange"
        @current-change="currentChange"
        layout="sizes, prev, pager, next, jumper, ->, total, slot"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {showAllBuyerInfo} from "../api";

  export default {
    name: "CustomerInformation",
    data() {
      return {
        customers:[],
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
            } else
              this.customers=response.data.data.buyerList;
          })
      },
    },
  }
</script>

<style scoped lang="less">

</style>
