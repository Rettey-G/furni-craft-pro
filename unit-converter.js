// Unit conversion utility
const UnitConverter = {
  toMM: function(value, unit) {
    switch(unit) {
      case 'cm': return value * 10;
      case 'in': return value * 25.4;
      case 'ft': return value * 304.8;
      default: return value; // mm
    }
  },
  fromMM: function(value, unit) {
    switch(unit) {
      case 'cm': return value / 10;
      case 'in': return value / 25.4;
      case 'ft': return value / 304.8;
      default: return value; // mm
    }
  }
};
