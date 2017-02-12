var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

import {PropertySearch} from 'PropertySearch';

describe('PropertySearch', () => {
  it('should exist', () => {
    expect(PropertySearch).toExist();
  });

  it('should dispatch SET_SEARCH_TEXT on input change', () => {
    var searchText = 'Dog';
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText
    };
    var spy = expect.createSpy();
    var propertySearch = TestUtils.renderIntoDocument(<PropertySearch dispatch={spy}/>);

    propertySearch.refs.searchText.value = searchText;
    TestUtils.Simulate.change(propertySearch.refs.searchText);

    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should dispatch TOGGLE_SHOW_COMPLETED when checkbox checked', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };
    var spy = expect.createSpy();
    var propertySearch = TestUtils.renderIntoDocument(<PropertySearch dispatch={spy}/>);

    propertySearch.refs.showCompleted.checked = true;
    TestUtils.Simulate.change(propertySearch.refs.showCompleted);

    expect(spy).toHaveBeenCalledWith(action);
  });
});
