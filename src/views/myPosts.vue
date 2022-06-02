<template>
  <div class="container">
    <div class="container0">
      <span class="title">
        <b>查看我的分享</b>
      </span>
    </div>
    <div class="container2">
      <div>
        <card2 style="float:left;width: 12%;margin-left: 3%;margin-top: 2%;cursor: pointer;" @click="toPosts"></card2>
      </div>
      <div>

        <input type="checkbox" v-model='allChecked' @change='chooseAll'style="float:left;width:15px;height: 15px;margin-left: 4.5%">
        <span style="float: left"><b>全选</b></span>
        <span style="padding-left: 51%"><button style="width: 8%;height: 40px;background-color: #F88E4E;border-style: solid;border-radius: 5px" @click="handleDeleteAllPosts">全部删除</button></span>
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
        <ul :loading="loadings.table">
          <router-link class="collection" v-for="(post,index) in Posts" :to="{name:'GoodDetails'}" :key="index" tag="li">
            <input type="checkbox" v-model='post.checked' @click.stop @change='chooseOne(post)' style="float:left;width:15px;height: 15px;margin-top: 5%"></input>
            <img :src="post.img[0].imagine" style="width: 10%;height:93%;float: left;margin-left: 1%;margin-top: 1%;">
            <div class="container2-2" style="overflow:hidden;">
              <h2><span style="white-space:nowrap;overflow: hidden;text-overflow: ellipsis;-o-text-overflow: ellipsis;"><b>{{post.name}}</b></span></h2>
              <div style="white-space:nowrap;overflow: hidden;text-overflow: ellipsis;-o-text-overflow: ellipsis;padding-bottom: 16px">
                <small v-html="post.description"></small>
              </div>
              <div>
                <span style="font-size: 12px;color:gray;">{{post.postDate.substring(0,10)+"   "+post.postDate.substring(11,16)}}</span>
              </div>
            </div>
            <span class="container2-3" style="color: black;font-size: 40px;margin-top: 0%;margin-right: 3%">
                <button  @click.stop @click="handleDeleteOnePost(post.forumId)" style="width: 8%;height: 30px;background-color: #F88E4E;border-style: solid;border-radius: 5px">删除</button>
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

<script>
  import Pagination from '../components/Pagination'
  import card2 from '../components/card2'
  import {showMyPosts,deleteOnePost,deleteAllPost} from '../api';

  export default {
    name: "myPosts",
    components: {
      Pagination,
      card2
    },
    data() {
      return {
        myPost: [{checked: false}],
        loadings: {
          table: true,
        },
        allChecked: false,
        chooseAllFlag: 0,
        postIdArr: [],
        deleteFlag1: false,
        deleteFlag2: false,
        Posts:[],
      }
    },
    mounted() {
      this.init()
    },

    methods: {
      init() {
        showMyPosts({
          buyerId: parseInt(sessionStorage.getItem("buyerId")),
          contentType: "application/json",
        })
          .then((response) => {
            this.a = response.data.data;
            this.myPost = response.data.data;
            this.Posts = this.myPost.reverse();
          })
      },

      //单选
      chooseOne(post) {
        this.deleteFlag2 = !this.deleteFlag2;
        if(this.deleteFlag2 === true){
          post.checked = true;
        }else {
          post.checked = false;
        }
      },


      //全选
      chooseAll() {
        let all1 = [];
        all1 = this.myPost
        this.deleteFlag1 = !this.deleteFlag1;
        if(this.deleteFlag1 === true){
          all1.forEach((post) => {
            post.checked = true;
          })
        }else {
          all1.forEach((post) => {
            post.checked = false;
          })
        }
      },

      //删除一个帖子
      handleDeleteOnePost(postId) {
        this.openDelConfirm().then(() => {
          deleteOnePost({
            forumId: postId,
            contentType: "application/json"
          })
            .then((response) => {
              // alert("给后端了");
              if (response.data.data == true) {
                this.$message.success('删除成功');
                this.init();
              } else {
                this.$message.error('删除失败');
              }
            })
        })
      },

      //删除提示
      openDelConfirm() {
        return this.$confirm(`是否删除帖子？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      },

      handleDeleteAllPosts() {
        var i = 0;
        console.log(this.myPost)
        let temporary = [];
        temporary = this.myPost
        temporary = temporary.forEach((post) => {
          if (post.checked === true) {
            this.postIdArr[i] = post.forumId;
            i++;
          }
        });
        console.log(this.postIdArr.length)
        if(this.postIdArr.length > 0) {
          console.log(this.myPost)
          this.openDelConfirm().then(() => {
            console.log(this.myPost)
            deleteAllPost({
              forumIds: this.postIdArr,
              contentType: "application/json"
            })
              .then((response) => {
                // alert("给后端了");
                if (response.data.data == true) {
                  this.$message.success('删除成功');
                  this.init();
                } else {
                  this.$message.error('删除失败');
                }
              })
          }).catch((err) => {
            this.postIdArr = [];
          });
          }else{
          this.$message.warning("您还未选择要删除的帖子")
          this.init()
        }

      }
    }
  }
    // watch: {
    //   '$route'(newVal, oldVal) {
    //     if (newVal !== oldVal) {
    //       this.init(true)
    //     }
    //   }
    // },

</script>

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
    }
    .collection{
      cursor: pointer;
      padding:0px 0px 10px 10px;
      /*background-color:  #F88E4E;*/
      /*border-radius: 10px;*/
      border: 1px solid gray;
      border-right: none;
      border-left: none;
      border-top: none;
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
      border-right: none;
      border-left: none;
      border-top: none;
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
              /*height: 140px;*/
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
