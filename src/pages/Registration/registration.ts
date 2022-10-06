import { Validation } from 'core/utils/validation';
import { Component } from '../../core/Component';

const validation: { [key: string]: Function } = {
  first_name: Validation.FirstSecondName,
  second_name: Validation.FirstSecondName,
  login: Validation.Login,
  password: Validation.Password,
  passwordRepeated: Validation.PasswordRepeat,
  email: Validation.Email,
  phone: Validation.Phone,
};

export class RegistrationPage extends Component {
  protected getStateFromProps() {
    this.state = {
      onRegistration: (evt: Event) => {
        evt.preventDefault();

        const registrationData = {
          first_name: (this.refs.firstName.getEl() as HTMLInputElement).value,
          second_name: (this.refs.secondName.getEl() as HTMLInputElement).value,
          login: (this.refs.login.getEl() as HTMLInputElement).value,
          password: (this.refs.password.getEl() as HTMLInputElement).value,
          passwordRepeated: (
            this.refs.passwordRepeated.getEl() as HTMLInputElement
          ).value,
          email: (this.refs.email.getEl() as HTMLInputElement).value,
          phone: (this.refs.phone.getEl() as HTMLInputElement).value,
        };

        const root = document.getElementById('root');
        const notification = this.refs.notification;

        try {
          validation.first_name(registrationData.first_name, 'Фамилия');
          validation.second_name(registrationData.second_name, 'Имя');
          validation.email(registrationData.email);
          validation.phone(registrationData.phone);
          validation.login(registrationData.login);
          validation.password(registrationData.password);
          validation.passwordRepeated(
            registrationData.passwordRepeated,
            registrationData.password,
          );

          // eslint-disable-next-line no-console
          console.log(registrationData);
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
      if (key === 'icon' || key === 'passwordRepeated') {
        component.refs.password = this.refs.password;
      }
      component.refs.notification = this.refs.notification;
    });
  }

  render() {
    return `
    <main class="registration">
         {{{Notification className="registration__notification" text="" type="" ref="notification" click=closeNotification}}}
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
             }}}
             {{{Icon className="input-icon" icon="hide" ref="icon"}}}
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
             }}}
             {{{Icon className="input-icon" icon="phone"}}}
           </div>
         </div>

         <div class="form__row">
             <div class="form__btn">
                 {{{Button className="btn--blue" type="submit" text="Зарегистрироваться" click=onRegistration}}}
             </div>
             <div class="form__link">
                 {{{Link url="login" className="registration__link" text="Войти"}}}
             </div>
         </div>
     </form>
    </main>
    `;
  }
}
