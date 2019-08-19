import React, { Component } from 'react';
import { Form, Input, message, Icon, Button } from 'antd';
import { reqLogin } from '../../api';


import './index.less'

class Login extends Component {

  handleSubmit = e => {
    e.preventDefault();
    const { form: { validateFields}} = this.props;
    validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;
        reqLogin(username, password)
          .then(res => {

          })
          .catch(error => message.error(error, 3))
      } else {
        message.error(err, 3);
      }
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item>

          <Button type="primary" htmlType="submit" className="login-form-button">
           登录
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(Login);