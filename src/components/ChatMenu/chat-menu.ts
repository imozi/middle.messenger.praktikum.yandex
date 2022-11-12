import { Component } from 'core/Component';

interface ChatMenuProps {
  className: string;
  click?: (evt: Event) => void;
  remove?: (evt: Event) => void;
  removeUser?: (evt: Event) => void;
  add?: (evt: Event) => void;
  events: any;
}

export class ChatMenu extends Component<ChatMenuProps> {
  static componentName = 'ChatMenu';

  constructor(
    props: ChatMenuProps,
    { click, remove, add, removeUser } = props,
  ) {
    super({ ...props, events: { click, remove, add, removeUser } });

    this.setProps({
      removeDispatch: () => {
        this.dispatchEvent({ name: 'remove' });
      },
      addDispatch: (evt: Event) => {
        evt.stopPropagation();
        this.dispatchEvent({ name: 'add' });
      },
      removeUserDispatch: (evt: Event) => {
        evt.stopPropagation();
        this.dispatchEvent({ name: 'removeUser' });
      },
    });
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
    <ul class="chat-menu {{className}}" data-hide="true">
      <li class="chat-menu__item">
       {{{Button className="chat-menu__btn" icon="add" text="Добавить пользователя" ref="add" click=addDispatch add=add}}} 
      </li>
      <li class="chat-menu__item">
       {{{Button className="chat-menu__btn" icon="clear" text="Удалить пользователя" ref="removeUser" click=removeUserDispatch removeUser=removeUser}}} 
      </li>
      <li class="chat-menu__item">
        {{{Button className="chat-menu__btn" icon="remove" text="Удалить чат" ref="remove" click=removeDispatch remove=remove}}} 
      </li>
    </ul>
    `;
  }
}
