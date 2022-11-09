import { Component } from 'core/Component';
import { debounce } from 'core/utils';

interface NewMessageProps {
  keyup?: (evt: Event) => void;
}

function autoResize(this: HTMLTextAreaElement) {
  this.offsetHeight === 200
    ? (this.style.overflow = 'auto')
    : (this.style.overflow = 'hidden');
  this.style.height = 'auto';
  this.style.height = `${this.scrollHeight}px`;
}

export class NewMessage extends Component {
  static componentName = 'NewMessage';

  constructor(props: NewMessageProps, { keyup } = props) {
    super({
      ...props,
      events: {
        input: autoResize,
        keyup: debounce(keyup as Function, 200),
      },
    });
  }

  render() {
    return `
      <textarea class="new-message" rows="1" placeholder="Сообщение"></textarea>
    `;
  }
}
