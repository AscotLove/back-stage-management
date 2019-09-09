import React, { useState } from 'react';
import {Form, Input, message, Icon, Button} from 'antd';
import {reqLogin} from '../../api';

import logo from '../../assets/images/logo.png';
import './index.less'

const {Item} = Form;

function Login(props)  {

  function handleSubmit(e) {
    e.preventDefault();
    const {form: {validateFields}} = props;
    validateFields((err, values) => {
      if (!err) {
        const {username, password} = values;
        reqLogin(username, password)
          .then(res => {
            message.success('登录成功', 3);
          })
          .catch(error => message.error(error, 3))
      } else {
        message.error(err, 3);
      }
    });
  };

    const {getFieldDecorator} = props.form;
    return <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo"/>
        <h1>React项目: 后台管理系统</h1>
      </header>
      <section className="login-section">
        <h2>用户登录</h2>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Item>
            {
              getFieldDecorator(
                'username',
                {
                  rules: [{required: true, message: 'Please input your username!'}],
                })(
                <Input
                  prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  placeholder="用户名"
                />,
              )}
          </Item>
          <Item>
            {
              getFieldDecorator(
                'password',
                {
                  rules: [{required: true, message: 'Please input your Password!'}],
                })(
                <Input
                  prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  type="password"
                  placeholder="密码"
                />,
              )}
          </Item>
          <Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Item>
        </Form>
      </section>
    </div>



}

export default Form.create()(Login);