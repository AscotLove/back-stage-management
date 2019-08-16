import React, {Component} from 'react';
import { message, Spin, Layout } from 'antd';
import { Link } from 'react-router-dom';

import LeftNav from '../../components/left-nav';
import logo from "../../assets/images/logo.png";
import { reqValidateUser } from '../../api';
import data from '../../utils/store';
import { getItem } from '../../utils/storage';
import './index.less';
import HeaderMain from '../../components/header-main';
const { Header, Content, Footer, Sider } = Layout;


export default class Admin extends Component {

  state = {
    collapsed: false,
    isDisplay: 'block'
  };

  checkUserLogin = () => {
    const { replace } = this.props.history;
    if (!data.user._id) {
      const user = getItem();
      if (!user) {
        replace('/login');
        return true;
      }
      reqValidateUser(user._id)
        .then(() => {
          data.user = user;
          this.setState({})
        })
        .catch(() => {
          message.error('请先登录', 3);
          replace('/login');
        })
      return true
    } else {
      return false
    }
  };

  onCollapse = collapsed => {
    this.setState({
      collapsed,
      isDisplay: collapsed ? 'none' : 'block'
    });
  };

  render() {
    const isLoading = this.checkUserLogin();
    if (isLoading) return <Spin className="admin-loading" tip="loading...." size="large"/>;

    const { isDisplay, collapsed } = this.state;

    return <Layout style={{minHeight: '100vh'}}>
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <Link to="/home" className="admin-logo">
          <img src={logo} alt="logo"/>
          <h1 style={{display: isDisplay}}>硅谷后台</h1>
        </Link>
       <LeftNav />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }}>
          <HeaderMain />
        </Header>
        <Content style={{ margin:'65px 16px 0 16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  }
};

