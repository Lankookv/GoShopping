// src\api\api.js
import axios from 'axios';    // 导入axios

// // let host = 'http://10.61.196.17:2887/api';//苇苇学校
// // let host = 'http://192.168.12.23:2887/api';//苇苇寝室
let host = 'http://192.168.110.40:2887/api';//苇苇热点
// // let host = 'http://10.61.180.170:2887/api';//杨柳学校
// // let host = 'http://10.61.196.17:2887/api';//杨柳寝室
// // let host = 'http://192.168.43.104:2887/api';//杨柳热点
// // let host = 'http://192.168.43.104:2887/api';//我热点
// let host = "http://121.40.97.124:2887/api";

// 登录
export const login = params => { return axios.post(`${host}/seller/sellerLogin/`, params)};

// 注册   ==》未完成
export const register = params => { return axios.post(`${host}/seller/sellerRegister`, params)};

// 显示所有商品(首页) （只是不显示已下架）
export const showAllGoods = params => { return axios.post(`${host}/buyer/getAllGoodListFB`, params)};

// 显示商品详情(买家)
export const showGoodDetail = params => { return axios.post(`${host}/buyer/getGoodInfo`, params)};

//买家信息填写,生成买家
export const buyerDetails = params => { return axios.post(`${host}/buyer/uploadBuyerInfo`, params)};

//生成意向
export const createIntention = params => { return axios.post(`${host}/buyer/raiseIntention`, params)};

// // 显示所有历史商品（显示该卖家所有状态商品）
// export const showAllHistoricalGoods = params => { return axios.post(`${host}/seller/getAllGoodListBySellerId`, params)};

// 显示所有历史商品（显示该卖家除下架状态的商品）
export const showAllHistoricalGoods = params => { return axios.post(`${host}/seller/getUnremovedGoodListBySellerId`, params)};

// 历史商品里面删除商品
export const deleteHistoricalGood = params => { return axios.post(`${host}/seller/pullOffGood`, params)};

// // 更新卖家信息 seller  ==》未完成
// export const updateSellerInfo = params => { return axios.post(`${host}/updateSellerInfo`, params)};

// 拿取卖家密码
export const checkOldPassword = params => {return axios.post(`${host}/seller/checkSellerPassword`,params)};

// 修改卖家密码
export const changePassword = params => {return axios.post(`${host}/seller/updateSellerPassword`,params)};

// 查看意向购买人 (查看该卖家有意向购买人的所有商品)
export const showAllGoodsOfInterestedBuyers = params => { return axios.post(`${host}/seller/getWantedGoodListBySellerId`, params)};

// 查看某商品意向购买人
export const showIntentionListByGoodId = params => { return axios.post(`${host}/seller/getIntentionListByGoodId`, params)};

// 查看某商品意向购买人详细信息
export const showBuyerInfo = params => { return axios.post(`${host}/seller/getBuyerInfo`, params)};

// 冻结 deal（生成订单）
export const freezeGood = params => { return axios.post(`${host}/seller/startDeal`, params)};

// // 获取交易历史记录 good GoodId  ==》未完成 ==> 不用
// export const getDealHistfoyList = params => { return axios.post(`${host}/getDealHistfoyListByGoodId`, params)};

// 查看某商品冻结信息
export const showFrozenGoodBuyerInformation = params => { return axios.post(`${host}/seller/getDealListByGoodId`, params)};

// 上架---取消交易
export const putOnGood = params => { return axios.post(`${host}/seller/cancelDeal`, params)};

// 下架---达成交易
export const putOffGood = params => { return axios.post(`${host}/seller/finishDeal`, params)};

// // 开始交易 deal ==》未完成？？？
// export const startBusiness = params => { return axios.post(`${host}/startBusiness`, params)};
//
// // 获取交易历史记录 seller ==》未完成？？？
// export const getDealHistoryBySellerId = params => { return axios.post(`${host}/getDealHistoryBySellerId`, params)};

// 发布商品---上架
export const releaseGood = params => { return axios.post(`${host}/seller/raiseGood`, params)};

