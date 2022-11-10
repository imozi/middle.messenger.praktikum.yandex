import { Component } from 'core/Component';

interface MessageProps {
  text: string;
  src?: string;
  isMy: boolean;
}

export class Message extends Component<MessageProps> {
  static componentName = 'Message';

  constructor(props: MessageProps, { isMy = false, src } = props) {
    super({
      ...props,
      isMy,
      src: src
        ? `https://ya-praktikum.tech/api/v2/resources/${src}`
        : 'img/svg/user-default.svg',
    });
  }

  render() {
    return `
      <div class="message" data-isMy={{isMy}}>
       <p class="message__content">{{text}}</p>
        <div class="message__user-img">
          <img src="{{src}}" alt="avatar">
        </div>
      </div>
    `;
  }
}
