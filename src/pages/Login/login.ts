import { Component } from '../../core/Component';

export class LoginPage extends Component {
  render() {
    return `
    <main class="login">
         {{{Header  class="login__header" title="Вход"}}}
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
                value="ozihub"
                ref="loginInput"
                }}}
                {{{Icon class="input-icon" icon="user"}}}
              </div>
            </div>
            <div class="form__row">
              <div class="form__label">
                {{{Label id="login" text="Пароль"}}}
              </div>
              <div class="form__input ">
                {{{Input
                id="password"
                type="password"
                name="password"
                placeholder="Пароль"
                icon="hide"
                value="ozihub"
                ref="pwdInput"
                }}}
                {{{Icon class="input-icon" icon="hide" ref="icon"}}}
              </div>
            </div>
            <div class="form__row">
                <div class="form__btn">
                    {{{Button class="btn--blue" type="submit" text="Авторизация" ref="submitBtn"}}}
                </div>
                <div class="form__link">
                    {{{Link url="registration" class="login__link" text="У вас нет аккаунта?"}}}
                </div>
            </div>
        </form>
    </main>
    `;
  }
}
