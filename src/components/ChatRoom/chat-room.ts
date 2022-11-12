import { Component } from 'core/Component';

interface ChatRoomProps {
  id: string;
  className?: string;
  chatAvatar?: string;
  chatName: string;
  login: string;
  lastMessage: string;
  time: string;
  countUnread: string;
  currentLogin: string;
  click?: (evt: Event) => void;
  events?: any;
}

export class ChatRoom extends Component<ChatRoomProps> {
  static componentName = 'ChatRoom';

  constructor(props: ChatRoomProps, { click, chatAvatar } = props) {
    super({
      ...props,
      chatAvatar: chatAvatar
        ? `https://ya-praktikum.tech/api/v2/resources/${chatAvatar}`
        : 'img/svg/user-default.svg',
      events: { click },
    });
  }

  render() {
    return `
    <div class="chat-room {{className}}" tabindex="0" data-active="false" data-id={{id}} >
      <div class="chat-room__avatar">
        <img src="{{chatAvatar}}" alt="avatar">
      </div>
      <div class="chat-room-row">
        <div class="chat-room-col">
          <h2 class="chat-room__name">{{chatName}}</h2>

          {{#ifEqual login currentLogin }}
          <p class="chat-room__last-message"><span>Вы:</span> {{lastMessage}}</p>
          {{else}}
          <p class="chat-room__last-message">{{lastMessage}}</p>
          {{/ifEqual}}

          
        </div>
        <div class="chat-room-col">
          <span class="chat-room__time">{{time}}</span>
          {{#if countUnread}}
          <span class="chat-room__unread"></span>
          {{/if}}
        </div>
      </div>
    </div>
    `;
  }
}
