// src\api\api.js
import axios from 'axios';    // 导入axios

let host = 'http://192.168.43.104:2887/api';

// 登录
export const login = params => { return axios.post(`${host}/login/`, params)};

// 注册
export const register = params => { return axios.post(`${host}/user/register`, params)};
