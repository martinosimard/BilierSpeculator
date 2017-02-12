import React from 'react';
import * as Redux from 'react-redux';
import Property from 'Property';
var BilierAPI = require('BilierAPI');

// export for testing purpose
export class PropertyList extends React.Component {
  render () {

    var {properties, showCompleted, searchText} = this.props;

    var renderProperties = () => {
      var filterProperties = BilierAPI.filterProperties(properties, showCompleted, searchText);

      if (filterProperties.length === 0) {
        return (
          <p className="container__message">Aucune propriété</p>
        );
      }

      return filterProperties.map((property) => {
        return (
          <Property key={property.id} {...property}/>
        );
      });
    };

    return (
      <div>
        {renderProperties()}
      </div>
    )
  }
};

export default Redux.connect(
  (state) => {
    return state;
  }
)(PropertyList);
