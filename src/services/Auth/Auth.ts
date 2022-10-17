import { HTTPTransport } from 'core/HTTPTransport';
import { ErrorResponse } from 'services/types';
import { validation } from 'core/utils';
import { Router } from 'core/Router';
import { UserSignInData, UserSignUpData, ResponseSignup } from './types';

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
      await this.request.post<ResponseSignup | ErrorResponse>('/signup', data);
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
      new Router().go('/chat');
    } catch (error: ErrorResponse<any>) {
      throw new Error(error.reason);
    }
  }

  public async me() {
    this.request.get('/user');
  }

  public async logout() {
    this.request.post('/logout');
  }
}
