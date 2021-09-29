import Vue from 'vue'
import Router from 'vue-router'
import home from "../views/home";
import goodDetails from "../views/goodDetails";
import HistoricalGoods from "../views/HistoricalGoods"
import ChangePassword from "../views/ChangePassword"
import ProspectiveBuyers from "../views/ProspectiveBuyers"
import goodDetailsSeller from "../views/goodDetailsSeller"
import b from "../views/b"

import a from "../views/a"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home
    },
    {
      path: '/goodDetails/:bid',
      name: 'GoodDetails',
      component: goodDetails
    },
    {
      path: '/ChangePassword',
      name: 'ChangePassword',
      component: ChangePassword
    },
    {
      path: '/HistoricalGoods',
      name: 'HistoricalGoods',
      component: b,//HistoricalGoods
    },
    {
      path: '/goodDetails-seller/:bid',
      name: 'GoodDetails-seller',
      component: goodDetailsSeller
    },
    {
      path: '/ProspectiveBuyers',
      name: 'ProspectiveBuyers',
      component: ProspectiveBuyers
    },
    {
      path: '/a',
      name: 'a',
      component: a
    },

  ]
})
