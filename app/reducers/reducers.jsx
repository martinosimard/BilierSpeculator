var uuid = require('node-uuid');
var moment = require('moment');

export var searchTextReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_SEARCH_TEXT' :
      return action.searchText;
    default :
      return state;
  };
};

export var showCompletedReducer = (state = false, action) => {
  switch(action.type) {
    case 'TOGGLE_SHOW_COMPLETED' :
      return !state;
    default :
      return state;
  };
};

export var propertiesReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_PROPERTY' :
      return [
        ...state,
        action.property
      ]
      case 'ADD_PROPERTIES' :
        return [
          ...state,
          ...action.properties
        ]
      case 'EDIT_PROPERTY' :
      return state.map((property) => {
      				if (property.id === action.id) {
                debugger
                action.property.rue = "sorbierz";
      					if (action.property.rue != '') {
      						return {
      							...property,
      							edit: !property.edit,
      							edited: true,
      							editedAt: moment().unix(),
      							rue: action.property.rue,
      						}
      					} else {
      						return {
      							...property,
      							edit: !property.edit
      						}
      					}
      				} else {
      					return property;
      				}
      			});
    case 'UPDATE_PROPERTY' :
      return state.map((property) => {
        if (property.id === action.id) {
          return {
            ...property,
            ...action.updates
          };
        } else {
          return property;
        };
      });
    case 'LOGOUT' :
      return [];
    default :
      return state;
  };
};

export var authReducer = (state = {}, action) => {
  switch(action.type) {
    case 'LOGIN' :
      return {
        uid: action.uid
      };
    case 'LOGOUT' :
        return {};
    default :
      return state;
  };
};
