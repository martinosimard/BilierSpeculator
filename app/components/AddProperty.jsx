import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

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
    this.vacance = vacance;
  }
};

export class AddProperty extends React.Component {
  handleSubmit (e) {
    e.preventDefault();
    var {dispatch} = this.props;
    debugger
    var newProperty = new PropertyInfo(
            this.refs.numeroCiviqueText.value,
            this.refs.rueText.value,
            this.refs.quartier.value,
            this.refs.deuxDemi.value,
            this.refs.troisDemi.value,
            this.refs.quatreDemi.value,
            this.refs.cinqDemi.value,
            this.refs.sixDemiPlus.value,
            this.refs.postalCodeText.value,
            this.refs.priceText.value,
            this.refs.yearText.value,
            this.refs.revenuBrutText.value,
            this.refs.taxesSchoolText.value,
            this.refs.taxesCityText.value,
            this.refs.assurancesText.value,
            this.refs.typeProp.value,
            this.refs.evaluationTerrain.value,
            this.refs.evaluationBatiment.value,
            this.refs.entretien.value,
            this.refs.autres.value,
            this.refs.vacance.value
   );

    if (this.refs.rueText.value.length > 0) {
      this.refs.numeroCiviqueText.value = "";
      this.refs.rueText.value = "";
      this.refs.quartier.selectedIndex = 0;
      this.refs.deuxDemi.value = "";
      this.refs.troisDemi.value = "";
      this.refs.quatreDemi.value = "";
      this.refs.cinqDemi.value = "";
      this.refs.sixDemiPlus.value = "";
      this.refs.postalCodeText.value = "";
      this.refs.priceText.value = "";
      this.refs.yearText.value = "";
      this.refs.revenuBrutText.value = "";
      this.refs.taxesSchoolText.value = "";
      this.refs.taxesCityText.value = "";
      this.refs.assurancesText.value = "";
      this.refs.typeProp.selectedIndex = 0;
      this.refs.evaluationTerrain.value = "";
      this.refs.evaluationBatiment.value = "";
      this.refs.entretien.value = "";
      this.refs.autres.value = "";
      this.refs.vacance.value = "";
      dispatch(actions.startAddProperty(newProperty));
    } else {
      this.refs.rueText.focus();
    }
  }
  render () {
    return (
      <div className="container__footer">
        <form onSubmit={this.handleSubmit.bind(this)} data-abide>
          <input type="text" ref="numeroCiviqueText" placeholder="Numéro civique" required pattern="[a-zA-Z0-9]+"/>
          <input type="text" ref="rueText" placeholder="Nom de la rue" required pattern="[a-zA-Z]+"/>
          <input type="text" ref="postalCodeText" placeholder="Code postal" required pattern="[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] ?[0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]"/>
          <input type="text" ref="priceText" placeholder="Prix de vente" required pattern="[0-9]+"/>
          <input type="text" ref="yearText" placeholder="Année de construction" required pattern="^\d{4}$"/>
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
          <input type="text" ref="revenuBrutText" placeholder="Revenus brut" required pattern="[0-9]+"/>
          <input type="text" ref="taxesSchoolText" placeholder="Taxes scolaires" required pattern="[0-9]+"/>
          <input type="text" ref="taxesCityText" placeholder="Taxes municipales" required pattern="[0-9]+"/>
          <input type="text" ref="entretien" placeholder="Dépenses d'entretien" pattern="[0-9]+"/>
          <input type="text" ref="autres" placeholder="Autres dépenses" pattern="[0-9]+"/>
          <input type="text" ref="vacance" placeholder="Vacances" pattern="[0-9]+"/>
          <input type="text" ref="assurancesText" placeholder="Assurances" pattern="[0-9]+"/>
          <input type="text" ref="evaluationTerrain" placeholder="Evaluation municipale du terrain" required pattern="[0-9]+"/>
          <input type="text" ref="evaluationBatiment" placeholder="Evaluation municipale du batiment" required pattern="[0-9]+"/>
          <input type="text" ref="deuxDemi" placeholder="Nombre de 2 pieces" pattern="[0-9]+"/>
          <input type="text" ref="troisDemi" placeholder="Nombre de 3 pieces" pattern="[0-9]+"/>
          <input type="text" ref="quatreDemi" placeholder="Nombre de 4 pieces" pattern="[0-9]+"/>
          <input type="text" ref="cinqDemi" placeholder="Nombre de 5 pieces" pattern="[0-9]+"/>
          <input type="text" ref="sixDemiPlus" placeholder="Nombre de 6 pieces et plus" pattern="[0-9]+"/>
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
