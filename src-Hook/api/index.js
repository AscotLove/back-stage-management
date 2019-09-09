
import axiosInstance from './ajax';
import jsonp from 'jsonp';


const reqLogin = (username, password) => axiosInstance.post('http://localhost:5000/login', { username, password });









export {
  reqLogin,
}