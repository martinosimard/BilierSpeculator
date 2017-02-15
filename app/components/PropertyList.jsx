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
        <div className="row">
          <div className="medium-2 columns">Description</div>
          <div className="medium-1 columns">Dépenses d'opération</div>
          <div className="medium-1 columns">Revenu Brut Effectif</div>
          <div className="medium-1 columns">Revenu Net Operation</div>
          <div className="medium-1 columns">Valeur Immeuble</div>
          <div className="medium-1 columns">Multiplicateur Revenu Brut</div>
          <div className="medium-1 columns">Multiplicateur Revenu Net</div>
          <div className="medium-1 columns">Ratio Depenses</div>
          <div className="medium-1 columns">Ratio Taux Capitalisation</div>
          <div className="medium-1 columns">Masquer</div>
          <div className="medium-1 columns">Modifier la propriétée</div>
        </div>
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
