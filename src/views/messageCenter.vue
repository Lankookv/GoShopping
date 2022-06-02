<template>
  <div class="container">
    <div class="container0">
      <span class="title">
        <b>消息中心</b>
      </span>
    </div>
    <div class="container2">
      <div>
        <input type="checkbox" v-model='allChecked' @change='chooseAll'style="float:left;width:15px;height: 15px;margin-left: 4.5%">
        <span style="float: left"><b>全选</b></span>
        <span style="padding-left: 60%"><button style="width: 10%;height: 40px;background-color: #85d0e4;border-style: solid;border-radius: 3px;border-color: black" @click="handleSetAllMessageRead">全部设为已读</button></span>
      </div>
      <div v-if="myPost.length===0">
        <center>
          <img src="../components/icon/pic30.png" style="width:10%;margin-top: 15px">
        </center>
        <div style="text-align: center;">
          <span style="text-align: center">暂无任何帖子哦 /(ㄒoㄒ)/~~</span>
        </div>
      </div>
      <div v-else>
        <ul>
          <router-link class="collection" v-for="(message,index) in Messages" :to="{name:'GoodDetails',params:{bid:message.goodId}}" :key="index" tag="li">
            <input type="checkbox" v-model='message.checked' @click.stop @change='chooseOne(message)' style="float:left;width:15px;height: 15px;margin-top: 5%"></input>
            <img :src="message.goodwithImg.img[0].imagine" style="width: 10%;height:93%;float: left;margin-left: 1%;margin-top: 1%;">
            <div class="container2-2" style="overflow:hidden;">
              <h3>
                <span style="white-space:nowrap;overflow: hidden;text-overflow: ellipsis;-o-text-overflow: ellipsis;">
                  <span v-if="message.cartOrFavorite === 2">您收藏的</span>
                  <span v-if="message.cartOrFavorite === 1">您购物车的</span>
                    <b>{{message.goodName}}</b>
                  <span v-if="message.oldPrice>message.newPrice">
                    现仅需<span style="font-size: 26px;color: red">￥{{message.newPrice}}</span>元!
                    降低了{{message.oldPrice-message.newPrice}}元!速来抢购!
                  </span>
                  <span v-if="message.oldPrice<message.newPrice">价格有变动!
                    之前为￥{{message.oldPrice}}元,
                    现为<span style="font-size: 24px;">￥{{message.newPrice}}</span>元
                  </span>
                </span>
              </h3>
              <div>
                <span style="font-size: 14px;color:gray;">{{message.changeDate.substring(0,10)+"   "+message.changeDate.substring(11,16)}}</span>
              </div>
            </div>
            <span v-if="message.readOrNot===0" class="container2-3" style="color: black;font-size: 40px;margin-top: 0%;margin-right: 3%">
                <button  @click.stop @click="handleReadOneMessage(message.messageId)" style="width: 8%;height: 30px;background-color: #85d0e4;border-style: solid;border-radius: 3px">设为已读</button>
            </span>
          </router-link>
        </ul>
      </div>
      <!--      <div class="footer">-->
      <!--        <div class="container1-1">-->
      <!--          <input type="checkbox" v-model='allChecked' @change='chooseAll' style="zoom:170%;float: left">-->
      <!--          <P>全选</P>-->
      <!--        </div>-->
      <!--        <button id="deleteChooseGoods" @click="handleDelete()">取消收藏</button>-->
      <!--      </div>-->
    </div>
    <!--    <Pagination :total="total"-->
    <!--                :page-size.sync="limit"-->
    <!--                :current.sync="query.page"-->
    <!--                @on-change="pushRouter">-->
    <!--    </Pagination>-->
  </div>

</template>


