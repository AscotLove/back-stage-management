import React, { Component } from 'react';
import { Card, Button, Table, Modal, message } from 'antd';
import dayjs from "dayjs";
import { reqAddRole, reqGetRole, reqGetUser, reqAddUser } from '../../api';
import AddUserForm from './add-user-form';
import UpdateUserForm from './update-user-form';

export default class User extends Component {
  state = {
    users: [], //用户数组
    roles: [],
    isShowAddUserModal: false, //是否展示创建用户的标识
    isShowUpdateUserModal: false, //是否展示更新用户的标识
  };

  addUserFormRef = React.createRef();
  updateUserFormRef = React.createRef();

  columns = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    {
      title: '注册时间',
      dataIndex: 'create_time',
      render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '所属角色',
      dataIndex: 'role_id',
    },
    {
      title: '操作',
      render: user => {
        return <div>
          <Button type="link" onClick={() => {}}>修改</Button>
          <Button type="link" onClick={() => {}}>删除</Button>
        </div>
      }
    }
  ];
componentDidMount() {
  reqGetUser()
    .then((res) => {
      message.success('获取用户列表成功', 3);
      this.setState({
        users: res.users
      })
    })
    .catch(() => {
      message.error('获取用户列表失败', 3)
    })

  reqGetRole()
    .then((res) => {
      message.success('获取角色列表成功', 3)
      this.setState({
        roles: res
      })
    })
    .catch(() => {
      message.error('获取角色列表失败', 3)
    })
}
  //创建用户的回调函数
  addUser = () => {
    this.addUserFormRef.current.validateFields((err, values) => {
      if (!err) {
        const { username, password, phone, email, role_id } =values;
        reqAddUser({username, password, phone, email, role_id})
          .then((res) => {
            message.success('添加用户成功', 3);
            this.setState({
              users: [...this.state.users, res]
            })
          })
          .catch(() => {
            message.error('添加用户失败', 3)
          })
          .finally(() => {
            this.setState({
              isShowAddUserModal: false
            })
            this.addUserFormRef.current.resetFields();
          })
      }
    })
  };
  
  updateUser = () => {
  
  };

  switchModal = (key, value) => {
    return () => {
      this.setState({
        [key]: value
      })
    }
  };
  
  render () {
    const { users, roles, isShowAddUserModal, isShowUpdateUserModal } = this.state;
    
    return (
      <Card
        title={
          <Button type='primary' onClick={this.switchModal('isShowAddUserModal', true)}>创建用户</Button>
        }
      >
        <Table
          columns={this.columns}
          dataSource={users}
          bordered
          rowKey='_id'
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15', '20'],
            showQuickJumper: true,
          }}
        />
  
        <Modal
          title="创建用户"
          visible={isShowAddUserModal}
          onOk={this.addUser}
          onCancel={this.switchModal('isShowAddUserModal', false)}
          okText='确认'
          cancelText='取消'
        >
          <AddUserForm ref={this.addUserFormRef} roles={roles}/>
        </Modal>
  
        <Modal
          title="更新用户"
          visible={isShowUpdateUserModal}
          onOk={this.updateUser}
          onCancel={this.switchModal('isShowUpdateUserModal', false)}
          okText='确认'
          cancelText='取消'
        >
          <UpdateUserForm ref={this.updateUserFormRef}/>
        </Modal>
        
      </Card>
    )
  }
}
