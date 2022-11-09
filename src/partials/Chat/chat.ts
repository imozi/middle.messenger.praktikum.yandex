import { Component } from 'core/Component';
import { Socket } from 'core/Socket';
import Chats from 'services/Chats';
import User from 'services/User';

interface ChatProps {
  id: string;
  chat: string;
  socket?: Socket;
  className?: string;
  userId: string;
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
      user: {
        login: '',
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
      onClickShowAddUserModal: (evt: Event) => {
        evt.stopPropagation();
        if (this.refs.addUserModal.getEl().dataset.hide === 'true') {
          this.refs.chatMenu.hide();
          this.refs.addUserModal.show();
          document.addEventListener(
            'click',
            this.refs.addUserModal.hide.bind(this.refs.addUserModal),
          );
          return;
        }

        this.refs.addUserModal.hide();
        document.removeEventListener(
          'click',
          this.refs.addUserModal.hide.bind(this.refs.addUserModal),
        );
      },
      onClickShowDeleteUserModal: (evt: Event) => {
        evt.stopPropagation();
        if (this.refs.deleteUserModal.getEl().dataset.hide === 'true') {
          this.refs.chatMenu.hide();
          this.refs.deleteUserModal.show();
          document.addEventListener(
            'click',
            this.refs.deleteUserModal.hide.bind(this.refs.deleteUserModal),
          );
          return;
        }

        this.refs.deleteUserModal.hide();
        document.removeEventListener(
          'click',
          this.refs.deleteUserModal.hide.bind(this.refs.deleteUserModal),
        );
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
      onClickAddUserSubmit: async () => {
        const user = (await User.searchUser(this.state.user)) as any;
        const userId = user[0].id;
        const chatId = Number(this.getEl().dataset.chatId);

        await Chats.addedUserToChat(userId, chatId);

        this.state.user.login = '';
      },
      onClickDeleteUserSubmit: async () => {
        const user = (await User.searchUser(this.state.user)) as any;
        const userId = user[0].id;
        const chatId = Number(this.getEl().dataset.chatId);

        await Chats.deleteUserFromChat(userId, chatId);

        this.state.user.login = '';
      },
      onClickSendMessage: (evt: Event) => {
        const { message } = this.state;
        const target = evt.target as HTMLElement;
        const btn = target.parentNode?.parentNode as HTMLButtonElement;
        const socket = this.props.socket as Socket;

        btn.blur();

        if (!message.content) {
          return;
        }
        socket.send(message);
      },
    });
  }

  public componentDidMount(): void {
    this.hide();
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
        {{{ChatMenu className="chat__menu" ref="chatMenu" remove=removeChat add=onClickShowAddUserModal removeUser=onClickShowDeleteUserModal}}}
        </div>
      </header>
       
      {{{Correspondence ref="correspondence" messages=messages userId=userId}}}

      <div class="chat__message">
        <div class="chat__message-col">
           {{{Button className="chat__btn chat__btn--file" icon="file-send" }}}
        </div>
        <div class="chat__message-col">
          {{{NewMessage keyup=onKeyupMessage}}}
        </div>
        <div class="chat__message-col">
          {{{Button className="chat__btn chat__btn--send" icon="send-msg" click=onClickSendMessage}}}
        </div>
      </div>

      {{{ChatModal data=user id="addUser" label="Введите логин пользователя" input="text" name="login" text="Добавить пользователя" placeholder="Логин пользователя" ref="addUserModal" click=onClickModal submit=onClickAddUserSubmit}}}

      {{{ChatModal data=user id="deleteUser" label="Введите логин пользователя" input="text" name="login" text="Удалить пользователя" placeholder="Логин пользователя" ref="deleteUserModal" click=onClickModal submit=onClickDeleteUserSubmit}}}

    </section>
    
      `;
  }
}
