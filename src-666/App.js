/*
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Admin from './pages/admin';
import Login from './pages/login';

import './App.css';

export default class App extends Component {
  render() {
    return <Router>
      {/!*
        Switch 切换，只显示匹配上的第一个路由组件，后面的就不看了
      *!/}
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/" component={Admin}/>
      </Switch>
    </Router>;
  }
}*/







import React, { Component } from 'react';
import store from './redux/store';
import { increment, decrement } from './redux/action-creators';
import { connect } from 'react-redux';

class App extends Component {
  state = {
    value: 1
  };

  increment = () => {
    const { value } = this.state;
    // 创建action对象
  this.props.increment(+value);
  };

  decrement = () => {
    const { value } = this.state;
    // 创建action对象
    this.props.decrement(+value);
  };

  incrementIfOdd = () => {
    const { value } = this.state;
    // 读取num
    const num = store.getState();
    if (num % 2 === 0) return;
    // 创建action对象
    this.props.increment(+value);
  };

  incrementAsync = () => {
    setTimeout(() => {
      const { value } = this.state;
      // 创建action对象
      this.props.increment(+value);
    }, 1000)
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  };

  render() {
    const { value } = this.state;
    // 读取redux保存的状态数据值
    const {num} = this.props;

    return <div>
      <h1>click { num } times</h1>
      <select onChange={this.handleChange} value={+value}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <button onClick={this.increment}>+</button>
      <button onClick={this.decrement}>-</button>
      <button onClick={this.incrementIfOdd}>increment if odd</button>
      <button onClick={this.incrementAsync}>increment async</button>
    </div>;
  }
}

export default connect(
  (state) => ({num: state}),
  { increment, decrement}
)(App)
