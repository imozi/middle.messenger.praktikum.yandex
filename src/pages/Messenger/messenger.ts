import { Component } from 'core/Component';

export class MessengerPage extends Component {
  constructor(props?: any) {
    super({ ...props });

    this.setProps({
      onClickShowHideNewChatMenu: (evt: Event) => {
        evt.stopPropagation();
        if (this.refs.newChatMenu.getEl().dataset.hide === 'true') {
          this.refs.newChatMenu.show();
          document.addEventListener(
            'click',
            this.refs.newChatMenu.hide.bind(this.refs.newChatMenu),
          );
          return;
        }

        this.refs.newChatMenu.hide();
        document.removeEventListener(
          'click',
          this.refs.newChatMenu.hide.bind(this.refs.newChatMenu),
        );
      },
      onClickCreateNewChat: (evt: Event) => {
        evt.stopPropagation();
        if (this.refs.newChatModal.getEl().dataset.hide === 'true') {
          this.refs.newChatMenu.hide();
          this.refs.newChatModal.show();
          document.addEventListener(
            'click',
            this.refs.newChatModal.hide.bind(this.refs.newChatModal),
          );
          return;
        }

        this.refs.newChatModal.hide();
        document.removeEventListener(
          'click',
          this.refs.newChatModal.hide.bind(this.refs.newChatModal),
        );
      },
      onClickForm: (evt: Event) => {
        const target = evt.target as HTMLFormElement;
        const parent = target.parentNode?.parentNode
          ?.parentNode as HTMLFormElement;
        const isForm =
          target.classList.contains('form') ||
          parent?.classList.contains('form');
        if (isForm) {
          evt.stopPropagation();
        }
      },
    });
  }

  render() {
    return `
    <main class="messenger">
      {{{Notification className="messenger__notification" type="" text="" ref="notification"}}}
      <aside class="messenger__aside">

        <div class="messenger__header">
          <div class="messenger__header-row">
            <div class="messenger__header-logo">
              <img src="img/svg/logo-light.svg" alt="OziHub Messanger">
            </div>
            {{{Button className="messenger__new-chat" icon="new-chat" ref="newChatBtn" click=onClickShowHideNewChatMenu}}}
            {{{NewChat className="messenger__new-chat-menu" ref="newChatMenu" click=onClickCreateNewChat}}}
          </div>
          
          <div class="messenger__aside-search">
            {{{Input
              id="search"
              type="text"
              name="search"
              placeholder="Поиск"
              icon="search"
              ref="search"
            }}}
            {{{Icon className="input-icon" icon="search" ref="icon"}}}
          </div>
        </div>

        {{{ChatRoomList className="messenger__list"}}}

        {{{Navigation className="messenger__nav" active="chats"}}}
        
      </aside>

      <section class="messenger__content">
      {{{Chat}}}
        <span class="messenger__placeholder">Выберите, кому хотели бы написать</span>
      </section>
    {{{NewChatModal ref="newChatModal" click=onClickForm}}}
    </main>
    `;
  }
}
