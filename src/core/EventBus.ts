export class EventBus {
  private listeners = {};

  on(evt, callback) {
    if (!this.listeners[evt]) {
      this.listeners[evt] = [];
    }

    this.listeners[evt].push(callback);
  }

  off(evt, callback) {
    if (!this.listeners[evt]) {
      throw new Error(`Нет события: ${evt}`);
    }

    this.listeners[evt] = this.listeners[evt].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event, ...args) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
