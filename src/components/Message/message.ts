import { Component } from 'core/Component';

interface MessageProps {
  text: string;
  src: string;
  isMy: boolean;
}

export class Message extends Component {
  static componentName = 'Message';

  constructor(props: MessageProps, { isMy = false } = props) {
    super({ ...props, isMy });
  }

  render() {
    return `
      <div class="message" data-isMy={{isMy}}>
       <p class="message__content">{{text}}</p>
        <div class="message__user-img">
          <img 

          {{#if src}}
            src="{{src}}"
          {{else}} 
            src="img/svg/user-default.svg"
          {{/if}}

          alt="avatar">
        </div>
      </div>
    `;
  }
}
