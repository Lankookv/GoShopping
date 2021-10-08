// src\api\api.js
import axios from 'axios';    // 导入axios

let host = 'http://192.168.12.23:2887/api';

// 登录
export const login = params => { return axios.post(`${host}/login/`, params)};

// 注册
export const register = params => { return axios.post(`${host}/user/register`, params)};

// 显示所有商品(首页)
export const showAllGoods = params => { return axios.post(`${host}/getAllGoodForSale`, params)};
