import moment  from 'moment';
import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
var {Link, IndexLink} = require('react-router');
var NumberFormat = require('react-number-format');

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

    var propertyClassName = completed ? 'discarted' : '';
    var toggle = completed ? 'fa fa-toggle-off' : 'fa fa-toggle-on';

    var calculate= (price, rate, down_payment) => {
      var mi = rate / 1200;
        var base = 1;
        var mbase = 1 + mi;
        for (var i=0; i<25 * 12; i++)
        {
          base = base * mbase;
        }
        return Math.round((price- down_payment) * mi / ( 1 - (1/base)) * 12);
    	}

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
        return Math.round(val);
      } else {
        return CHAR_NOINFO;
      }
    };
    var getRevenuBrutEffectif = () => {
      var val = parseFloat(revenuBrut) - parseFloat((vacance ? vacance : 0));
      if (val) {
        return Math.round(val);
      } else {
        return CHAR_NOINFO;
      }
    };
    var getRevenuBrutEffectifEstime = () => {
      var val = parseFloat(revenuBrut) - (getDepensesOperationEstime() *0.05);
      if (val) {
        return Math.round(val);
      } else {
        return CHAR_NOINFO;
      }
    };

    var getDepensesOperation = () => {
      var val = parseFloat((taxesSchool ? taxesSchool : 0)) +
      parseFloat((taxesCity ? taxesCity : 0)) +
       parseFloat((assurances ? assurances : 0)) +
       parseFloat((entretien ? entretien : 0)) +
        parseFloat((autres ? autres : 0));

      if (val) {
        return Math.round(val);
      } else {
        return CHAR_NOINFO;
      }
    };
    var getDepensesOperationEstime = () => {
      var val = parseFloat(revenuBrut) * 0.3;

      if (val) {
        return Math.round(val);
      } else {
        return CHAR_NOINFO;
      }
    };

    var getRevenuNetOperation = () => {
      var val = getRevenuBrutEffectif() - getDepensesOperation();
      if (val) {
        return Math.round(val);
      } else {
        return CHAR_NOINFO;
      }
    };

    var getRevenuNetOperationEstime = () => {
      var val = getRevenuBrutEffectifEstime() - getDepensesOperationEstime();
      if (val) {
        return Math.round(val);
      } else {
        return CHAR_NOINFO;
      }
    };
    var getValeurImmeuble = (taux) => {
      var val = (getRevenuNetOperation() / taux) * 100;
      if (val) {
        return Math.round(val);
      } else {
        return CHAR_NOINFO;
      }
    };
    var getValeurImmeubleEstime = (taux) => {
      var val = (getRevenuNetOperationEstime() / taux) * 100;
      if (val) {
        return Math.round(val);
      } else {
        return CHAR_NOINFO;
      }
    };
    var getMultiplicateurRevenuBrut = () => {
      var val = parseFloat(price) / parseFloat(revenuBrut);
      if (val) {
        return Math.round(val);
      } else {
        return CHAR_NOINFO;
      }
    };
    var getMultiplicateurRevenuNet = () => {
      var val = parseFloat(price) / getRevenuNetOperation();
      if (val) {
        return Math.round(val);
      } else {
        return CHAR_NOINFO;
      }
    }
    var getRatioDepenses = () => {
      var val = getDepensesOperation() / getRevenuBrutEffectif();
      if (val) {
        return Math.round(val);
      } else {
        return CHAR_NOINFO;
      }
    }
    var getRatioDepensesEstimePrix = () => {
      var val = getDepensesOperationEstime() / getRevenuBrutEffectif();
      if (val) {
        return Math.round(val);
      } else {
        return CHAR_NOINFO;
      }
    }
    var getRatioTauxCapitalisation = () => {
      var val = getRevenuNetOperationEstime() / parseFloat(price);
      if (val) {
        return Math.round(val);
      } else {
        return CHAR_NOINFO;
      }
    }
    var getIndiceIcon = (val) => {
      var val = getIndice(val);
      if (price <= val ) {
        return 'fa fa-check';
      } else {
        return 'fa fa-times';
      }
    }

    var getIndice = (val) => {
      return getRevenuNetOperation() * val;
    }

    var getDescriptionShort = () => {
      return `${numeroCivique} ${rue} (${type})`;
    }
    var getDescriptionComplete = () => {
      return `${numeroCivique} ${rue}, ${postalCode} Prix de vente : ${price}$Évaluation totale : ${getEvaluation()}`;
    }
    var getEditLink = () => {
      return `/edit-property/${id}`;
    }
    return (
        <tr className={propertyClassName}>
          <th scope="row">
            <small>
              <span data-tooltip aria-haspopup="true" className="has-tip" title={getDescriptionComplete()}>
                {getDescriptionShort()}<br />
              <NumberFormat value={price} displayType={'text'} thousandSeparator={true} suffix={'$'} />/
                <NumberFormat value={revenuBrut} displayType={'text'} thousandSeparator={true} suffix={'$'} />
              </span>
            </small>
          </th>
          <td>
            <small>
              <span title="Valeur réel">R&nbsp;:&nbsp;<NumberFormat value={getDepensesOperation()} displayType={'text'} thousandSeparator={true} suffix={'$'} /></span><br />
            <span title="Valeur estimé selon le revenu brut">EP&nbsp;:&nbsp;<NumberFormat value={getDepensesOperationEstime()} displayType={'text'} thousandSeparator={true} suffix={'$'} /></span>
            </small>
          </td>
          <td>
            <small>
              <span title="Valeur réel">R&nbsp;:&nbsp;<NumberFormat value={getRevenuBrutEffectif()} displayType={'text'} thousandSeparator={true} suffix={'$'} /></span><br />
              <span title="Valeur selon les depenses estimés">EP&nbsp;:&nbsp;<NumberFormat value={getRevenuBrutEffectifEstime()} displayType={'text'} thousandSeparator={true} suffix={'$'} /></span>
            </small>
          </td>
          <td>
            <small>
              <span title="Valeur réel">R&nbsp;:&nbsp;<NumberFormat value={getRevenuNetOperation()} displayType={'text'} thousandSeparator={true} suffix={'$'} /></span><br />
              <span title="Valeur selon les depenses estimés">EP&nbsp;:&nbsp;<NumberFormat value={getRevenuNetOperationEstime()} displayType={'text'} thousandSeparator={true} suffix={'$'} /></span>
            </small>
          </td>
          <td>
            <small>
              <span title="Valeur réel">R&nbsp;:&nbsp;<NumberFormat value={getValeurImmeuble(5)} displayType={'text'} thousandSeparator={true} suffix={'$'} /></span><br />
              <span title="Valeur selon les depenses estimés">EP&nbsp;:&nbsp;<NumberFormat value={getValeurImmeubleEstime(5)} displayType={'text'} thousandSeparator={true} suffix={'$'} /></span>
            </small>
          </td>
          <td>
            <small>
              {getMultiplicateurRevenuBrut()}
            </small>
          </td>
          <td>
            <small>
              {getMultiplicateurRevenuNet()}
            </small>
          </td>
          <td>
            <small>
              <span title="Valeur réel">R&nbsp;:&nbsp;{getRatioDepenses()}</span><br />
            <span title="Valeur estimé selon le prix de vente">EP&nbsp;:&nbsp;{getRatioDepensesEstimePrix()}</span>
            </small>
          </td>
          <td>
            <small>
              {getRatioTauxCapitalisation()}
            </small>
          </td>
          <td>
            <small>
              <span title="Indice à 12 estimé">12E&nbsp;:&nbsp;<NumberFormat value={getIndice(12)} displayType={'text'} thousandSeparator={true} suffix={'$'} /><i className={getIndiceIcon(12)} aria-hidden="true"></i></span><br />
              <span title="Indice à 15 estimé">15E&nbsp;:&nbsp;<NumberFormat value={getIndice(15)} displayType={'text'} thousandSeparator={true} suffix={'$'} /><i className={getIndiceIcon(15)} aria-hidden="true"></i></span>
            </small>
          </td>
          <td><small>
            <span title="0% cash down">0%&nbsp;:&nbsp;<NumberFormat value={calculate(price, 5, 0)} displayType={'text'} thousandSeparator={true} suffix={'$'} /></span><br />
            <span title="5% cash down">5%&nbsp;:&nbsp;<NumberFormat value={calculate(price, 5, price*0.05)} displayType={'text'} thousandSeparator={true} suffix={'$'} /></span><br />
            <span title="20% cash down">20%&nbsp;:&nbsp;<NumberFormat value={calculate(price, 5, price*0.2)} displayType={'text'} thousandSeparator={true} suffix={'$'} /></span>
          </small></td>
          <td>
            <Link to={getEditLink()} className="nav-link" activeClassName="active" style={{"display" : "inline", "padding" : "0"}} ><i className="fa fa-pencil" aria-hidden="true"></i></Link>
            <a href="#" onClick={() => {
                dispatch(actions.startToggleProperty(id, !completed));
              }} style={{"padding" : "0 0 0 5px"}}><i className={toggle} aria-hidden="true"></i>
          </a>
          </td>
        </tr>
    )
  }
};

export default Redux.connect()(Property);
