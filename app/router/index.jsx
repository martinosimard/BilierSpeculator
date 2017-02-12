import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import BilierApp from 'BilierApp';
import Login from 'Login';
import firebase from 'app/firebase/';

var requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    replace('/');
  }
  next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    replace('/properties');
  }
  next();
};

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="properties" component={BilierApp} onEnter={requireLogin} />
      <IndexRoute component={Login} onEnter={redirectIfLoggedIn} />
    </Route>
  </Router>
);
