import { HTTPTransport } from 'core/HTTPTransport';
import { Chats as ChatsState } from 'store/Chats';
import { store } from 'store';

export class Chats {
  private request: HTTPTransport;

  constructor() {
    this.request = new HTTPTransport('/chats');
  }

  public async getChats() {
    const chats = await this.request.get('');
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
    const chats = await this.request.get('');
    store.dispatch(ChatsState.ACTION.UPDATE_CHATS, chats);
  }

  public async getToken(id: string) {
    const token = (await this.request.post(`/token/${id}`)) as {};
    store.dispatch(ChatsState.ACTION.SET_TOKEN, { id, ...token });
  }
}
