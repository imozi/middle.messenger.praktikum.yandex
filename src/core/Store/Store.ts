import { EventBus } from 'core/EventBus';
import { Rec } from 'core/types';

export class Store extends EventBus {
  static EVENTS = {
    INIT: 'init',
    UPDATED: 'updated',
  } as const;

  private readonly _store: Rec<any> = {};

  private readonly _states: Rec<any> = {};

  constructor(states: any) {
    super();

    this.on(Store.EVENTS.INIT, this._init.bind(this, states));

    this.emit(Store.EVENTS.INIT);
  }

  public getStore() {
    return this._store;
  }

  public dispatch(action: any, data?: any) {
    const state = action.split('/')[0];

    this._states[state].emit(action, data);
    this._store[state] = this._states[state].getState();

    this.emit(Store.EVENTS.UPDATED);
  }

  private _init(states: any) {
    Object.entries(states).forEach(([key, State]: [string, any]) => {
      const lowKey = key.toLowerCase();
      this._states[lowKey] = new State();
      this._store[lowKey] = this._states[lowKey].getState();
    });
  }
}
