import { Component } from 'core/Component';

interface NewChatProps {
  className: string;
  click: (evt: Event) => void;
  events: any;
}

export class NewChat extends Component<NewChatProps> {
  static componentName = 'NewChat';

  constructor(props: NewChatProps, { click } = props) {
    super({ ...props, events: { click } });
  }

  show() {
    this.getEl().style.zIndex = '103';
    this.getEl().dataset.hide = 'false';
    this.getEl().style.opacity = '1';
  }

  hide() {
    this.getEl().style.opacity = '0';
    this.getEl().dataset.hide = 'true';
    setTimeout(() => (this.getEl().style.zIndex = '-1'), 170);
  }

  render() {
    return `
    <ul class="new-chat-list {{className}}" data-hide="true">
      <li class="new-chat__item">
      {{{Button className="new-chat--add" icon="add" text="Создать новый чат" ref="newChat"}}} 
      </li>
    </ul>
    `;
  }
}
