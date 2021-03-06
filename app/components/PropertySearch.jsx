import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

export class PropertySearch extends React.Component {
  render () {
    var {dispatch, showCompleted, searchText} = this.props;
    return (
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">Filtrer</h4>
          <p><input type="search" ref="searchText" placeholder="Rechercher une propriété" value={searchText} onChange={() => {
              var searchText = this.refs.searchText.value;
              dispatch(actions.setSearchText(searchText));
            }} />
          <input type="checkbox" ref="showCompleted" checked={showCompleted} onChange={() => {
              dispatch(actions.toggleShowCompleted());
            }} />
          <label>Afficher les propriétés discartés</label>
        </p>
        </div>
    );
  }
};

export default Redux.connect(
  (state) => {
    return {
      showCompleted: state.showCompleted,
      searchText: state.searchText
    }
  }
)(PropertySearch);
