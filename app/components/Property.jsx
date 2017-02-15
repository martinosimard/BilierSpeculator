import moment  from 'moment';
import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

var CHAR_NOINFO = "N/D";

class PropertyInfo {
  constructor (numeroCivique = '',  rue = '',  quartier = '',  deuxDemi = 0,troisDemi = 0, quatreDemi = 0,
                cinqDemi = 0,sixDemiPlus = 0, postalCode = '', price = '', year = '',
                revenuBrut = '', taxesSchool = '', taxesCity = '',  assurances = '', typeProp = '',
              evaluationTerrain = 0, evaluationBatiment = 0, entretien = 0, autres = 0, vacance = 0)
  {
    this.numeroCivique = numeroCivique;
    this.rue = rue;
    this.postalCode = postalCode;
    this.quartier = quartier;
    this.price = price;
    this.year = year;
    this.revenuBrut = revenuBrut;
    this.taxesSchool = taxesSchool;
    this.taxesCity = taxesCity;
    this.assurances = assurances;
    this.deuxDemi = deuxDemi;
    this.troisDemi = troisDemi;
    this.quatreDemi = quatreDemi;
    this.cinqDemi = cinqDemi;
    this.sixDemiPlus = sixDemiPlus;
    this.type = typeProp;
    this.evaluationTerrain = evaluationTerrain;
    this.evaluationBatiment = evaluationBatiment;
    this.entretien = entretien;
    this.autres = autres;
    this.vacance = vacance
  }
};

// export for testing purpose
export class Property extends React.Component {
  render () {
    var {assurances, cinqDemi, completed, completedAt, createdAt, deuxDemi, dispatch,
      revenuBrut, id, numeroCivique, postalCode, price, quartier, quatreDemi, rue,
      sixDemiPlus, taxesCity, taxesSchool, troisDemi, type, year,
      evaluationTerrain, evaluationBatiment, entretien, autres, vacance} = this.props;

    var propertyClassName = completed ? 'row property property-completed' : 'row property';

    var renderDate = () => {
      var message = 'Created ';
      var timestamp = createdAt;

      if (completed) {
        message = 'Discarté le ';
        timestamp = completedAt;
      }

      return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm: a');
    };
    var getEvaluation = () => {
      var val = parseFloat(evaluationTerrain) + parseFloat(evaluationBatiment);
      if (val) {
        return val;
      } else {
        return CHAR_NOINFO;
      }
    };
    var getRevenuBrutEffectif = () => {
      var val = parseFloat(revenuBrut) - parseFloat(vacance);
      if (val) {
        return val;
      } else {
        return CHAR_NOINFO;
      }
    };
    var getDepensesOperation = () => {
      var val = parseFloat(taxesSchool) + parseFloat(taxesCity)
       + parseFloat(assurances) + parseFloat(entretien)
        + parseFloat(autres);

      if (val) {
        return val;
      } else {
        return CHAR_NOINFO;
      }
    };
    var getRevenuNetOperation = () => {
      var val = getRevenuBrutEffectif() - getDepensesOperation();
      if (val) {
        return val;
      } else {
        return CHAR_NOINFO;
      }
    };
    var getValeurImmeuble = (taux) => {
      var val = (getRevenuNetOperation() / taux) * 100;
      if (val) {
        return val;
      } else {
        return CHAR_NOINFO;
      }
    };
    var getMultiplicateurRevenuBrut = () => {
      var val = parseFloat(price) / parseFloat(revenuBrut);
      if (val) {
        return val;
      } else {
        return CHAR_NOINFO;
      }
    };
    var getMultiplicateurRevenuNet = () => {
      var val = parseFloat(price) / getRevenuNetOperation();
      if (val) {
        return val;
      } else {
        return CHAR_NOINFO;
      }
    }
    var getRatioDepenses = () => {
      var val = getDepensesOperation() / getRevenuBrutEffectif();
      if (val) {
        return val;
      } else {
        return CHAR_NOINFO;
      }
    }
    var getRatioTauxCapitalisation = () => {
      var val = getRevenuNetOperation() / parseFloat(price);
      if (val) {
        return val;
      } else {
        return CHAR_NOINFO;
      }
    }
    var getDescriptionShort = () => {
      return `[${type}]  ${quartier}`;
    }
    var getDescriptionComplete = () => {
      return `${numeroCivique} ${rue}, ${postalCode} Prix de vente : ${price}$Évaluation totale : ${getEvaluation()}`;
    }
    return (
        <div className={propertyClassName}>
          <div className="medium-2 columns">
            <span data-tooltip aria-haspopup="true" className="has-tip" title={getDescriptionComplete()}>
              {getDescriptionShort()}

            </span>
            <br />
          </div>
          <div className="medium-1 columns">{getDepensesOperation()}</div>
          <div className="medium-1 columns">{getRevenuBrutEffectif()}</div>
          <div className="medium-1 columns">{getRevenuNetOperation()}</div>
          <div className="medium-1 columns">{getValeurImmeuble(5)}</div>
          <div className="medium-1 columns">{getMultiplicateurRevenuBrut()}</div>
          <div className="medium-1 columns">{getMultiplicateurRevenuNet()}</div>
          <div className="medium-1 columns">{getRatioDepenses()}</div>
          <div className="medium-1 columns">{getRatioTauxCapitalisation()}</div>
          <div className="medium-1 columns">
            <button className="button" onClick={() => {
                dispatch(actions.startToggleProperty(id, !completed));
              }}>GO</button>
          </div>
          <div className="medium-1 columns">
           <button className="button" onClick={() => {
             var newProperty = new PropertyInfo(
               numeroCivique,
               rue,
               quartier,
               deuxDemi,
               troisDemi,
               quatreDemi,
               cinqDemi,
               sixDemiPlus,
               postalCode,
               price,
               year,
               revenuBrut,
               taxesSchool,
               taxesCity,
               assurances,
               type,
               evaluationTerrain,
               evaluationBatiment,
               entretien,
               autres,
               vacance
            );

                dispatch(actions.startEditProperty(id, newProperty));
              }}>GO</button>
              </div>
        </div>
    )
  }
};

export default Redux.connect()(Property);
