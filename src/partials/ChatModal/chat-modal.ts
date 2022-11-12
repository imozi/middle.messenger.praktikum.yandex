import { Component } from 'core/Component';

interface ChatModalProps {
  id: string;
  className: string;
  label: string;
  input: string;
  name: string;
  text: string;
  data?: any;
  placeholder: string;
  click: (evt: Event) => void;
  submit: (evt: Event) => void;
  events?: any;
}

export class ChatModal extends Component<ChatModalProps> {
  static componentName = 'ChatModal';

  constructor(props: ChatModalProps, { click } = props) {
    super({ ...props, events: { click } });

    this.setProps({
      onKeyupData: (evt: Event) => {
        const { data } = this.props;
        const target = evt.target as HTMLTextAreaElement;

        data[target.name] = target.value;
      },
      onSubmitForm: (evt: Event) => {
        evt.preventDefault();
        this.props.submit();
        this.hide();
      },
    });
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
    <div class="chat__modal {{className}}" data-hide="true">
      <form class="form chat__form" method="post" ref="form">
        <div class="form__row">
          <div class="form__label">
            {{{Label id=id text=label }}}
          </div>
          <div class="form__input ">
          {{{Input
            id=id
            type=input
            name=name
            placeholder=placeholder
            ref="input"
            keyup=onKeyupData
            }}}
          </div>
        </div>
        <div class="form__btn">
            {{{Button className="btn--blue" type="submit" text=text ref="button" click=onSubmitForm}}}
        </div>
      </form>
    </div> 
`;
  }
}
