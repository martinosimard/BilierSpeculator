import React from 'react';
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
import {hashHistory} from 'react-router';

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

// store.subscribe(() => {
//   var state = store.getState();
//   console.log('New state', state);
//
//   BilierAPI.setTodos(state.todos);
// });

// Examples of setting defaults values on startup for testing purposes
// store.dispatch(actions.addTodo('Clean the yard'));
// store.dispatch(actions.setSearchText('yard'));
// store.dispatch(actions.toggleShowCompleted());

// var initialTodos = BilierAPI.getTodos();
// store.dispatch(actions.addTodo(initialTodos));

// Acync to Firebase
//store.dispatch(actions.startAddTodos());

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
