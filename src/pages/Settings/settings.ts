import { Component } from 'core/Component';
import Auth from 'services/Auth';
import { UserProfileData } from 'services/User/types';

interface SettingsProps {
  user: UserProfileData;
}

export class SettingsPage extends Component<SettingsProps> {
  static lastActiveMenu: string;

  constructor(props: SettingsProps) {
    super({ ...props });

    this.setProps({
      onClickLogout: async () => {
        try {
          await Auth.logout();
          this.props.router.go('/sign-in');
        } catch (error) {
          this.props.showNotification('error', 'Похоже что то пошло не так!');
        }
      },
      onClickShowMenu: (evt: Event) => {
        const target = evt.target as HTMLButtonElement;
        const parent = target.parentNode as HTMLElement;
        SettingsPage.lastActiveMenu = target.dataset.ref!;

        this.props.disabledMenu();

        this.refs[target.dataset.ref!].show();

        parent.dataset.active = 'true';
      },
      closeNotification: () => {
        this.refs.notification.hide();
      },
      showNotification: (type: string, text: string) => {
        this.refs.notification.setProps({
          type,
          text,
        });

        setTimeout(() => {
          this.refs.notification.show();
        }, 0);

        this.refs.notification.dispatchEvent({ name: 'close' });
      },
      disabledMenu: () => {
        const items = document
          .querySelector('.settings__list')
          ?.querySelectorAll('li');
        const sections = document.querySelectorAll('[data-ref]');

        items?.forEach((item) => {
          item.dataset.active = 'false';
        });

        sections?.forEach((item) => {
          const section = item as HTMLElement;
          this.refs[section.dataset.ref!].hide();
        });
      },
    });
  }

  componentWillDidMount() {
    if (SettingsPage.lastActiveMenu) {
      const parent = this.refs[`${SettingsPage.lastActiveMenu}Btn`].getEl()
        .parentNode as HTMLElement;
      parent.dataset.active = 'true';
    }
  }

  componentWillUnmount() {
    this.props.disabledMenu();
  }

  render() {
    return `
    <main class="messenger settings">
      {{{Notification className="messenger__notification" type="" text="" ref="notification" close=closeNotification}}}
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
              src="https://ya-praktikum.tech/api/v2/resources/{{user.avatar}}"
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
          <li data-active="false">
           {{{Button className="settings__list-item" dataset="profile" text="Профиль" icon="user" ref="profileBtn" click=onClickShowMenu}}}
          </li>
          <li data-active="false">
          {{{Button className="settings__list-item" dataset="password" text="Изменить пароль" icon="pwd" ref="passwordBtn" click=onClickShowMenu}}}
          </li>
          <li data-active="false">
          {{{Button className="logout settings__list-item" text="Выйти" icon="exit" ref="logoutBtn" click=onClickLogout}}}
          </li>
          <div>
        </ul>

        {{{Navigation className="messenger__nav" active="settings"}}}
      </aside>
      <section class="messenger__content">
      <span class="messenger__placeholder">Выберите нужный пунк меню настроек</span>

        {{{Profile profile=user ref="profile" notification=refs.notification}}}
        {{{Password ref="password" notification=refs.notification}}}
        
    </main>
    `;
  }
}
