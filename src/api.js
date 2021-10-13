// src\api\api.js
import axios from 'axios';    // 导入axios

// let host = 'http://10.61.196.17:2887/api';//苇苇学校
// let host = 'http://192.168.12.23:2887/api';//苇苇寝室
// let host = 'http://192.168.246.40:2887/api';//苇苇热点
// let host = 'http://10.61.44.43:2888/api';//杨柳学校
// let host = 'http://10.61.196.17:2887/api';//杨柳寝室
let host = 'http://192.168.43.104:2888/api';//杨柳学校

// 登录
export const login = params => { return axios.post(`${host}/login/`, params)};

// 注册   ==》未完成
export const register = params => { return axios.post(`${host}/user/register`, params)};

// 显示所有商品(首页)
export const showAllGoods = params => { return axios.get(`${host}/getAllGoodList`, params)};

// 显示商品详情(买家)
export const showGoodDetail = params => { return axios.post(`${host}/getGoodInfo`, params)};

// 提交买家信息并且生成订单 ==》未完成（后端）
export const c = params => { return axios.post(`${host}/getGoodInfo`, params)};

// 显示所有历史商品
export const showAllHistoricalGoods = params => { return axios.post(`${host}/getGoodListBySellerId`, params)};

// 更新卖家信息 seller  ==》未完成 ==>妞妞
export const updateSellerInfo = params => { return axios.post(`${host}/updateSellerInfo`, params)};

// 拿取卖家密码  ==》未完成（后端） ==> 妞妞
export const a = params => { return axios.post(`${host}/a`, params)};

// 修改卖家密码  ==》未完成（后端） ==> 妞妞
export const b = params => { return axios.post(`${host}/b`, params)};

// 查看意向购买人
export const showAllGoodsOfInterestedBuyers = params => { return axios.post(`${host}/getWantedGoodListBySellerId`, params)};

// 查看某商品意向购买人
export const showIntentionListByGoodId = params => { return axios.post(`${host}/getIntentionListByGoodId`, params)};

// 查看某商品意向购买人详细信息
export const showBuyerInfo = params => { return axios.post(`${host}/getBuyerInfo`, params)};

// 冻结 deal
export const freezeGood = params => { return axios.post(`${host}/startDeal`, params)};

// 获取交易历史记录 good GoodId  ==》未完成 ==> 不用
export const getDealHistfoyList = params => { return axios.post(`${host}/getDealHistfoyListByGoodId`, params)};

// 查看某商品冻结信息  ==》未完成(后端)  ==>  不用
export const showFrozenGoodBuyerInformation = params => { return axios.post(`${host}/getGoodListBySellerId`, params)};

// 上架---取消交易
export const putOnGood = params => { return axios.post(`${host}/cancelDeal`, params)};

// 下架---达成交易
export const putOffGood = params => { return axios.post(`${host}/finishDeal`, params)};

// 开始交易 deal ==》未完成？？？
export const startBusiness = params => { return axios.post(`${host}/startBusiness`, params)};

// 获取交易历史记录 seller ==》未完成？？？
export const getDealHistoryBySellerId = params => { return axios.post(`${host}/getDealHistoryBySellerId`, params)};


