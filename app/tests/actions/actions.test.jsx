import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

import firebase, {firebaseRef} from 'app/firebase/';
var actions = require('actions');

var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
  it('should generate search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Some search text'
    };
    var res = actions.setSearchText(action.searchText);

    expect(res).toEqual(action);
  });

  it('should generate toggle show completed action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };
    var res = actions.toggleShowCompleted();

    expect(res).toEqual(action);
  });

  it('should generate add Property action', () => {
    var action = {
      type: 'ADD_PROPERTY',
      property: {
        id: '123abc',
        text: 'Anything we like',
        completed: false,
        createdAt: 0
      }
    };
    var res = actions.addProperty(action.property);

    expect(res).toEqual(action);
  });

  it('should generate add properties action object', () => {
    var properties = [{
      id: '111',
      text: 'anything',
      completed: false,
      completedAt: undefined,
      createdAt: 33000
    }];
    var action = {
      type: 'ADD_PROPERTIES',
      properties
    };
    var res = actions.addProperties(properties);

    expect(res).toEqual(action);
  });

  it('should generate update property action', () => {
    var action = {
      type: 'UPDATE_PROPERTY',
      id: '123',
      updates: {completed: false}
    };
    var res = actions.updateProperty(action.id, action.updates);

    expect(res).toEqual(action);
  });

  it('should generate login action object', () => {
    const action = {
      type: 'LOGIN',
      uid: '123abc'
    };
    const res = actions.login(action.uid);

    expect(res).toEqual(action);
  });

  it('should generate logout action object', () => {
    const action = {
      type: 'LOGOUT'
    };
    const res = actions.logout();

    expect(res).toEqual(action);
  });

  describe('Tests with firebase properties', () => {
    var testPropertyRef;
    var uid;
    var propertiesRef;

    beforeEach((done) => {
      firebase.auth().signInAnonymously().then((user) => {
        uid = user.uid;
        propertiesRef = firebaseRef.child(`users/${uid}/properties`);

        return propertiesRef.remove();
      }).then(() => {
        testPropertyRef = propertiesRef.push();

        return testPropertyRef.set({
          text: 'Something to do',
          completed: false,
          createdAt: 23453453
        });
      })
      .then(() => done())
      .catch(done);
    });

    afterEach((done) => {
      propertiesRef.remove().then(() => done());
    });

    it('should toggle property and dispatch UPDATE_PROPERTY action', (done) => {
      const store = createMockStore({auth: {uid}});
      const action = actions.startToggleProperty(testPropertyRef.key, true);

      store.dispatch(action).then(() => {
        const mockActions = store.getActions();

        expect(mockActions[0]).toInclude({
          type: 'UPDATE_PROPERTY',
          id: testPropertyRef.key
        });
        expect(mockActions[0].updates).toInclude({
          completed: true
        });
        expect(mockActions[0].updates.completedAt).toExist();

        done();
      }, done);
    });

    it('should populate properties and dispatch ADD_PROPERTIES', (done) => {
      const store = createMockStore({auth: {uid}});
      const action = actions.startAddProperties();

      store.dispatch(action).then(() => {
        const mockActions = store.getActions();

        expect(mockActions[0].type).toEqual('ADD_PROPERTIES');
        expect(mockActions[0].properties.length).toEqual(1);
        expect(mockActions[0].properties[0].text).toEqual('Something to do');

        done();
      }, done)
    });

    it('should create property and dispatch ADD_PROPERTY', (done) => {
      const store = createMockStore({auth: {uid}});
      const propertyText = 'My property item';

      store.dispatch(actions.startAddProperty(propertyText)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toInclude({
          type: 'ADD_PROPERTY'
        });
        expect(actions[0].property).toInclude({
          text: propertyText
        });
        done();
      }).catch(done);
    });
  });
});
