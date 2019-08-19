

import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:5000';
const axiosInstance =  axios.create({
  baseURL: BASE_URL,
  timeout: 7000
});

axiosInstance.interceptors.response.use(
  response => {
    const result = response.data;
    if (result.status === 0) {
      return result.data || {};
    } else {
      return Promise.reject(result.msg || '获取失败')
    }
  },
  error => {
    console.log(error);
    return Promise.reject('网络错误');
  }
)

export default axiosInstance;