/*
* 封装了Axios请求
* */

import axios from 'axios';

console.log(process);
const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 7000
});

axiosInstance.interceptors.response.use(
  (response) => {
    const result = response.data;
console.log(result);
    if (result.status === 0) {
      return result.data || {}
    } else {
      return Promise.reject(result.msg || '请求失败')
    }
  },
  (error) => {
    return Promise.reject('网络故障，请刷新')
  }
);

export default axiosInstance;