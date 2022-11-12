import { Rec } from 'core/types';
import { isObject, isArray } from './isType';

export function isEmpty<T>(value: T | any): boolean {
  switch (true) {
    case isObject(value):
      return !Object.keys(value as Rec<any>).length;
    case value instanceof Map || value instanceof Set:
      return !value.size;
    case isArray(value):
      return !value.length;
    case typeof value === 'string':
      return !value.trim().length;
    default:
      return true;
  }
}
