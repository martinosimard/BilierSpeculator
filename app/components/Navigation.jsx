var {Link, IndexLink} = require('react-router');
import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

export class Navigation extends React.Component {
  onLogout(e) {
    debugger
    var {dispatch, isLoggedIn} = this.props;
    e.preventDefault();

    dispatch(actions.startLogout());
  }
  render() {
  return (
    <nav className="navbar">
      <ul className="nav nav-pills">
        <li className="nav-item">
          <IndexLink to="/" className="nav-link" activeClassName="active">Liste</IndexLink>
        </li>
        <li className="nav-item">
          <Link to="/add-property" className="nav-link" activeClassName="active">Ajouter</Link>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link" onClick={this.onLogout.bind(this)}>LogOut</a>
        </li>
      </ul>
    </nav>
  );
};
};
export default Redux.connect()(Navigation);
