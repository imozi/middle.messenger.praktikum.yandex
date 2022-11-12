import { HTTPTransport } from 'core/HTTPTransport';
import { ErrorResponse } from 'services/types';
import { Chats as ChatsState } from 'store/Chats';
import { store } from 'store';

export class Chats {
  private request: HTTPTransport;

  constructor() {
    this.request = new HTTPTransport('/chats');
  }

  private _setToken(chats: ChatsState) {
    Object.entries(chats).forEach(async ([_, chat]) => {
      try {
        const token = (await this.request.post(`/token/${chat.id}`)) as {
          token: string;
        };
        chat.token = token.token;
      } catch (error: ErrorResponse<any>) {
        throw new Error(error.reason);
      }
    });
  }

  public async getChats() {
    try {
      const chats = (await this.request.get('')) as ChatsState;
      this._setToken(chats);
      store.dispatch(ChatsState.ACTION.SET_CHATS, chats);
    } catch (error: ErrorResponse<any>) {
      throw new Error(error.reason);
    }
  }

  public async createChats(title: string) {
    try {
      await this.request.post('', title);
      await this.updateChats();
    } catch (error: ErrorResponse<any>) {
      throw new Error(error.reason);
    }
  }

  public async deleteChats(id: string) {
    try {
      await this.request.delete('', { chatId: id });
      await this.updateChats();
    } catch (error: ErrorResponse<any>) {
      throw new Error(error.reason);
    }
  }

  public async updateChats() {
    try {
      const chats = (await this.request.get('')) as ChatsState;
      this._setToken(chats);
      store.dispatch(ChatsState.ACTION.UPDATE_CHATS, chats);
    } catch (error: ErrorResponse<any>) {
      throw new Error(error.reason);
    }
  }

  public async addedUserToChat(userId: number, chatId: number) {
    try {
      await this.request.put('/users', {
        users: [userId],
        chatId,
      });
    } catch (error: ErrorResponse<any>) {
      throw new Error(error.reason);
    }
  }

  public async deleteUserFromChat(userId: number, chatId: number) {
    try {
      await this.request.delete('/users', {
        users: [userId],
        chatId,
      });
    } catch (error: ErrorResponse<any>) {
      throw new Error(error.reason);
    }
  }

  public async updateToken(id: string) {
    try {
      const token = (await this.request.post(`/token/${id}`)) as {};
      store.dispatch(ChatsState.ACTION.SET_TOKEN, { id, ...token });
    } catch (error: ErrorResponse<any>) {
      throw new Error(error.reason);
    }
  }
}
