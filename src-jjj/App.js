import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Admin from './pages/admin';
import Login from './pages/login';


import './App.less'


function App() {
  return  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Admin} />
    </Switch>
  </Router>
}