import { EventBus } from 'core/EventBus';
import { Nullable, Rec } from 'core/types';
import { stateUser } from 'store/User';

export type StateChat = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: stateUser;
  time: string;
  content: string;
  token?: string;
};

export type StateChats = Rec<StateChat>;

export class Chats extends EventBus {
  static ACTION = {
    INIT: 'init',
    SET_CHATS: 'chats/set',
    DELETE_CHATS: 'chats/delete',
    UPDATE_CHATS: 'chats/update',
    SET_TOKEN: 'chats/token',
  } as const;

  private _state: Nullable<StateChats> = null;

  constructor() {
    super();
    this._regReducers();

    this.emit(Chats.ACTION.INIT);
  }

  private _init() {
    this._state = null;
  }

  private _setChats(chats: StateChats) {
    this._state = { ...chats };
  }

  private _deleteChats() {
    this._state = null;
  }

  private _updateChats(chats: StateChats) {
    this._state = { ...chats };
  }

  private _setToken({ id, token }: Record<string, string>) {
    const chat = Object.entries(this._state!).find(
      ([_, chat]) => chat.id.toString() === id,
    );

    if (chat) {
      chat[1].token = token;
    }
  }

  getState() {
    return this._state;
  }

  private _regReducers() {
    this.on(Chats.ACTION.INIT, this._init.bind(this));
    this.on(Chats.ACTION.SET_CHATS, this._setChats.bind(this));
    this.on(Chats.ACTION.DELETE_CHATS, this._deleteChats.bind(this));
    this.on(Chats.ACTION.UPDATE_CHATS, this._updateChats.bind(this));
    this.on(Chats.ACTION.SET_TOKEN, this._setToken.bind(this));
  }
}
