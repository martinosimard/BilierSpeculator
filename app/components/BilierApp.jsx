import React from 'react';
import * as Redux from 'react-redux';
import PropertyList from 'PropertyList';
import AddProperty from 'AddProperty';
import PropertySearch from 'PropertySearch';
import * as actions from 'actions';
import Navigation from 'Navigation';

export class BilierApp extends React.Component {
  render() {
    return (
      <div>
          <PropertySearch />
          <PropertyList />
      </div>
    )
  }
};

export default Redux.connect()(BilierApp);
