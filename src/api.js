// src\api\api.js
import axios from 'axios';    // 导入axios

let host = 'http://10.61.196.17:2887/api';

// 登录
export const login = params => { return axios.post(`${host}/login/`, params)};

// 注册
export const register = params => { return axios.post(`${host}/user/register`, params)};

// 显示所有商品(首页)
export const showAllGoods = params => { return axios.get(`${host}/getAllGoodList`, params)};

// 显示商品详情(买家)
export const showGoodDetail = params => { return axios.post(`${host}/getGoodInfo`, params)};

// 显示所有历史商品
export const showAllHistoricalGoods = params => { return axios.get(`${host}/getGoodForHistoryList`, params)};
