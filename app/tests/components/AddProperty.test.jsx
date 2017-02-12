var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

import * as actions from 'actions';
var {AddProperty} = require('AddProperty');

describe('AddProperty', () => {
  it('should exist', () => {
    expect(AddProperty).toExist();
  });

  it('should dispatch ADD_PROPERTY when valid property text', () => {
    var propertyText = 'Check mail';
    var action = actions.startAddProperty(propertyText);

    var spy = expect.createSpy();
    var addProperty = TestUtils.renderIntoDocument(<AddProperty dispatch={spy}/>);
    var $el = $(ReactDOM.findDOMNode(addProperty));

    addProperty.refs.propertyText.value = propertyText;
    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should not dispatch ADD_PROPERTY when invalid property text', () => {
    var propertyText = '';
    var spy = expect.createSpy();
    var addProperty = TestUtils.renderIntoDocument(<AddProperty dispatch={spy}/>);
    var $el = $(ReactDOM.findDOMNode(addProperty));

    addProperty.refs.propertyText.value = propertyText;
    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toNotHaveBeenCalled();
  });
});
