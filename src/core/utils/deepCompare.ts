function isObject(value: unknown): boolean {
  return Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): boolean {
  return Array.isArray(value);
}

function isSameType(value1: unknown, value2: unknown): boolean {
  return (
    Object.prototype.toString.call(value1) ===
    Object.prototype.toString.call(value2)
  );
}

export function deepCompare(a: unknown, b: unknown): boolean {
  if (a === b) {
    return true;
  }

  if ((!isObject(a) && !isArray(a)) || (!isObject(b) && !isArray(b))) {
    return false;
  }

  if (!isSameType(a, b) || Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }

  for (const key of Object.keys(a)) {
    if (!b.hasOwnProperty(key)) {
      return false;
    }

    if (!deepCompare(a[key], b[key])) {
      return false;
    }
  }

  return true;
}
