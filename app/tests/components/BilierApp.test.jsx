var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var configureStore = require('configureStore');
import {BilierApp} from 'BilierApp';
import PropertyList from 'PropertyList';

describe('BilierApp', () => {
  it('should exist', () => {
    expect(BilierApp).toExist();
  });

  it('should render PropertyList', () => {
    var store = configureStore.configure();
    var provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <BilierApp/>
      </Provider>
    );

    var BilierApp = TestUtils.scryRenderedComponentsWithType(provider, BilierApp)[0]
    var propertyList = TestUtils.scryRenderedComponentsWithType(BilierApp, PropertyList);

    expect(propertyList.length).toEqual(1);
  });
});
