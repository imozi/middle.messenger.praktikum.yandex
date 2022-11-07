import { Component } from 'core/Component';
import { Rec } from 'core/types';

interface ChatRoomListProps {
  className: string;
  chats?: Rec<any>[];
}

export class ChatRoomList extends Component {
  static componentName = 'ChatRoomList';

  constructor(props: ChatRoomListProps) {
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
                className=className 
                chatAvatar=avatar 
                chatName=title 
                lastMessage=last_message.content
                time="22:00"
                countUnread=unread_count
              }}}
              </li>  
            {{/with}}
          {{/each}}             
        </ul>
    `;
  }
}
