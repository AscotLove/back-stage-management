import React, { Component } from 'react';
import { message, Spin, Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import LeftNav from '../../components/left-nav';
import { reqValidateUser } from '../../api';
import data from '../../utils/store';
import { getItem } from '../../utils/stroage'
import logo from '../../assets/images/logo.png';
import './index.less';

const { Header, Content, Footer, Sider } = Layout;

export default class Admin extends Component {

}