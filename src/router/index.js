import Vue from 'vue'
import Router from 'vue-router'
import home from "../views/home";
import goodDetails from "../views/goodDetails";
import HistoricalGoods from "../views/HistoricalGoods"
import ChangePassword from "../views/ChangePassword"

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
