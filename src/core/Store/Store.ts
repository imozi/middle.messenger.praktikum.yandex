import { EventBus } from 'core/EventBus';
import { Rec } from 'core/types';

export class Store extends EventBus {
  static EVENTS = {
    INIT: 'init',
    UPDATED: 'updated',
  } as const;

  private _store: Rec<any> = {};

  private _reducer: any;

  constructor(states: any) {
    super();

    this.states = {};

    this.on(Store.EVENTS.INIT, this._init.bind(this, states));

    this.emit(Store.EVENTS.INIT);
  }

  public getStore() {
    return this._store;
  }

  public dispatch(action: any) {
    this._store = this._reducer(this._store, action);

    this.emit(Store.EVENTS.UPDATED);
  }

  _init(states: any) {
    Object.entries(states).forEach(([key, state]) => {
      const lowKey = key.toLowerCase();
      this.states[lowKey] = new state();
      this.states[lowKey].emit('init');
      this._store[lowKey] = { ...this.states[lowKey].getState() };
    });
  }
}
