import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

class Property {
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

export class AddProperty extends React.Component {
  handleSubmit (e) {
    e.preventDefault();
    var {dispatch} = this.props;
    var newProperty = new Property(
            this.refs.numeroCiviqueText.value,
            this.refs.rueText.value,
            this.refs.quartier.value,
            this.refs.deuxDemi.value,
            this.refs.troisDemi.value,
            this.refs.quatreDemi.value,
            this.refs.cinqDemi.value,
            this.refs.sixDemi.value,
            this.refs.septDemi.value,
            this.refs.postalCodeText.value,
            this.refs.priceText.value,
            this.refs.yearText.value,
            this.refs.grossRevenueText.value,
            this.refs.taxesSchoolText.value,
            this.refs.taxesCityText.value,
            this.refs.assurancesText.value,
            this.refs.typeProp.value,
            this.refs.evaluationTerrainText.value,
            this.refs.evaluationBatimentText.value,
            this.refs.entretien.value,
            this.refs.autres.value
   );

    if (this.refs.rueText.value.length > 0) {
      this.refs.numeroCiviqueText.value = "";
      this.refs.rueText.value = "";
      this.refs.quartier.selectedIndex = 0;
      this.refs.deuxDemi.value = "";
      this.refs.troisDemi.value = "";
      this.refs.quatreDemi.value = "";
      this.refs.cinqDemi.value = "";
      this.refs.sixDemi.value = "";
      this.refs.septDemi.value = "";
      this.refs.postalCodeText.value = "";
      this.refs.priceText.value = "";
      this.refs.yearText.value = "";
      this.refs.grossRevenueText.value = "";
      this.refs.taxesSchoolText.value = "";
      this.refs.taxesCityText.value = "";
      this.refs.assurancesText.value = "";
      this.refs.typeProp.selectedIndex = 0;
      this.refs.evaluationTerrainText.value = "";
      this.refs.evaluationBatimentText.value = "";
      this.refs.entretien.value = "";
      this.refs.autres.value = "";
      dispatch(actions.startAddProperty(newProperty));
    } else {
      this.refs.rueText.focus();
    }
  }
  render () {
    return (
      <div className="container__footer">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="numeroCiviqueText" placeholder="Numéro civique"/>
          <input type="text" ref="rueText" placeholder="Nom de la rue"/>
          <input type="text" ref="postalCodeText" placeholder="Code postal"/>
          <input type="text" ref="priceText" placeholder="Prix de vente"/>
          <input type="text" ref="yearText" placeholder="Année de construction"/>
          <div>
            <label>Quartier:</label>
            <select ref="quartier">
              <option value="Secteur Vieux-Québec (haute-ville)">Secteur Vieux-Québec (haute-ville)</option>
              <option value="Secteur Vieux-Québec (basse-ville)">Secteur Vieux-Québec (basse-ville)</option>
              <option value="Saint-Jean-Baptiste (quartier)">Saint-Jean-Baptiste (quartier)</option>
              <option value="Montcalm (quartier)">Montcalm (quartier)</option>
              <option value="Saint-Sacrement (quartier)">Saint-Sacrement (quartier)</option>
              <option value="Saint-Roch (quartier)">Saint-Roch (quartier)</option>
              <option value="Saint-Sauveur (quartier)">Saint-Sauveur (quartier)</option>
              <option value="Limoilou (ancien arrondissement)">Limoilou (ancien arrondissement)</option>
              <option value="Vieux-Limoilou (quartier)">Vieux-Limoilou (quartier)</option>
              <option value="Lairet (quartier)">Lairet (quartier)</option>
              <option value="Maizerets (quartier)">Maizerets (quartier)</option>
            </select>
          </div>
          <input type="text" ref="grossRevenueText" placeholder="Revenus brut"/>
          <input type="text" ref="taxesSchoolText" placeholder="Taxes scolaires"/>
          <input type="text" ref="taxesCityText" placeholder="Taxes municipales"/>
          <input type="text" ref="entretien" placeholder="Dépenses d'entretien"/>
          <input type="text" ref="autres" placeholder="Autres dépenses"/>
          <input type="text" ref="assurancesText" placeholder="Assurances"/>
          <input type="text" ref="evaluationTerrainText" placeholder="Evaluation municipale du terrain"/>
          <input type="text" ref="evaluationBatimentText" placeholder="Evaluation municipale du batiment"/>
          <input type="text" ref="deuxDemi" placeholder="Nombre de 2 pieces"/>
          <input type="text" ref="troisDemi" placeholder="Nombre de 3 pieces"/>
          <input type="text" ref="quatreDemi" placeholder="Nombre de 4 pieces"/>
          <input type="text" ref="cinqDemi" placeholder="Nombre de 5 pieces"/>
          <input type="text" ref="sixDemi" placeholder="Nombre de 6 pieces"/>
          <input type="text" ref="septDemi" placeholder="Nombre de 7 pieces et plus"/>
          <div>
            <label>Type:</label>
            <select ref="typeProp">
              <option value="Duplex">Duplex</option>
              <option value="Triplex">Triplex</option>
              <option value="Quadruplex">Quatriplex</option>
              <option value="Quintuplex">Quintuplex</option>
              <option value="Moreplex">6 unités ou plus</option>
            </select>
          </div>
          <button className="button expanded">Ajouter la propriétée</button>
        </form>
      </div>
    );
  }
};

export default Redux.connect()(AddProperty);
