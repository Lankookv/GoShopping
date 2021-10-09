import Vue from 'vue'
import Router from 'vue-router'
import home from "../views/home";
import goodDetails from "../views/goodDetails";
import HistoricalGoods from "../views/HistoricalGoods"
import ChangePassword from "../views/ChangePassword"
import ProspectiveBuyers from "../views/ProspectiveBuyers"
import goodDetailsSeller from "../views/goodDetailsSeller"
import HistoricalGoodsDetail from "../views/HistoricalGoodsDetail"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home

    },
    {
      path: '/goodDetails/:bid',//bid:商品id
      name: 'GoodDetails',
      component: goodDetails
    },
    {
      path: '/ChangePassword',
      name: 'ChangePassword',
      component: ChangePassword,
      meta:{isLogin:false},
    },
    {
      path: '/HistoricalGoods',
      name: 'HistoricalGoods',
      component: HistoricalGoods,
      meta:{isLogin:false},
    },
    {
      path: '/goodDetails-seller/:bid',//bid:商品id
      name: 'GoodDetails-seller',
      component: goodDetailsSeller,
      meta:{isLogin:false},
    },
    {
      path: '/ProspectiveBuyers',
      name: 'ProspectiveBuyers',
      component: ProspectiveBuyers,
      meta:{isLogin:false},
    },
    {
      path: '/HistoricalGoodsDetail/:bid',//bid:商品id
      name: 'HistoricalGoodsDetail',
      component: HistoricalGoodsDetail,
      meta:{isLogin:false},
    },
  ]
})
