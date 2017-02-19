import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import Main from 'Main';
import BilierApp from 'BilierApp';
import AddProperty from 'AddProperty';
import EditProperty from 'EditProperty';
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
    <Route path="/" component={Main}>
      <Route path="properties" component={BilierApp} onEnter={requireLogin} />
      <Route path="add-property" component={AddProperty} onEnter={requireLogin} />
      <Route path="edit-property/:id" component={EditProperty} onEnter={requireLogin} />
      <IndexRoute component={Login} onEnter={redirectIfLoggedIn} />
    </Route>
  </Router>
);
