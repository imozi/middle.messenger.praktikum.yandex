import { validation } from 'core/utils';
import { Component } from 'core/Component';
import Auth from 'services/Auth';

interface SignInProps {
  [key: string]: any;
}

export class SignInPage extends Component<SignInProps> {
  constructor(props?: SignInProps) {
    super(props);

    this.setState({
      formData: {
        login: '',
        password: '',
      },
    });

    this.setProps({
      onClickSubmit: async (evt: Event) => {
        evt.preventDefault();
        const { formData } = this.state;
        const target = evt.target as HTMLButtonElement;

        try {
          target.disabled = true;
          this.refs.link.hide();

          await Auth.signin(formData);
          this.props.router.go('/messenger');

          target.disabled = false;
          this.refs.link.show();
        } catch (error: Error | any) {
          target.disabled = false;
          this.refs.link.show();

          this.props.showNotification('error', error.message);
        }
      },
      onValidateInput: (evt: { target: HTMLInputElement }) => {
        const { formData } = this.state;
        const target = evt.target;
        const name = target.name;
        const value = formData[name];

        try {
          validation[name](value);
        } catch (error: Error | any) {
          if (value) {
            target.dataset.invalid = 'true';
          }
          this.props.showNotification(value ? 'error' : 'info', error.message);
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
          icon.getEl().dataset.hide = 'false';
        } else {
          password.type = 'password';

          icon.getEl().dataset.hide = 'true';
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
    });
  }

  protected render(): string {
    return `
      <main class="login">
          {{{Notification className="login__notification" type="" text="" ref="notification" close=closeNotification}}}
          {{{Header  className="login__header" title="????????"}}}
          <form class="form login__form" method="get">
              <div class="form__row">
                <div class="form__label">
                  {{{Label id="login" text="??????????"}}}
                </div>
                <div class="form__input ">
                  {{{Input
                  id="login"
                  type="text"
                  name="login"
                  placeholder="?????? ??????????"
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
                  {{{Label id="password" text="????????????"}}}
                </div>
                <div class="form__input ">
                  {{{Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="????????????"
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
                      {{{Button className="btn--blue" type="submit" text="??????????????????????" click=onClickSubmit}}}
                  </div>
                  <div class="form__link">
                      {{{Link url="/sign-up" className="login__link" text="?? ?????? ?????? ?????????????????" ref="link"}}}
                  </div>
              </div>
          </form>
      </main>
  `;
  }
}
