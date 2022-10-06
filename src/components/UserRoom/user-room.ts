import { Component } from 'core/Component';

interface UserRoomProps {
  id: string;
  className?: string;
  userAvatar?: string;
  userName: string;
  lastMessage: string;
  time: string;
  countUnread: string;
}

export class UserRoom extends Component {
  static componentName = 'UserRoom';

  constructor(props: UserRoomProps) {
    super({ ...props });
  }

  render() {
    return `
    <div class="user-room {{className}}" tabindex="0">
      <div class="user-room__avatar">
      <img src="img/svg/user-default.svg" alt="avatar"></span>
      </div>
      <div class="user-room-row">
        <div class="user-room-col">
          <h2 class="user-room__name">{{userName}}</h2>
          <p class="user-room__last-message">{{lastMessage}}</p>
        </div>
        <div class="user-room-col">
          <span class="user-room__time">{{time}}</span>
          {{#if countUnread}}
          <span class="user-room__unread">{{countUnread}}</span>
          {{/if}}
        </div>
      </div>
    </div>
    `;
  }
}
