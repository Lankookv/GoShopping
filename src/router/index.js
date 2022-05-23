import Vue from 'vue'
import Router from 'vue-router'
import home from "../views/home";
import goodDetails from "../views/goodDetails";
import ReleaseGoods from "../views/goodManagement/ReleaseGoods";
import HistoricalGoods from "../views/goodManagement/HistoricalGoods"
import ChangePassword from "../views/accountManagement/ChangePassword"
import goodDetailOnSale from "../views/goodManagement/goodDetail-onSale"
import buyerDetails from "../views/buyerDetails"
import CustomerInformation from "../views/customerManagement/CustomerInformation"
import digitalGoods from "../views/digitalGoods";
import phoneGoods from "../views/phoneGoods";
import nothing from "../views/nothing";
import editInformation from "../views/accountManagement/editInformation"
import sellerCentral from "../views/sellerCentral"

//升级包B
import StateOne from "../views/orderManagement/StateOne"
import StateTwo from "../views/orderManagement/StateTwo"
import StateThree from "../views/orderManagement/StateThree"
import StateFour from "../views/orderManagement/StateFour"
import StateFive from "../views/orderManagement/StateFive"
import StateSix from "../views/orderManagement/StateSix"
import buyerStateOne from "../views/buyerOrderManagement/StateOne"
import buyerStateTwo from "../views/buyerOrderManagement/StateTwo"
import buyerStateThree from "../views/buyerOrderManagement/StateThree"
import buyerStateFour from "../views/buyerOrderManagement/StateFour"
import buyerStateFive from "../views/buyerOrderManagement/StateFive"
import ShoppingCart from "../views/ShoppingCart"
import myFavorites from "../views/myFavorites"

//升级包C
import payView from "../views/payView"
import payViewF from "../views/payViewF"
import ReleasePosts from "../views/ReleasePosts"
import sellerCentral from "../views/sellerCentral"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home,
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

    //升级包B
    {
      path: '/ViewOrders/2',//sid:订单状态id
      name: 'StateOne',
      component: StateOne,
      meta:{isSeller:true},
    },
    {
      path: '/ViewOrders/3',//sid:订单状态id
      name: 'StateTwo',
      component: StateTwo,
      meta:{isSeller:true},
    },
    {
      path: '/ViewOrders/4',//sid:订单状态id
      name: 'StateThree',
      component: StateThree,
      meta:{isSeller:true},
    },{
      path: '/ViewOrders/5',//sid:订单状态id
      name: 'StateFour',
      component: StateFour,
      meta:{isSeller:true},
    },
    {
      path: '/ViewOrders/6',//sid:订单状态id
      name: 'StateFive',
      component: StateFive,
      meta:{isSeller:true},
    },
    {
      path: '/ViewOrders/-1',//sid:订单状态id
      name: 'StateSix',
      component: StateSix,
      meta:{isSeller:true},
    },
    {
      path: '/buyerViewOrders/1',//sid:订单状态id
      name: 'buyerStateOne',
      component: buyerStateOne,
    },
    {
      path: '/buyerViewOrders/4',//sid:订单状态id
      name: 'buyerStateTwo',
      component: buyerStateTwo,
    },
    {
      path: '/buyerViewOrders/5',//sid:订单状态id
      name: 'buyerStateThree',
      component: buyerStateThree,
    },{
      path: '/buyerViewOrders/6',//sid:订单状态id
      name: 'buyerStateFour',
      component: buyerStateFour,
    },
    {
      path: '/buyerViewOrders/-1',//sid:订单状态id
      name: 'buyerStateFive',
      component: buyerStateFive,
    },
    {
      path: '/ShoppingCart/',
      name: 'ShoppingCart',
      component: ShoppingCart,
    },
    {
      path: '/myFavorites/',
      name: 'myFavorites',
      component: myFavorites,
    },
    {
      path: '/sellerCentral/',
      name: 'sellerCentral',
      component: sellerCentral,
    },
    {
      path: '/payView',
      name: 'payView',
      component: payView,
    },
    {
      path: '/payViewF',
      name: 'payViewF',
      component: payViewF,
    },
    {
      path: '/ReleasePosts',
      name: 'ReleasePosts',
      component: ReleasePosts,
    },
  ]
})
