import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'development'  ? 'http://localhost:3000' : 'http://localhost:5000';

const axiosInstance = axios.create({
  base_url: BASE_URL,
  timeout: 7000
});

axiosInstance.interceptors.response.use(
  (response) => {
  const result = response.data;
  if (result.status === 0) {
    return result.data || {}
  } else {
    return Promise.reject(result.msg || '帐号有问题')
  }
},
  error => {
    console.log('ajax', error);
    return Promise.reject('网络错误')
  }
);

export default axiosInstance;