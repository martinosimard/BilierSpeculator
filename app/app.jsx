import React from 'react';
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
import {hashHistory} from 'react-router';

import Bootstrap from 'bootstrap.css'
import FontAwesome from 'font-awesome.css'

var actions = require('actions');
var store = require('configureStore').configure();
import firebase from 'app/firebase/';
import router from 'app/router/';

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(actions.login(user.uid));
    store.dispatch(actions.startAddProperties());
    hashHistory.push('/properties');
  } else {
    store.dispatch(actions.logout());
    hashHistory.push('/');
  }
});

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
