import { validation } from 'core/utils';
import { Component } from 'core/Component';
import Auth from 'services/Auth';
import Router from 'core/Router';

export class SignUpPage extends Component {
  constructor() {
    super();

    this.setState({
      formData: {
        first_name: '',
        second_name: '',
        email: '',
        phone: '',
        login: '',
        password: '',
        passwordRepeated: '',
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

          await Auth.signup(formData);
          Router.go('/messenger');

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
          if (name === 'passwordRepeated') {
            const { password } = formData;
            validation[name](value, password);
          } else {
            validation[name](value, name === 'first_name' ? 'Фамилия' : 'Имя');
          }
        } catch (error: Error | any) {
          if (value) {
            target.dataset.invalid = 'true';
          }
          this.props.showNotification(value ? 'error' : 'info', error.message);
        }
      },
      onKeyUpInput: (evt: { target: HTMLInputElement }) => {
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

  render() {
    return `
    <main class="registration">
         {{{Notification className="registration__notification" text="" type="" ref="notification" close=closeNotification}}}
         {{{Header className="registration__header" title="Регистрация"}}}
         <form action="/500" class="form registration__form" method="get" ref="form">

         <div class="form__row">
           <div class="form__label">
             {{{Label id="first_name" text="Фамилия"}}}
           </div>
           <div class="form__input ">
             {{{Input
             id="first_name"
             type="text"
             name="first_name"
             placeholder="Фамилия"
             ref="firstName"
             focus=onValidateInput
             blur=onValidateInput
             keyup=onKeyUpInput
             }}}
           </div>
         </div>

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
             ref="login"
             focus=onValidateInput
             blur=onValidateInput
             keyup=onKeyUpInput
             }}}
             {{{Icon className="input-icon" icon="user"}}}
           </div>
         </div>

         <div class="form__row">
           <div class="form__label">
             {{{Label id="second_name" text="Имя"}}}
           </div>
           <div class="form__input ">
             {{{Input
             id="second_name"
             type="text"
             name="second_name"
             placeholder="Имя"
             ref="secondName"
             focus=onValidateInput
             blur=onValidateInput
             keyup=onKeyUpInput
             }}}
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
             ref="password"
             focus=onValidateInput
             blur=onValidateInput
             keyup=onKeyUpInput
             }}}
             {{{Icon className="input-icon" icon="hide" ref="icon" click=onClickShowPassword}}}
           </div>
         </div>

         <div class="form__row">
           <div class="form__label">
             {{{Label id="email" text="Почта"}}}
           </div>
           <div class="form__input ">
             {{{Input
             id="email"
             type="email"
             name="email"
             placeholder="pochta@yandex.ru"
             ref="email"
             focus=onValidateInput
             blur=onValidateInput
             keyup=onKeyUpInput
             }}}
           </div>
         </div>

         <div class="form__row">
           <div class="form__label">
             {{{Label id="passwordRepeated" text="Пароль (еще раз)"}}}
           </div>
           <div class="form__input ">
             {{{Input
             id="passwordRepeated"
             type="password"
             name="passwordRepeated"
             placeholder="Пароль (еще раз)"
             ref="passwordRepeated"
             focus=onValidateInput
             blur=onValidateInput
             keyup=onKeyUpInput
             }}}
           </div>
         </div>

         <div class="form__row">
           <div class="form__label">
             {{{Label id="phone" text="Телефон"}}}
           </div>
           <div class="form__input ">
             {{{Input
             id="phone"
             type="tel"
             name="phone"
             placeholder="+7 (924) 896 33 79"
             ref="phone"
             focus=onValidateInput
             blur=onValidateInput
             keyup=onKeyUpInput
             }}}
             {{{Icon className="input-icon" icon="phone"}}}
           </div>
         </div>

         <div class="form__row">
             <div class="form__btn">
                 {{{Button className="btn--blue" type="submit" text="Зарегистрироваться" click=onClickSubmit}}}
             </div>
             <div class="form__link">
                 {{{Link url="/sign-in" className="registration__link" text="Войти" ref="link"}}}
             </div>
         </div>
     </form>
    </main>
    `;
  }
}
