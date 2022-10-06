import { Validation } from 'core/utils';
import { Component } from 'core/Component';

export class LoginPage extends Component {
  protected initState(): void {
    this.state = {
      formData: {
        login: '',
        password: '',
      },
      onClickSubmit: (evt: Event) => {
        evt.preventDefault();
        const { formData, showNotification } = this.state;

        try {
          Object.entries(formData).forEach(([key, value]) => {
            Validation[key](value);
          });
          // eslint-disable-next-line no-console
          console.log(formData);
        } catch (error: Error | any) {
          showNotification('error', error.message);
        }
      },
      onValidateInput: (evt: { target: HTMLInputElement }) => {
        const { formData, showNotification } = this.state;
        const target = evt.target;
        const name = target.name;
        const value = formData[name];

        try {
          Validation[name](value);
        } catch (error: Error | any) {
          if (value) {
            target.dataset.invalid = 'true';
          }
          showNotification(value ? 'error' : 'info', error.message);
        }
      },
      onKeyDownInput: (evt: { target: HTMLInputElement }) => {
        const { formData } = this.state;
        const target = evt.target;

        if (target.dataset.invalid === 'true') {
          target.dataset.invalid = 'false';
        }

        formData[target.name] = target.value;
      },
      onClickShowPassword: () => {
        const password = this.refs.password.getEl() as HTMLInputElement;
        const icon = this.refs.icon;

        if (password.type === 'password') {
          password.type = 'text';

          icon.setProps({
            icon: 'visible',
          });
        } else {
          password.type = 'password';

          icon.setProps({
            icon: 'hide',
          });
        }
      },
      showNotification: (type: string, error: string) => {
        this.refs.notification.setProps({
          type,
          text: error,
        });

        setTimeout(() => {
          this.refs.notification.show();
        }, 0);

        this.refs.notification.dispatchEvent({ name: 'close' });
      },
      closeNotification: () => {
        this.refs.notification.hide();
      },
    };
  }

  protected render(): string {
    return `
      <main class="login">
          {{{Notification className="login__notification" type="" text="" ref="notification" close=closeNotification}}}
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
                  focus=onValidateInput
                  blur=onValidateInput
                  keyup=onKeyDownInput
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
                  focus=onValidateInput
                  blur=onValidateInput
                  keyup=onKeyDownInput
                  }}}
                  {{{Icon className="input-icon" icon="hide" ref="icon" click=onClickShowPassword}}}
                </div>
              </div>
              <div class="form__row">
                  <div class="form__btn">
                      {{{Button className="btn--blue" type="submit" text="Авторизация" click=onClickSubmit}}}
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
