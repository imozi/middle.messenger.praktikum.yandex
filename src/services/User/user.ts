import { HTTPTransport } from 'core/HTTPTransport';
import { ErrorResponse } from 'services/types';
import { User as UserState } from 'store/User';
import { store } from 'store';
import { UserProfileData, UserPasswordResetData } from './types';

export class User {
  private request: HTTPTransport;

  constructor() {
    this.request = new HTTPTransport('/user');
  }

  public async profileUpdate(data: UserProfileData) {
    const user = await this.request.put<ErrorResponse>('/profile', data);
    store.dispatch(UserState.ACTION.UPDATE_USER, user);
  }

  public async passwordUpdate(data: UserPasswordResetData) {
    await this.request.put<ErrorResponse>('/password', data);
  }

  public async avatarUpdate(file: any) {
    const user = await this.request.put<ErrorResponse>('/profile/avatar', file);
    store.dispatch(UserState.ACTION.UPDATE_USER, user);
  }
}