<style scoped lang="less">
  .iconfont {
    font-family: "iconfont" !important;
    font-size: 20px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-right: 10px;
  }
  .iconfont:hover{
    cursor:Pointer;
  }
  .container0{
    height:auto;
    min-height:30px;
    overflow: hidden;
  }
  .container {
    width: 100%;
    height:auto;
    min-height:50px;
    overflow: hidden;
    .title{
      width: 16%;
      float: left;
      margin-top: 1%;
      font-size: 28px;
      margin-left: 9%;
    }
    .collection{
      cursor: pointer;
      padding:0px 0px 10px 10px;
      /*background-color:  #F88E4E;*/
      /*border-radius: 10px;*/
      border: 1px solid gray;
      /*border-right: none;*/
      /*border-left: none;*/
      /*border-top: none;*/
      /*height:auto;*/
      height:100px;
      overflow: hidden;
    }
    .collection:hover{
      cursor: pointer;
      padding:0px 0px 10px 10px;
      /*background-color:  #F88E4E;*/
      /*border-radius: 10px;*/
      border: 1px solid gray;
      /*border-right: none;*/
      /*border-left: none;*/
      /*border-top: none;*/
      /*height:auto;*/
      height:100px;
      overflow: hidden;
    }
    .container2 {
      width: 80%;
      display: inline-block;
      ul {
        display: flex;
        flex-wrap: wrap;//默认不换行
        padding-bottom: 10px;
        padding-inline-start:0;
        margin-top: 5px;
        li{
          width: 100%;
          margin:0% 4% 2% 4%;
          list-style: none;
          .container2-2 {
            width: 65%;
            float:left;
            margin-left: 1%;
            text-align: left;
            h2{
              margin-bottom: 1%;
              margin-top: 2%;
              margin-left: 4%;
            }
            p{
              margin-left: 3%;
              color: darkgray;
            }
            div{
              height: 50px;
              width: 101%;
              margin:1% 0% 0px 3%;
            }
          }
        }
      }
    }
  }
  p{
    float: left;
    margin: 3px;
    font-size: 18px;
    font-weight: bold;
  }
</style>



<script>
  import Pagination from '../components/Pagination'
  import card2 from '../components/card2'
  import {showMessages, setOneRead, setAllRead} from '../api';

  export default {
    name: "myPosts",
    components: {
      Pagination,
      card2
    },
    data() {
      return {
        myPost: [
          {
            postId: 1,
            type:1,
            oldPrice:100,
            newPrice:49,
            img: '../components/icon/ipad1.png',
            name: 'xx的卡',
            description: '太喜欢了',
            postDate: '2020-5-31',
            read:true,
            checked: false
          },
          {
            postId: 2,
            type:2,
            oldPrice:100,
            newPrice:150,
            img: '../components/icon/ipad1.png',
            name: 'xx的卡',
            description: '太喜欢了',
            postDate: '2020-5-31',
            read:false,
            checked: false,
          },
        ],
        loadings: {
          table: true,
        },
        allChecked: false,
        chooseAllFlag: 0,
        messageIdArr: [],
        deleteFlag1: false,
        deleteFlag2: false,
        myMessages:[],
        Messages:[],
      }
    },
    mounted() {
      this.init()
    },

    methods: {
      init() {
        showMessages({
          buyerId: parseInt(sessionStorage.getItem("buyerId")),
          contentType: "application/json",
        })
          .then((response) => {
            this.a = response.data.data;
            this.myMessages = response.data.data;
            this.Messages = this.myMessages.reverse();
            console.log(this.myMessages)
          })
      },

      //单选
      chooseOne(message) {
        this.deleteFlag2 = !this.deleteFlag2;
        if(this.deleteFlag2 === true){
          message.checked = true;
        }else {
          message.checked = false;
        }
      },

      //全选
      chooseAll() {
        let all1 = [];
        all1 = this.myMessages
        this.deleteFlag1 = !this.deleteFlag1;
        if(this.deleteFlag1 === true){
          all1.forEach((message) => {
            message.checked = true;
          })
        }else {
          all1.forEach((message) => {
            message.checked = false;
          })
        }
      },

      //设置一个消息为已读
      handleReadOneMessage(messageId) {
        this.openDelConfirm().then(() => {
          setOneRead({
            messageId: messageId,
            contentType: "application/json"
          })
            .then((response) => {
              // alert("给后端了");
              if (response.data.data == true) {
                this.$message.success('设置成功');
                this.init();
              } else {
                this.$message.error('设置失败');
              }
            })
        })
      },

      //删除提示
      openDelConfirm() {
        return this.$confirm(`是否设置为已读？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      },

      handleSetAllMessageRead() {
        var i = 0;
        let temporary = [];
        temporary = this.myMessages
        temporary = temporary.forEach((message) => {
          if (message.checked === true) {
            message.messageIdArr[i] = message.messageId;
            i++;
          }
        });
        if(this.messageIdArr.length > 0) {
          this.openDelConfirm().then(() => {
            setAllRead({
              messageIds: this.messageIdArr,
              contentType: "application/json"
            })
              .then((response) => {
                // alert("给后端了");
                if (response.data.data == true) {
                  this.$message.success('设置成功');
                  this.init();
                } else {
                  this.$message.error('设置失败');
                }
              })
          }).catch((err) => {
            this.messageIdArr = [];
          });
        }else{
          this.$message.warning("您还未选择要设置为已读的消息")
          this.init()
        }
      },

      toPosts(){
        this.$route.push("/");
      }
    }
  }


</script>
