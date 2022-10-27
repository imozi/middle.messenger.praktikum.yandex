import { HTTPTransport } from 'core/HTTPTransport';
import { ErrorResponse } from 'services/types';
import { User as UserState } from 'store/User';
import { store } from 'store';
import { UserProfileData } from './types';

export class User {
  private request: HTTPTransport;

  constructor() {
    this.request = new HTTPTransport('/user');
  }

  public async profile(data: UserProfileData) {
    const user = await this.request.put<ErrorResponse>('/profile', data);
    store.dispatch(UserState.ACTION.UPDATE_USER, user);
  }
}
