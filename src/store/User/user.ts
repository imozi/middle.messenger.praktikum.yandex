import { EventBus } from 'core/EventBus';
import { Nullable } from 'core/types';

export type stateUser = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export class User extends EventBus {
  static ACTION = {
    INIT: 'init',
    SET_USER: 'user/set',
    DELETE_USER: 'user/delete',
  } as const;

  private _state: Nullable<stateUser> = null;

  constructor() {
    super();
    this._regReducers();

    this.emit(User.ACTION.INIT);
  }

  private _init() {
    this._state = null;
  }

  private _setUser(profile: stateUser) {
    this._state = { ...profile };
  }

  private _deleteUser() {
    this._state = null;
  }

  getState() {
    return this._state;
  }

  private _regReducers() {
    this.on(User.ACTION.INIT, this._init.bind(this));
    this.on(User.ACTION.SET_USER, this._setUser.bind(this));
    this.on(User.ACTION.DELETE_USER, this._deleteUser.bind(this));
  }
}
