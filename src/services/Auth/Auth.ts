import { HTTPTransport } from 'core/HTTPTransport';
import { ErrorResponse } from 'services/types';
import { validation } from 'core/utils';
import { User, stateUser } from 'store/User';
import { store } from 'store';
import { UserSignInData, UserSignUpData, ResponseSignUp } from './types';

export class Auth {
  private request: HTTPTransport;

  constructor() {
    this.request = new HTTPTransport('/auth');
  }

  public async signup(data: UserSignUpData) {
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'passwordRepeated') {
        const { password } = data;
        validation[key](value, password);
      } else {
        validation[key](value, key === 'first_name' ? 'Фамилия' : 'Имя');
      }
    });

    try {
      await this.request.post<ResponseSignUp | ErrorResponse>('/signup', data);
    } catch (error: ErrorResponse<any>) {
      throw new Error(error.reason);
    }
  }

  public async signin(data: UserSignInData) {
    Object.entries(data).forEach(([key, value]) => {
      validation[key](value);
    });

    try {
      await this.request.post<ErrorResponse>('/signin', data);
      await this.user();
    } catch (error: ErrorResponse<any>) {
      throw new Error(error.reason);
    }
  }

  public async user() {
    try {
      const user = await this.request.get<stateUser>('/user');
      store.dispatch(User.ACTION.SET_USER, user);
    } catch (error: ErrorResponse<any>) {
      store.dispatch(User.ACTION.DELETE_USER);
    }
  }

  public async logout() {
    this.request.post('/logout');
  }
}
