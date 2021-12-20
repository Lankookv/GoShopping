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
          {name: '数码产品', type: 'digital', router:'/digitalGoods', pic:require("../components/icon/数码产品.png")},
          {name: '潮流女装', type: 'girlclothes', router:'/nothing', pic:require("../components/icon/女装.png") },
          {name: '潮流男装', type: 'boyclothes', router:'/nothing', pic:require("../components/icon/男装.png")},
          {name: '鞋类箱包', type: 'shoesbag', router:'/nothing', pic:require("../components/icon/鞋子.png")},
          {name: '家用电器', type: 'equipment', router:'/nothing', pic:require("../components/icon/生活电器.png")},
          {name: '彩妆护肤', type: 'makeupskincare', router:'/nothing', pic:require("../components/icon/彩妆.png")},
          {name: '汇吃美食', type: 'foods', router:'/nothing', pic:require("../components/icon/美食.png")},
          {name: '珠宝配饰', type: 'jewelry', router:'/nothing', pic:require("../components/icon/项链.png")},
        ],
        navSec: {
          girlclothes: [
            {title: '上衣'},
            {title: '裤子'},
            {title: '裙子'},
            {title: '家居服'},
            {title: '内衣裤'},
            {title: '袜子'},
          ],
          boyclothes: [
            {title: '上衣'},
            {title: '裤子'},
            {title: '裙子'},
            {title: '家居服'},
            {title: '内衣裤'},
            {title: '袜子'},
          ],
          shoesbag: [
            {title: '男鞋'},
            {title: '女鞋'},
            {title: '单肩包'},
            {title: '双肩包'},
            {title: '胸包腰包'},
            {title: '旅行箱'},
          ],
          equipment: [
            {title: '电视机'},
            {title: '空调'},
            {title: '冰箱'},
            {title: '生活电器'},
            {title: '厨房电器'},
            {title: '影音电器'},
          ],
          digital: [
            {title: '手机', router:'/phoneGoods', imgUrl:require("../components/icon/手机.png")},
            {title: '电脑'},
            {title: '平板'},
            {title: '相机'},
            {title: '配件'},
            {title: '电玩'},
          ],
          makeupskincare: [
            {title: '彩妆'},
            {title: '美肤'},
            {title: '美发'},
            {title: '美甲'},
            {title: '护肤'},
            {title: '男士护理'},
          ],
          foods: [
            {title: '休闲零食'},
            {title: '生鲜果蔬'},
            {title: '水产鲜肉'},
            {title: '美酒佳酿'},
            {title: '四季茗茶'},
            {title: '滋补养生'}
          ],
          jewelry: [
            {title: '手表'},
            {title: '手链'},
            {title: '发饰'},
            {title: '项链'},
            {title: '戒指'},
            {title: '眼镜'}
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
    width: 1226px;
    margin: 0 auto;
    position: relative;
    display: flex;
    /*justify-content: flex-start;*/
    >.nav-first{
      width: 235px;
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
      width: 992px;
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
