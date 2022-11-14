import { Message } from 'components/Correspondence';
import { Component } from 'core/Component';
import { Socket } from 'core/Socket';
import Chats from 'services/Chats';
import User from 'services/User';

interface ChatProps {
  id: string;
  chat: string;
  userId: string;
  socket?: Socket;
  className?: string;
  isLoading?: string;
  isOpen?: boolean;
  messages?: Message[];
}

export class Chat extends Component<ChatProps> {
  static componentName = 'Chat';

  static isDeleteChat = false;

  static isAddedUserChat = false;

  constructor(props: ChatProps, { isOpen = false } = props) {
    super({ ...props, isOpen });

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
      onKeyupMessage: (evt: Event | KeyboardEvent) => {
        const { message } = this.state;
        const target = evt.target as HTMLTextAreaElement;
        const e = evt as KeyboardEvent;

        message.content = target.value;

        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
          e.preventDefault();
          target.value = '';
          this.props.sendMessage();
        }
      },
      onKeydownMessage: (evt: Event | KeyboardEvent) => {
        const e = evt as KeyboardEvent;

        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
          e.preventDefault();
        }
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
      removeChat: async () => {
        const id = this.getEl().dataset.chatId;
        try {
          await Chats.deleteChats(id!);
          Chat.isDeleteChat = true;
        } catch (error) {
          this.props.showNotification(
            'error',
            'Не удалось удалить чат, попробуйте позже!',
          );
        }
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
        try {
          const user = (await User.searchUser(this.state.user)) as any;
          const userId = user[0].id;
          const chatId = Number(this.getEl().dataset.chatId);

          await Chats.addedUserToChat(userId, chatId);
          this.props.showNotification(
            'success',
            'Пользователь успешно добавлен!',
          );

          this.state.user.login = '';
        } catch (error) {
          this.props.showNotification(
            'error',
            'Не удалось добавить пользователя, попробуйте позже!',
          );
        }
      },
      onClickDeleteUserSubmit: async () => {
        try {
          const user = (await User.searchUser(this.state.user)) as any;
          const userId = user[0].id;
          const chatId = Number(this.getEl().dataset.chatId);

          await Chats.deleteUserFromChat(userId, chatId);
          this.props.showNotification(
            'success',
            'Пользователь успешно удален из чата!',
          );

          this.state.user.login = '';
        } catch (error) {
          this.props.showNotification(
            'error',
            'Не удалось удалить пользователя, попробуйте позже!',
          );
        }
      },
      onClickSendMessage: (evt: Event) => {
        const target = evt.target as HTMLElement;
        const btn = target.parentNode?.parentNode as HTMLButtonElement;

        btn.blur();
        this.props.sendMessage();
      },
      sendMessage: () => {
        const { message } = this.state;
        const socket = this.props.socket as Socket;
        if (!message.content) {
          return;
        }
        socket.send(message);
      },
      showNotification: (type: string, text: string) => {
        this.props.notification.setProps({
          type,
          text,
        });

        setTimeout(() => {
          this.props.notification.show();
        }, 0);

        this.props.notification.dispatchEvent({ name: 'close' });
      },
    });
  }

  componentDidMount() {
    if (Chat.isDeleteChat) {
      this.props.showNotification('success', 'Чат успешно удален!');
      Chat.isDeleteChat = false;
    }
  }

  componentWillDidMount() {
    if (!this.props.isOpen) {
      this.hide();
    }
    if (this.props.isLoading) {
      this.getEl().dataset.loading = this.props.isLoading;
    }
  }

  componentWillUpdate() {
    if (!this.props.isOpen) {
      this.hide();
    }
  }

  render() {
    return `
    <section class="chat {{className}}" data-chat-id="{{id}}" data-loading="true">
      <header class="chat__header">
        <div class="chat__header-col">
          <div class="chat__avatar">
            <div class="chat__avatar-img">
              <img 

              {{#if chat.avatar}}
                src="https://ya-praktikum.tech/api/v2/resources/{{chat.avatar}}"
              {{else}} 
                src="img/svg/user-default.svg"
              {{/if}}

              alt="avatar">
            </div>
            <p class="chat__name">{{chat.title}}</p>
          </div>
        </div>
        <div class="chat__header-col">

        {{{Button className="chat__btn chat__btn--search chat__btn--menu" icon="search" }}}
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
          {{{NewMessage keyup=onKeyupMessage keydown=onKeydownMessage}}}
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
