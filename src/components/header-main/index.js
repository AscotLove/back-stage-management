import React, {Component} from 'react';
import {Button, Modal, message} from 'antd';
import {withRouter} from 'react-router-dom';
import {removeItem} from '../../utils/storage';
import data from '../../utils/store';

import { menuList } from '../../config';
import { reqWeather } from '../../api';
import dayjs from 'dayjs';
import './index.less';


class HeaderMain extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      time: this.getTime(),
      weather: '晴',
      dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/qing.png'
    }
  };
  logout = () => {
    Modal.confirm({
      title: '你确定要退出登录吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        removeItem();
        data.user = {};
        message.success('退出成功', 3)
        this.props.history.replace('/login')
      }
    })
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { pathname } = nextProps.location;
    if (pathname === '/') return { title: '首页'};

    for (let i = 0; i < menuList.length; i++) {
      const menu = menuList[i];
      if (menu.children) {
        const children = menu.children;
        for (let j = 0; j < children.length; j++) {
          const cMenu = children[j];
          if (cMenu.key === pathname) return { title: cMenu.title }
        }
      } else {
        if (menu.key === pathname) return { title: menu.title }
      }
    }
  }
  getTime = () => dayjs(Date.now()).format('YY-MM-DD  HH:mm:ss');
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: this.getTime() })
    },1000)
    reqWeather('深圳')
      .then((res) => {
        message.success('更新天气成功', 3);
        this.setState(res);
      })
      .catch(err => { message.error(err, 3) })
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const { title, time, weather, dayPictureUrl } = this.state;
    return <div className="header-main">
      <div className="header-main-top">
        <span>欢迎，{data.user.username}</span>
        <Button type="link" onClick={this.logout}>退出</Button>
      </div>
      <div className="header-main-bottom">
        <h3>{title}</h3>
        <div>
          <span>{time}</span>
          <img src={dayPictureUrl} alt="weather"/>
          <span>{weather}</span>
        </div>
      </div>
    </div>;
  }
}

export default withRouter(HeaderMain);