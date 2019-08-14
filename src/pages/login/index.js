import React, {Component} from 'react';

import {Form, Input, Icon, Button, message} from 'antd';
// import axios from 'axios';
import logo from './logo.png';
import {reqLogin} from '../../api';
import './index.less';

const {Item} = Form;

class Login extends Component {


  validator = (rule, value, callback) => {
    const name = rule.field === 'username' ? '用户名' : '密码';
    const passwordReg = /^\w+$/;
    if (!value) {
      callback('输入内容不能为空');
    } else if (value.length < 4) {
      callback(`${name}c长度必须大于4位`);
    } else if (value.length > 10) {
      callback(`${name}长度必须小于10位`);
    } else if (!passwordReg.test(value)) {
      callback(`${name}只能包含英文、数字、下划线`);
    }
    ;

    callback();
  };

  login = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {

      if (!err) {
        const {username, password} = values;
        reqLogin(username, password)
          .then((response) => {
            console.log(response);
            message.success('登录成功', 3)
          })
          .catch((error) => {
            message.error(error, 3);
            this.props.form.resetFields(['password']);
          })
      }
    })
  };

  render() {
    const {getFieldDecorator} = this.props.form;

    return <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo"/>
        <h1>React项目: 后台管理系统</h1>
      </header>
      <section className="login-section">
        <h2>用户登录</h2>
        <Form onSubmit={this.login}>
          <Item>
            {
              getFieldDecorator(
                'username',
                {
                  rules: [
                    {validator: this.validator}
                  ]
                }
              )(
                <Input prefix={<Icon type="user" placeholder="用户名"/>}/>
              )
            }

          </Item>
          <Item>
            {
              getFieldDecorator(
                'password',
                {
                  rules: [
                    {validator: this.validator}
                  ]
                }
              )(
                <Input prefix={<Icon type="lock" placeholder="密码"/>}/>
              )
            }

          </Item>
          <Item>
            <Button type="primary" htmlType="submit" className="login-btn">提交</Button>
          </Item>
        </Form>
      </section>
    </div>
  }
}

export default Form.create()(Login);