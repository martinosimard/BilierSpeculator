var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

import {configure} from 'configureStore';
import ConnectedPropertyList, {PropertyList} from 'PropertyList';
import ConnectedProperty, {Property} from 'Property'

describe('PropertyList', () => {
  it('should exist', () => {
    expect(PropertyList).toExist();
  });

  it('should render one Property component for each property item', () => {
    var properties = [{
      id: 1,
      text: 'Do something',
      completed: false,
      completedAt: undefined,
      createdAt: 500
    }, {
      id: 2,
      text: 'Check mail',
      completed: false,
      completedAt: undefined,
      createdAt: 500
    }];
    var store = configure({
      properties
    });
    var provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <ConnectedPropertyList/>
      </Provider>
    );
    var propertyList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedPropertyList)[0];
    var propertiesComponents = TestUtils.scryRenderedComponentsWithType(propertyList, ConnectedProperty	);

    expect(propertiesComponents.length).toBe(properties.length);
  });

  it('should render empty message if no properties', () => {
    var properties = [];
    var propertyList = TestUtils.renderIntoDocument(<PropertyList properties={properties}/>);
    var $el = $(ReactDOM.findDOMNode(propertyList));

    expect($el.find('.container__message').length).toBe(1);
  });
});
