import { HTTPTransport } from 'core/HTTPTransport';
import { Chats as ChatsState } from 'store/Chats';
import { store } from 'store';

export class Chats {
  private request: HTTPTransport;

  constructor() {
    this.request = new HTTPTransport('/chats');
  }

  private _setToken(chats: ChatsState) {
    Object.entries(chats).forEach(async ([_, chat]) => {
      const token = (await this.request.post(`/token/${chat.id}`)) as {
        token: string;
      };
      chat.token = token.token;
    });
  }

  public async getChats() {
    const chats = (await this.request.get('')) as ChatsState;
    this._setToken(chats);
    store.dispatch(ChatsState.ACTION.SET_CHATS, chats);
  }

  public async createChats(title: string) {
    await this.request.post('', title);
    await this.updateChats();
  }

  public async deleteChats(id: string) {
    await this.request.delete('', { chatId: id });
    await this.updateChats();
  }

  public async updateChats() {
    const chats = (await this.request.get('')) as ChatsState;
    this._setToken(chats);
    store.dispatch(ChatsState.ACTION.UPDATE_CHATS, chats);
  }

  public async addedUserToChat(userId: number, chatId: number) {
    await this.request.put('/users', {
      users: [userId],
      chatId,
    });
  }

  public async deleteUserFromChat(userId: number, chatId: number) {
    await this.request.delete('/users', {
      users: [userId],
      chatId,
    });
  }

  public async updateToken(id: string) {
    const token = (await this.request.post(`/token/${id}`)) as {};
    store.dispatch(ChatsState.ACTION.SET_TOKEN, { id, ...token });
  }
}
