import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

// export for testing purpose
export class Login extends React.Component {
  onLogin() {
    var {dispatch} = this.props;

    dispatch(actions.startLogin());
  }
  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-block">
            <h1 className="card-title">Property App</h1>
            <h3 className="card-subtitle">Login</h3>
            <p className="card-text">
              Login with Google account below
            </p>
            <button className="btn btn-primary" onClick={this.onLogin.bind(this)}>Login with Google</button>
          </div>
        </div>
      </div>
    )
  }
};


export default Redux.connect()(Login);
