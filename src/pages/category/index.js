import React, { Component, Fragment } from 'react';
import { Card, Button, Icon, Table, message, Modal } from 'antd';
import { reqGetCategory, reqAddCategory, reqUpdateCategoryName } from '../../api';
import AddCategoryForm from './add-category-form';
import UpdateCategoryNameForm from './update-category-name-form';
import './index.less';

export default class Category extends Component {
  state = {
    category: [],
    categories: [],
    subCategories: [],
    isShowSubCategory: false,
    isShowAddCategory: false,
    isShowUpdateCategoryName: false
  };
  addCategoryFormRef = React.createRef();
  updateCategoryNameFormRef = React.createRef();

  addCategory = () => {
    console.log(this.addCategoryFormRef.current.validateFields);
    this.addCategoryFormRef.current.validateFields((err, values) => {
      if (!err) {
        const { parentId, categoryName } = values;
        reqAddCategory(parentId, categoryName)
          .then((res) => {
            const { isShowSubCategory } = this.state;
            const isSubCategories = +parentId !== 0;
            const key = isSubCategories ? 'subCategories' : 'categories';
            message.success('添加分类成功', 3);
            if (!isShowSubCategory && isSubCategories) {
              return;
            }
            this.setState({
              [key]: [...this.state[key], res]
            });
          })
          .catch((error) => {
            message.error(error, 3);
          })
          .finally(() => {
            this.setState({
              isShowAddCategory: false
            })
            this.addCategoryFormRef.current.resetFields();
          })
      }
    })
  };
  updateCategoryName = () => {
    this.updateCategoryNameFormRef.current.validateFields((err, values) => {
      if (!err) {
        const { categoryName } = values;
        const categoryId = this.state.category._id;
        reqUpdateCategoryName(categoryId, categoryName)
          .then((res) => {
            message.success('更新分类名称成功', 3);
            const key = this.state.isShowSubCategory ? 'subCategories' : 'categories';
            this.setState({
              [key]: this.state[key].map((category) => {
                if (category._id === categoryId) {
                  category.name = categoryName;
                }
                return category;
              })
            })
          })
          .catch((error) => {
            message.error(error, 3);
          })
          .finally(() => {
            this.setState({
              isShowUpdateCategoryName: false
            })
            this.updateCategoryNameFormRef.current.resetFields();
          })
      }
    })
  };
  showAddCategory = () => {
    this.setState({
      isShowAddCategory: true
    })
  };
  goBack = () => {
    this.setState({
      isShowSubCategory: false
    })
  };

  render() {
    const {categories, subCategories, category, isShowAddCategory, isShowSubCategory, isShowUpdateCategoryName} = this.state;

    return <Card title={
      isShowSubCategory ?
        <Fragment><Button type="link" className="category-btn" onClick={this.goBack}>一级分类</Button><Icon
          type="arrow-right"/><span className="category-text">{category.name}</span></Fragment> : "一级分类列表"
    } extra={<Button type="primary" onClick={this.showAddCategory}><Icon type="plus"/>添加品类</Button>}>
      <Table
        columns={this.columns}
        dataSource={isShowSubCategory ? subCategories : categories}
        bordered
        pagination={{
          showQuickJumper: true, // 显示快速跳转
          showSizeChanger: true, // 显示修改每页显示数量
          pageSizeOptions: ['3', '6', '9', '12'], // 修改每页显示数量
          defaultPageSize: 3 // 默认显示数量
        }}
        rowKey="_id"
      />

      <Modal
        title="添加分类"
        visible={isShowAddCategory}
        onOk={this.addCategory}
        onCancel={this.cancel('isShowAddCategory')}
        okText="确认"
        cancelText="取消"
      >
        <AddCategoryForm categories={categories} ref={this.addCategoryFormRef}/>
      </Modal>


      <Modal
        title="修改名称"
        visible={isShowUpdateCategoryName}
        onOk={this.updateCategoryName}
        onCancel={this.cancel('isShowUpdateCategoryName')}
        okText="确认"
        cancelText="取消"
        width={300}
      >
        <UpdateCategoryNameForm category={category} ref={this.updateCategoryNameFormRef}/>
      </Modal>

    </Card>;
  }
}