function ifEqual(a, b, options) {
  return a === b ? options.fn(this) : options.inverse(this);
}

const helpers = {
  ifEqual,
};

export { helpers };
