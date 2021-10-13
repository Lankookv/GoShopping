<template>
  <div class="modal-backdrop">
    <div class="modal" >
      <div class="modal-header">
        <h2 style="margin-top: 0;margin-bottom: 0">详细信息</h2>
      </div>
      <div class="modal-body">
        <h3 style="margin-top: 0;margin-bottom: 0">
          姓名：{{ buyerInfo.name }}<br>
          电话：{{ buyerInfo.phone }}<br>
          地址：{{ buyerInfo.location }}
        </h3>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn-close" @click="closeSelf">关闭</button>
        <button type="button" class="btn-confirm" @click="submit">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {} from "../api";

  export default {
    name: "ProspectiveBuyersDetailModal",
    props: {
      buyerInfo:{
        type: [Object, Array],
        default: []
      }
    },
    methods:{
      closeSelf() {
        this.$emit("closeme1");
      },
      submit(){
        // putOnGood({
        //   goodId:JSON.stringify(this.buyerId),
        //   contentType: "application/json"
        // })
        //   .then((response)=> {
        //     this.massage=response.data.data;
        //   })
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
    background-color: rgba(0,0,0,.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  .modal {
    background-color: #fff;
    box-shadow: 2px 2px 20px 1px;
    display: flex;
    flex-direction: column;
    width: 40%;
    height:auto;
    min-height:200px;
    overflow: hidden;
    border-radius: 15px;
  }
  .modal-header {
    border-bottom: 1px solid #eee;
    color: #313131;
    justify-content: space-between;
    padding: 15px;
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
</style>

