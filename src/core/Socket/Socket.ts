import { EventBus } from 'core/EventBus';
import { Nullable } from 'core/types';

export type SocketProps = {
  userId: string;
  chatId: string;
  token: string;
};

export type Message = {
  content: string | number;
  type: 'message' | 'get old';
};

export type MessagePing = {
  content: '';
  type: 'ping';
};

export class Socket extends EventBus {
  static EVENTS = {
    INIT: 'init',
    CONNECT: 'connection',
    DISCONNECT: 'disconnection',
  } as const;

  static URL = 'wss://ya-praktikum.tech/ws/chats';

  private _props: SocketProps;

  private _socket: Nullable<WebSocket> = null;

  constructor(props: SocketProps) {
    super();
    this._props = { ...props };

    this._regEvents();

    this.emit(Socket.EVENTS.INIT);
  }

  private _init() {
    const { userId, chatId, token } = this._props;
    this._socket = new WebSocket(`${Socket.URL}/${userId}/${chatId}/${token}`);

    this._socket.addEventListener('open', this._connection.bind(this));
    this._socket.addEventListener('close', this._close.bind(this));
  }

  private _regEvents() {
    this.on(Socket.EVENTS.INIT, this._init.bind(this));
    this.on(Socket.EVENTS.DISCONNECT, this._disconnection.bind(this));
    this.on(Socket.EVENTS.CONNECT, this._connection.bind(this));
  }

  private _ping() {
    setInterval(() => this.send({ content: '', type: 'ping' }), 10000);
  }

  public send(data: Message | MessagePing) {
    this._socket?.send(JSON.stringify(data));
  }

  private _close() {
    this.emit(Socket.EVENTS.DISCONNECT);
  }

  private _disconnection() {
    console.log('disconnect');
  }

  private _connection() {
    this.send({ content: 'Тестовое сообщение4', type: 'message' });
    this.send({ content: '0', type: 'get old' });
    // this._ping();
  }
}
