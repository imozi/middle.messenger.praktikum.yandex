import { Component } from 'core/Component';

interface ButtonProps {
  className: string;
  type: string;
  text: string;
  click: (evt: Event) => void;
}

export class Button extends Component {
  static componentName = 'Button';

  constructor({ className, type, text, click }: ButtonProps) {
    super({ className, type, text, events: { click } });
  }

  render() {
    return `
    <button class="btn {{className}}" type="{{type}}">{{text}}</button>
    `;
  }
}
