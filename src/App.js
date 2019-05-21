import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import './stylesheets/App.scss';
import history from './history';

import Register from './Pages/Register';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import AdminHome from './Pages/AdminHome';
import AdminDashboard from './Pages/AdminDashboard';
import PageNotFound from './Pages/PageNotFound';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />   
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/admin" component={AdminHome} />
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;