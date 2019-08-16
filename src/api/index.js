import axiosInstance from './ajax';
import jsonp from 'jsonp';

export const reqLogin = (username, password) => axiosInstance.post('/login', {username, password});

export const reqValidateUser = (id) => axiosInstance.post('/validate/user', {id});

export const reqWeather = (cityName) => {
  return new Promise((resolve, reject) => {
    jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${cityName}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
      {},
      function (err, data) {
      if (err) {
        console.log(err);
        reject('请求天气失败')
      } else {
        const { weather, dayPictureUrl } = data.result[0].weather_data[0];
        resolve({ weather, dayPictureUrl })
      }
      })
  })
};

export const reqGetCategory = parentId => axiosInstance.get('/manage/category/list', {
  params: {
    parentId
  }
});

export const reqAddCategory = (parentId, categoryName) => axiosInstance.post('/manage/category/add', {parentId, categoryName });