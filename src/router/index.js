import Vue from 'vue'
import Router from 'vue-router'
import home from "../views/home";
import goodDetails from "../views/goodDetails";
import HistoricalGoods from "../views/HistoricalGoods"
import ChangePassword from "../views/ChangePassword"

import login from "../views/Login"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: { title: '登录' }
    },
    {
      path: '/goodDetails/:bid',
      name: 'GoodDetails',
      component: goodDetails
    },
    {
      path: '/HistoricalGoods',
      name: 'HistoricalGoods',
      component: HistoricalGoods
    },
    {
      path: '/ChangePassword',
      name: 'ChangePassword',
      component: ChangePassword
    },

  ]
})
