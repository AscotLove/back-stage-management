import { message } from 'antd';
import {
  SAVE_USER,
  REMOVE_USER,
  GET_CATEGORY_SUCCESS,
  ADD_CATEGORY_SUCCESS,
  GET_SUB_CATEGORY_SUCCESS,
  ADD_SUB_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_NAME_SUCCESS,
  UPDATE_SUB_CATEGORY_NAME_SUCCESS
} from './action-types';
import { reqGetCategory, reqAddCategory, reqUpdateCategoryName } from '../api';
// 保存用户信息
const saveUser = (user) => ({type: SAVE_USER, data: user});

// 清空用户信息
const removeUser = () => ({type: REMOVE_USER});

// 分类
const [
  getCategorySuccess,
  getSubCategorySuccess,
  addCategorySuccess,
  addSubCategorySuccess,
  updateCategoryNameSuccess,
  updateSubCategoryNameSuccess
] =
  [
    (category) => ({type: GET_CATEGORY_SUCCESS, data: category}),
    (subCategory) => ({type: GET_SUB_CATEGORY_SUCCESS, data: subCategory}),
    (category) => ({type: ADD_CATEGORY_SUCCESS, data: category}),
    (subCategory) => ({type: ADD_SUB_CATEGORY_SUCCESS, data: subCategory}),
    (category) => ({type: UPDATE_CATEGORY_NAME_SUCCESS, data: category}),
    (subCategory) => ({type: UPDATE_SUB_CATEGORY_NAME_SUCCESS, data: subCategory})
  ];

// 获取分类数据
const getCategory = (parentId) => {
  return (dispatch) => {
    reqGetCategory(parentId)
      .then(res => {
        message.success('获取分类成功');
        if (parentId === 0) {
          dispatch(getCategorySuccess(res))
        } else {
          dispatch(getSubCategorySuccess(res));
        }
      })
      .catch((error) => { message.error('获取分类失败') })
  }
}

// 添加分类数据
const addCategory = (parentId, categoryName) => {
  return (dispatch) => {
    reqAddCategory(parentId, categoryName)
      .then((res) => {
        message.success('添加分类成功');
        if (parentId === 0) {
          dispatch(addCategorySuccess(res))
        } else {
          dispatch(addSubCategorySuccess(res))
        }
      })
      .catch((error) => {
        message.error('添加分类失败');
      })
  }
};



export {
  saveUser,
  removeUser,
  getCategory,
  addCategory
}