var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

import * as actions from 'actions';
import {Property} from 'Property';

describe('Property', () => {
  it('should exist', () => {
    expect(Property).toExist();
  });

  it('should dispatch TOGGLE_PROPERTY action on click', () => {
    var propertyData = {
      id: 199,
      text: 'Write property.test.jsx test',
      completed: true
    };
    var action = actions.startToggleProperty(propertyData.id, !propertyData.completed);

    var spy = expect.createSpy();
    var property = TestUtils.renderIntoDocument(<Property {...propertyData} dispatch={spy}/>);
    var $el = $(ReactDOM.findDOMNode(property));

    TestUtils.Simulate.click($el[0]);

    expect(spy).toHaveBeenCalledWith(action);
  });
});
