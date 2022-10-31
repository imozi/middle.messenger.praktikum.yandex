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

  public async avatarUpdate(data: any) {
    const formData = new FormData();
    formData.append('avatar', data);

    await this.request
      .put<ErrorResponse>('/profile/avatar', formData, true)
      .then((data) => console.log(data));

    // store.dispatch(UserState.ACTION.UPDATE_USER, user);
  }
}
