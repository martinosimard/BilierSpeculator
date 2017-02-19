import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import Navigation from 'Navigation';
import firebase from 'app/firebase/';

export class Main extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron jumbotron-fluid yellow-bg">
          <div className="container home-head">
            <h1 className="display-3">immo<i className="fa fa-home" aria-hidden="true"></i>billier</h1>
            <p className="lead">Base de données personnel et estimateur du coûts d'achat de propriétés</p>
          </div>
        </div>
        <Navigation />
        <div className="row">
          {this.props.children}
        </div>
      </div>
    )
  }
};

export default Redux.connect()(Main);
