import { EventBus } from 'core/EventBus';
import { Rec } from 'core/types';

const initState = {
  user: null,
  isLoading: false,
};

export class Store extends EventBus {
  private _store: Rec<any> = initState;

  public getStore() {
    return this._store;
  }

  public setStore(newStore) {
    this._store = newStore;
    this.emit('Updated');
  }
}
