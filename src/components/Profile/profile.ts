import { Component } from 'core/Component';
import { stateUser } from 'store/User';

interface ProfileProps {
  className?: string;
  profile?: stateUser;
}

export class Profile extends Component {
  static componentName = 'Profile';

  constructor(props: ProfileProps) {
    super({ ...props });

    this.setProps({
      onClickFormBtn: (evt: Event) => {
        evt.preventDefault();

        Object.entries(this.refs).forEach(([_, ref]: [string, Component]) => {
          const el = ref.getEl() as HTMLInputElement;
          el.disabled = false;
        });
      },
    });
  }

  render() {
    return `
    <section class="profile">
      <header class="profile__header"><h2>Профиль</h2></header>
      <div class="profile__row">
       {{{Avatar className="profile__avatar" src=profile.avatar ref="avatar"}}}
      </div>
      <div class="profile__row">
        <form class="form profile__form" method="post" ref="form" disabled>

        <div class="form__row">
          <div class="form__label">
            {{{Label id="first_name" text="Фамилия"}}}
          </div>
          <div class="form__input ">
            {{{Input
            id="first_name"
            type="text"
            name="first_name"
            value=profile.first_name
            placeholder="Фамилия"
            ref="firstName"
            disabled="true"
            
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
            value=profile.phone
            placeholder="+7 (924) 896 33 79"
            ref="phone"
            disabled="true"
            }}}
            {{{Icon className="input-icon" icon="phone"}}}
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
            value=profile.second_name
            name="second_name"
            placeholder="Имя"
            ref="secondName"
            disabled="true"
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
            value=profile.login
            placeholder="Ваш логин"
            ref="login"
            disabled="true"
            }}}
            {{{Icon className="input-icon" icon="user"}}}
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
            value=profile.email
            placeholder="pochta@yandex.ru"
            ref="email"
            disabled="true"
            }}}
          </div>
        </div>

        <div class="form__row">
          <div class="form__label">
            {{{Label id="email" text="Имя в чате"}}}
          </div>
          <div class="form__input ">
            {{{Input
            id="display_name"
            type="text"
            name="display_name"
            value=profile.display_name
            placeholder="Ваш никнайм"
            ref="displayName"
            disabled="true"
            }}}
          </div>
        </div>





            <div class="form__btn">
                {{{Button className="btn--blue" type="submit" text="Изменить данные" click=onClickFormBtn}}}
            </div>
      </form>

     </div>

     
    </section>
      `;
  }
}
