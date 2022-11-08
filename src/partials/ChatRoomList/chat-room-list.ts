import { Component } from 'core/Component';
import { Rec } from 'core/types';
import { stateChat } from 'store/Chats/chats';

interface ChatRoomListProps {
  className: string;
  chats?: Rec<stateChat>;
  click: (evt: Event) => void;
}

interface chatsProps extends stateChat {
  click: Function;
}

export class ChatRoomList extends Component {
  static componentName = 'ChatRoomList';

  constructor(props: ChatRoomListProps, { click } = props) {
    if (props.chats) {
      Object.entries(props.chats).forEach(([_, item]) => {
        const chat = item as chatsProps;
        chat.click = click;
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
                lastMessage=last_message.content
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
