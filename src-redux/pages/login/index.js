import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { reqLogin } from '../../api'

const { Item } = Form;

class Login extends Component {

  handleSubmit = e => {
    e.preventDefault();
    const { form: { validateFields, resetFields }, history: { replace }} = this.props;
    validateFields((err, values) => {
      if (!err) {
const { username, password } = values;
        reqLogin(username, password)
          .then(response => {
            message.success('请求成功', 3);
            data.user = response;

          })
          .catch(error => {

          })
      } else {
        message.error(error, 3);
        resetFields();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Item>
        <Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Item>
        <Item>
          <Button type="Link" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Item>
      </Form>
    );
  }
}

 Form.create()(Login);