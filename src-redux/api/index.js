import axiosInstance from './ajax';
import jsonp from 'jsonp';

const reqLogin = (username, password) => axiosInstance.post('http://localhost:5000/login', {username, password});

const reqValidateUser = (id) => axiosInstance.post('/validate/user', {id});

const reqGetCategory = (parentId) => axiosInstance.get('/manage/category/list', {
  params: {
    parentId
  }
});

const reqAddCategory = (parentId, categoryName) => axiosInstance.post('/manage/category/add', { parentId, categoryName });

const reqUpdateCategoryName = (categoryId, categoryName) => axiosInstance.post('/manage/category/update', {categoryId, categoryName});

const reqGetProduct = (pageNum, pageSize) => axiosInstance.get('/manage/product/list', {
  params: {
    pageNum,
    pageSize
  }
});


const reqWeather = (cityName) => {
  return new Promise((resolve, reject) => {
    jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${cityName}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
      {},
      function (err, data) {
        if (err) {
          console.log('天气', err);
          reject('请求天气失败');
        } else {
          const {weather, dayPictureUrl} = data.results[0].weather_data[0];
          resolve({weather, dayPictureUrl})
        }
      })
  })
};



export {
  reqLogin,
  reqWeather,
  reqGetProduct,
  reqValidateUser,
  reqAddCategory,
  reqGetCategory,
  reqUpdateCategoryName,
}