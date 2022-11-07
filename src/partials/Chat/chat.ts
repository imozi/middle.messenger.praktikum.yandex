import { Component } from 'core/Component';

interface ChatProps {
  className?: string;
}

export class Chat extends Component {
  static componentName = 'Chat';

  constructor(props: ChatProps) {
    super({ ...props });

    this.setState({
      message: {
        content: '',
        type: 'message',
      },
    });

    this.setProps({
      onKeyupMessage: (evt: Event) => {
        const { message } = this.state;
        const target = evt.target as HTMLTextAreaElement;

        message.content = target.value;
      },
    });
  }

  render() {
    return `
    <section class="chat {{className}}">
      <header class="chat__header">
        <div class="chat__header-col">
          <div class="chat__user">
            <div class="chat__user-img">
              <img 

              {{#if src}}
                src="{{src}}"
              {{else}} 
                src="img/svg/user-default.svg"
              {{/if}}

              alt="avatar">
            </div>
            <p class="chat__user-name">Олег</p>
          </div>
        </div>
        <div class="chat__header-col">
        {{{Button className="chat__btn chat__btn--search" icon="search"}}}
        {{{Button className="chat__btn chat__btn--menu" icon="menu-top-right" }}}
        </div>
      </header>
       

      {{{Correspondence}}}


      <div class="chat__message">
        <div class="chat__message-col">
           {{{Button className="chat__btn chat__btn--file" icon="file-send" }}}
        </div>
        <div class="chat__message-col">
          {{{NewMessage keyup=onKeyupMessage}}}
        </div>
        <div class="chat__message-col">
          {{{Button className="chat__btn chat__btn--send" icon="send-msg" }}}
        </div>
      </div>
    </section>
      `;
  }
}
