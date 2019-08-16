import React, {Component} from 'react';
import { message, Spin, Layout } from 'antd';
import { Link, Route, Redirect, Switch } from 'react-router-dom';

import LeftNav from '../../components/left-nav';
import HeaderMain from '../../components/header-main';
import logo from "../../assets/images/logo.png";
import { reqValidateUser } from '../../api';
import data from '../../utils/store';
import { getItem } from '../../utils/storage';
import './index.less';

// import Home from '../home';
import Category from '../category';
// import Product from '../product';
// import User from '../user';
// import Role from '../role';
// import Line from '../charts/line';
// import Bar from '../charts/bar';
// import Pie from '../charts/pie';


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
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/category" component={Category}/>
              <Route path="/product" component={Product}/>
              <Route path="/user" component={User}/>
              <Route path="/role" component={Role}/>
              <Route path="/charts/bar" component={Bar}/>
              <Route path="/charts/line" component={Line}/>
              <Route path="/charts/pie" component={Pie}/>
              <Redirect to="/home"/>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
      </Layout>
    </Layout>
  }
};

