// src\api\api.js
import axios from 'axios';    // 导入axios

//let host = 'http://10.61.2.9:2887/api';//苇苇学校
let host = 'http://192.168.12.23:2887/api';//苇苇寝室
//let host = 'http://192.168.193.40:2887/api';//苇苇热点
// let host = 'http://10.61.180.170:2887/api';//杨柳学校
// // let host = 'http://10.61.196.17:2887/api';//杨柳寝室
// let host = 'http://192.168.43.104:2887/api';//杨柳热点
// // let host = 'http://192.168.43.104:2887/api';//我热点
//let host = "http://121.40.97.124:2887/api";//云端
// let host = "http://localhost:2888/api";

// 登录
export const login = params => { return axios.post(`${host}/common/login/`, params)};

// 注册
export const register = params => { return axios.post(`${host}/common/register`, params)};

// 搜索
export const search = params => { return axios.post(`${host}/buyer/searchGood`, params)};

// 显示所有商品(首页) （只是不显示已下架）
export const showAllGoods = params => { return axios.post(`${host}/buyer/getAllGoodListFB`, params)};

// 显示商品详情(买家)
export const showGoodDetail = params => { return axios.post(`${host}/buyer/getGoodInfo`, params)};

//买家信息填写,生成买家
export const buyerDetails = params => { return axios.post(`${host}/buyer/uploadBuyerInfo`, params)};

//买家购买
export const createDeal = params => {return axios.post(`${host}/buyer/placeAnOrder`, params)};

// // 显示所有历史商品（显示该卖家所有状态商品）
// export const showAllHistoricalGoods = params => { return axios.post(`${host}/seller/getAllGoodListBySellerId`, params)};

// 显示所有历史商品（显示该卖家除下架状态的商品）
export const showAllHistoricalGoods = params => { return axios.post(`${host}/seller/getUnremovedGoodListBySellerId`, params)};

// 历史商品里面删除商品
export const deleteHistoricalGood = params => { return axios.post(`${host}/seller/pullOffMultipleGood`, params)};

// // 更新卖家信息 seller  ==》未完成
// export const updateSellerInfo = params => { return axios.post(`${host}/updateSellerInfo`, params)};

// 拿取卖家密码
export const checkSellerOldPassword = params => {return axios.post(`${host}/seller/checkSellerPassword`,params)};

// 拿取卖家密码
export const checkBuyerOldPassword = params => {return axios.post(`${host}/buyer/checkBuyerPassword`,params)};

// 修改卖家密码
export const changeSellerPassword = params => {return axios.post(`${host}/seller/updateSellerPassword`,params)};

// 修买家密码
export const changeBuyerPassword = params => {return axios.post(`${host}/buyer/updateBuyerPassword`,params)};

// // 查看某商品意向购买人详细信息
// export const showBuyerInfo = params => { return axios.post(`${host}/seller/getBuyerInfo`, params)};
//
// // 冻结 deal（生成订单）
// export const freezeGood = params => { return axios.post(`${host}/seller/startDeal`, params)};
//
// // // 获取交易历史记录 good GoodId  ==》未完成 ==> 不用
// // export const getDealHistfoyList = params => { return axios.post(`${host}/getDealHistfoyListByGoodId`, params)};
//
// // 查看某商品冻结信息
// export const showFrozenGoodBuyerInformation = params => { return axios.post(`${host}/seller/getDealListByGoodId`, params)};
//
// // 上架---取消交易
// export const putOnGood = params => { return axios.post(`${host}/seller/cancelDeal`, params)};
//
// // 下架---达成交易
// export const putOffGood = params => { return axios.post(`${host}/seller/finishDeal`, params)};
// // 开始交易 deal ==》未完成？？？
// export const startBusiness = params => { return axios.post(`${host}/startBusiness`, params)};
//
// // 获取交易历史记录 seller ==》未完成？？？
// export const getDealHistoryBySellerId = params => { return axios.post(`${host}/getDealHistoryBySellerId`, params)};

// 发布商品---上架
export const releaseGood = params => {return axios.post(`${host}/seller/raiseGood`, params)};

// 发布商品---拿class1
export const showGoodClass1 = params => {return axios.post(`${host}/seller/getAllClass1`, params)};

// 发布商品---拿class2
export const showGoodClass2 = params => {return axios.post(`${host}/seller/getClass2ByClass1Id`, params)};

// 查看客户信息
export const showAllBuyerInfo = params => { return axios.post(`${host}/admin/getAllBuyerInfo`, params)};

// 查看客户购买记录
export const showPurchaseRecords = params => { return axios.post(`${host}/admin/getBuyerHistoryByBuyerId`, params)};

