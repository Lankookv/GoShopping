<template>
  <div class="main-nav">
    <div class="nav-first" @mouseenter="isNavEnter = true" @mouseleave=" isNavEnter = false">
      <ul>
        <li v-for="(item,index) in navFirst" :key="index" :class="{active: item.type === selected}" @mouseenter="selected = item.type">
          <router-link :to="item.router">
          <p>
            <img :src="item.pic" >
            <span>{{item.name}}</span>
          </p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="nav-sec" v-show="isNavEnter || isMenuEnter" @mouseenter="isMenuEnter = true" @mouseleave="isMenuEnter = false">
      <ul v-for="(item,index) in navFirst" v-show="item.type === selected" :key="index">
        <li v-for="(key,index) in navSec[item.type]"  :key="index">
          <div class="product">
            <router-link :to="key.router">
              <img :src="key.imgUrl" alt="">
              <p class="title">{{key.title}}</p>
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  export default {
    data(){
      return {
        selected: '',
        isNavEnter: false,
        isMenuEnter: false,
        navFirst: [
          {name: '中国大陆', type: 'girlclothes', router:'/digitalGoods', pic:require("../components/icon/homeIcon/中国.png")},
          {name: '港台地区', type: 'boyclothes', router:'/nothing', pic:require("../components/icon/homeIcon/香港.png") },
          {name: '欧美地区', type: 'shoesbag', router:'/nothing', pic:require("../components/icon/homeIcon/美国.png")},
          {name: '日本', type: 'equipment', router:'/nothing', pic:require("../components/icon/homeIcon/日本.png")},
          {name: '韩国', type: 'digital', router:'/nothing', pic:require("../components/icon/homeIcon/韩国.png")},
          {name: '东南亚', type: 'makeupskincare', router:'/nothing', pic:require("../components/icon/homeIcon/泰国.png")},
        ],
        navSec: {
          girlclothes: [
            {title: '专辑',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
            {title: '杂志',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
            {title: '海报',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
            {title: '应援',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
            {title: '其他',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
          ],
          boyclothes: [
            {title: '杂志',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
            {title: '专辑',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
            {title: 'DVD',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
            {title: '其他',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
          ],
          shoesbag: [
            {title: '专辑',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
            {title: '期刊',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
            {title: '明信片',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
            {title: '服饰',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
            {title: '其他',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
          ],
          equipment: [
            {title: '专辑',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
            {title: '杂志',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
            {title: '手办',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
            {title: '手绘',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
            {title: '其他',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
          ],
          digital: [
            {title: '专辑', router:'/phoneGoods', imgUrl:require("../components/icon/homeIcon/周边.png")},
            {title: '海报',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
            {title: '生写',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
            {title: '日历',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
            {title: '其他',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
          ],
          makeupskincare: [
            {title: '专辑',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
            {title: '海报',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
            {title: 'DVD',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
            {title: '其他',router:'/nothing', imgUrl:require("../components/icon/homeIcon/周边.png")},
          ],
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .main-nav{
    font-size: 14px;
    z-index: 1;
    width: 90%;
    margin: 0 auto;
    position: relative;
    display: flex;
    /*justify-content: flex-start;*/
    >.nav-first{
      width: 20%;
      height: 400px;
      position: relative;
      ul{
        display: flex;
        /*justify-content: space-between;*/
        flex-direction: column;
        background-color: #F6792E;
        padding: 10px 0;
        color: #fff;
        li{
          padding-left: 30px;
          height: 42px;
          line-height: 42px;
          cursor: pointer;
          list-style-type: none;
          &:hover{
            background: #ff6700;
          }
          a {
            text-decoration:none ;
            color: #eeeeee;
          }
          p{
            margin-left: 17%;
            display: flex;
            /*justify-content: space-between;*/
            img{
              margin-right: 10px;
              width:18px;
              height: 18px;
              margin-top: 10px;
            }
          }
        }
      }
    }
    .nav-sec{
      z-index: 1;
      height: 400px;
      width: 70%;
      position: absolute;
      top: 0;
      right: 0;
      background: #fff;
      overflow: hidden;
      border: 1px solid #e0e0e0;
      border-left: none;
      box-shadow: 0 8px 16px rgba(0,0,0,0.18);
      ul{
        height: 458px;
        display: flex;
        flex-flow: wrap;
        flex-direction: column;
        align-items: flex-start;
        align-content: flex-start;
        /*justify-content: flex-start;*/
        li{
          width: 265px;
          height: 76px;
          list-style-type: none;
          .product{
            a{
              display: flex;
              text-decoration-line: none;
              color: #2c3e50;
              /*justify-content: flex-start;*/
              align-items: center;
              transition: color .2s;
              width: 265px;
              padding: 20px 20px;
              &:hover{
                color: #ff6700;
              }
              img{
                width: 40px;
                height: 40px;
              }
            }
          }
        }
      }
    }
  }
</style>
