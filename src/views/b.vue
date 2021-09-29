<template>
  <div class="container">
    <span class="title">
      <b>查看历史商品</b>
    </span>
    <div >
      <Input  v-model="query.keywords"
              @on-enter="filterByKeyword"
              @on-click="filterByKeyword"
              placeholder="BTS周边"
              class="search"
              icon="ios-search-strong"/>
    </div>
    <select >
      <option value="" disabled selected hidden>分类</option>
      <option value ="soldOut">已售空</option>
      <option value ="onSale">在售</option>
      <option value="frozen">冻结</option>
    </select>
    <div class="container1">
<!--      <div v-if="allCourses.length==0&&No_course==false" style="padding-top: 15%">-->
<!--        <center>-->
<!--          <div style="margin-top:100px;" >-->
<!--            <i size="big"class="el-icon-loading" ></i>-->
<!--          </div>-->
<!--        </center>-->
<!--        <div style="text-align: center;">-->
<!--          <span style="text-align: center">正在努力加载中 请稍后 o(*￣▽￣*)ブ</span>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div v-else-if="allCourses.length==0&&No_course==true">-->
        <div>
        <center>
          <img  src="../components/icon/pic30.png" style="width:100%">
        </center>
        <div style="text-align: center;">
          <span style="text-align: center">没有搜索到任何课程哦 /(ㄒoㄒ)/~~</span>
        </div>
      </div>
      <ul    :loading="loadings.table" >
        <router-link class="container_1" v-for="(course,index) in allCourses" :to="{name:'the_platform_course',params:{cid:course.courseId}}" :key="index" tag="li" >
          <div class="container1-1" >
            <img :src="course.courseCover">
            <div class="container1-2">
              <h3><b>{{course.courseName}}</b></h3>
              <p><small>{{course.courseUniversity}}&emsp;&emsp;&emsp;{{course.courseAuthor}}</small></p>
              <div style="overflow-y: scroll;">
                <small>{{course.courseDescription}}</small>
              </div>
            </div>
          </div>
        </router-link>
      </ul>
    </div>
    <Pagination :total="total"
                :page-size.sync="limit"
                :current.sync="query.page"
                @on-change="pushRouter"
    ></Pagination>
  </div>
</template>

<script>
  //import api from '../api'
  import Pagination from '../components/Pagination'

  export default {
    name: "platform_course",
    components: {
      Pagination
    },
    data() {
      return {
        total: 0,
        page: 1,
        loadings: {
          table: true,
        },
        No_course:false,
        allCourses: [],
        courses: [],
        limit: 5,
        routeName: '',
        query: {
          keywords: '',
          page: 1,
        }
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.routeName = this.$route.name
        let query = this.$route.query
        this.query.keywords = query.keywords || ''
        this.query.page = parseInt(query.page) || 1
        if (this.query.page < 1) {
          this.query.page = 1
        }
        this.getAllCourses()
      },
      pushRouter() {
        this.$router.push(
          {name: 'platform_course', query: this.query}
        )
      },
      sortBy (sort) {
        this.query.sort = sort
        this.query.page = 1
        this.pushRouter()
      },
      filterByKeyword () {
        this.query.page = 1
        this.pushRouter()
      },
      getAllCourses() {
        let offset = (this.query.page - 1) * this.limit
        this.loadings.table = true
        api.getPlatform_Courses(offset, this.limit, this.query).then(res => {
            // this.loadings.table = false
            this.allCourses = res.data.data.results;
            this.total=res.data.data.total;
            //alert(this.total);
            if(this.total==0)
            {
              this.No_course=true;
            }
            else
            {
              this.No_course=false;
            }
          },
          res => {
            this.loadings.table = false
          })
      },
      onReset () {
        this.$router.push({name: 'platform_course'})
        parent.location.reload();
      },
    },
    watch: {
      '$route'(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.init(true)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .btn1 {
    box-shadow: 2px 2px 2px #aaaaaa;
    width: 170px;
    height: 50px;
    border: none;
    border-radius: 10px;
    background-color: #84C1FF;
    text-align: center;
    color: #ffffff;
    font-size: 15px;
    letter-spacing: 2px;
    margin-top: 10px; /*外边框的距离*/
    margin-right: 20px; /*外边框的距离*/
    margin-bottom: 20px; /*外边框的距离*/
    margin-left: 20px; /*外边框的距离*/
  }
  .btn2:hover {
    box-shadow: 5px 5px 5px #aaaaaa;
    cursor:pointer;
    width: 170px;
    height: 50px;
    border: none;
    border-radius: 10px;
    background-color: #ffffff;
    text-align: center;
    color: #2894FF;
    font-size: 15px;
    letter-spacing: 2px;
    margin-top: 10px; /*外边框的距离*/
    margin-right: 20px; /*外边框的距离*/
    margin-bottom: 20px; /*外边框的距离*/
    margin-left: 20px; /*外边框的距离*/
    border: 1px solid #2894FF;
  }
  .btn2 {
    box-shadow: 2px 2px 2px #aaaaaa;
    width: 170px;
    height: 50px;
    border: none;
    border-radius: 10px;
    background-color: #ffffff;
    text-align: center;
    color: #999999;
    font-size: 15px;
    letter-spacing: 2px;
    margin-top: 10px; /*外边框的距离*/
    margin-right: 20px; /*外边框的距离*/
    margin-bottom: 20px; /*外边框的距离*/
    margin-left: 20px; /*外边框的距离*/
  }
  .course_title{
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all; /* 追加这一行代码 */
  }
  .container {
    width: 100%;
    height:auto;
    min-height:50px;
    overflow: hidden;
    .title{
      width: 20%;
      float: left;
      margin-top: 1%;
      margin-left: 3%;
      font-size: 32px;
    }
    select{
      float: right;
      width: 6%;
      height: 36px;
      margin-top: 1.35%;
      background-color: #F56E1C;
      border: 1px solid black ;
    }
    select:hover{
      float: right;
      width: 6%;
      height: 36px;
      margin-top: 1.35%;
      background-color: #F56E1C;
      border: 1px solid #cccccc ;
      cursor:Pointer;
    }
    .search{
      width: 30%;
      float: right;
      margin-top: 1.5%;
      margin-right: 2%;
      border: 1px solid #ccc;
      border-radius: 20px;
      padding: 8px 8px;
      margin-left: 10px;
    }
    .container_1{
      cursor: pointer;
      padding:10px 10px 10px 10px;
    }
    .container_1:hover{
      cursor: pointer;
      background-color: #eeeeee;
      padding:10px 10px 10px 10px;
      color:#3399ff;
    }
    .container1 {
      border-radius: 5px;
      width: 100%;
      ul {
        display: flex;
        flex-wrap: wrap;//默认不换行
        padding-bottom: 10px;
        li{
          width: 100%;
          margin:2% 4%;
          list-style: none;
          img{
            width: 30%;
            float: left;
            margin:auto;
          }
          .container1-2 {
            width: 70%;
            float:right;
            h3{
              margin-left: 3%;
              margin-bottom: 1%;
            }
            p{
              margin-left: 3%;
              color: darkgray;
            }
            div{
              height: 60px;
              margin:1% 0px 0px 3%;
            }
          }
        }
      }
    }
  }
  .pic2 {
    width: 50px;
    height: 270px;
    cursor: pointer;
  }

</style>
