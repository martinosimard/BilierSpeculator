import React from 'react';
import * as Redux from 'react-redux';
import Property from 'Property';
var BilierAPI = require('BilierAPI');
var ReactDOM = require('react-dom');

// export for testing purpose
export class PropertyList extends React.Component {
  render () {

    var {properties, showCompleted, searchText} = this.props;

    var renderProperties = () => {
      var filterProperties = BilierAPI.filterProperties(properties, showCompleted, searchText);

      if (filterProperties.length === 0) {
        return (
          <tr ref="aucune" colSpan="12"></tr>
          //<tr ref="aucune" className="col-12">Aucune propriété</tr>
        );

      }

      return filterProperties.map((property) => {
        return (
          <Property key={property.id} {...property}/>
        );
      });
    };

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Dépenses d'opération</th>
            <th>RBE</th>
            <th>RNO</th>
            <th>Valeur Imm. (5%)</th>
            <th>MBR</th>
            <th>MRN</th>
            <th>Ratio Depenses</th>
            <th>Ratio Taux Cap.</th>
            <th>12&nbsp;-&nbsp;15</th>
            <th>Prêt</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {renderProperties()}
        </tbody>
      </table>
    )
  }
};

export default Redux.connect(
  (state) => {
    return state;
  }
)(PropertyList);
