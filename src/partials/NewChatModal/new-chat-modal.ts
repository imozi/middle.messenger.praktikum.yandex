import { Component } from 'core/Component';

interface NewChatModalProps {
  className: string;
  click: (evt: Event) => void;
}

export class NewChatModal extends Component {
  static componentName = 'NewChatModal';

  constructor(props: NewChatModalProps, { click } = props) {
    super({ ...props, events: { click } });
  }

  show() {
    this.getEl().style.zIndex = '9999';
    this.getEl().dataset.hide = 'false';
    setTimeout(() => (this.getEl().style.opacity = '1'), 70);
  }

  hide() {
    this.getEl().style.opacity = '0';
    this.getEl().dataset.hide = 'true';
    setTimeout(() => (this.getEl().style.zIndex = '-100'), 70);
  }

  render() {
    return `
    <div class="new-chat__modal {{className}}" data-hide="true">
      <form class="form new-chat__form" method="post" ref="form">
        <div class="form__row">
          <div class="form__label">
            {{{Label id="newChat" text="Введите название чата"}}}
          </div>
          <div class="form__input ">
          {{{Input
            id="newChat"
            type="text"
            name="title"
            placeholder="Название чата"
            ref="newChat"
            }}}
          </div>
        </div>
        <div class="form__btn">
            {{{Button className="btn--blue" type="submit" text="Создать чат" ref="button"}}}
        </div>
      </form>
    </div> 
`;
  }
}
