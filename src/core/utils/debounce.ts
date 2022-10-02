export function debounce(this: any, callback: Function, delay: number = 300) {
  let timeout: ReturnType<typeof setTimeout> | null;

  return (...args: [any]) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}
