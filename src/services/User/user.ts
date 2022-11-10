import { HTTPTransport } from 'core/HTTPTransport';
import { ErrorResponse } from 'services/types';
import { User as UserState } from 'store/User';
import { validation } from 'core/utils';
import { store } from 'store';
import { UserProfileData, UserPasswordResetData, LoginData } from './types';

export class User {
  private request: HTTPTransport;

  constructor() {
    this.request = new HTTPTransport('/user');
  }

  public async profileUpdate(data: UserProfileData) {
    Object.entries(data).forEach(([key, value]) => {
      if (
        key === 'display_name' ||
        key === 'id' ||
        key === 'avatar' ||
        key === 'status'
      ) {
      } else {
        validation[key](value, key === 'first_name' ? 'Фамилия' : 'Имя');
      }
    });

    try {
      const user = await this.request.put<ErrorResponse>('/profile', data);
      store.dispatch(UserState.ACTION.UPDATE_USER, user);
    } catch (error: ErrorResponse<any>) {
      throw new Error(error.reason);
    }
  }

  public async passwordUpdate(data: UserPasswordResetData) {
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'passwordRepeated') {
        const { newPassword } = data;
        validation[key](value, newPassword);
      } else if (key === 'newPassword') {
        validation.password(value);
      }
    });

    try {
      await this.request.put<ErrorResponse>('/password', data);
    } catch (error: ErrorResponse<any>) {
      throw new Error(error.reason);
    }
  }

  public async avatarUpdate(file: any) {
    try {
      const user = await this.request.put<ErrorResponse>(
        '/profile/avatar',
        file,
      );
      store.dispatch(UserState.ACTION.UPDATE_USER, user);
    } catch (error: ErrorResponse<any>) {
      throw new Error(error.reason);
    }
  }

  public async searchUser(data: LoginData) {
    try {
      const user = await this.request.post<ErrorResponse>('/search', data);
      return user;
    } catch (error: ErrorResponse<any>) {
      throw new Error(error.reason);
    }
  }

  public async getUserById(id: string) {
    try {
      const user = await this.request.get<ErrorResponse>(`/${id}`);
      return user;
    } catch (error: ErrorResponse<any>) {
      throw new Error(error.reason);
    }
  }
}
