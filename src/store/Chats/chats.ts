import { EventBus } from 'core/EventBus';
import { Nullable, Rec } from 'core/types';
import { stateUser } from 'store/User';

export type stateChat = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: stateUser;
  time: string;
  content: string;
};

export type stateChats = Rec<stateChat>;

export class Chats extends EventBus {
  static ACTION = {
    INIT: 'init',
    SET_CHATS: 'chats/set',
    DELETE_CHATS: 'chats/delete',
    UPDATE_CHATS: 'chats/update',
  } as const;

  private _state: Nullable<stateChats> = null;

  constructor() {
    super();
    this._regReducers();

    this.emit(Chats.ACTION.INIT);
  }

  private _init() {
    this._state = null;
  }

  private _setChats(chats: stateChats) {
    this._state = { ...chats };
  }

  private _deleteChats() {
    this._state = null;
  }

  private _updateChats(chats: stateChats) {
    this._state = { ...chats };
  }

  getState() {
    return this._state;
  }

  private _regReducers() {
    this.on(Chats.ACTION.INIT, this._init.bind(this));
    this.on(Chats.ACTION.SET_CHATS, this._setChats.bind(this));
    this.on(Chats.ACTION.DELETE_CHATS, this._deleteChats.bind(this));
    this.on(Chats.ACTION.UPDATE_CHATS, this._updateChats.bind(this));
  }
}
