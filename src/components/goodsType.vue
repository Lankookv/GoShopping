<template>
  <div class="main-nav">
    <div class="nav-first" @mouseenter="isNavEnter = true" @mouseleave=" isNavEnter = false">
      <ul>
        <li v-for="(item,index) in navFirst" :key="index" :class="{active: item.type === selected}" @mouseenter="selected = item.type" style="">
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
          {name: '数码产品', type: 'digital', router:'/digitalGoods', pic:require("../components/icon/homeIcon/数码产品.png")},
          {name: '潮流女装', type: 'girlclothes', router:'/nothing', pic:require("../components/icon/homeIcon/女装.png") },
          {name: '潮流男装', type: 'boyclothes', router:'/nothing', pic:require("../components/icon/homeIcon/男装.png")},
          {name: '鞋类箱包', type: 'shoesbag', router:'/nothing', pic:require("../components/icon/homeIcon/鞋子.png")},
          {name: '家用电器', type: 'equipment', router:'/nothing', pic:require("../components/icon/homeIcon/生活电器.png")},
          {name: '彩妆护肤', type: 'makeupskincare', router:'/nothing', pic:require("../components/icon/homeIcon/彩妆.png")},
          {name: '汇吃美食', type: 'foods', router:'/nothing', pic:require("../components/icon/homeIcon/美食.png")},
          {name: '珠宝配饰', type: 'jewelry', router:'/nothing', pic:require("../components/icon/homeIcon/珠宝.png")},
        ],
        navSec: {
          girlclothes: [
            {title: '上衣',router:'/nothing', imgUrl:require("../components/icon/homeIcon/上衣.png")},
            {title: '裤子',router:'/nothing', imgUrl:require("../components/icon/homeIcon/裤子.png")},
            {title: '裙子',router:'/nothing', imgUrl:require("../components/icon/homeIcon/裙子.png")},
            {title: '家居服',router:'/nothing', imgUrl:require("../components/icon/homeIcon/家居服.png")},
            {title: '内衣裤',router:'/nothing', imgUrl:require("../components/icon/homeIcon/内衣裤.png")},
            {title: '袜子',router:'/nothing', imgUrl:require("../components/icon/homeIcon/袜子.png")},
          ],
          boyclothes: [
            {title: '上衣',router:'/nothing', imgUrl:require("../components/icon/homeIcon/上衣.png")},
            {title: '裤子',router:'/nothing', imgUrl:require("../components/icon/homeIcon/裤子.png")},
            {title: '运动服',router:'/nothing', imgUrl:require("../components/icon/homeIcon/运动服.png")},
            {title: '家居服',router:'/nothing', imgUrl:require("../components/icon/homeIcon/家居服.png")},
            {title: '内衣裤',router:'/nothing', imgUrl:require("../components/icon/homeIcon/内衣裤.png")},
            {title: '袜子',router:'/nothing', imgUrl:require("../components/icon/homeIcon/袜子.png")},
          ],
          shoesbag: [
            {title: '男鞋',router:'/nothing', imgUrl:require("../components/icon/homeIcon/男鞋.png")},
            {title: '女鞋',router:'/nothing', imgUrl:require("../components/icon/homeIcon/女鞋.png")},
            {title: '单肩包',router:'/nothing', imgUrl:require("../components/icon/homeIcon/单肩包.png")},
            {title: '双肩包',router:'/nothing', imgUrl:require("../components/icon/homeIcon/双肩包.png")},
            {title: '胸包腰包',router:'/nothing', imgUrl:require("../components/icon/homeIcon/腰包.png")},
            {title: '旅行箱',router:'/nothing', imgUrl:require("../components/icon/homeIcon/旅行箱.png")},
          ],
          equipment: [
            {title: '电视机',router:'/nothing', imgUrl:require("../components/icon/homeIcon/电视机.png")},
            {title: '空调',router:'/nothing', imgUrl:require("../components/icon/homeIcon/空调.png")},
            {title: '冰箱',router:'/nothing', imgUrl:require("../components/icon/homeIcon/冰箱.png")},
            {title: '生活电器',router:'/nothing', imgUrl:require("../components/icon/homeIcon/洗衣机.png")},
            {title: '厨房电器',router:'/nothing', imgUrl:require("../components/icon/homeIcon/厨房电器.png")},
            {title: '影音电器',router:'/nothing', imgUrl:require("../components/icon/homeIcon/影音电器.png")},
          ],
          digital: [
            {title: '手机', router:'/phoneGoods', imgUrl:require("../components/icon/homeIcon/手机.png")},
            {title: '电脑',router:'/nothing', imgUrl:require("../components/icon/homeIcon/电脑.png")},
            {title: '平板',router:'/nothing', imgUrl:require("../components/icon/homeIcon/平板.png")},
            {title: '相机',router:'/nothing', imgUrl:require("../components/icon/homeIcon/相机.png")},
            {title: '配件',router:'/nothing', imgUrl:require("../components/icon/homeIcon/配件.png")},
            {title: '电玩',router:'/nothing', imgUrl:require("../components/icon/homeIcon/手机.png")},
          ],
          makeupskincare: [
            {title: '化妆品',router:'/nothing', imgUrl:require("../components/icon/homeIcon/化妆品.png")},
            {title: '美肤',router:'/nothing', imgUrl:require("../components/icon/homeIcon/美肤.png")},
            {title: '美发',router:'/nothing', imgUrl:require("../components/icon/homeIcon/美发.png")},
            {title: '美甲',router:'/nothing', imgUrl:require("../components/icon/homeIcon/美甲.png")},
            {title: '护肤',router:'/nothing', imgUrl:require("../components/icon/homeIcon/护肤.png")},
            {title: '男士护理',router:'/nothing', imgUrl:require("../components/icon/homeIcon/男士护理.png")},
          ],
          foods: [
            {title: '休闲零食',router:'/nothing', imgUrl:require("../components/icon/homeIcon/休闲零食.png")},
            {title: '生鲜果蔬',router:'/nothing', imgUrl:require("../components/icon/homeIcon/生鲜果蔬.png")},
            {title: '水产鲜肉',router:'/nothing', imgUrl:require("../components/icon/homeIcon/水产鲜肉.png")},
            {title: '美酒佳酿',router:'/nothing', imgUrl:require("../components/icon/homeIcon/美酒佳酿.png")},
            {title: '四季茗茶',router:'/nothing', imgUrl:require("../components/icon/homeIcon/四季茗茶.png")},
            {title: '滋补养生',router:'/nothing', imgUrl:require("../components/icon/homeIcon/滋补养生.png")}
          ],
          jewelry: [
            {title: '手表',router:'/nothing', imgUrl:require("../components/icon/homeIcon/手表.png")},
            {title: '手链',router:'/nothing', imgUrl:require("../components/icon/homeIcon/手链.png")},
            {title: '发饰',router:'/nothing', imgUrl:require("../components/icon/homeIcon/发饰.png")},
            {title: '项链',router:'/nothing', imgUrl:require("../components/icon/homeIcon/项链.png")},
            {title: '戒指',router:'/nothing', imgUrl:require("../components/icon/homeIcon/戒指.png")},
            {title: '眼镜',router:'/nothing', imgUrl:require("../components/icon/homeIcon/眼镜.png")}
          ]
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .main-nav{
    font-size: 14px;
    z-index: 1;
    margin-left: 3%;
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
            }
          }
        }
      }
    }
    .nav-sec{
      z-index: 1;
      height: 380px;
      width: 70%;
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
