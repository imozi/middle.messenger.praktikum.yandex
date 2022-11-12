export function isArray(value: unknown): boolean {
  return Array.isArray(value);
}

export function isObject(value: unknown): boolean {
  return Object.prototype.toString.call(value) === '[object Object]';
}

export function isSameType(value1: unknown, value2: unknown): boolean {
  return (
    Object.prototype.toString.call(value1) ===
    Object.prototype.toString.call(value2)
  );
}
