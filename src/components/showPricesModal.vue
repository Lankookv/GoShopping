<template>
  <div class="modal-backdrop">
    <div class="modal" >
      <div class="modal-header"><h2 style="margin-top: 0;margin-bottom: 0;" >商品历史价格</h2></div>
      <div class="modal-body" id="main" style="width: 94%;height: 300px;">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn-confirm" @click="closeSelf">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {getPrices} from "../api";
  import * as echarts from 'echarts';

  export default {
    name: "showPricesModal",
    props: {

    },
    data() {
      return {
        opinionDataF:[],
        opinionData:[]
      }
    },
    mounted() {
      this.showPrices();
      this.$nextTick(function() {
        this.drawLine('main')
      })
    },
    methods:{
      closeSelf() {
        this.$emit("closeme");
      },
      drawLine(id) {
        this.charts = echarts.init(document.getElementById(id))
        this.charts.setOption({
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['历史价格']
          },
          grid: {
            left: '5%',
            right: '10%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            name: "日期",
            // type:'value',
            boundaryGap: false,
            data: []//["1","85","5","20","25","16","57"]

          },
          yAxis: {
            name: "价格",
            type: 'value',
            data: []//["100","8500","500","2000","2500","1600","5700"]
          },
          series: [{
            name: '价格',
            type: 'line',
            data: []//["1","85","5","20","25","16","1"]
          }]
        })
      },
      showPrices(){
        let that=this;
        getPrices({
          goodId:this.$route.params.bid,
          contentType: "application/json"
        })
          .then((response)=> {
            var opinionDataF = [];
            var opinionData = [];
            for (let i = 0; i < response.data.data.length; i++) {
              opinionDataF.push(String(response.data.data[i].changeDate.substring(0,10)+" "+response.data.data[i].changeDate.substring(11,16)))
              opinionData.push(String(response.data.data[i].newPrice))
            }
            this.opinionDataF=opinionDataF;
            this.opinionData=opinionData;
            that.charts.setOption({
              xAxis: {
                data: opinionDataF
              },
              series: [{
                data: opinionData//["1","85","5","20","25","16","57"]
              }]
            })
          })
      }
      // showPrices(){
      //   let that=this;
      //   getPrices({
      //     goodId:this.$route.params.bid,
      //     contentType: "application/json"
      //   }).then((response)=> {
      //     var opinionDataF = [];
      //     var opinionData = [];
      //     // for (let i = 0; i < response.data.length; i++) {
      //     //   opinionDataF.push(String(response.data[i].dateTime))
      //     //   opinionData.push(String(response.data[i].integral))
      //     // }
      //     // that.charts.setOption({
      //     //   xAxis: {
      //     //     data: opinionDataF
      //     //   },
      //     //   series: [{
      //     //     data: opinionData//["1","85","5","20","25","16","57"]
      //     //   }]
      //     // })
      //   })
      // }
    }
  }
</script>

<style scoped lang="less">
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
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
    display: flex;
    flex-direction: column;
    width: 50%;
    height:auto;
    min-height:350px;
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
  .btn-confirm {
    color: #fff;
    background-color: #2d8cf0;
  }
</style>
