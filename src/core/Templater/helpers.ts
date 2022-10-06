function ifEqual(
  this: { ifEqual: () => any },
  a: string,
  b: string,
  options: any,
) {
  return a === b ? options.fn(this) : options.inverse(this);
}

const helpers = {
  ifEqual,
};

export { helpers };
