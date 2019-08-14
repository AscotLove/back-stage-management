import React, {Component} from 'react';
import {Form, Icon, Input, message, Button} from 'antd';
import {reqLogin} from '../../api';
import data from '../../utils/store';
import {setItem} from '../../utils/stroage';
import logo from '../../assets/images/logo.png';
import './index.less';

const {Item} = Form;

class Login extends Component {

  validator = (rule, value, callback) => {
    const name = rule.field === 'username' ? '用户名' : '密码';
    const passwordReg = /^\w+$/;
    if (!value) {
      callback(`${name}不能为空`)
    } else if (value.length < 4) {
      callback(`${name}不能小于4位`)
    } else if (value.length > 10) {
      callback(`${name}不能大于10位`)
    } else if (passwordReg.test(['password'])) {
      callback(`${name}只能是英文`)
    }
    callback();
  };
  login = (e) => {
    e.preventDefault();
    const { form: { validateFields, resetFields }, history: { replace }} = this.props;
    validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;
        reqLogin(username, password)
          .then((response) => {
            message.success('登录成功', 3);
            data.user = response;
            setItem(response);
            replace('/')
          })
          .catch((error) => {
            message.error(error, 3);
            resetFields(['password']);
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
                'username', // input的标识，今后获取input的值，就从username
                {
                  rules: [ // 表单校验规则
                    {validator: this.validator}
                  ]
                }
              )(
                <Input prefix={<Icon type="user"/>} placeholder="用户名"/>
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
                <Input type="password" prefix={<Icon type="lock"/>} placeholder="密码"/>
              )
            }
          </Item>
          <Item>
            <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
          </Item>
        </Form>
      </section>
    </div>;
  }
};

export default Form.create()(Login);