// 展示手机
export const showAllPhoneGoods = params => { return axios.post(`${host}/buyer/getClass2GoodListByClassId`, params)};

//展示数码产品
export const showAllDigitalGoods = params => { return axios.post(`${host}/buyer/getClass1GoodListByClassId`, params)};

//买家编辑信息
export const editInformation = params => { return axios.post(`${host}/buyer/changeBuyerInfo`, params)};

//显示买家购买记录
export const showallPurchaseRecords = params => { return axios.post(`${host}/buyer/getBuyerHistoryByBuyerId`, params)};

//升级包B
// 买家查看订单(各种状态)
export const buyerShowOrders = params => { return axios.post(`${host}/buyer/getOrderListOfStatement`, params)};

// 卖家查看订单(各种状态)
export const showOrders = params => { return axios.post(`${host}/seller/getOrderListOfStatement`, params)};

//buyerCancelAnOrder
export const buyerCancelAnOrder = params => { return axios.post(`${host}/buyer/buyerCancelOrder`, params)};

//sellerCancelAnOrder
export const sellerCancelAnOrder = params => { return axios.post(`${host}/seller/cancelTheOrder`, params)};

//confirmAnOrder
export const confirmAnOrder = params => { return axios.post(`${host}/seller/acceptTheOrder`, params)};

//preparedGoods
export const preparedGoods = params => { return axios.post(`${host}/seller/completeStocking`, params)};

//deliverGoods
export const deliverGoods = params => { return axios.post(`${host}/seller/deliverTheGoods`, params)};

//payAnOrder
export const payAnOrder = params => { return axios.post(`${host}/seller/getWantedGoodListBySellerId`, params)};

//buyerConfirmReceipt
export const buyerConfirmReceipt = params => { return axios.post(`${host}/buyer/ConfirmReceipt`, params)};

//afterSalesService
export const afterSalesService = params => { return axios.post(`${host}/seller/getWantedGoodListBySellerId`, params)};

//显示买家购物车内容
export const shoppingCart = params => { return axios.post(`${host}/buyer/getCartByBuyerId`, params)};

//改变购物车商品数量
export const changecartnumber = params => { return axios.post(`${host}/buyer/changeCartNumber`, params)};

//从购物车加入收藏夹
export const collectGoodsFromCart = params => { return axios.post(`${host}/buyer/getCartGoodIntoFavorite`, params)};

//删除购物车商品
export const  deleteCartgood = params => { return axios.post(`${host}/buyer/deleteCartGood`, params)};

//购物车下单
export const  OrderGoodsFromCart = params => { return axios.post(`${host}/buyer/orderGoodsFromCart`, params)};

//收藏商品
export const collectGoods = params => { return axios.post(`${host}/buyer/favoriteGood`, params)};

//查询该商品有没有收藏
export const showCollectionState = params => { return axios.post(`${host}/buyer/checkFavorite`, params)};

//查看收藏夹
export const showCollection = params => { return axios.post(`${host}/buyer/getFavoriteByBuyer`, params)};

//取消收藏
export const deleteCollectedGoods = params => { return axios.post(`${host}/buyer/deleteFavoriteGood`, params)};

//从详情页加入购物车
export const intoCart = params => { return axios.post(`${host}/buyer/addGoodIntoCart`, params)};

//拿买家收货信息
export const showAddress = params => { return axios.post(`${host}/buyer/getAddressByBuyer`, params)};

//详情页下单
export const purchaseInfo = params => { return axios.post(`${host}/buyer/placeAnOrder`, params)};

//得到购物车数量
export const getCartNumber = params => { return axios.post(`${host}/buyer/getNumberOfGoodsFromCart`, params)};

//添加地址
export const addAddress = params => { return axios.post(`${host}/buyer/addNotDefaultAddress`, params)};

//设为默认地址
export const alterdefault = params => { return axios.post(`${host}/buyer/alterDefaultAddressByBuyer`, params)};

//删除地址
export const deleteAddress = params => { return axios.post(`${host}/buyer/deleteAddress`, params)};

//卖家取售后单
export const getPost = params => { return axios.post(`${host}/buyer/getPostSaleByOrderId`, params)};

//卖家同意售后
export const agreePost = params => { return axios.post(`${host}/seller/agreePostSale`, params)};

//卖家拒绝售后
export const notagreePost = params => { return axios.post(`${host}/seller/notAgreePostSale`, params)};

//拿取所有帖子
export const getAllPosts = params => { return axios.post(`${host}/platform/getAllPosts`, params)};

//拿帖子内容
export const getPostDetail = params => { return axios.post(`${host}/platform/getPostDetail`, params)};

//修改价格
export const changePrice = params => { return axios.post(`${host}/seller/changePrice`, params)};
