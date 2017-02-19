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

export class EditProperty extends React.Component {
  componentWillMount()
  {
    var getProperty = (property) => {
      return property.id === this.props.params.id;
    };

    this.state = this.props.properties.find(getProperty);
  }
  handleSubmit (e) {
    e.preventDefault();
    var {dispatch} = this.props;
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
    dispatch(actions.startEditProperty(this.props.params.id, newProperty));
  }
  render () {
    return (
     <div className="container">
       <form onSubmit={this.handleSubmit.bind(this)} data-abide>
         <div className="row">
           <div className="col">
             <h4>Identification</h4>
           </div>
           <div className="col" />
         </div>

         <div className="row">
           <div className="col">
             <div className="input-group">
               <span className="input-group-addon">Numéro civique</span>
               <input ref="numeroCiviqueText" type="text" className="form-control" defaultValue={this.state.numeroCivique} />
             </div>
           </div>
           <div className="col">
             <div className="input-group">
               <span className="input-group-addon">Nom de la rue</span>
               <input ref="rueText" type="text" className="form-control" defaultValue={this.state.rue} />
             </div>
           </div>
         </div>
         <br />
         <div className="row">
           <div className="col">
             <div className="input-group">
               <span className="input-group-addon">Code postal</span>
               <input ref="postalCodeText" type="text" className="form-control" defaultValue={this.state.postalCode} />
                 <span className="input-group-addon">G1G 1G1</span>
             </div>
           </div>
           <div className="col">
             <div className="form-group">
               <select ref="quartier" className="form-control" defaultValue={this.state.quartier}>
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
           </div>
         </div>
         <br />
         <div className="row">
           <div className="col">
             <div className="form-group">
               <select ref="typeProp" className="form-control" defaultValue={this.state.type}>
                 <option value="Duplex">Duplex</option>
                 <option value="Triplex">Triplex</option>
                 <option value="Quadruplex">Quatriplex</option>
                 <option value="Quintuplex">Quintuplex</option>
                 <option value="Moreplex">6 unités ou plus</option>
               </select>
             </div>
           </div>
           <div className="col">
             <div className="input-group">
               <span className="input-group-addon">Année de construction</span>
               <input ref="yearText" type="text" className="form-control" aria-label="Année de construction" defaultValue={this.state.annee}/>
               <span className="input-group-addon">####</span>
             </div>
           </div>
         </div>
         <br />
           <div className="row">
             <div className="col">
               <h4>Évaluation</h4>
             </div>
             <div className="col" />
           </div>
         <div className="row">
           <div className="col">
             <div className="input-group">
               <span className="input-group-addon">Batiment</span>
               <input ref="evaluationBatiment" type="text" className="form-control" aria-label="Année de construction" defaultValue={this.state.evaluationBatiment} />
               <span className="input-group-addon">$</span>
             </div>
           </div>
           <div className="col">
             <div className="input-group">
               <span className="input-group-addon">Terrain</span>
               <input ref="evaluationTerrain" type="text" className="form-control" defaultValue={this.state.evaluationTerrain} />
               <span className="input-group-addon">$</span>
             </div>
           </div>
         </div>
         <br />
           <div className="row">
             <div className="col">
               <h4>Prix</h4>
             </div>
             <div className="col" />
           </div>
         <div className="row">
           <div className="col">
             <div className="input-group">
               <span className="input-group-addon">Prix de vente</span>
               <input ref="priceText" type="text" className="form-control" aria-label="Amount (to the nearest dollar)" defaultValue={this.state.price} />
               <span className="input-group-addon">$</span>
             </div>
           </div>
           <div className="col" />
         </div>
         <br />
           <div className="row">
             <div className="col">
               <h4>Revenus</h4>
             </div>
             <div className="col" />
           </div>
         <div className="row">
           <div className="col">
             <div className="input-group">
               <span className="input-group-addon">Revenus brut</span>
               <input ref="revenuBrutText" type="text" className="form-control" aria-label="Amount (to the nearest dollar)" defaultValue={this.state.revenuBrut} />
               <span className="input-group-addon">$</span>
             </div>
           </div>
           <div className="col" />
         </div>
         <br />
           <div className="row">
             <div className="col">
               <h4>Dépenses d'opération</h4>
             </div>
             <div className="col" />
           </div>
         <div className="row">
           <div className="col">
             <div className="input-group">
               <span className="input-group-addon">Taxes municipales</span>
               <input ref="taxesCityText" type="text" className="form-control" aria-label="Amount (to the nearest dollar)" defaultValue={this.state.taxesCity} />
               <span className="input-group-addon">$</span>
             </div>
           </div>
           <div className="col">
             <div className="input-group">
               <span className="input-group-addon">Taxes scolaires</span>
               <input ref="taxesSchoolText" type="text" className="form-control" aria-label="Amount (to the nearest dollar)" defaultValue={this.state.taxesSchool} />
               <span className="input-group-addon">$</span>
             </div>
           </div>
         </div>
         <br />
         <div className="row">
           <div className="col">
             <div className="input-group">
               <span className="input-group-addon">Dépenses d'entretien</span>
               <input ref="entretien" type="text" className="form-control" aria-label="Amount (to the nearest dollar)" defaultValue={this.state.entretien} />
               <span className="input-group-addon">$</span>
             </div>
           </div>
           <div className="col">
             <div className="input-group">
               <span className="input-group-addon">Assurances</span>
               <input ref="assurancesText" type="text" className="form-control" aria-label="Amount (to the nearest dollar)" defaultValue={this.state.assurances} />
               <span className="input-group-addon">$</span>
             </div>
           </div>
         </div>
         <br />
         <div className="row">
           <div className="col">
             <div className="input-group">
               <span className="input-group-addon">Vacances</span>
               <input ref="vacance" type="text" className="form-control" aria-label="Amount (to the nearest dollar)" defaultValue={this.state.vacance} />
               <span className="input-group-addon">$</span>
             </div>
           </div>
           <div className="col">
             <div className="input-group">
               <span className="input-group-addon">Autres dépenses</span>
               <input ref="autres" type="text" className="form-control" aria-label="Amount (to the nearest dollar)" defaultValue={this.state.autres} />
               <span className="input-group-addon">$</span>
             </div>
           </div>
         </div>
         <br />
           <div className="row">
             <div className="col">
               <h4>Description</h4>
             </div>
             <div className="col" />
           </div>
         <div className="row">
           <div className="col">
             <div className="input-group">
               <span className="input-group-addon">Nombre de 2 pieces</span>
               <input ref="deuxDemi" type="text" className="form-control" aria-label="" defaultValue={this.state.deuxDemi} />
               <span className="input-group-addon">#</span>
             </div>
           </div>
           <div className="col">
             <div className="input-group">
               <span className="input-group-addon">Nombre de 3 pieces</span>
               <input ref="troisDemi" type="text" className="form-control" aria-label="" defaultValue={this.state.troisDemi} />
               <span className="input-group-addon">#</span>
             </div>
           </div>
         </div>
         <br />
         <div className="row">
           <div className="col">
             <div className="input-group">
               <span className="input-group-addon">Nombre de 4 pieces</span>
               <input ref="quatreDemi" type="text" className="form-control" aria-label="" defaultValue={this.state.quatreDemi} />
               <span className="input-group-addon">#</span>
             </div>
           </div>
           <div className="col">
             <div className="input-group">
               <span className="input-group-addon">Nombre de 5 pieces</span>
               <input ref="cinqDemi" type="text" className="form-control" aria-label="" defaultValue={this.state.cinqDemi} />
               <span className="input-group-addon">#</span>
             </div>
           </div>
         </div>
         <br />
         <div className="row">
           <div className="col">
             <div className="input-group">
               <span className="input-group-addon">Nombre de 6 pieces</span>
               <input ref="sixDemiPlus" type="text" className="form-control" aria-label="" defaultValue={this.state.sixDemiPlus} />
               <span className="input-group-addon">#</span>
             </div>
           </div>
           <div className="col" />
         </div>
         <br />
       <button className="btn btn-primary">Enregistrer</button>
       </form>
      </div>
    );
  }
};

export default Redux.connect((state) => {
  return state;
})(EditProperty);
