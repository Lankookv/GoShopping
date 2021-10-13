<template>
  <div class="modal-backdrop" @click.stop>
    <div style="overflow:hidden;width:50%;">
      <div class="modal" >
        <div class="modal-header">
          <h2 style="margin-top: 0;margin-bottom: 0">意向购买人</h2>
          <i class="iconfont" @click="closeSelf" style="float: right;margin-right: 3%;cursor: pointer;">&#xe650;</i>
        </div>
        <div class="modal-body">
          <el-table
            :row-class-name="tableRowClassName"
            :data="intentionList"
            max-height=80%
            style="width: 100%"size="20px">
            <el-table-column
              prop="buyerName"
              label="姓名"
              width=120px>
            </el-table-column>
            <el-table-column
              prop="date"
              label="时间"
              width=140px>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width=250px>
              <template slot-scope="scope">
                <el-button  @click="toProspectiveBuyersDetail(scope.row.buyerId)" id="ProspectiveBuyersDetail">详细信息</el-button>
                  <ProspectiveBuyersDetailModal v-show="showModal1" v-on:closeme1="closeme1" :buyerInfo="buyerInfo" :id="putOnGoodModal"></ProspectiveBuyersDetailModal>
                <el-button  @click="toFreezeGood(scope.row)" id="FreezeGood">冻结</el-button>
                <!--              <putOffGoodModal v-show="showModal2" v-on:closeme2="closeme2" :buyerId="scope.row.id"></putOffGoodModal>-->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {freezeGood, showBuyerInfo, showIntentionListByGoodId} from '../api';
  import ProspectiveBuyersDetailModal from "../components/ProspectiveBuyersDetailModal"
  // import putOnGoodModal from "../components/putOnGoodModal"

  export default {
    name: 'ProspectiveBuyersModal',
    components:{
      // putOffGoodModal,
      ProspectiveBuyersDetailModal
    },
    props: {
      intentionList:{
        type: [Object, Array],
        default: []
      },
      goodId:{
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        massage:"",
        showModal1:false,
        showModal2:false,
        // intentionList:[{id:1,name:"a",time:"2021.10.10 20:25"},{id:2,name:"b",time:"20:25"},{id:3,name:"c",time:"2021.10.10 20:25"},{id:4,name:"d",time:"20:25"},{id:5,name:"e",time:"2021.10.10 20:25"},{id:6,name:"f",time:"20:25"},{id:1,name:"a",time:"2021.10.10 20:25"},{id:2,name:"b",time:"20:25"},{id:3,name:"c",time:"2021.10.10 20:25"},{id:4,name:"d",time:"20:25"},{id:5,name:"e",time:"2021.10.10 20:25"},{id:6,name:"f",time:"20:25"},],
        buyerInfo:{},
      }
    },
    created() {

    },
    methods: {
      closeSelf() {
        this.$emit("closeme");
      },
      tableRowClassName({row, rowIndex}) {
        row.index = rowIndex;
      },
      toProspectiveBuyersDetail(id){
        showBuyerInfo({
          buyerId:JSON.stringify(id),
          contentType: "application/json",
        })
          .then((response)=> {
            this.buyerInfo=response.data.data;
          })
      },
      toFreezeGood(val){
        // this.showModal2=!this.showModal2;
        // alert(this.showModal2);
        freezeGood({
          goodId:JSON.stringify(val.goodId),
          sellerId:JSON.stringify(val.sellerId),
          buyerId:JSON.stringify(val.buyerId),
          intentionId:JSON.stringify(val.intentionId),
          contentType: "application/json"
        })
          .then((response)=> {
            this.massage=response.data;
            alert("toFreezeGood")
          })
      },
      closeme1(){
        this.showModal1=!this.showModal1;
      },
      closeme2(){
        this.showModal2=!this.showModal2;
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
  }
  .el-table .cell{
    line-height: 0px;
  }
  .el-button {
    padding: 5px 20px;
  }
  @font-face {
    font-family: 'iconfont';  /* Project id 2810508 */
    src: url('//at.alicdn.com/t/font_2810508_q2uw1cggabk.woff2?t=1632579523926') format('woff2'),
    url('//at.alicdn.com/t/font_2810508_q2uw1cggabk.woff?t=1632579523926') format('woff'),
    url('//at.alicdn.com/t/font_2810508_q2uw1cggabk.ttf?t=1632579523926') format('truetype');
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

</style>
