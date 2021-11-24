import Vue from 'vue'
import Router from 'vue-router'
import home from "../views/home";
import goodDetails from "../views/goodDetails";
import ReleaseGoods from "../views/ReleaseGoods";
import HistoricalGoods from "../views/HistoricalGoods"
import ChangePassword from "../views/ChangePassword"
import ProspectiveBuyers from "../views/ProspectiveBuyers"
import goodDetailOnSale from "../views/goodDetail-onSale"
import goodDetailSold from "../views/goodDetail-sold"
import goodDetailFrozen from "../views/goodDetail-frozen"
import buyerDetails from "../views/buyerDetails"
import CustomerInformation from "../views/CustomerInformation"

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
      path: '/:bid/buyerDetails',//bid:商品id
      name: 'buyerDetails',
      component: buyerDetails,
    },
    {
      path: '/ChangePassword',
      name: 'ChangePassword',
      component: ChangePassword,
      meta:{isSeller:true},
    },
    {
      path: '/ReleaseGoods',
      name: 'ReleaseGoods',
      component: ReleaseGoods,
      meta:{isSeller:true},
    },
    {
      path: '/HistoricalGoods',
      name: 'HistoricalGoods',
      component: HistoricalGoods,
      meta:{isSeller:true},
    },
    {
      path: '/ProspectiveBuyers',
      name: 'ProspectiveBuyers',
      component: ProspectiveBuyers,
      meta:{isSeller:true},
    },
    {
      path: '/CustomerInformation',
      name: 'CustomerInformation',
      component: CustomerInformation,
      meta:{isSeller:true},
    },
    {
      path: '/GoodDetail/:bid',//bid:商品id
      name: 'goodDetail-onSale',
      component: goodDetailOnSale,
      meta:{isSeller:true},
    },
    {
      path: '/GoodDetail/:bid',//bid:商品id
      name: 'goodDetail-sold',
      component: goodDetailSold,
      meta:{isSeller:true},
    },
    {
      path: '/GoodDetail/:bid',//bid:商品id
      name: 'goodDetail-frozen',
      component: goodDetailFrozen,
      meta:{isSeller:true},
    },
  ]
})
