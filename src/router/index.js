import Vue from 'vue'
import Router from 'vue-router'
import home from "../views/home";
import goodDetails from "../views/goodDetails";
import ReleaseGoods from "../views/goodManagement/ReleaseGoods";
import HistoricalGoods from "../views/goodManagement/HistoricalGoods"
import ChangePassword from "../views/accountManagement/ChangePassword"
import ProspectiveBuyers from "../views/transactionManagement/ProspectiveBuyers"
import goodDetailOnSale from "../views/goodManagement/goodDetail-onSale"
import goodDetailSold from "../views/goodManagement/goodDetail-sold"
import goodDetailFrozen from "../views/goodManagement/goodDetail-frozen"
import buyerDetails from "../views/buyerDetails"
import CustomerInformation from "../views/customerManagement/CustomerInformation"
import digitalGoods from "../views/digitalGoods";
import phoneGoods from "../views/phoneGoods";
import nothing from "../views/nothing";
import editInformation from "../views/accountManagement/editInformation"
import PurchaseRecords from "../views/purchaseManagement/PurchaseRecords"

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
    {
      path: '/digitalGoods/',
      name: 'digitalGoods',
      component: digitalGoods,
    },
    {
      path: '/phoneGoods/',
      name: 'phoneGoods',
      component: phoneGoods,
    },
    {
      path: '/nothing/',
      name: 'nothing',
      component: nothing,
    },
    {
      path: '/editInformation/',
      name: 'editInformation',
      component: editInformation,
    },
    {
      path: '/PurchaseRecords/',
      name: 'PurchaseRecords',
      component: PurchaseRecords,
    },
  ]
})
