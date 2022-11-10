import { Component } from 'core/Component';
import { Socket } from 'core/Socket';
import { StateChat } from 'store/Chats/chats';
import Chats from 'services/Chats';
import { Nullable, Rec } from 'core/types';

interface MessengerPageProps {
  chats: Rec<StateChat>;
  user: { id: string; login: string };
}

export class MessengerPage extends Component<MessengerPageProps> {
  static lastActiveChatId: string;

  static lastWSActive: Nullable<Socket>;

  static createdNewChat: string = '';

  static intervalId: any;

  constructor(props: MessengerPageProps) {
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
        if (this.refs.chatModal.getEl().dataset.hide === 'true') {
          this.refs.newChatMenu.hide();
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
      onClickSubmit: async () => {
        if (this.state.newChat.title) {
          await Chats.createChats(this.state.newChat);
          MessengerPage.createdNewChat = 'success';
        }
      },
      onClickRoom: async (evt: Event) => {
        this.props.disabledRoom();

        const chat = this.refs.chat;
        const evtTarget = evt.target as HTMLElement;
        const item = evtTarget.offsetParent as HTMLElement;
        const idChat = item.dataset.id;
        const currentChat = this.props.getCurrentChat(item.dataset.id);

        if (idChat === MessengerPage.lastActiveChatId) {
          return;
        }

        if (MessengerPage.lastActiveChatId) {
          MessengerPage.lastWSActive!.destroy();
          MessengerPage.lastWSActive = null;
        }

        const wsData = {
          userId: this.props.user.id as string,
          chatId: idChat as string,
          token: currentChat.token as string,
          events: {
            open: () => 'open',
            close: () => 'close',
            message: (messages: MessageEvent) => {
              const json = JSON.parse(messages.data);

              if (json.type === 'pong') {
                return;
              }

              if (Array.isArray(json)) {
                chat.setProps({
                  messages: json,
                  isLoading: 'false',
                });
              } else {
                socket.getMessages();
              }
            },
          },
        };

        const socket = new Socket(wsData);
        MessengerPage.lastWSActive = socket;

        chat.setProps({
          id: idChat,
          isOpen: true,
          isLoading: 'true',
          chat: this.props.getCurrentChat(item.dataset.id),
          socket,
        });

        MessengerPage.lastActiveChatId = item.dataset.id || '';
        item.dataset.active = 'true';

        setTimeout(() => chat.show(), 100);

        if (MessengerPage.intervalId) {
          clearInterval(MessengerPage.intervalId);
        }

        MessengerPage.intervalId = setInterval(() => {
          socket.ping();
        }, 30000);
      },
      disabledRoom: () => {
        const rooms = document
          .querySelector('.messenger__list')
          ?.querySelectorAll('[data-active]');
        rooms?.forEach((item) => {
          const room = item as HTMLElement;
          room.dataset.active = 'false';
        });
      },
      getCurrentChat: (id: string) => {
        const currentChatData = Object.entries(this.props.chats).find(
          ([_, e]) => {
            const chat = e as StateChat;
            return chat.id.toString() === id;
          },
        );
        return currentChatData![1];
      },
      onKeyUpSearch: (evt: Event) => {
        const { searchChat } = this.state;
        const target = evt.target as HTMLInputElement;

        searchChat.id = target.value;
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
    });

    this.setState({
      newChat: {
        title: '',
      },
      searchChat: {
        id: '',
      },
    });
  }

  async getChats() {
    try {
      await Chats.getChats();
    } catch (error) {
      this.props.showNotification(`error`, 'Попробуйте обновить страницу');
    }
  }

  async componentDidMount() {
    await this.getChats();
  }

  public componentWillDidMount(): void {
    if (this.props.chats) {
      this.getEl().dataset.loading = 'false';
    }
  }

  public componentWillUpdate(): void {
    if (MessengerPage.createdNewChat) {
      setTimeout(() => {
        this.props.showNotification(
          `${MessengerPage.createdNewChat}`,
          'Чат успешно создан!',
        );
        MessengerPage.createdNewChat = '';
      }, 200);
    }
  }

  componentWillUnmount() {
    if (MessengerPage.lastActiveChatId) {
      const chat = this.refs.chat;
      MessengerPage.lastWSActive!.destroy();
      MessengerPage.lastWSActive = null;
      MessengerPage.lastActiveChatId = '';

      chat.setProps({
        socket: null,
      });
    }
  }

  render() {
    return `
    <main class="messenger" data-loading="true">
      {{{Notification className="messenger__notification" type="" text="" ref="notification" close=closeNotification}}}
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
              keyup=onKeyUpSearch
            }}}
            {{{Icon className="input-icon" icon="search" ref="icon"}}}
          </div>
        </div>

        {{{ChatRoomList className="messenger__list" chats=chats user=user click=onClickRoom ref="chatRooms"}}}

        {{{Navigation className="messenger__nav" active="chats"}}}
        
      </aside>

      <section class="messenger__content">
        {{{Chat ref="chat" notification=refs.notification userId=user.id }}}
        <span class="messenger__placeholder">Выберите, куда хотели бы написать или создайте чат</span>
      </section>
    {{{ChatModal data=newChat id="newChat" label="Введите название чата" input="text" name="title" text="Создать чат" placeholder="Название чата" ref="chatModal" click=onClickModal submit=onClickSubmit}}}
    </main>
    `;
  }
}
