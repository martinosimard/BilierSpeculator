import moment  from 'moment';
import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

// export for testing purpose
export class Property extends React.Component {
  render () {
    var {assurances, cinqDemi, completed, completedAt, createdAt, deuxDemi, dispatch,
      grossRevenue, id, numeroCivique, postalCode, price, quartier, quatreDemi, rue,
      septDemi, sixDemi, taxesCity, taxesSchool, troisDemi, type, year,
      evaluationTerrainText, evaluationBatimentText, entretien, autres} = this.props;

    var propertyClassName = completed ? 'property property-completed' : 'property';
    var renderDate = () => {
      var message = 'Created ';
      var timestamp = createdAt;

      if (completed) {
        message = 'Discarté le ';
        timestamp = completedAt;
      }

      return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm: a');
    };
    return (
      <div className={propertyClassName} onClick={() => {
          dispatch(actions.startToggleProperty(id, !completed));
        }}>
        <div>
          <input type="checkbox" checked={completed} />
        </div>
        <div>
          <p>[{type}]  {quartier}</p>
          <p>{numeroCivique} {rue}, {postalCode}</p>
          <p>Prix de vente : {price}$</p>
          <p>Évaluation totale : {parseFloat(evaluationBatimentText) + parseFloat(evaluationTerrainText)}$</p>
          <p>Dépenses : {parseFloat(taxesCity) + parseFloat(taxesSchool) + parseFloat(assurances) + parseFloat(entretien) + parseFloat(autres)}$</p>
          <p className="property__subtext">{renderDate()}</p>
        </div>

      </div>
    )
  }
};

export default Redux.connect()(Property);
