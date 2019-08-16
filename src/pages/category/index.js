import React, {Component, Fragment} from 'react';
import {Card, Button, Icon, Table, message, Modal} from 'antd';
import {reqGetCategory, reqAddCategory} from '../../api';
import AddCategoryForm from './add-category-form';
import './index.less';

export default class Category extends Component {
  state = {
    categories: [],
    isShowAddCategory: false,
  };

  addCategoryFormRef = React.createRef();

  componentDidMount() {
    reqGetCategory(0)
      .then(res => {
        this.setState({
          categories: res
        })
      })
      .catch(error => {
        message.error(error, 3)
      })
  };

  columns = [
    {
      title: '品类名称',
      dataIndex: 'name',
      // render: text => <a>{text}</a>, // 默认是纯文本，如果要加上指定标签，就得render方法
    },
    {
      title: '操作', // 列的标题
      className: 'column-operation',  // 列的类名
      dataIndex: 'operation', // 要显示数据的属性名相关
      render: () => {
        return <Fragment>
          <Button type="link">修改名称</Button>
          <Button type="link">查看其子品类</Button>
        </Fragment>
      }
    }
  ];
  showAddCategory = () => {
    this.setState({isShowAddCategory: true})
  };

  cancel = () => {
    this.setState({isShowAddCategory: false})
  };

  addCategory = () => {
    this.addCategoryFormRef.current.validateFields((err, values) => {
      if (!err) {
        const {parentId, categoryName} = values;
        reqAddCategory(parentId, categoryName)
          .then((res) => {
            this.setState({
              categories: [...this.state.categories, res]
            })
            message.success('添加分类成功', 3);
          })
          .catch((error) => {
            message.error(error, 3);
          })
          .finally(() => {
            this.setState({
              isShowAddCategory: false
            });
            this.addCategoryFormRef.current.resetFields();
          })
      }
    })
  };

  render() {

    return <Card title="一级分类列表"
                 extra={<Button type="primary" onClick={this.showAddCategory}><Icon type="plus"/>添加品类</Button>}>
      <Table
        columns={this.columns}
        dataSource={categories}
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
        onCancel={this.cancel}
        okText="确认"
        cancelText="取消"
      >
        <AddCategoryForm categories={categories} ref={this.addCategoryFormRef}/>
      </Modal>

    </Card>;
  }
}