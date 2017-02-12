var expect = require('expect');

var BilierAPI = require('BilierAPI');

describe('BilierAPI', () => {
  beforeEach(() => {
    localStorage.removeItem('properties');
  });

  it('should exist', () => {
    expect(BilierAPI).toExist();
  });

  describe('filterProperties', () => {
    var properties = [{
      id: 1,
      text: 'Some text here',
      completed: true
    },{
      id: 2,
      text: 'Other text here',
      completed: false
    },{
      id: 3,
      text: 'Some text here',
      completed: true
    }];

    it('should return all items if showCompleted is true', () => {
      var filteredProperties = BilierAPI.filterProperties(properties, true, '');
      expect(filteredProperties.length).toBe(3);
    });

    it('should return non-completed properties when showCompleted is false', () => {
      var filteredProperties = BilierAPI.filterProperties(properties, false, '');
      expect(filteredProperties.length).toBe(1);
    });

    it('should sort by completed status', () => {
      var filteredProperties = BilierAPI.filterProperties(properties, true, '');
      expect(filteredProperties[0].completed).toBe(false);
    });

    it('should filter properties by searchText', () => {
      var filteredProperties = BilierAPI.filterProperties(properties, true, 'some');
      expect(filteredProperties.length).toBe(2);
    });

    it('should filter properties by searchText if upper case', () => {
      var filteredProperties = BilierAPI.filterProperties(properties, true, 'Some');
      expect(filteredProperties.length).toBe(2);
    });

    it('should return all properties if searchText is empty', () => {
      var filteredProperties = BilierAPI.filterProperties(properties, true, '');
      expect(filteredProperties.length).toBe(3);
    });
  });
});
