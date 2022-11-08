import { Component } from 'core/Component';
import Chats from 'services/Chats';

interface ChatProps {
  id: string;
  chat: string;
  className?: string;
}

export class Chat extends Component {
  static componentName = 'Chat';

  constructor(props: ChatProps) {
    super({ ...props });

    this.setState({
      message: {
        content: '',
        type: 'message',
      },
    });

    this.setProps({
      onKeyupMessage: (evt: Event) => {
        const { message } = this.state;
        const target = evt.target as HTMLTextAreaElement;

        message.content = target.value;
      },
      onClickShowHideChatMenu: (evt: Event) => {
        evt.stopPropagation();
        if (this.refs.chatMenu.getEl().dataset.hide === 'true') {
          this.refs.chatMenu.show();
          document.addEventListener(
            'click',
            this.refs.chatMenu.hide.bind(this.refs.chatMenu),
          );
          return;
        }

        this.refs.chatMenu.hide();
        document.removeEventListener(
          'click',
          this.refs.chatMenu.hide.bind(this.refs.chatMenu),
        );
      },
      onClickShowModal: (evt: Event) => {
        evt.stopPropagation();
        if (this.refs.chatModal.getEl().dataset.hide === 'true') {
          this.refs.chatMenu.hide();
          this.refs.chatModal.show();
          document.addEventListener(
            'click',
            this.refs.chatModal.hide.bind(this.refs.chatModal),
          );
          return;
        }

        this.refs.chatModal.hide();
        document.removeEventListener(
          'click',
          this.refs.chatModal.hide.bind(this.refs.chatModal),
        );
      },
      removeChat: async () => {
        const id = this.getEl().dataset.chatId;
        await Chats.deleteChats(id!);
      },
      onClickModal: (evt: Event) => {
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
      onClickSubmit: () => {
        console.log('tut');
      },
    });
  }

  render() {
    return `
    <section class="chat {{className}}" data-chat-id="{{id}}">
      <header class="chat__header">
        <div class="chat__header-col">
          <div class="chat__user">
            <div class="chat__user-img">
              <img 

              {{#if chat.avatar}}
                src="{{chat.avatar}}"
              {{else}} 
                src="img/svg/user-default.svg"
              {{/if}}

              alt="avatar">
            </div>
            <p class="chat__user-name">{{chat.title}}</p>
          </div>
        </div>
        <div class="chat__header-col">
        {{{Button className="chat__btn chat__btn--menu" icon="menu-top-right" click=onClickShowHideChatMenu}}}
        {{{ChatMenu className="chat__menu" ref="chatMenu" remove=removeChat add=onClickShowModal}}}
        </div>
      </header>
       

      {{{Correspondence ref="correspondence"}}}


      <div class="chat__message">
        <div class="chat__message-col">
           {{{Button className="chat__btn chat__btn--file" icon="file-send" }}}
        </div>
        <div class="chat__message-col">
          {{{NewMessage keyup=onKeyupMessage}}}
        </div>
        <div class="chat__message-col">
          {{{Button className="chat__btn chat__btn--send" icon="send-msg" }}}
        </div>
      </div>
      {{{ChatModal id="newChat" label="Введите ник или id пользователя" input="text" name="title" text="Добавить пользователя" placeholder="Ник или id пользователя" ref="chatModal" click=onClickModal submit=onClickSubmit}}}
    </section>
    
      `;
  }
}
