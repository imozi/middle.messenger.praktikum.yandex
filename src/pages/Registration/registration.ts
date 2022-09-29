import { Component } from '../../core/Component';

export class RegistrationPage extends Component {
  render() {
    return `
    <main class="registration">
         {{{Header  class="registration__header" title="Регистрация"}}}
         <form action="/500" class="form registration__form" method="get">

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
             value="hub"
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
             value="ozihub"
             }}}
             {{{Icon class="input-icon" icon="user"}}}
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
             value="ozi"
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
             value="ozihub"
             }}}
             {{{Icon class="input-icon" icon="hide"}}}
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
             value="ozihub@yandex.ru"
             }}}
           </div>
         </div>

         <div class="form__row">
           <div class="form__label">
             {{{Label id="password-repeated" text="Пароль (еще раз)"}}}
           </div>
           <div class="form__input ">
             {{{Input
             id="password-repeated"
             type="password"
             name="password-repeated"
             placeholder="Пароль (еще раз)"
             value="ozihub"
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
             value="+7 (924) 896 33 79"
             }}}
             {{{Icon class="input-icon" icon="phone"}}}
           </div>
         </div>

         

         <div class="form__row">
             <div class="form__btn">

                 {{{Button class="btn--blue" type="submit" text="Зарегистрироваться"}}}

             </div>
             <div class="form__link">

                 {{{Link url="login" class="registration__link" text="Войти"}}}

             </div>
         </div>
     </form>
    </main>
    `;
  }
}
