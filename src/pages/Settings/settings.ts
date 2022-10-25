import { Component } from 'core/Component';
import Auth from 'services/Auth';

export class SettingsPage extends Component {
  constructor(props?: any) {
    super(props);

    this.setProps({
      onClickLogout: async () => {
        await Auth.logout();
        this.props.router.go('/sign-in');
      },
    });
  }

  render() {
    return `
    <main class="messenger settings">
      {{{Notification className="messenger__notification" type="" text="" ref="notification"}}}
      <aside class="messenger__aside">
        <div class="messenger__header">
         <div class="messenger__header-row">
            <div class="messenger__header-logo">
                <img src="img/svg/logo-light.svg" alt="OziHub Messanger">
            </div>
          </div>


          <div class="settings__profile">
            <div class="settings__profile-avatar">
            <img 

            {{#if user.avatar}}
              src={{user.avatar}}
            {{else}} 
              src="img/svg/user-default.svg"
            {{/if}}

            alt="avatar"></span>
            </div>
            <div class="settings__profile-row">
              <div class="settings__profile-col">
                <h2 class="settings__profile-name">{{user.first_name}} {{user.second_name}}</h2>
                <p class="settings__profile-display-name">
                {{#if user.display_name}}
                  {{user.display_name}}
                {{else}}
                   {{user.login}}
                {{/if}}
                </p>
              </div>
            </div>
          </div>




        </div>

        <ul class="settings__list">
          <div class="settings__list-wrap">
          <li>
          {{{Link url="/settings/profile" className="settings__list-item" text="Профиль" icon="user" ref="profile"}}}
          </li>
          <li>
          {{{Link url="/settings/password" className="settings__list-item" text="Изменить пароль" icon="pwd" ref="password"}}}
          </li>
          <li>
          {{{Button className="logout settings__list-item" text="Выйти" icon="exit" ref="logout" click=onClickLogout}}}
          </li>
          <div>
        </ul>

        <nav class="messenger__nav">
          <ul class="messenger__nav-list">
            <li>
            {{{Link url="/contacts" className="messenger__nav-item" icon="contacts" ref="contacts"}}}
            </li>
            <li>
            {{{Link url="/messenger" className="messenger__nav-item" icon="chats" ref="chats" click=onClickMessanger}}}
            </li>
            <li>
            {{{Link className="messenger__nav-item" icon="settings" ref="settings" active='true'}}}
            </li>
          </ul>
        </nav>
      </aside>
      <section class="messenger__room">
        <p>Выберите, кому хотели бы написать</p>
      </section>
    </main>
    `;
  }
}
