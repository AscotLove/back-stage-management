import React, {Component} from 'react';
import {Form, Icon, Input, Button, message} from 'antd';
import logo from "../../assets/images/logo.png";
import { reqLogin } from '../../api';
import data from '../../utils/store';
import { setItem } from '../../utils/storage';
import './index.less'
const { Item } = Form;

class Login extends Component {
// From发送Ajax请求
  handleSubmit = e => {
    e.preventDefault();
    const { form: { validateFields, resetFields }, history: { replace }} = this.props;
    validateFields((err, values) => {
      if (!err) {
      const { username, password } = values;
        reqLogin(username, password)
          .then(response => {
            message.success('登录成功', 3);
            data.user = response;
            setItem(response);
            replace('/');
          })
          .catch(error => {
            message.error(error, 3);
            resetFields(['password']);
          })
      }
    });
  };
// 表单验证
  validator = (rule, value, callback) => {
    const name = rule.field === 'username' ? '用户名' : '密码';
    const passwordReg = /^\w+$/;
    if (!value) {
      callback(`${name}不为空`);
    } else if (value.length < 4) {
      callback(`${name}大于4`);
    }else if (value.length > 10) {
      callback(`${name}小于10`);
    } else if (!passwordReg.test(value)) {
      callback(`${name}只能包含英文`);
    }
    callback();
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
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Item>
            {getFieldDecorator('username', {
              rules: [
                {
                  validator: this.validator
                }
              ],
            })(
              <Input
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder="用户名"
              />,
            )}
          </Item>
          <Item>
            {getFieldDecorator('password', {
              rules: [
                {
                  validator: this.validator
                }
              ],
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
}

export default Form.create()(Login);
