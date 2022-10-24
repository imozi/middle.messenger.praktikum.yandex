import { EventBus } from 'core/EventBus';
import { Rec } from 'core/types';

export class User extends EventBus {
  static ACTION = {
    INIT: 'init',
    SET_USER: 'set',
    DELETE_USER: 'delete',
    SET_ERROR: 'error',
  } as const;

  private _state: Rec<any> = {};

  constructor() {
    super();
    this._regEvents();
  }

  private _init() {
    this._state = { profile: null, error: null };
  }

  getState() {
    return this._state;
  }

  private _regEvents() {
    this.on(User.ACTION.INIT, this._init.bind(this));
  }
}
