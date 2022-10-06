import { Validation } from 'core/utils';
import { Component } from '../../core/Component';

const validation: { [key: string]: Function } = {
  login: Validation.Login,
  password: Validation.Password,
};

export class LoginPage extends Component {
  protected getStateFromProps() {
    this.state = {
      onLogin: (evt: Event) => {
        evt.preventDefault();

        const loginData = {
          login: (this.refs.login.getEl() as HTMLInputElement).value,
          password: (this.refs.password.getEl() as HTMLInputElement).value,
        };

        const root = document.getElementById('root');
        const notification = this.refs.notification;

        try {
          validation.login(loginData.login);
          validation.password(loginData.password);

          // eslint-disable-next-line no-console
          console.log(loginData);
        } catch (error: Error | any) {
          notification.setProps({
            type: 'error',
            text: error.message,
          });

          if (root?.contains(notification.getEl())) {
            notification.show();
            notification.getEl().click();
          }
        }
      },
      closeNotification: () => {
        this.refs.notification.hide();
      },
    };
  }

  didMount(): void {
    Object.entries(this.refs).forEach(([key, component]) => {
      if (key === 'icon') {
        component.refs.password = this.refs.password;
      }
      component.refs.notification = this.refs.notification;
    });
  }

  render() {
    return `
    <main class="login">
    {{{Notification className="login__notification" type="" text="" ref="notification" click=closeNotification}}}
         {{{Header  className="login__header" title="Вход"}}}
         <form action="/404" class="form login__form" method="get">
            <div class="form__row">
              <div class="form__label">
                {{{Label id="login" text="Логин"}}}
              </div>
              <div class="form__input ">
                {{{Input
                id="login"
                type="text"
                name="login"
                placeholder="Ваш логин"
                icon="user"
                ref="login"
                }}}
                {{{Icon className="input-icon" icon="user"}}}
              </div>
            </div>
            <div class="form__row">
              <div class="form__label">
                {{{Label id="password" text="Пароль"}}}
              </div>
              <div class="form__input ">
                {{{Input
                id="password"
                type="password"
                name="password"
                placeholder="Пароль"
                hide="true"
                icon="hide"
                ref="password"
                }}}
                {{{Icon className="input-icon" icon="hide" ref="icon"}}}
              </div>
            </div>
            <div class="form__row">
                <div class="form__btn">
                    {{{Button className="btn--blue" type="submit" text="Авторизация" ref="submitBtn" click=onLogin}}}
                </div>
                <div class="form__link">
                    {{{Link url="registration" className="login__link" text="У вас нет аккаунта?"}}}
                </div>
            </div>
        </form>
    </main>
    `;
  }
}
