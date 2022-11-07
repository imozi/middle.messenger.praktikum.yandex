import { Component } from 'core/Component';

interface ChatRoomProps {
  id: string;
  className?: string;
  chatAvatar?: string;
  chatName: string;
  lastMessage: string;
  time: string;
  countUnread: string;
}

export class ChatRoom extends Component {
  static componentName = 'ChatRoom';

  constructor(props: ChatRoomProps) {
    super({ ...props });
  }

  render() {
    return `
    <div class="chat-room {{className}}" tabindex="0">
      <div class="chat-room__avatar">
        <img 

        {{#if chatAvatar}}
          src="{{chatAvatar}}"
        {{else}} 
          src="img/svg/user-default.svg"
        {{/if}}

        alt="avatar">
      </div>
      <div class="chat-room-row">
        <div class="chat-room-col">
          <h2 class="chat-room__name">{{chatName}}</h2>
          <p class="chat-room__last-message">{{lastMessage}}</p>
        </div>
        <div class="chat-room-col">
          <span class="chat-room__time">{{time}}</span>
          {{#if countUnread}}
          <span class="chat-room__unread">{{countUnread}}</span>
          {{/if}}
        </div>
      </div>
    </div>
    `;
  }
}
