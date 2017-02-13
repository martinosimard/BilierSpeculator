import moment  from 'moment';
import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

class PropertyInfo {
  constructor (numeroCivique = '',  rue = '',  quartier = '',  deuxDemi = 0,troisDemi = 0, quatreDemi = 0,
                cinqDemi = 0,sixDemi = 0,septDemi = 0, postalCode = '', price = '', year = '',
                grossRevenue = '', taxesSchool = '', taxesCity = '',  assurances = '', typeProp = '',
              evaluationTerrainText = 0, evaluationBatimentText = 0, entretien = 0, autres = 0)
  {
    this.numeroCivique = numeroCivique;
    this.rue = rue;
    this.postalCode = postalCode;
    this.quartier = quartier;
    this.price = price;
    this.year = year;
    this.grossRevenue = grossRevenue;
    this.taxesSchool = taxesSchool;
    this.taxesCity = taxesCity;
    this.assurances = assurances;
    this.deuxDemi = deuxDemi;
    this.troisDemi = troisDemi;
    this.quatreDemi = quatreDemi;
    this.cinqDemi = cinqDemi;
    this.sixDemi = sixDemi;
    this.septDemi = septDemi;
    this.type = typeProp;
    this.evaluationTerrainText = evaluationTerrainText;
    this.evaluationBatimentText = evaluationBatimentText;
    this.entretien = entretien;
    this.autres = autres;
  }
};

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
      <div className={propertyClassName}>
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
          <button className="button" onClick={() => {
              dispatch(actions.startToggleProperty(id, !completed));
            }}>Masquer la propriétée</button>
           <button className="button" onClick={() => {
               debugger
             var newProperty = new PropertyInfo(
               numeroCivique,
               rue,
               quartier,
               deuxDemi,
               troisDemi,
               quatreDemi,
               cinqDemi,
               sixDemi,
               septDemi,
               postalCode,
               price,
               year,
               grossRevenue,
               taxesSchool,
               taxesCity,
               assurances,
               type,
               evaluationTerrainText,
               evaluationBatimentText,
               entretien,
               autres
            );

                dispatch(actions.startEditProperty(id, newProperty));
              }}>Modifier la propriétée</button>
        </div>

      </div>
    )
  }
};

export default Redux.connect()(Property);
