import { Component } from 'core/Component';
import { Rec } from 'core/types';
import { StateChat } from 'store/Chats/chats';

interface ChatRoomListProps {
  className: string;
  chats?: Rec<StateChat>;
  user?: user;
  click: (evt: Event) => void;
}

interface ChatsProps extends StateChat {
  click: Function;
  currentUser?: user;
}

type user = {
  id: string;
  login: string;
};

export class ChatRoomList extends Component<ChatRoomListProps> {
  static componentName = 'ChatRoomList';

  constructor(props: ChatRoomListProps, { click } = props) {
    if (props.chats) {
      Object.entries(props.chats).forEach(([_, item]) => {
        const chat = item as ChatsProps;
        chat.click = click;
        chat.currentUser = props.user;
      });
    }

    super({ ...props });
  }

  render() {
    return `
    <ul class="chat-room-list {{className}}">
          <div class="chat-room-list__wrap">
          {{#each chats}}
            {{#with this}}
              <li class="chat-room-list__item">
              {{{ChatRoom
                id=id 
                className=className 
                chatAvatar=avatar 
                chatName=title
                login=last_message.user.login
                time=last_message.text
                countUnread=unread_count
                click=click
              }}}
              </li>  
            {{/with}}
          {{/each}}             
        </ul>
    `;
  }
}
