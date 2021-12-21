<template>
    <div>
      <div>
        <ul class="goodShow" >
          <router-link v-for="(good,index) in allPhoneGoods" :to="{name:'GoodDetails',params:{bid:good.goodId}}" :key="index" tag="li" style="list-style:none;">
            <div class="container1-1" >
              <img :src="good.img">
              <div class="container1-2">
                <h3><b>{{good.goodName}}</b></h3>
                <h2><b>￥{{good.goodPrice}}</b></h2>
              </div>
            </div>
          </router-link>
        </ul>
      </div>
    </div>
</template>

<script>
  import search from "../components/search";
  import {showAllPhoneGoods} from "../api";

  export default {
      name: "home",
      components: {
        search
      },
      data() {
        return {
          allPhoneGoods:[],
          a:{}
        }
      },
      mounted() {
        this.getAllPhoneGoods();
      },
      methods: {
        getAllPhoneGoods() {
         showAllPhoneGoods({
           class1:parseInt(1),
           class2: parseInt(1),
           frozen:parseInt(0),
           sold:parseInt(0),
           removed:parseInt(0),
           wanted:parseInt(0),
           contentType: "application/json"
         })
            .then((response)=> {
              this.a = response;
              this.allPhoneGoods=response.data.data.goodlist;
            })
        },
      },
    }

</script>
<style scoped lang="less">
  .goodShow{
    display: flex;
    flex-wrap: wrap; //默认不换行
    li{
      width: 17.3%;
      background-color: #F88E4E;
      border-radius: 10px;
      margin-left: 1%;//2.5%
      margin-right: 1%;
      border: 1px solid #ccc;
      font-size: 14px;
      font-family: "Microsoft soft";
      margin-bottom: 20px;
      img{
        width: 80%;
        margin-top: 20px;
      }
      h3{
        float: left;
        margin-left: 30px;
      }
      h2{
        float: right;
        margin-right: 30px;
      }
    }
  }
</style>
