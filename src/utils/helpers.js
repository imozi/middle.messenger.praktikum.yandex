const ifEqual = function (a, b, options) {
  return a === b ? options.fn(this) : options.inverse(this);
};

export default {
  ifEqual,
};
