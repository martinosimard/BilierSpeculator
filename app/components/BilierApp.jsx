import React from 'react';
import * as Redux from 'react-redux';
import PropertyList from 'PropertyList';
import AddProperty from 'AddProperty';
import PropertySearch from 'PropertySearch';
import * as actions from 'actions';

export class BilierApp extends React.Component {
  onLogout(e) {
    var {dispatch} = this.props;
    e.preventDefault();

    dispatch(actions.startLogout());
  }
  render() {
    return (
      <div>
        <div className="page-action">
          <a href="#" onClick={this.onLogout.bind(this)}>LogOut</a>
        </div>

        <h1 className="page-title">Property App</h1>
        <div className="row">
            <div className="container">
              <PropertySearch />
              <PropertyList />
              <AddProperty />
          </div>
        </div>
      </div>
    )
  }
};

export default Redux.connect()(BilierApp);
