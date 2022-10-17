import { HTTPTransport } from 'core/HTTPTransport';

type AuthorizationData = {
  login: string;
  password: string;
};

export class Authorization {
  private request = new HTTPTransport('/auth/signin');

  constructor({ login, password }: AuthorizationData) {
    this.login = login;
    this.password = password;
  }

  public onlogin() {
    this.request.post();
  }
}
