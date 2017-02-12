var expect = require('expect');
var df = require('deep-freeze-strict');

var reducers = require('reducers');

describe('Reducers', () => {

  describe('searchTextReducer', () => {
    it('should set searchText', () => {
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'value'
      };
      var res = reducers.searchTextReducer(df(''), df(action));

      expect(res).toEqual(action.searchText);
    });
  });

  describe('showCompletedReducer', () => {
    it('should toggle showCompleted', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };
      var res = reducers.showCompletedReducer(df(false), df(action));

      expect(res).toEqual(true);
    });
  });

  describe('addPropertyReducer', () => {
    it('should add new property', () => {
      var action = {
        type: 'ADD_PROPERTY',
        property: {
          id: 'abc123',
          text: 'Something to do',
          completed: false,
          createdAt: 213654
        }
      };
      var res = reducers.propertiesReducer(df([]), df(action));

      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(action.property);
    });
  });

  it('should add existing Properties', () => {
    var properties = [{
      id: 1,
      text: 'text 1',
      completed: false,
      completedAt: undefined,
      createdAt: 33000
    }];

    var action = {
      type: 'ADD_PROPERTIES',
      properties
    };
    var res = reducers.propertiesReducer(df([]), df(action));

    expect(res.length).toEqual(1);
    expect(res[0]).toEqual(properties[0]);
  });

  it('should wipe properties on logout', () => {
    var properties = [{
      id: 1,
      text: 'text 1',
      completed: false,
      completedAt: undefined,
      createdAt: 33000
    }];

    var action = {
      type: 'LOGOUT'
    };
    var res = reducers.propertiesReducer(df(properties), df(action));

    expect(res.length).toEqual(0);
  });

  describe('togglePropertyReducer', () => {
    it('should update Property', () => {
      var updates = {
        completed: false,
        completedAt: null
      };

      var properties = [{
          id: 11,
          text: "Test property",
          completed: true,
          completedAt: 123
        }];

      var action = {
        type: 'UPDATE_PROPERTY',
        id: properties[0].id,
        updates
      };

      var res = reducers.propertiesReducer(df(properties), df(action));

      expect(res[0].completed).toEqual(updates.completed);
      expect(res[0].completedAt).toEqual(updates.completedAt);
      expect(res[0].text).toEqual(properties[0].text);
    });
  });

  describe('authReducer', () => {
    it('should store uid on LOGIN', () => {
      var action = {
        type: 'LOGIN',
        uid: 'abc123'
      };

      var res = reducers.authReducer(undefined, df(action));

      expect(res).toEqual({
        uid: action.uid
      });
    });

    it('should wipe auto on LOGOUT', () => {
      var authData = {
        uid: '123abc'
      };
      var action = {
        type: 'LOGOUT'
      };
      var res = reducers.authReducer(df(authData), df(action));

      expect(res).toEqual({});

    })
  });
});
