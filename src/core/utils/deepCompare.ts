import { isObject, isArray, isSameType } from './isType';

export function deepCompare(a: any, b: any): boolean {
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
    if (!Object.prototype.hasOwnProperty.call(b, key)) {
      return false;
    }

    if (!deepCompare(a[key], b[key])) {
      return false;
    }
  }

  return true;
}
