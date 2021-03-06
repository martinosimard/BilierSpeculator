import moment from 'moment';
import { hashHistory } from 'react-router'

import firebase, {firebaseRef, githubProvider, googleProvider} from 'app/firebase/';

export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };
};

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  };
};

export var addProperty = (property) => {
  return {
    type: 'ADD_PROPERTY',
    property
  };
};

export var startAddProperty = (newProperty) => {
  return (dispatch, getState) => {
    var property = {
      ...newProperty,
      completed: false,
      createdAt: moment().unix(),
      completedAt: null
    };
    var uid = getState().auth.uid;
    var propertyRef = firebaseRef.child(`users/${uid}/properties`).push(property);

    return propertyRef.then(() => {
      dispatch(addProperty({
        ...property,
        id: propertyRef.key
      }));
      hashHistory.push('/#/properties');
    });
  };
};

export var addProperties = (properties) => {
  return {
    type: 'ADD_PROPERTIES',
    properties
  };
};

export var startAddProperties = () => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var propertiesRef = firebaseRef.child(`users/${uid}/properties`);

    return propertiesRef.once('value').then((snapshot) => {
      var properties = snapshot.val() || {};
      var parsedProperties = [];

      Object.keys(properties).forEach((propertyId) => {
        parsedProperties.push({
          id: propertyId,
          ...properties[propertyId]
        });
      });

      dispatch(addProperties(parsedProperties));
    });
  };
};

export var updateProperty = (id, updates) => {
  return {
    type: 'UPDATE_PROPERTY',
    id,
    updates
  };
};

export var editProperty = (id, property) => {
  return {
    type: 'EDIT_PROPERTY',
    id,
    property
  };
};

export var fetchProperty = (id, property) => {
  return {
    type: 'FETCH_PROPERTY',
    id,
    property
  };
};

export var startFetchProperty = (id) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var propertyRef = firebaseRef.child(`users/${uid}/properties/${id}`);
    dispatch(fetchProperty(id, property));
  };
};

export var startEditProperty = (id, property) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var propertyRef = firebaseRef.child(`users/${uid}/properties/${id}`);

    return propertyRef.update(property).then(() => {
      dispatch(updateProperty(id, property));
      hashHistory.push('/#/properties');
    });
  };
};

export var startToggleProperty = (id, completed) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var propertyRef = firebaseRef.child(`users/${uid}/properties/${id}`);
    var updates = {
      completed,
      completedAt: completed ? moment().unix() : null
    };

    return propertyRef.update(updates).then(() => {
      dispatch(updateProperty(id, updates));
    });
  };
};

export var login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  };
};

export var startLogin = () => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithPopup(googleProvider).then((result) => {
      console.log('Auth worked!', result);
    }, (error) => {
      console.log('Unable to auth', error);
    });
  };
};

export var logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export var startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then(() => {
      console.log('Logged out!');
    });
  };
};
