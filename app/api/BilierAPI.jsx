var $ = require('jquery');

module.exports = {
  filterProperties: function (properties, showCompleted, searchText) {
    var filteredProperties = properties;
    // Filter by showCompleted

    filteredProperties = filteredProperties.filter((property) => {
      return !property.completed || showCompleted;
    });

    // Filter by searchText
    filteredProperties = filteredProperties.filter((property) => {
      if (typeof(property.rue) !== 'string')
        return;

      var text = property.numeroCivique.toLowerCase();
      text = text.concat(property.rue.toLowerCase(),
                          property.quartier.toLowerCase(),
                          property.type.toLowerCase());

      return searchText.length === 0 || text.indexOf(searchText.toLowerCase()) > -1;
    });

    // Sort properties with non-completed first
    filteredProperties.sort((a, b) => {
      if (!a.completed && b.completed) {
        return -1;
      } else if (a.completed && !b.completed) {
        return 1;
      } else {
        return 0;
      }
    });

    return filteredProperties;
  }
};
